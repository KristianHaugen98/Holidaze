import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";

// We use environment variables to keep the API key and URL secret
const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;
// Home page component that fetches and displays products
function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch products from the API when the component mounts
  useEffect(() => {
    async function getProducts() {
      try {
        setLoading(true);
        const options = {
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
          },
        };

        const response = await fetch(API_URL, options);

        if (!response.ok) {
          throw new Error(`Feil: ${response.status} - ${response.statusText}`);
        }

        const json = await response.json();

        setProducts(json.data || []);
      } catch (err) {
        console.error("Henting feilet:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  // Filter products based on the search query, ensuring we handle cases where product data might be missing
  const filteredProducts = products.filter((product) => {
    if (!product || !product.name) return false; // Skip products that are null or don't have a name

    const productName = product.name.toLowerCase();
    const searchTerm = searchQuery.toLowerCase();
    return productName.startsWith(searchTerm);
  });

  // Render loading, error, or the list of products
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl font-semibold text-gray-600 animate-pulse">
          Loading trips...
        </p>
      </div>
    );
  }
  // If there's an error, display it in a user-friendly way
  if (error) {
    return (
      <div className="text-center mt-10 p-6 bg-red-50 rounded-lg max-w-md mx-auto border border-red-200">
        <p className="text-red-600 font-bold">Something went wrong:</p>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  // Main content of the home page, displaying the products in a responsive grid
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl text-white font-extrabold text-white-900 mb-4">
          Discover your next adventure
        </h1>
        <p className="text-lg text-white text-600 px-4 mb-8">
          Explore our unique rental properties around the world.
        </p>
        {/* Search input for filtering products by name */}
        <div className="max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for destinations..."
            className="w-full p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none text-white shadow-lg text-center"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 italic mt-10">
            No destinations match your search "{searchQuery}"
          </p>
        )}
      </div>
    </div>
  );
}

export default Home;
