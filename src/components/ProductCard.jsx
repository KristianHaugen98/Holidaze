import React from "react";

import { Link } from "react-router-dom";

// ProductCard component to display individual product details in a card format
function ProductCard({ product }) {
  const imageUrl = product.media?.[0]?.url || "https://placeholder.com";
  const imageAlt = product.media?.[0]?.alt || product.name;

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="relative h-48 w-full">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-col flex-grow p-4">
        <h2 className="mb-2 text-xl font-bold text-gray-800 line-clamp-1">
          {product.name}
        </h2>
        <p className="flex-grow mb-4 text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4 text-sm font-medium">
          <span className="text-gray-900">
            <span className="font-bold">{product.price}</span> kr / Night
          </span>
          <span className="flex items-center text-yellow-500">
            ⭐ {product.rating}
          </span>
        </div>

        {/* Link to product details */}
        <Link
          to={`/venue/${product.id}`}
          className="w-full py-2 text-center text-sm font-semibold text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700"
        >
          See Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
