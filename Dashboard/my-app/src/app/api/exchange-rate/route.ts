import { NextResponse } from 'next/server';
export const runtime = 'edge';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const base = searchParams.get('base') || 'USD';
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/${base}`,
      { cache: 'no-store' },
    );

    if (!res.ok) throw new Error('API fetch failed');

    const data = await res.json();
    console.log('Fetched rates:', data);
    return NextResponse.json({
      base: data.base_code,
      lastUpdated: data.time_last_update_utc,
      rates: data.conversion_rates,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch rates' },
      { status: 500 },
    );
  }
}
