import React, { useState } from 'react';

function Hero({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <section className="hero">
      <svg className="tv-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 40 C20 30, 80 30, 80 40 L85 80 L15 80 Z" stroke="#ffffff" strokeWidth="6" fill="#f4f4f4"/>
        <path d="M50 35 L30 15 M50 35 L70 15" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
        <circle cx="30" cy="15" r="3" fill="#ffffff"/>
        <circle cx="70" cy="15" r="3" fill="#ffffff"/>
        <path d="M42 50 L62 60 L42 70 Z" stroke="#e50914" strokeWidth="4" fill="none" strokeLinejoin="round"/>
        <line x1="10" y1="85" x2="90" y2="85" stroke="#ffffff" strokeWidth="6" strokeLinecap="round"/>
      </svg>
      
      <h1>kino.teka <span>by Furdz</span></h1>
      
      <form className="search-bar" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="поиск" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0b0c10" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </form>
    </section>
  );
}

export default Hero;
