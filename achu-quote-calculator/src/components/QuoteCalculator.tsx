import React, { useState } from 'react';

const QuoteCalculator = () => {
  const [amount, setAmount] = useState('');
  const [quote, setQuote] = useState(null);

  const calculateQuote = () => {
    // Placeholder logic for quote calculation
    const calculatedQuote = parseFloat(amount) * 1.2; // Example calculation
    setQuote(calculatedQuote);
  };

  return (
    <div>
      <h1>Quote Calculator</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={calculateQuote}>Calculate Quote</button>
      {quote !== null && <p>Your quote is: ${quote.toFixed(2)}</p>}
    </div>
  );
};

export default QuoteCalculator;