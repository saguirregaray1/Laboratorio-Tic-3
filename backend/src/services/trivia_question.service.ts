import {
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { TriviaQuestion } from 'src/entities/trivia_question.entity';
import { Repository } from 'typeorm';
import { CreateTriviaQuestionDto } from 'src/dtos/CreateTriviaQuestionDto';

@Injectable()
export class TriviaQuestionService {
  constructor(
    @InjectRepository(TriviaQuestion) private readonly triviaQuestionRepository: Repository<TriviaQuestion>
  ) {}

  async createQuestion(question: CreateTriviaQuestionDto): Promise<TriviaQuestion> {
    return this.triviaQuestionRepository.save(question);
  }

  async getQuestion(id): Promise<TriviaQuestion> {
    return this.triviaQuestionRepository.findOne({where:{id}});
  }

  // async updateQuestion(id, question: Question): Promise<Question> {
  //   return await this.questionModel.findByIdAndUpdate(id, question, {
  //     new: true,
  //   });
  // }

  // async deleteQuestion(id): Promise<any> {
  //   return await this.questionModel.findByIdAndRemove(id);
  // }

  // async playTrivia(category: string): Promise<any> {
  //   const filter = category !== undefined ? { category: category } : {}; //If category undefined, search all questions
  //   const questions = await this.triviaQuestionRepository.findBy(filter);
  //   const shuffle = (array: TriviaQuestion[]) => {
  //     return array.sort(() => Math.random() - 0.5);
  //   };
  //   const shuffledArray = shuffle(questions).slice(0, 3);
  //   const questionArray = shuffledArray.map((item) => {return {id : item.id, body : item.body}})
  //   return questionArray;
  // }


  //TODO: Chequear que ande bien esta funcion
  async playTrivia(universe: string, world: string): Promise<any> {
    const filter = {universe: universe, world: world}
    const questions = await this.triviaQuestionRepository.findBy(filter);
    const question = questions[(Math.floor(Math.random() * questions.length))]
    return {id : question.id, body : question.body, option1:question.option1, option2:question.option2,
      option3 : question.option3 ,option4 : question.option4}
  }

  async isCorrect(answer:string, id:string){
    const question:TriviaQuestion = await this.getQuestion(id);
    return {'is_correct' : question.answer === answer, 'answer': question.answer};
  }
}
