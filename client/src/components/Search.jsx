import React, { useState } from 'react';
import { debounce } from 'lodash'; // Import debounce function from lodash

const SearchComponent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Debounce the handleSearch function
  const debouncedSearch = debounce(handleSearch, 300);

  function handleSearch(query) {
    // Send search query to backend API
    fetch(`https://your-backend-api.com/search?q=${query}`)
      .then(response => response.json())
      .then(data => setSearchResults(data.results))
      .catch(error => console.error('Error searching:', error));
  }

  function handleChange(event) {
    const query = event.target.value;
    setSearchQuery(query);
    // Debounce the search function
    debouncedSearch(query);
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    debouncedSearch(searchQuery); // Trigger search function
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        className="bg-gray-100 mr-2 px-4 py-2 rounded-full outline-none"
        value={searchQuery}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-[#1C6E8C] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Search
      </button>
      <ul>
        {searchResults.map(result => (
          <li key={result.id}>{result.title}</li>
        ))}
      </ul>
    </form>
  );
};

export default SearchComponent;
