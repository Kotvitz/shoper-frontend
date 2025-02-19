"use client";

import { Product } from "../hooks/useProductSearch";


export default function SearchResults({ results, error = "" }:{ results: Product[]; error?: string }) {
  return (
    <ul className="results-list">
      {error && <p className="error-text">{error}</p>}
      {results.length === 0 && !error && <p className="loading-text">No products found.</p>}
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
