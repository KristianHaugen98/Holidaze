import { Link } from "react-router-dom";

function ProductCard({ product }) {
<<<<<<< Updated upstream
=======
  console.log("This card got:", product);
>>>>>>> Stashed changes
  // Handling missing media data with optional chaining and fallback values
  const imageUrl = product.media?.[0]?.url || "https://via.placeholder.com";
  const imageAlt = product.media?.[0]?.alt || product.name;
  // Main render of the product card, using Tailwind CSS for styling
  return (
    <div className="flex flex-col h-full overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      {/* Image-holder */}
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
        {/* Description */}
        <p className="flex-grow mb-4 text-sm text-gray-600">
          {product.description?.substring(0, 100)}...
        </p>

        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4 text-sm font-medium">
          <span className="text-gray-900">
            <span className="font-bold">{product.price}</span> kr / natt
          </span>
          <span className="flex items-center text-yellow-500">
            ⭐ {product.rating}
          </span>
        </div>

        {/* See more details */}
        <Link
          to={`/venue/${product.id}`}
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
