import { IsUUID, IsIn } from 'class-validator';

export class SendOtpDto {
  @IsUUID()
  userId: string;

  @IsIn(['email', 'phone'])
  channel: 'email' | 'phone';
}
