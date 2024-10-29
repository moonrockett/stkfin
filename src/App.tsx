import React, { useState, useEffect } from 'react';
import Calculator from './components/Calculator';
import Deposit from './components/Deposit';
import { theme } from './theme';

function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'deposit'>('calculator');

  // Apply theme on mount
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-accent-hover', theme.colors.accentHover);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--border-radius', theme.borderRadius);
    root.style.setProperty('--border-width', theme.borderWidth);
    root.style.setProperty('--shadow-offset', theme.shadowOffset);
    root.style.setProperty('--shadow-color', theme.shadowColor);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-background)] text-black p-4">
      <div className="max-w-md mx-auto">
        {/* Tab Navigation */}
        <div className="brutalist-border bg-white p-1 flex gap-1">
          <button
            className={`flex-1 py-2 text-center rounded-[var(--border-radius)] transition-colors ${
              activeTab === 'calculator'
                ? 'accent-button text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('calculator')}
          >
            Calculator
          </button>
          <button
            className={`flex-1 py-2 text-center rounded-[var(--border-radius)] transition-colors ${
              activeTab === 'deposit'
                ? 'accent-button text-white'
                : 'bg-white text-black hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('deposit')}
          >
            Deposit
          </button>
        </div>

        {/* Content */}
        <div className="brutalist-border bg-white p-4 mt-8">
          {activeTab === 'calculator' ? <Calculator /> : <Deposit />}
        </div>
      </div>
    </div>
  );
}

export default App;