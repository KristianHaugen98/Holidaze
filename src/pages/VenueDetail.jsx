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

  // State for booking form
  const [bookingData, setBookingData] = useState({
    dateFrom: "",
    dateTo: "",
    guests: 1,
    venueId: id, // ID-en from URL parameters
  });
  const [isBooking, setIsBooking] = useState(false); // For loading-state button

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to book a venue.");
      navigate("/login");
      return;
    }

    setIsBooking(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REGISTER_URL}/holidaze/bookings`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            dateFrom: new Date(bookingData.dateFrom).toISOString(),
            dateTo: new Date(bookingData.dateTo).toISOString(),
            guests: Number(bookingData.guests),
            venueId: id,
          }),
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert("Success! Your trip is booked.");
        navigate("/profile"); // Redirect to profile page where user can see their bookings
      } else {
        alert("Error: " + result.errors[0].message);
      }
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsBooking(false);
    }
  };

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
        {/* Stor bildevisning */}
        <div className="rounded-3xl overflow-hidden shadow-2xl h-[500px]">
          <img
            src={venue.media?.[0]?.url || "https://placeholder.com"}
            alt={venue.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Information and Booking */}
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

          {/* --- Booking Form --- */}
          <form
            onSubmit={handleBooking}
            className="space-y-4 bg-gray-800/30 p-6 rounded-3xl border border-gray-700 shadow-xl"
          >
            <h3 className="text-lg font-bold text-white mb-2">
              Book your stay
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">
                  Check-in
                </label>
                <input
                  type="date"
                  required
                  value={bookingData.dateFrom}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, dateFrom: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 ml-1">
                  Check-out
                </label>
                <input
                  type="date"
                  required
                  value={bookingData.dateTo}
                  onChange={(e) =>
                    setBookingData({ ...bookingData, dateTo: e.target.value })
                  }
                  className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1 ml-1">
                Guests (Max: {venue.maxGuests})
              </label>
              <input
                type="number"
                min="1"
                max={venue.maxGuests}
                required
                value={bookingData.guests}
                onChange={(e) =>
                  setBookingData({ ...bookingData, guests: e.target.value })
                }
                className="w-full p-3 bg-gray-900 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isBooking}
              className={`w-full py-4 ${isBooking ? "bg-gray-600" : "bg-blue-600 hover:bg-blue-700"} text-white rounded-full text-xl font-bold shadow-lg transition-all active:scale-95 flex justify-center items-center`}
            >
              {isBooking ? (
                <>
                  <span className="animate-spin mr-2">◌</span> Processing...
                </>
              ) : (
                "Confirm Booking"
              )}
            </button>
          </form>

          {/* Back button */}
          <div className="pt-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 text-gray-400 hover:text-blue-400 transition-all"
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
