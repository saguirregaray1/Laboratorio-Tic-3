import {
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Namespace, Server } from 'socket.io';
import { Repository } from 'typeorm';
import { Duel } from '../entities/duel.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Logger } from '@nestjs/common';
import { DuelService } from 'src/services/duel.service';

@WebSocketGateway()
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

  async handleConnection(client: Socket, duelId: string) {
    this.logger.log(`Client connected: ${client.id}`);

    // Add the client to the room with the specified duelId
    client.join(duelId);

    const clients = this.server.sockets.adapter.rooms.get(duelId);

    // Notify the other clients in the room that a new client has joined
    client.to(duelId).emit('users', Array.from(clients));
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  async handleReady(client: Socket, duelId: string) {
    this.logger.log(`Client ${client.id} is ready`);

    // Add the client to the set of ready clients
    if (!this.readyClients.has(duelId)) {
      this.readyClients.set(duelId, new Set());
    }
    this.readyClients.get(duelId).add(client.id);

    const allReady = this.allReady(duelId);

    if (allReady) {
      this.readyClients.delete(duelId);

      // Get the first question for the duel
      const duel = await this.duelService.getDuel(duelId);

      if (!duel) {
        throw new WsException('Duel not found');
      }
      const firstQuestion = duel.questions[0];

      // Notify all clients in the room that the duel has started
      this.server.to(duelId).emit('duelStarted', firstQuestion.body);
    }
  }

  async handleAnswer(client: Socket, answer: string, duelId: string) {
    // Add the client to the set of ready clients
    if (!this.readyClients.has(duelId)) {
      this.readyClients.set(duelId, new Set());
    }

    if (this.readyClients.get(duelId).has(client.id)) {
      throw new WsException('Client already answered');
    }

    this.readyClients.get(duelId).add(client.id);

    this.logger.log(`Client ${client.id} answered: ${answer}`);

    // Validate the answer
    const isCorrect = await this.duelService.checkAnswerAndUpdate(
      duelId,
      answer,
      client.id,
    );

    // Emit a 'questionAnswered' event to all clients in the room
    this.server.to(duelId).emit('questionAnswered', {
      clientId: client.id,
      answer,
      isCorrect,
    });

    const allReady = this.allReady(duelId);

    if (allReady) {
      this.readyClients.delete(duelId);
      const nextQuestion = this.duelService.endRound(duelId);
      if (!nextQuestion) {
        this.server.to(duelId).emit('duelEnded', nextQuestion);
        this.server
          .to(duelId)
          .emit('duelWinner', this.duelService.getWinner(duelId));
      }
      this.server.to(duelId).emit('Question: ', nextQuestion);
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
