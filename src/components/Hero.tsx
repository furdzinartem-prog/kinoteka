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
    <div className="hero">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="Поиск фильмов..." 
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>Искать</button>
      </form>
    </div>
  );
}

export default Hero;
