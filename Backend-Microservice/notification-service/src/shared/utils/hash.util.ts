import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';

export const hashPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

export const sha256 = (value: string): string => {
  return createHash('sha256').update(value).digest('hex');
};

export const hashDevice = (device: { ip: string; ua: string }): string => {
  const ipSubnet = device.ip.split('.').slice(0, 3).join('.');
  return sha256(`${ipSubnet}|${device.ua}`).slice(0, 16);
};

export const hashRefreshToken = (token: string): string => {
  return sha256(token);
};
