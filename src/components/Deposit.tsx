import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const WALLET_ADDRESS = '0x69e1B715Df2FEceD0391DE93220040A085230Cb6';

function Deposit() {
  const [copied, setCopied] = useState(false);

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(WALLET_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">DEPOSIT BNB</h2>

      <div className="space-y-3">
        <p>Send your BNB to the following address and send a screenshot the transaction to the telegram bot admin:</p>
        <div className="brutalist-border bg-white p-2 break-all font-mono text-sm">
          {WALLET_ADDRESS}
        </div>
        <button
          onClick={copyAddress}
          className="w-full accent-button text-white p-3 flex items-center justify-center gap-2 brutalist-border hover:bg-[var(--color-accent-hover)]"
        >
          <Copy size={20} />
          {copied ? 'Copied!' : 'Copy Address'}
        </button>
      </div>

      <div className="brutalist-border bg-white p-4 mt-6">
        <h3 className="font-bold mb-2">Minimum stake: 0.01 BNB</h3>
        <div className="space-y-2 text-sm">
          <p>Monthly rates:</p>
          <ul className="list-disc pl-4">
            <li>0.01 - 1 BNB: 20% Monthly</li>
            <li>1 - 5 BNB: 30% Monthly</li>
            <li>&gt; 5 BNB: 40% Monthly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
