import Redis from 'ioredis';

export const redisConfig = {
  host: process.env.REDIS_HOST,
  port: +(process.env.REDIS_PORT || 6379),
  password: process.env.REDIS_PASSWORD,
  username: process.env.REDIS_USERNAME || 'default',
  tls: {},
};

export const createRedisClient = () => {
  const client = new Redis(redisConfig);

  client.on('connect', () => {
    console.log('Redis connected ');
  });

  client.on('error', err => {
    console.error('Redis connection error ', err);
  });

  return client;
};
