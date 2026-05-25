export function maskEmail(email: string): string {
  const [local, domain] = email.split('@');

  const visibleChars = Math.min(2, local.length);
  const masked = local.slice(0, visibleChars) + '******';

  return `${masked}@${domain}`;
}

// Example:
// rahimuddin@gmail.com  → "ra******@gmail.com"

