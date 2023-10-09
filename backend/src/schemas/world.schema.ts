import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Question } from './question.schema';

export type WorldDocument = World & Document;
@Schema()
export class World {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  index: number;

  @Prop({ type: Map, of: Map })
  completed: Map<string, Map<string, string>>;
}
export const WorldSchema = SchemaFactory.createForClass(World);
