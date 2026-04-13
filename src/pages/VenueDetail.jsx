import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function VenueDetail() {
  const { id } = useParams(); // Get the venue ID from the URL parameters
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const API_KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    async function getVenueDetails() {
      try {
        const options = {
          headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
          },
        };
        // We add the ID to the URL to fetch only one object
        const response = await fetch(`${API_URL}/${id}`, options);
        const json = await response.json();
        setVenue(json.data);
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    }

    getVenueDetails();
  }, [id, API_URL, API_KEY]);

  if (loading)
    return (
      <div className="text-white text-center mt-20">Loading details...</div>
    );
  if (!venue)
    return <div className="text-white text-center mt-20">Venue not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Large image display */}
        <div className="rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={venue.media?.[0]?.url}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Information */}
        <div className="space-y-6">
          <h1 className="text-5xl font-extrabold text-white">{venue.name}</h1>
          <p className="text-2xl text-blue-400 font-bold">
            ${venue.price} / night
          </p>
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
            <h2 className="text-xl text-white font-semibold mb-2">
              Description
            </h2>
            <p className="text-gray-300 leading-relaxed">{venue.description}</p>
          </div>

          <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xl font-bold shadow-lg transition-transform hover:scale-105">
            Book This Venue
          </button>
          <div>
            {/* Button that takes the user one step back in the history */}
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-all mb-10"
            >
              <div className="p-2 rounded-xl bg-gray-800 border border-gray-700 group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all">
                <ArrowLeft
                  size={20}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </div>
              <span className="font-semibold tracking-wide">
                Back to exploration
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueDetail;
