import { IsString, IsUUID, Length } from 'class-validator';

export class OtpVerifyDto {
  @IsUUID()
  userId: string;

  @IsString()
  @Length(6, 6)
  otp: string;
}
