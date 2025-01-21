import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = 'Search...', onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('event target', event.target.value);

    setQuery(event.target.value);
    onSearch(query);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full p-3 text-gray-700 outline-none"
      />
      <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3">
        🔍
      </button>
    </>
  );
};

export default SearchBar;
