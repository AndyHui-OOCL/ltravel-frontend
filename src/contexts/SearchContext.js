import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDays, setSelectedDays] = useState(null);

  const updateSearch = (city, days) => {
    setSelectedCity(city);
    setSelectedDays(days);
  };

  const clearSearch = () => {
    setSelectedCity('');
    setSelectedDays(null);
  };

  return (
    <SearchContext.Provider
      value={{
        selectedCity,
        selectedDays,
        setSelectedCity,
        setSelectedDays,
        updateSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
