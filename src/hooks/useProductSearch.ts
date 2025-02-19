"use client";

import { useState, useEffect } from "react";


export interface Product {
  productId: string;
  name: string;
  shortDescription: string;
  description: string;
}

const API_BASE_URL =
process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export default function useProductSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  

  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const controller = new AbortController();
    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/api/products/search?query=${encodeURIComponent(
            query.trim()
          )}`,
          { signal: controller.signal }
        );
        if (!res.ok) {
          if (res.status === 400) throw new Error("Invalid search term. Please enter at least 3 characters.");
          if (res.status === 404) throw new Error("No products found.");
          if (res.status === 500) throw new Error("Server error. Please try again later.");
          throw new Error(`Unexpected error: ${res.status}`);
        }

        const data: Product[] = await res.json();
        setSuggestions(data);
        setShowSuggestions(data.length > 0);
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          setError(err.message);
        }
      }
    };

    const debounceTimeout = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(debounceTimeout);
      controller.abort();
    };
  }, [query]);

  const searchProducts = async () => {
    if (query.trim().length < 3) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/api/products/search?query=${encodeURIComponent(
          query.trim()
        )}`
      );
      if (!res.ok) {
        if (res.status === 400) throw new Error("Invalid search term. Please enter at least 3 characters.");
        if (res.status === 404) throw new Error("No products found.");
        if (res.status === 500) throw new Error("Server error. Please try again later.");
        throw new Error(`Unexpected error: ${res.status}`);
      }

      const data: Product[] = await res.json();
      setResults(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    query,
    setQuery,
    suggestions,
    showSuggestions,
    setShowSuggestions,
    results,
    isLoading,
    error,
    searchProducts,
  };
}
