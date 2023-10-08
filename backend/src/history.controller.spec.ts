import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './app.module'; // Adjust the import path to your app module
import { UserModule } from './modules/user.module';
import { QuestionModule } from './modules/question.module';
describe('HistoryController (e2e)', () => {
  let app: INestApplication;
  let authToken; // Declare a variable to store the JWT token

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, UserModule], // Adjust the import to your app module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/v1/user/signup (POST) - should create a new user', () => {
    return request(app.getHttpServer())
      .post('/api/v1/user/signup')
      .send({
        username: 'user3',
        password: 'pass1234567',
        email: 'test2@gmail.com',
      })
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        console.log(res.body);
      });
  });

  it('/api/v1/user/login (POST) - should login the new user', () => {
    return request(app.getHttpServer())
      .post('/api/v1/user/login')
      .send({
        username: 'user3',
        password: 'pass1234567',
      })
      .expect((res) => {
        console.log(res.body);
        authToken = res.body.token;
      });
  });

  it('/api/v1/history/create/galaxy (POST) - should create a new galaxy', () => {
    return request(app.getHttpServer())
      .post('/api/v1/history/create/galaxy')
      .send({
        name: 'Milky Way',
        index: 'milky-way',
      })
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the JWT token
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        console.log(res.body);
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
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the JWT token
      .expect((res) => {
        // Check for a 400 Bad Request status
        if (res.status !== HttpStatus.CREATED) {
          throw new Error(
            'Expected HTTP status 201 but got ' + res.body.message,
          );
        }

        // You can also check the response body for error messages
        const responseBody = res.body;
        if (responseBody && responseBody.message) {
          throw new Error('Error message in response: ' + responseBody.message);
        }
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
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the JWT token
      .expect(HttpStatus.CREATED)
      .expect((res) => {
        // Verify the response body here
      });
  });

  it('/api/v1/history/question/:id (GET) - should get a question by ID', () => {
    const questionId = 1; // Replace with a valid question ID
    return request(app.getHttpServer())
      .get(`/api/v1/history/question/${questionId}`)
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the JWT token
      .expect(HttpStatus.ACCEPTED)
      .expect((res) => {
        console.log(res.body);
      });
  });

  it('/api/v1/history/world/:id (GET) - should get a world by ID', () => {
    const worldId = 1; // Replace with a valid world ID
    return request(app.getHttpServer())
      .get(`/api/v1/history/world/${worldId}`)
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the JWT token
      .expect(HttpStatus.ACCEPTED)
      .expect((res) => {
        console.log(res.body);
      });
  });

  it('/api/v1/history/galaxy/:id (GET) - should get a galaxy by ID', () => {
    const galaxyId = 1; // Replace with a valid galaxy ID
    return request(app.getHttpServer())
      .get(`/api/v1/history/galaxy/${galaxyId}`)
      .set('Authorization', `Bearer ${authToken}`) // Set the Authorization header with the JWT token
      .expect(HttpStatus.ACCEPTED)
      .expect((res) => {
        console.log(res.body);
      });
  });
});
