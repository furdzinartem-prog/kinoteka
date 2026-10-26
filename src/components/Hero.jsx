import React, { useState } from 'react';

function Hero({ onSearch, isLoading }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoading) { 
      onSearch(inputValue);
    }
  };

  return (
    <section className="hero">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Поиск по Кинопоиску..." 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} style={{ opacity: isLoading ? 0.5 : 1 }}>
          {isLoading ? '⏳' : 'Поиск'}
        </button>
      </form>
    </section>
  );
}

export default Hero;
