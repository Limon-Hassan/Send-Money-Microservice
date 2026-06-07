import { CURRENCIES, Currency } from '@/lib/currencies';
import { useState, useEffect } from 'react';

interface Rates {
  [key: string]: number;
}

export const useCurrencyConverter = () => {
  const [rates, setRates] = useState<Rates>({});
  const [recipientAmount, setRecipientAmount] = useState('');
  const [lastEdited, setLastEdited] = useState<'send' | 'receive'>('send');

  const [fromCurrency, setFromCurrency] = useState<Currency>(
    CURRENCIES.find(c => c.code === 'USD')!,
  );
  const [toCurrency, setToCurrency] = useState<Currency>(
    CURRENCIES.find(c => c.code === 'EUR')!,
  );
  const [amount, setAmount] = useState('1000');
  const [lastUpdated, setLastUpdated] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/rates?base=${fromCurrency.code}`);
        const data = await res.json();
        let lenght = Object.keys(data.rates).length;
        setRates(data.rates);
        setLastUpdated(data.lastUpdated);
      } catch (err) {
        console.error('Failed to fetch rates:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [fromCurrency.code]);

  const exchangeRate = rates[toCurrency.code] || 0;

  useEffect(() => {
    if (!exchangeRate) return;

    if (lastEdited === 'send') {
      setRecipientAmount((parseFloat(amount || '0') * exchangeRate).toFixed(2));
    } else {
      setAmount((parseFloat(recipientAmount || '0') / exchangeRate).toFixed(2));
    }
  }, [amount, recipientAmount, exchangeRate, lastEdited]);

  const handleSendAmountChange = (value: string) => {
    setLastEdited('send');
    setAmount(value);
  };

  const handleRecipientAmountChange = (value: string) => {
    setLastEdited('receive');
    setRecipientAmount(value);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return {
    currencies: CURRENCIES,
    rates,
    fromCurrency,
    toCurrency,

    amount,
    recipientAmount,

    exchangeRate,
    lastUpdated,
    loading,

    setFromCurrency,
    setToCurrency,

    handleSendAmountChange,
    handleRecipientAmountChange,

    swapCurrencies,
  };
};

export default useCurrencyConverter;
