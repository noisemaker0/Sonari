import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ onSearch, placeholder = 'Search...' }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query.trim()) {
        onSearch(query);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, onSearch]);

  return (
    <Searchbar
      placeholder={placeholder}
      onChangeText={setQuery}
      value={query}
      style={{ margin: 16 }}
    />
  );
};

export default SearchBar;