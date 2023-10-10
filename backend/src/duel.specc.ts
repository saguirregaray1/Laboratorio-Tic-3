import { Test, TestingModule } from '@nestjs/testing';
import { DuelGateway } from './duel.gateway';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Duel } from './entities/duel.entity';
import { Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('DuelGateway', () => {
  let gateway: DuelGateway;
  let duelRepository: Repository<Duel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DuelGateway,
        {
          provide: getRepositoryToken(Duel),
          useClass: Repository,
        },
      ],
    }).compile();

    gateway = module.get<DuelGateway>(DuelGateway);
    duelRepository = module.get<Repository<Duel>>(getRepositoryToken(Duel));
  });

  describe('handleJoin', () => {
    it('should throw an error if the duel is not found', async () => {
      const client = { id: '1' } as any;
      const roomId = 1;

      jest.spyOn(duelRepository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(gateway.handleJoin(client, roomId)).rejects.toThrow(
        new HttpException('Duel not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should create a new room if it does not exist', async () => {
      const client = { id: '1', emit: jest.fn() } as any;
      const roomId = 1;
      const duel = {
        id: 1,
        player1: { id: '1' },
        player2: { id: '2' },
        questions: [{ body: 'Question 1', answer: 'Answer 1' }],
        currentRound: 1,
        rounds: 1,
        player1Score: 0,
        player2Score: 0,
      } as Duel;

      jest.spyOn(duelRepository, 'findOne').mockResolvedValueOnce(duel);

      await gateway.handleJoin(client, roomId);

      expect(gateway['rooms']).toHaveLength(1);
      expect(gateway['rooms'][0].id).toBe(roomId);
      expect(gateway['rooms'][0].players).toHaveLength(1);
      expect(gateway['rooms'][0].players[0]).toBe(client);
      expect(gateway['rooms'][0].duel).toBe(duel);
      expect(client.emit).toHaveBeenCalledWith('question', 'Question 1');
    });

    it('should add a player to an existing room', async () => {
      const client1 = { id: '1' } as any;
      const client2 = { id: '2', emit: jest.fn() } as any;
      const roomId = 1;
      const duel = {
        id: 1,
        player1: { id: '1' },
        player2: { id: '2' },
        questions: [{ body: 'Question 1', answer: 'Answer 1' }],
        currentRound: 1,
        rounds: 1,
        player1Score: 0,
        player2Score: 0,
      } as Duel;

      jest.spyOn(duelRepository, 'findOne').mockResolvedValueOnce(duel);

      await gateway.handleJoin(client1, roomId);
      await gateway.handleJoin(client2, roomId);

      expect(gateway['rooms']).toHaveLength(1);
      expect(gateway['rooms'][0].id).toBe(roomId);
      expect(gateway['rooms'][0].players).toHaveLength(2);
      expect(gateway['rooms'][0].players).toContain(client1);
      expect(gateway['rooms'][0].players).toContain(client2);
      expect(gateway['rooms'][0].duel).toBe(duel);
      expect(client2.emit).toHaveBeenCalledWith('question', 'Question 1');
    });
  });
});
