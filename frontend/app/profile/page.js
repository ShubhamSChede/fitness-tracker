'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Profile Information</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField label="User ID" value={profile.userId} />
          <ProfileField label="Age" value={`${profile.age} years`} />
          <ProfileField label="Gender" value={profile.gender} />
          <ProfileField label="Height" value={`${profile.height} cm`} />
          <ProfileField label="Weight" value={`${profile.weight} kg`} />
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

const ProfileField = ({ label, value }) => (
  <div className="bg-gray-50 px-4 py-3 rounded-lg">
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="mt-1 text-lg text-gray-900">{value}</p>
  </div>
);

export default Profile;