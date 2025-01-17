'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [profile, setProfile] = useState(null);
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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Profile Information</h1>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField 
            label="User ID" 
            value={profile.userId} 
            readonly={true}
          />
          <ProfileField 
            label="Age" 
            value={isEditing ? editedProfile.age : profile.age}
            suffix="years"
            editable={isEditing}
            onChange={(value) => handleChange('age', value)}
          />
          <ProfileField 
            label="Gender" 
            value={isEditing ? editedProfile.gender : profile.gender}
            editable={isEditing}
            onChange={(value) => handleChange('gender', value)}
          />
          <ProfileField 
            label="Height" 
            value={isEditing ? editedProfile.height : profile.height}
            suffix="cm"
            editable={isEditing}
            onChange={(value) => handleChange('height', value)}
          />
          <ProfileField 
            label="Weight" 
            value={isEditing ? editedProfile.weight : profile.weight}
            suffix="kg"
            editable={isEditing}
            onChange={(value) => handleChange('weight', value)}
          />
          <ProfileField 
            label="Created At" 
            value={new Date(profile.createdAt).toLocaleDateString()} 
          />
          <ProfileField 
            label="Updated At" 
            value={new Date(profile.updatedAt).toLocaleDateString()} 
          />
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value, suffix = '', editable = false, readonly = false, onChange }) => (
  <div className="bg-gray-50 px-4 py-3 rounded-lg">
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