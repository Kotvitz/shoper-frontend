"use client";

import { Product } from "../hooks/useProductSearch";

interface SearchInputProps {
  query: string;
  setQuery: (value: string) => void;
  suggestions: Product[];
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
}

export default function SearchInput({
  query,
  setQuery,
  suggestions,
  showSuggestions,
  setShowSuggestions,
}: SearchInputProps) {
  return (
    <div className="search-input-container">
      <input
        type="text"
        placeholder="Type at least 3 characters..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        className="search-input"
      />

      {showSuggestions && suggestions.length > 0 && (
        <ul className="autocomplete-list">
          {suggestions.map((product) => (
            <li
              key={product.productId}
              onClick={() => {
                setQuery(product.name);
                setShowSuggestions(false);
              }}
              className="autocomplete-item"
            >
              {product.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
