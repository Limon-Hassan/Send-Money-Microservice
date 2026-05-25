import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ForgotPasswordRequestDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ForgotPasswordVerifyOtpDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  resetToken: string; 

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  newPassword: string;
}
