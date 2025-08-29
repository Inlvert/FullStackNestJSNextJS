import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type refreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop({ require: true })
  token: string;

  @Prop({
    type: Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: Types.ObjectId;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
