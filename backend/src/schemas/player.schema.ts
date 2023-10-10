import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from './user.schema';

export type PlayerDocument = Player & Document;
@Schema()
export class Player {
  @Prop({
    unique: true,
    required: true,
    type: [{ type: Types.ObjectId, ref: 'User' }],
  })
  userId: string;

  @Prop({})
  completed: string;
}
export const PlayerSchema = SchemaFactory.createForClass(Player);
