import { IsString, IsUUID, Length } from 'class-validator';

export class OtpValidationDto {
  @IsUUID()
  userId: string;

  @IsString()
  @Length(6, 6)
  otp: string;
}
