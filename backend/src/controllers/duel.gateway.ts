import {
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  WsException,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { DuelService } from '../services/duel.service';
import { DuelAnswerQuestionDto } from 'src/dtos/DuelAnswerQuestionDto';

@WebSocketGateway({ cors: true })
export class DuelGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private readonly logger = new Logger(DuelGateway.name);

  private readyClients: Map<string, Set<string>> = new Map();

  constructor(private readonly duelService: DuelService) {}

  @WebSocketServer() server: Server;

  afterInit(): void {
    this.logger.log('Initialized');
  }

  async handleConnection(client: Socket) {
    const token = client.handshake.auth.token;
    try {
      const user = await this.duelService.getUserFromToken(token);
      client.data.username = user.username;
      client.data.userId = user.id;
    } catch (e) {
      throw new WsException('Invalid token');
    }
  }

  @SubscribeMessage('join')
  async handleJoin(client: Socket, duelId: string) {
    this.logger.log(`Client joined: ${client.id}`);

    // Add the client to the room with the specified duelId
    client.join(duelId);

    const roomSockets = await this.server.sockets.in(duelId).fetchSockets();

    const usernames = [];

    for (const socket of roomSockets) {
      usernames.push(socket.data.username);
    }

    this.logger.log(usernames);

    this.server.to(duelId).emit('users', usernames);
  }
  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('ready')
  async handleReady(
    @ConnectedSocket() client: Socket,
    @MessageBody() duelId: string,
  ) {
    const username = client.data.username;

    this.logger.log(`Client ${client.id} is ready`);

    // Add the client to the set of ready clients
    if (!this.readyClients.has(duelId)) {
      this.readyClients.set(duelId, new Set());
    }
    this.readyClients.get(duelId).add(username);

    this.server
      .to(duelId)
      .emit('usersReady', Array.from(this.readyClients.get(duelId)));
  }

  @SubscribeMessage('start')
  async handleStart(
    @ConnectedSocket() client: Socket,
    @MessageBody() duelId: string,
  ) {
    this.readyClients.delete(duelId);

    // Get the first question for the duel
    const duel = await this.duelService.getDuel(duelId);

    if (!duel) {
      throw new WsException('Duel not found');
    }

    console.log(duel);

    const firstQuestion = duel.questions[0];

    // Notify all clients in the room that the duel has started
    this.server.to(duelId).emit('duelStarted', firstQuestion.body);
  }

  @SubscribeMessage('answer')
  async handleAnswer(
    @MessageBody() data: DuelAnswerQuestionDto,
    @ConnectedSocket() client: Socket,
  ) {
    // Add the client to the set of ready clients
    if (!this.readyClients.has(data.duelId)) {
      this.readyClients.set(data.duelId, new Set());
    }

    const answers = this.readyClients.get(data.duelId);

    if (answers.has(client.id)) {
      throw new WsException('Client already answered');
    }

    answers.add(client.id);

    this.logger.log(`Client ${client.id} answered`);

    // Validate the answer
    const isCorrect = await this.duelService.checkAnswerAndUpdate(
      data.duelId,
      data.answer,
      data.playerId,
      answers,
    );

    // Emit a 'questionAnswered' event to all clients in the room
    this.server.to(data.duelId).emit('questionAnswered', {
      clientId: client.id,
      answer: data.answer,
      isCorrect,
    });

    const allReady = this.allReady(data.duelId);

    if (allReady) {
      this.readyClients.delete(data.duelId);
      const nextQuestion = this.duelService.endRound(data.duelId);
      if (!nextQuestion) {
        this.server.to(data.duelId).emit('duelEnded', nextQuestion);
        this.server
          .to(data.duelId)
          .emit('duelWinner', this.duelService.getWinner(data.duelId));
      }
      this.server.to(data.duelId).emit('Question: ', nextQuestion);
    }
  }

  private allReady(duelId: string) {
    const clients = Array.from(
      this.server.sockets.adapter.rooms.get(duelId) || [],
    );
    // Check if all clients are ready
    const allReady = clients.every((clientId) =>
      this.readyClients.get(duelId).has(clientId),
    );

    return allReady;
  }
}
