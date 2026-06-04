'use client';

import { useState } from 'react';

function FlagImg({
  flag,
  code,
  size = 20,
  className,
}: {
  flag: string;
  code: string;
  size?: number;
  className?: string;
}) {
  const [err, setErr] = useState(false);
  const computedClassName =
    `rounded-full object-cover flex-shrink-0 ${className ?? ''}`.trim();

  if (err) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-500 text-xs font-bold shrink-0 ${className ?? ''}`.trim()}
        style={{ width: size, height: size, fontSize: size * 0.4 }}
      >
        {code.slice(0, 2)}
      </span>
    );
  }
  return (
    <img
      src={flag}
      alt={code}
      onError={() => setErr(true)}
      className={computedClassName}
      style={{ width: size, height: size }}
    />
  );
}

export default FlagImg;
