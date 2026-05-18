import { createHmac } from 'crypto';

export const sumsubSign = (
  method: string,
  url: string,
  body: string,
  secretKey: string,
): { digest: string; ts: string } => {
  const ts = Math.floor(Date.now() / 1000).toString();
  const data = ts + method.toUpperCase() + url + body;
  const digest = createHmac('sha256', secretKey).update(data).digest('hex');

  return { digest, ts };
};

export const sumsubRequest = async (
  method: string,
  path: string,
  body: object | null,
  appToken: string,
  secretKey: string,
) => {
  const bodyStr = body ? JSON.stringify(body) : '';
  const { digest, ts } = sumsubSign(method, path, bodyStr, secretKey);

  const response = await fetch(`${process.env.SUMSUB_BASE_URL}${path}`, {
    method,
    headers: {
      'X-App-Token': appToken,
      'X-App-Access-Sig': digest,
      'X-App-Access-Ts': ts,
      'Content-Type': 'application/json',
    },
    body: bodyStr || undefined,
  });

  return response.json();
};
