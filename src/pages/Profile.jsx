import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);

  const navigate = useNavigate();

  // Retrieve stored user info and token
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    // If no one is logged in, send them to the login page

    if (!token || !userData) {
      navigate("/login");
      return;
    }
    console.log("Name:", userData.name);

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
          console.log("Got profile!", result.data);
        } else {
          console.error(
            "API Feilmelding:",
            result.errors?.[0]?.message || "Ukjent feil",
          );
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

  // Log out function
  const handleLogout = () => {
    localStorage.clear(); // Deletes everything (token and user info)
    navigate("/login");
  };

  const handleUpdateAvatar = async (e) => {
    e.preventDefault();

    const API_UPDATE_URL = `${import.meta.env.VITE_REGISTER_URL}/holidaze/profiles/${userData.name}`;

    try {
      const response = await fetch(API_UPDATE_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_API_KEY,
        },
        body: JSON.stringify({
          avatar: {
            url: newAvatarUrl,
            alt: `${userData.name}'s avatar`,
          },
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setProfile(result.data);
        setIsEditingAvatar(false);
        alert("Avatar updated!");
      } else {
        alert("Could not update avatar. Make sure the URL is valid.");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
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
      {/* Header */}
      <header className="mb-12 text-center">
        <div className="relative inline-block mb-6 group">
          <img
            src={profile.avatar?.url || "https://placeholder.com"}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-xl object-cover mx-auto"
          />
          {/* Edit Avatar button (Requirement: Users can edit their avatar) */}
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
              placeholder="Paste image URL here..."
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
            <button
              type="submit"
              className="bg-green-600 px-6 py-2 rounded-xl text-sm font-bold hover:bg-green-700 transition-transform active:scale-95"
            >
              Save
            </button>
          </form>
        )}

        <h1 className="text-4xl font-extrabold mb-2">
          Welcome, {profile.name}
        </h1>
        <p className="text-gray-400 italic">{profile.email}</p>
        {/* Log out button (Requirement: Users can log out) */}
        <button
          onClick={handleLogout}
          className="mt-4 text-sm text-red-400 hover:text-red-300 underline"
        >
          Log out
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* User Details and Role */}
        <div className="md:col-span-1 bg-gray-800/50 p-6 rounded-3xl border border-gray-700">
          <h2 className="text-xl font-bold mb-4">About me</h2>
          <p className="text-gray-400 text-sm mb-4">
            {profile.bio || "No bio added yet."}
          </p>

          <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl mb-6">
            <p className="text-xs uppercase tracking-wider text-blue-400 font-bold">
              Role
            </p>
            <p className="text-white">
              {profile.venueManager ? "Venue Manager" : "Customer"}
            </p>
          </div>

          <button className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-colors font-medium">
            Edit profile
          </button>
        </div>

        {/* Bookings or Venues */}
        <div className="md:col-span-2 space-y-6">
          {profile.venueManager ? (
            <h2 className="text-2xl font-bold">My Venues</h2>
          ) : (
            <h2 className="text-2xl font-bold">My Upcoming Trips</h2>
          )}

          {/* Here we map through profile.bookings or profile.venues */}
          {profile.bookings?.length === 0 && profile.venues?.length === 0 ? (
            <p className="text-gray-500 italic text-center">
              Nothing to show yet.
            </p>
          ) : (
            <p className="text-blue-400 text-sm">Data will be listed here...</p>
          )}

          {/* Button to create new Venue (For managers only) */}
          {profile.venueManager && (
            <button className="w-full py-4 border-2 border-dashed border-gray-700 rounded-2xl text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all">
              + Create New Venue
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
