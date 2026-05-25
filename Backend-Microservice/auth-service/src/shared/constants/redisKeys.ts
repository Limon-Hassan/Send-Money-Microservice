export const redisKeys = {
  otp: (key: string) => `otp:${key}`,
  session: (userId: string) => `session:${userId}`,
  device: (userId: string, fingerprint: string) =>
    `device:${userId}:${fingerprint}`,
  resetToken: (userId: string) => `reset_token:${userId}`,
};
