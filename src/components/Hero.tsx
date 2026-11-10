import { useState, ChangeEvent, FormEvent } from 'react';

interface HeroProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

function Hero({ onSearch, isLoading }: HeroProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(inputValue);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Поиск фильмов..." 
          disabled={isLoading}
          style={{ 
            padding: '10px 15px', 
            borderRadius: '5px', 
            border: '1px solid #555', 
            background: '#222', 
            color: 'white', 
            width: '300px', 
            outline: 'none' 
          }}
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            padding: '10px 20px', 
            borderRadius: '5px', 
            border: 'none', 
            background: '#ffcc00', 
            color: '#000', 
            fontWeight: 'bold', 
            cursor: 'pointer' 
          }}
        >
          Искать
        </button>
      </form>
    </div>
  );
}

export default Hero;
