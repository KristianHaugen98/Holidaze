import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  // State to show/hide the form
  const [isCreatingVenue, setIsCreatingVenue] = useState(false);

  // State for the actual data of the new listing
  const [venueData, setVenueData] = useState({
    name: "",
    description: "",
    media: [{ url: "", alt: "" }],
    price: 0,
    maxGuests: 1,
    meta: { wifi: false, parking: false, breakfast: false, pets: false },
    location: { address: "", city: "", zip: "", country: "" },
  });

  // State for editing venues
  const [editingVenue, setEditingVenue] = useState(null);

  // States

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const navigate = useNavigate();
  // Retrieves saved info from the browser (localStorage)
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Getting profile
  useEffect(() => {
    // If token is missing, user is not logged in -> send to login
    if (!token || !userData) {
      navigate("/login");
      return;
    }

    async function fetchProfile() {
      try {
        const userName = userData.name.trim();
        const apiKey = import.meta.env.VITE_API_KEY.trim();
        const API_PROFILE_URL = `${import.meta.env.VITE_REGISTER_URL}/holidaze/profiles/${userName}?_bookings=true&_venues=true`;

        const response = await fetch(API_PROFILE_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": apiKey,
          },
        });

        const result = await response.json();

        if (response.ok) {
          setProfile(result.data);
        } else {
          setError("Could not load profile.");
        }
      } catch (err) {
        setError("Network error.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [navigate, token, userData?.name]);

  // Handles logg ut
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Function for sending data (PUT)
  const handleUpdateVenue = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REGISTER_URL}/holidaze/venues/${editingVenue.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            name: editingVenue.name,
            description: editingVenue.description,
            price: editingVenue.price,
            maxGuests: editingVenue.maxGuests,
            media: editingVenue.media,
            meta: editingVenue.meta,
          }),
        },
      );

      if (response.ok) {
        const result = await response.json();

        setProfile((prev) => ({
          ...prev,
          venues: prev.venues.map((v) =>
            v.id === editingVenue.id ? result.data : v,
          ),
        }));
        setEditingVenue(null);
        alert("Venue updated!");
      }
    } catch (error) {
      console.error("Error updating venue:", error);
    }
  };

  // Handles vanue changes
  const handleVenueChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes("meta.")) {
      // Handles the meta object (wifi, pets, etc.)
      const metaField = name.split(".")[1];
      setVenueData((prev) => ({
        ...prev,
        meta: { ...prev.meta, [metaField]: checked },
      }));
    } else if (name === "media") {
      // Handles the first image in the list
      setVenueData((prev) => ({
        ...prev,
        media: [{ url: value, alt: prev.name + " image" }],
      }));
    } else {
      // Handles regular fields and converts to numbers where needed
      setVenueData((prev) => ({
        ...prev,
        [name]: type === "number" ? Number(value) : value,
      }));
    }
  };

  // Function for sending data (POST)
  const handleCreateVenue = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REGISTER_URL}/holidaze/venues`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify(venueData),
        },
      );

      const result = await response.json();

      if (response.ok) {
        alert("Venue created successfully!");
        setIsCreatingVenue(false);
        setProfile((prev) => ({
          ...prev,
          venues: [result.data, ...prev.venues],
        }));
      } else {
        alert("Error: " + result.errors[0].message);
      }
    } catch (error) {
      console.error("Error creating venue:", error);
    }
  };

  // Venue delete function
  const handleDeleteVenue = async (id) => {
    if (!window.confirm("Are you sure you want to delete this venue?")) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REGISTER_URL}/holidaze/venues/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
        },
      );

      if (response.ok) {
        // Refreshes the list locally without reloading the page
        setProfile((prev) => ({
          ...prev,
          venues: prev.venues.filter((v) => v.id !== id),
        }));
        alert("Venue deleted!");
      } else {
        alert("Failed to delete venue.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Updates our avatar
  const handleUpdateAvatar = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REGISTER_URL}/holidaze/profiles/${userData.name}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify({
            avatar: { url: newAvatarUrl, alt: `${userData.name}'s avatar` },
          }),
        },
      );

      if (response.ok) {
        const result = await response.json();
        setProfile(result.data);
        setIsEditingAvatar(false);
        setNewAvatarUrl("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-white">Loading profile...</div>
    );
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-white">
      {/* 1. HEADER SECTION */}
      <header className="mb-12 text-center">
        <div className="relative inline-block mb-6 group">
          <img
            src={profile.avatar?.url || "https://placeholder.com"}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-xl object-cover mx-auto"
          />
          <button
            onClick={() => setIsEditingAvatar(!isEditingAvatar)}
            className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
          >
            ✎
          </button>
        </div>

        {isEditingAvatar && (
          <form
            onSubmit={handleUpdateAvatar}
            className="mt-4 mb-6 max-w-sm mx-auto flex gap-2 animate-fadeIn"
          >
            <input
              type="url"
              required
              placeholder="Paste image URL..."
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="bg-green-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-green-700"
            >
              Save
            </button>
          </form>
        )}

        <h1 className="text-4xl font-extrabold mb-2 text-white">
          Welcome, {profile.name}
        </h1>
        <p className="text-gray-400">{profile.email}</p>
        <button
          onClick={handleLogout}
          className="mt-4 text-sm text-red-400 underline"
        >
          Log out
        </button>
      </header>

      {/* 2. GRID SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT COLUMN: About*/}
        <div className="md:col-span-1 bg-gray-800/50 p-6 rounded-3xl border border-gray-700">
          <h2 className="text-xl font-bold mb-4">About me</h2>
          <p className="text-gray-400 text-sm mb-4">
            {profile.bio || "No bio added yet."}
          </p>
          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-6">
            <p className="text-xs uppercase text-blue-400 font-bold">Role</p>
            <p className="text-white">
              {profile.venueManager ? "Venue Manager" : "Customer"}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Bookings or Venues */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold">
            {profile.venueManager ? "My Venues" : "My Upcoming Trips"}
          </h2>

          <div className="space-y-4">
            {/* Showing bookings for customers */}
            {!profile.venueManager &&
              profile.bookings?.map((booking) => (
                <div
                  key={booking.id}
                  className="bg-gray-800/30 p-4 rounded-2xl border border-gray-700 flex items-center gap-4"
                >
                  <img
                    src={
                      booking.venue.media?.[0]?.url || "https://placeholder.com"
                    }
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-white font-semibold">
                      {booking.venue.name}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {new Date(booking.dateFrom).toLocaleDateString()} -{" "}
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}

            {/* Showing venues for managers */}
            {profile.venueManager &&
              profile.venues?.map((venue) => (
                <div
                  key={venue.id}
                  className="bg-gray-800/30 p-4 rounded-2xl border border-gray-700 flex items-center gap-4"
                >
                  <img
                    src={venue.media?.[0]?.url || "https://placeholder.com"}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <h3 className="text-white font-semibold">{venue.name}</h3>
                      <p className="text-gray-500 text-xs">
                        {venue.price} NOK / night
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteVenue(venue.id)}
                        className="p-2 bg-red-900/20 text-red-500 rounded-lg hover:bg-red-900/40"
                      >
                        🗑️
                      </button>
                      {/* Edit button, only shows when hovering the venue card */}

                      <button
                        onClick={() => setEditingVenue(venue)}
                        className="p-2 bg-blue-900/20 text-blue-400 rounded-lg hover:bg-blue-900/40"
                      >
                        ✎
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* CREATE VENUE MODAL */}
          {editingVenue && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
              <div className="bg-gray-800 border border-gray-700 w-full max-w-2xl p-8 rounded-3xl shadow-2xl relative my-auto">
                <button
                  onClick={() => setEditingVenue(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                >
                  ✕
                </button>
                {/* Form for editing venue */}
                <h2 className="text-2xl font-bold mb-6">Edit Venue</h2>
                <form
                  onSubmit={handleUpdateVenue}
                  className="space-y-4 text-white"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400 ml-1">
                        Venue Name
                      </label>
                      <input
                        required
                        value={editingVenue.name}
                        onChange={(e) =>
                          setEditingVenue({
                            ...editingVenue,
                            name: e.target.value,
                          })
                        }
                        className="p-3 bg-gray-900 border border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-gray-400 ml-1">
                        Price per night
                      </label>
                      <input
                        type="number"
                        required
                        value={editingVenue.price}
                        onChange={(e) =>
                          setEditingVenue({
                            ...editingVenue,
                            price: Number(e.target.value),
                          })
                        }
                        className="p-3 bg-gray-900 border border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  {/* Description field outside the grid for better spacing */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-gray-400 ml-1">
                      Description
                    </label>
                    <textarea
                      required
                      value={editingVenue.description}
                      onChange={(e) =>
                        setEditingVenue({
                          ...editingVenue,
                          description: e.target.value,
                        })
                      }
                      className="p-3 bg-gray-900 border border-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 h-24"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 mt-4"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {profile.venueManager && (
            <button
              onClick={() => setIsCreatingVenue(true)}
              className="w-full py-4 border-2 border-dashed border-gray-700 rounded-2xl text-gray-400 hover:border-blue-500 hover:text-blue-500 font-bold transition-all"
            >
              + Create New Venue
            </button>
          )}
          {/* Just for testing, and it works! */}
          {!profile.venueManager && (
            <button
              onClick={() => setIsCreatingVenue(true)}
              className="w-full py-4 border-2 border-dashed border-gray-700 rounded-2xl text-yellow-600/50 hover:text-yellow-500 font-bold opacity-50"
            >
              + Test Create Venue (Visible for Dev)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
