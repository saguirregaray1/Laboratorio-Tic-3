import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module'; // Adjust the import path to your app module
import { UserModule } from './modules/user.module';
import { QuestionModule } from './modules/question.module';
describe('HistoryController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule, QuestionModule], // Adjust the import to your app module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/history/create/galaxy (POST) - should create a new galaxy', () => {
    return request(app.getHttpServer())
      .post('/api/v1/history/create/galaxy')
      .send({
        name: 'Milky Way',
        index: 'milky-way',
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        // Verify the response body here
      });
  });

  it('/api/v1/history/create/world (POST) - should create a new world', () => {
    return request(app.getHttpServer())
      .post('/api/v1/history/create/world')
      .send({
        name: 'Earth',
        index: 'earth',
        galaxyId: 1, // Replace with an existing galaxy ID
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        // Verify the response body here
      });
  });

  it('/api/v1/history/create/question (POST) - should create a new question', () => {
    return request(app.getHttpServer())
      .post('/api/v1/history/create/question')
      .send({
        body: 'What is the capital of France?',
        answer: 'Paris',
        type: 'Multiple Choice',
        category: 'Geography',
        worldId: 1, // Replace with an existing world ID
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        // Verify the response body here
      });
  });

  it('/api/v1/history/question/:id (GET) - should get a question by ID', () => {
    const questionId = 1; // Replace with a valid question ID
    return request(app.getHttpServer())
      .get(`/api/v1/history/question/${questionId}`)
      .expect(HttpStatus.ACCEPTED)
      .expect((res) => {
        // Verify the response body here
      });
  });

  it('/api/v1/history/world/:id (GET) - should get a world by ID', () => {
    const worldId = 1; // Replace with a valid world ID
    return request(app.getHttpServer())
      .get(`/api/v1/history/world/${worldId}`)
      .expect(HttpStatus.ACCEPTED)
      .expect((res) => {
        // Verify the response body here
      });
  });

  it('/api/v1/history/galaxy/:id (GET) - should get a galaxy by ID', () => {
    const galaxyId = 1; // Replace with a valid galaxy ID
    return request(app.getHttpServer())
      .get(`/api/v1/history/galaxy/${galaxyId}`)
      .expect(HttpStatus.ACCEPTED)
      .expect((res) => {
        // Verify the response body here
      });
  });
});
