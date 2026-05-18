export interface LoginResult {
  success?: boolean;
  requiresOtp?: boolean;
  userId?: string;
  message: string;
  accessToken?: string;
  refreshToken?: string;
}
