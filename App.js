import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [loading, setLoading] = useState(false);

  document.title = "YOUR_ROLL_NUMBER";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = JSON.parse(input);
      const res = await fetch('YOUR_API_URL/bfhl', { // Replace with your API URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await res.json();
      setResponse(result);
      setError('');
    } catch (err) {
      setError('Invalid JSON input or Network error');
    } finally {
      setLoading(false);
    }
  };

  const getFilteredResponse = () => {
    if (!response || !selectedFilters.length) return null;
    return Object.fromEntries(
      selectedFilters.map(key => [key, response[key]])
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='{"data": ["A","1","B","2"]}'
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {response && (
        <div>
          <div className="mb-4">
            {['numbers', 'alphabets', 'highest_alphabet'].map(filter => (
              <button
                key={filter}
                onClick={() => setSelectedFilters(prev => 
                  prev.includes(filter) 
                    ? prev.filter(f => f !== filter)
                    : [...prev, filter]
                )}
                className={`mr-2 p-2 rounded ${
                  selectedFilters.includes(filter) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {getFilteredResponse() && (
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(getFilteredResponse(), null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
