export interface PhoneValidationResult {
  isValid: boolean;
  formatted: string | null;
  countryCode: string | null;
  errorMessage: string | null;
}

interface CountryPhoneRule {
  countryCode: string;
  dialCode: string;
  iso: string;
  name: string;
  minDigits: number;
  maxDigits: number;
  pattern: RegExp;
}

const COUNTRY_PHONE_RULES: CountryPhoneRule[] = [
  // ── South Asia ──────────────────────────────────────────────
  {
    countryCode: '+880',
    dialCode: '880',
    iso: 'BD',
    name: 'Bangladesh',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+880[13-9]\d{8}$/,
  },
  {
    countryCode: '+91',
    dialCode: '91',
    iso: 'IN',
    name: 'India',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+91[6-9]\d{9}$/,
  },
  {
    countryCode: '+92',
    dialCode: '92',
    iso: 'PK',
    name: 'Pakistan',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+92[3]\d{9}$/,
  },
  {
    countryCode: '+94',
    dialCode: '94',
    iso: 'LK',
    name: 'Sri Lanka',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+94[7]\d{8}$/,
  },
  {
    countryCode: '+977',
    dialCode: '977',
    iso: 'NP',
    name: 'Nepal',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+977[9]\d{9}$/,
  },
  {
    countryCode: '+975',
    dialCode: '975',
    iso: 'BT',
    name: 'Bhutan',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+975[17]\d{7}$/,
  },
  {
    countryCode: '+960',
    dialCode: '960',
    iso: 'MV',
    name: 'Maldives',
    minDigits: 7,
    maxDigits: 7,
    pattern: /^\+960[9789]\d{6}$/,
  },
  {
    countryCode: '+93',
    dialCode: '93',
    iso: 'AF',
    name: 'Afghanistan',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+93[7]\d{8}$/,
  },

  // ── South East Asia ──────────────────────────────────────────
  {
    countryCode: '+66',
    dialCode: '66',
    iso: 'TH',
    name: 'Thailand',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+66[689]\d{8}$/,
  },
  {
    countryCode: '+60',
    dialCode: '60',
    iso: 'MY',
    name: 'Malaysia',
    minDigits: 9,
    maxDigits: 10,
    pattern: /^\+60[1]\d{8,9}$/,
  },
  {
    countryCode: '+65',
    dialCode: '65',
    iso: 'SG',
    name: 'Singapore',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+65[689]\d{7}$/,
  },
  {
    countryCode: '+62',
    dialCode: '62',
    iso: 'ID',
    name: 'Indonesia',
    minDigits: 9,
    maxDigits: 12,
    pattern: /^\+62[8]\d{8,11}$/,
  },
  {
    countryCode: '+63',
    dialCode: '63',
    iso: 'PH',
    name: 'Philippines',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+63[9]\d{9}$/,
  },
  {
    countryCode: '+84',
    dialCode: '84',
    iso: 'VN',
    name: 'Vietnam',
    minDigits: 9,
    maxDigits: 10,
    pattern: /^\+84[3-9]\d{8,9}$/,
  },
  {
    countryCode: '+95',
    dialCode: '95',
    iso: 'MM',
    name: 'Myanmar',
    minDigits: 8,
    maxDigits: 10,
    pattern: /^\+95[9]\d{7,9}$/,
  },
  {
    countryCode: '+855',
    dialCode: '855',
    iso: 'KH',
    name: 'Cambodia',
    minDigits: 8,
    maxDigits: 9,
    pattern: /^\+855[1-9]\d{7,8}$/,
  },
  {
    countryCode: '+856',
    dialCode: '856',
    iso: 'LA',
    name: 'Laos',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+856[2]\d{8}$/,
  },

  // ── East Asia ────────────────────────────────────────────────
  {
    countryCode: '+86',
    dialCode: '86',
    iso: 'CN',
    name: 'China',
    minDigits: 11,
    maxDigits: 11,
    pattern: /^\+86[1][3-9]\d{9}$/,
  },
  {
    countryCode: '+81',
    dialCode: '81',
    iso: 'JP',
    name: 'Japan',
    minDigits: 10,
    maxDigits: 11,
    pattern: /^\+81[7-9]0\d{8}$/,
  },
  {
    countryCode: '+82',
    dialCode: '82',
    iso: 'KR',
    name: 'South Korea',
    minDigits: 10,
    maxDigits: 11,
    pattern: /^\+82[1][0-9]\d{7,8}$/,
  },
  {
    countryCode: '+852',
    dialCode: '852',
    iso: 'HK',
    name: 'Hong Kong',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+852[5-9]\d{7}$/,
  },
  {
    countryCode: '+886',
    dialCode: '886',
    iso: 'TW',
    name: 'Taiwan',
    minDigits: 9,
    maxDigits: 10,
    pattern: /^\+886[9]\d{8}$/,
  },

  // ── Middle East ──────────────────────────────────────────────
  {
    countryCode: '+971',
    dialCode: '971',
    iso: 'AE',
    name: 'UAE',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+971[5][0-9]\d{7}$/,
  },
  {
    countryCode: '+966',
    dialCode: '966',
    iso: 'SA',
    name: 'Saudi Arabia',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+966[5]\d{8}$/,
  },
  {
    countryCode: '+974',
    dialCode: '974',
    iso: 'QA',
    name: 'Qatar',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+974[3-7]\d{7}$/,
  },
  {
    countryCode: '+973',
    dialCode: '973',
    iso: 'BH',
    name: 'Bahrain',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+973[3-6]\d{7}$/,
  },
  {
    countryCode: '+968',
    dialCode: '968',
    iso: 'OM',
    name: 'Oman',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+968[7-9]\d{7}$/,
  },
  {
    countryCode: '+965',
    dialCode: '965',
    iso: 'KW',
    name: 'Kuwait',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+965[5-9]\d{7}$/,
  },
  {
    countryCode: '+972',
    dialCode: '972',
    iso: 'IL',
    name: 'Israel',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+972[5]\d{8}$/,
  },
  {
    countryCode: '+90',
    dialCode: '90',
    iso: 'TR',
    name: 'Turkey',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+90[5]\d{9}$/,
  },
  {
    countryCode: '+98',
    dialCode: '98',
    iso: 'IR',
    name: 'Iran',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+98[9]\d{9}$/,
  },
  {
    countryCode: '+964',
    dialCode: '964',
    iso: 'IQ',
    name: 'Iraq',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+964[7]\d{9}$/,
  },

  // ── Europe ───────────────────────────────────────────────────
  {
    countryCode: '+44',
    dialCode: '44',
    iso: 'GB',
    name: 'United Kingdom',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+44[7]\d{9}$/,
  },
  {
    countryCode: '+49',
    dialCode: '49',
    iso: 'DE',
    name: 'Germany',
    minDigits: 10,
    maxDigits: 11,
    pattern: /^\+49[1][5-7]\d{9,10}$/,
  },
  {
    countryCode: '+33',
    dialCode: '33',
    iso: 'FR',
    name: 'France',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+33[6-7]\d{8}$/,
  },
  {
    countryCode: '+39',
    dialCode: '39',
    iso: 'IT',
    name: 'Italy',
    minDigits: 9,
    maxDigits: 10,
    pattern: /^\+39[3]\d{8,9}$/,
  },
  {
    countryCode: '+34',
    dialCode: '34',
    iso: 'ES',
    name: 'Spain',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+34[6-7]\d{8}$/,
  },
  {
    countryCode: '+31',
    dialCode: '31',
    iso: 'NL',
    name: 'Netherlands',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+31[6]\d{8}$/,
  },
  {
    countryCode: '+32',
    dialCode: '32',
    iso: 'BE',
    name: 'Belgium',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+32[4]\d{8}$/,
  },
  {
    countryCode: '+41',
    dialCode: '41',
    iso: 'CH',
    name: 'Switzerland',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+41[7][5-9]\d{7}$/,
  },
  {
    countryCode: '+43',
    dialCode: '43',
    iso: 'AT',
    name: 'Austria',
    minDigits: 10,
    maxDigits: 11,
    pattern: /^\+43[6][5-9]\d{8,9}$/,
  },
  {
    countryCode: '+46',
    dialCode: '46',
    iso: 'SE',
    name: 'Sweden',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+46[7][0-9]\d{7}$/,
  },
  {
    countryCode: '+47',
    dialCode: '47',
    iso: 'NO',
    name: 'Norway',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+47[4-9]\d{7}$/,
  },
  {
    countryCode: '+45',
    dialCode: '45',
    iso: 'DK',
    name: 'Denmark',
    minDigits: 8,
    maxDigits: 8,
    pattern: /^\+45[2-9]\d{7}$/,
  },
  {
    countryCode: '+358',
    dialCode: '358',
    iso: 'FI',
    name: 'Finland',
    minDigits: 9,
    maxDigits: 10,
    pattern: /^\+358[4-5]\d{8,9}$/,
  },
  {
    countryCode: '+48',
    dialCode: '48',
    iso: 'PL',
    name: 'Poland',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+48[4-9]\d{8}$/,
  },
  {
    countryCode: '+7',
    dialCode: '7',
    iso: 'RU',
    name: 'Russia',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+7[9]\d{9}$/,
  },
  {
    countryCode: '+380',
    dialCode: '380',
    iso: 'UA',
    name: 'Ukraine',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+380[6-9]\d{8}$/,
  },
  {
    countryCode: '+30',
    dialCode: '30',
    iso: 'GR',
    name: 'Greece',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+30[6-9]\d{9}$/,
  },
  {
    countryCode: '+351',
    dialCode: '351',
    iso: 'PT',
    name: 'Portugal',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+351[9]\d{8}$/,
  },
  {
    countryCode: '+36',
    dialCode: '36',
    iso: 'HU',
    name: 'Hungary',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+36[2-7]\d{8}$/,
  },
  {
    countryCode: '+420',
    dialCode: '420',
    iso: 'CZ',
    name: 'Czech Republic',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+420[6-7]\d{8}$/,
  },
  {
    countryCode: '+40',
    dialCode: '40',
    iso: 'RO',
    name: 'Romania',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+40[7]\d{8}$/,
  },

  // ── Americas ─────────────────────────────────────────────────
  {
    countryCode: '+1',
    dialCode: '1',
    iso: 'US',
    name: 'USA / Canada',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+1[2-9]\d{9}$/,
  },
  {
    countryCode: '+55',
    dialCode: '55',
    iso: 'BR',
    name: 'Brazil',
    minDigits: 11,
    maxDigits: 11,
    pattern: /^\+55[1-9][9]\d{9}$/,
  },
  {
    countryCode: '+52',
    dialCode: '52',
    iso: 'MX',
    name: 'Mexico',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+52[1-9]\d{9}$/,
  },
  {
    countryCode: '+54',
    dialCode: '54',
    iso: 'AR',
    name: 'Argentina',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+54[9]\d{9}$/,
  },
  {
    countryCode: '+57',
    dialCode: '57',
    iso: 'CO',
    name: 'Colombia',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+57[3]\d{9}$/,
  },
  {
    countryCode: '+56',
    dialCode: '56',
    iso: 'CL',
    name: 'Chile',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+56[9]\d{8}$/,
  },
  {
    countryCode: '+51',
    dialCode: '51',
    iso: 'PE',
    name: 'Peru',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+51[9]\d{8}$/,
  },

  // ── Africa ───────────────────────────────────────────────────
  {
    countryCode: '+27',
    dialCode: '27',
    iso: 'ZA',
    name: 'South Africa',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+27[6-8]\d{8}$/,
  },
  {
    countryCode: '+234',
    dialCode: '234',
    iso: 'NG',
    name: 'Nigeria',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+234[7-9][0-1]\d{8}$/,
  },
  {
    countryCode: '+254',
    dialCode: '254',
    iso: 'KE',
    name: 'Kenya',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+254[7]\d{8}$/,
  },
  {
    countryCode: '+20',
    dialCode: '20',
    iso: 'EG',
    name: 'Egypt',
    minDigits: 10,
    maxDigits: 10,
    pattern: /^\+20[1][0-2,5]\d{8}$/,
  },
  {
    countryCode: '+212',
    dialCode: '212',
    iso: 'MA',
    name: 'Morocco',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+212[6-7]\d{8}$/,
  },
  {
    countryCode: '+233',
    dialCode: '233',
    iso: 'GH',
    name: 'Ghana',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+233[2-5]\d{8}$/,
  },
  {
    countryCode: '+251',
    dialCode: '251',
    iso: 'ET',
    name: 'Ethiopia',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+251[9]\d{8}$/,
  },
  {
    countryCode: '+255',
    dialCode: '255',
    iso: 'TZ',
    name: 'Tanzania',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+255[6-7]\d{8}$/,
  },

  // ── Oceania ──────────────────────────────────────────────────
  {
    countryCode: '+61',
    dialCode: '61',
    iso: 'AU',
    name: 'Australia',
    minDigits: 9,
    maxDigits: 9,
    pattern: /^\+61[4]\d{8}$/,
  },
  {
    countryCode: '+64',
    dialCode: '64',
    iso: 'NZ',
    name: 'New Zealand',
    minDigits: 8,
    maxDigits: 9,
    pattern: /^\+64[2]\d{7,8}$/,
  },
];

