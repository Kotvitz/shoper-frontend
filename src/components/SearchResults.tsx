"use client";

import { Product } from "../hooks/useProductSearch";

interface SearchResultsProps {
  results: Product[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <ul className="results-list">
      {results.map((product) => (
        <div key={product.productId} className="product-card">
          <h3 className="product-name">{product.name}</h3>
          <div
            className="product-short-desc"
            dangerouslySetInnerHTML={{ __html: product.shortDescription }}
          />
          <div
            className="product-desc"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      ))}
    </ul>
  );
}
