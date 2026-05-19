export interface OtpJobPayload {
  userId: string;
  email?: string;
  phone?: string;
  otp: string;
}