function sanitizeNumber(phone: string): string {
  return phone.replace(/[\s\-().]/g, '');
} 
function normalizeToE164(phone: string, defaultDialCode?: string): string {
  let cleaned = sanitizeNumber(phone);

  // Case 1 – already has `+`
  if (cleaned.startsWith('+')) {
    // If a dialCode was also provided and the number ALREADY contains it,
    // keep it exactly as-is to avoid double-prepending.
    return cleaned;
  }

  // Case 2 – international prefix `00`
  if (cleaned.startsWith('00')) {
    return '+' + cleaned.slice(2);
  }

  // Case 3 – local number + dropdown dialCode
  if (defaultDialCode) {
    const dialCode = defaultDialCode.replace(/^\+/, ''); // e.g. "880"

    // 3a – user accidentally typed the dial code again as digits
    //      e.g. cleaned = "8801887604100", dialCode = "880"
    if (cleaned.startsWith(dialCode)) {
      cleaned = cleaned.slice(dialCode.length);
    }

    // 3b – strip single leading trunk zero  e.g. "01887604100" → "1887604100"
    if (cleaned.startsWith('0')) {
      cleaned = cleaned.slice(1);
    }

    return '+' + dialCode + cleaned;
  }

  return cleaned;
}


export function validatePhoneNumber(
  phone: string,
  defaultDialCode?: string,
): PhoneValidationResult {
  if (!phone || phone.trim() === '') {
    return {
      isValid: false,
      formatted: null,
      countryCode: null,
      errorMessage: 'Phone number is required.',
    };
  }

  const normalized = normalizeToE164(phone.trim(), defaultDialCode);

  const sortedRules = [...COUNTRY_PHONE_RULES].sort(
    (a, b) => b.dialCode.length - a.dialCode.length,
  );

  const rule = sortedRules.find(r => normalized.startsWith(r.countryCode));

  if (!rule) {
    return {
      isValid: false,
      formatted: null,
      countryCode: null,
      errorMessage:
        'Unsupported country code. Please include your country dial code (e.g. +880).',
    };
  }

  if (!rule.pattern.test(normalized)) {
    const digitInfo =
      rule.minDigits === rule.maxDigits
        ? `${rule.minDigits} digits`
        : `${rule.minDigits}–${rule.maxDigits} digits`;

    return {
      isValid: false,
      formatted: null,
      countryCode: rule.countryCode,
      errorMessage: `Invalid ${rule.name} phone number. Expected ${digitInfo} after ${rule.countryCode}.`,
    };
  }

  return {
    isValid: true,
    formatted: normalized, 
    countryCode: rule.countryCode,
    errorMessage: null,
  };
}

export function getSupportedCountries(): {
  iso: string;
  name: string;
  dialCode: string;
}[] {
  return COUNTRY_PHONE_RULES.map(({ iso, name, countryCode }) => ({
    iso,
    name,
    dialCode: countryCode,
  }));
}
