import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchText, setSearchText, placeholder = "Search AI Tools..." }) => {
  return (
    <div className="w-full max-w-xl mx-auto my-6 relative">
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder={placeholder}
        className="w-full px-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-gray-700"
      />
      <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
};

export default SearchBar;
