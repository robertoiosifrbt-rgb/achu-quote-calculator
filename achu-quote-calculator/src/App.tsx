import React from 'react';
import QuoteCalculator from './components/QuoteCalculator';
import './styles/index.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Quote Calculator</h1>
      <QuoteCalculator />
    </div>
  );
};

export default App;