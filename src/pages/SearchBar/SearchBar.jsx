// src/components/SearchBar.jsx
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query); // Отправляем запрос в родительский компонент
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={query} 
        onChange={handleChange} 
        placeholder="Поиск по названию фильма..." 
      />
      <button onClick={handleSearch}>Поиск</button>
    </div>
  );
};

export default SearchBar;
