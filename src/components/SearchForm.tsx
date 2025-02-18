"use client";

import { useEffect } from "react";
import useProductSearch from "../hooks/useProductSearch";
import SearchInput from "./SearchInput";
import SearchResults from "./SearchResults";

export default function SearchForm() {
  const {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    results,
    isLoading,
    error,
    searchProducts,
  } = useProductSearch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".search-input-container")) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setShowSuggestions]);

  return (
    <div className="search-container">
      <form onSubmit={(e) => e.preventDefault()} className="search-form">
        <SearchInput
          query={query}
          setQuery={setQuery}
          suggestions={suggestions}
          showSuggestions={showSuggestions}
          setShowSuggestions={setShowSuggestions}
        />
        <button
          type="button"
          className="search-button"
          onClick={searchProducts}
          disabled={query.trim().length < 3}
        >
          Search
        </button>
      </form>

      {isLoading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}
      {results.length > 0 && <SearchResults results={results} />}
    </div>
  );
}
