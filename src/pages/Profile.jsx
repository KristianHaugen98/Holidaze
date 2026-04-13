import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Getting user data from localStorage to display in the profile
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Using dummy data to simulate fetching profile info, including name, email, avatar, and bio
    setTimeout(() => {
      setProfile({
        name: user?.name || "Adventurer",
        email: user?.email || "user@mail.com",
        avatar: "https://unsplash.com",
        bio: "Love to explore new destinations and unique accommodations.",
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-xl font-semibold text-gray-400 animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Profile header */}
      <header className="mb-12 text-center">
        <div className="relative inline-block mb-6">
          <img
            src={profile.avatar}
            alt={profile.name}
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-xl object-cover mx-auto"
          />
        </div>
        <h1 className="text-4xl font-extrabold text-white mb-2">
          Welcome back, {profile.name}
        </h1>
        <p className="text-lg text-gray-300 italic">{profile.email}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Userdetails*/}
        <div className="md:col-span-1 bg-gray-800/50 p-6 rounded-3xl border border-gray-700 shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">About me</h2>
          <p className="text-gray-400 leading-relaxed">{profile.bio}</p>
          <button className="w-full mt-6 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors font-medium">
            Edit profile
          </button>
        </div>

        {/* Activities */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white">My upcoming trips</h2>

          {/* Booking card */}
          <div className="bg-gray-800/30 p-4 rounded-2xl border border-gray-700 flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-700 rounded-xl overflow-hidden">
              <div className="w-full h-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs">
                Image
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold">Lofoten Cabin</h3>
              <p className="text-gray-500 text-sm">May 12 - May 15</p>
              <span className="inline-block mt-1 px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-md border border-green-500/30">
                Confirmed
              </span>
            </div>
          </div>

          <p className="text-center text-gray-500 italic pt-4">
            No more orders found.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
