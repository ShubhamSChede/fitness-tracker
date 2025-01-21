'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User not authenticated");
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`https://irix.onrender.com/api/profile/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        const data = await response.json();
        setProfile(data);
        // Ensure userId is always up to date in localStorage
        localStorage.setItem('userId', data.userId);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('unauthorized')) {
          localStorage.removeItem('userId');
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleEdit = () => {
    setEditedProfile({ ...profile });
    setIsEditing(true);
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`https://irix.onrender.com/api/profile/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedProfile),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
        <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8 backdrop-blur-sm bg-white/90">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2.5 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
              <ProfileField 
                label="Age" 
                value={isEditing ? editedProfile.age : profile.age}
                suffix="years"
                editable={isEditing}
                onChange={(value) => handleChange('age', value)}
                className="bg-white border-gray-200"
              />
              <ProfileField 
                label="Gender" 
                value={isEditing ? editedProfile.gender : profile.gender}
                editable={isEditing}
                onChange={(value) => handleChange('gender', value)}
                className="bg-white border-gray-200"
              />
            </div>

            <div className="space-y-6 p-6 bg-gray-50 rounded-xl">
              <ProfileField 
                label="Height" 
                value={isEditing ? editedProfile.height : profile.height}
                suffix="cm"
                editable={isEditing}
                onChange={(value) => handleChange('height', value)}
                className="bg-white border-gray-200"
              />
              <ProfileField 
                label="Weight" 
                value={isEditing ? editedProfile.weight : profile.weight}
                suffix="kg"
                editable={isEditing}
                onChange={(value) => handleChange('weight', value)}
                className="bg-white border-gray-200"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                onClick={() => setIsEditing(false)}
                className="mr-4 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, suffix = '', editable = false, readonly = false, onChange, className }) => (
  <div className={`bg-gray-50 px-4 py-3 rounded-lg ${className}`}>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    {editable && !readonly ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <p className="mt-1 text-lg text-gray-900">
        {value} {suffix}
      </p>
    )}
  </div>
);

export default Profile;