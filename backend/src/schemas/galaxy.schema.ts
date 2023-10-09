import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { World } from './world.schema';

export type GalaxyDocument = Galaxy & Document;
@Schema()
export class Galaxy {
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

  @Prop({
    type: [{ type: Types.ObjectId, ref: 'Worlds' }],
  })
  type: World[];
}
export const GalaxySchema = SchemaFactory.createForClass(Galaxy);
