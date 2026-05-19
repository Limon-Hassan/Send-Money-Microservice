import { UAParser } from 'ua-parser-js';
import * as geoip from 'geoip-lite';

export interface ParsedDevice {
  browser: string;
  os: string;
  deviceName: string;
  country: string;
  city: string;
}

export const parseDevice = (ip: string, ua: string): ParsedDevice => {
  const parser = new UAParser(ua);
  const result = parser.getResult();

  const browser =
    [result.browser.name, result.browser.version].filter(Boolean).join(' ') ||
    'Unknown Browser';

  const os =
    [result.os.name, result.os.version].filter(Boolean).join(' ') ||
    'Unknown OS';

  const deviceName = result.device.type
    ? `${result.device.type} ${result.device.vendor || ''}`.trim()
    : 'Desktop';

  const geo = geoip.lookup(ip);
  const country = geo?.country || 'Unknown';
  const city = geo?.city || 'Unknown';

  return { browser, os, deviceName, country, city };
};
