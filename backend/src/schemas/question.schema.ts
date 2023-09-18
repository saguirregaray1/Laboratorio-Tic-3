import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type QuestionDocument = Question & Document;
@Schema()
export class Question {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  body: string;

  @Prop({
    required: true,
    trim: true,
  })
  answer: string;

  @Prop({
    required: true,
    trim: true,
  })
  type: string;
  @Prop({
    required: true,
    trim: true,
  })
  category: string;
}
export const QuestionSchema = SchemaFactory.createForClass(Question);
