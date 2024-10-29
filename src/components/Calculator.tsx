import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PRESET_AMOUNTS = [0.05, 0.1, 0.5, 1, 5, 10];
const BNB_TO_USD = 500;

function Calculator() {
  const [amount, setAmount] = useState<number>(1);
  const [selectedCurrency, setSelectedCurrency] = useState<'BNB' | 'USD'>('BNB');

  const chartData = useMemo(() => {
    const data = [];
    const monthlyRate = 0.20; // 20% monthly return
    let currentAmount = amount;

    for (let month = 0; month <= 12; month++) {
      data.push({
        month: `Month ${month}`,
        amount: selectedCurrency === 'USD' ? currentAmount * BNB_TO_USD : currentAmount,
      });
      currentAmount *= (1 + monthlyRate);
    }
    return data;
  }, [amount, selectedCurrency]);

  const expectedReturns = useMemo(() => [
    { period: '1 Month', amount: amount * 1.2 },
    { period: '3 Months', amount: amount * 1.2 * 1.2 * 1.2 },
    { period: '6 Months', amount: amount * Math.pow(1.2, 6) },
    { period: '12 Months', amount: amount * Math.pow(1.2, 12) },
  ], [amount]);

  const formatAmount = (value: number) => {
    if (selectedCurrency === 'USD') {
      return `$${(value * BNB_TO_USD).toFixed(2)}`;
    }
    return `${value.toFixed(3)} BNB`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold mb-4">BNB STAKING CALCULATOR</h2>

      <div className="mb-4">
        <p className="mb-2">Select Initial Investment (BNB)</p>
        <div className="grid grid-cols-3 gap-3">
          {PRESET_AMOUNTS.map((preset) => (
            <button
              key={preset}
              onClick={() => setAmount(preset)}
              className={`brutalist-border p-2 hover:bg-gray-50 ${
                amount === preset 
                  ? 'accent-button text-white hover:bg-[var(--color-accent-hover)]' 
                  : 'bg-white text-black'
              }`}
            >
              {preset} BNB
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setSelectedCurrency('BNB')}
          className={`flex-1 p-2 brutalist-border ${
            selectedCurrency === 'BNB' ? 'accent-button text-white' : 'bg-white'
          }`}
        >
          BNB
        </button>
        <button
          onClick={() => setSelectedCurrency('USD')}
          className={`flex-1 p-2 brutalist-border ${
            selectedCurrency === 'USD' ? 'accent-button text-white' : 'bg-white'
          }`}
        >
          USD
        </button>
      </div>

      <div className="space-y-3">
        <h3 className="font-bold">Expected Returns</h3>
        {expectedReturns.map(({ period, amount: returnAmount }) => (
          <div
            key={period}
            className="brutalist-border bg-white p-2"
          >
            {period}: {formatAmount(returnAmount)}
          </div>
        ))}
      </div>

      <div className="h-64 brutalist-border bg-white p-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis 
              tickFormatter={(value) => 
                selectedCurrency === 'USD' 
                  ? `$${value.toFixed(0)}` 
                  : value.toFixed(2)
              }
            />
            <Tooltip 
              formatter={(value: number) => [
                selectedCurrency === 'USD' 
                  ? `$${value.toFixed(2)}` 
                  : `${value.toFixed(3)} BNB`,
                'Amount'
              ]}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--color-accent)"
              fill="#fee2e2"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Calculator;