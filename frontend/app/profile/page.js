'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Navbar from "../components/Navbar";
import { useDarkMode } from "../context/DarkModeContext";
import Footer from '../components/Footer'


const initialProfileState = {
  age: '',
  gender: '',
  height: '',
  weight: ''
};

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const { darkMode } = useDarkMode();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editedProfile, setEditedProfile] = useState({
    age: '',
    gender: '',
    height: '',
    weight: ''
  });
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
        
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setEditedProfile({
            age: data.age || '',
            gender: data.gender || '',
            height: data.height || '',
            weight: data.weight || ''
          });
        } else if (response.status === 404) {
          // Profile doesn't exist yet
          setProfile(null);
          setEditedProfile({
            age: '',
            gender: '',
            height: '',
            weight: ''
          });
        } else {
          throw new Error("Failed to fetch profile data.");
        }
        
        localStorage.setItem('userId', userId);
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.message.includes('unauthorized')) {
          localStorage.removeItem('userId');
          router.push('/login');
        }
        // Ensure editedProfile is set to default values on error
        setEditedProfile({
          age: '',
          gender: '',
          height: '',
          weight: ''
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const handleSave = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await fetch(`https://irix.onrender.com/api/profile/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...editedProfile,
          userId
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      setEditedProfile(updatedProfile);
      setError(null);
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

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-blue-50 to-blue-100'}`}>
      <Navbar/>
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-2xl shadow-lg p-8 space-y-8 backdrop-blur-sm">
          <div className="flex items-center justify-between border-b border-gray-200 pb-6">
            <h1 className="text-3xl font-bold text-blue-600">
              {profile ? 'Profile Settings' : 'Create Profile'}
            </h1>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 p-6  rounded-xl">
              <ProfileField 
                label="Age" 
                value={editedProfile.age}
                suffix="years"
                onChange={(value) => handleChange('age', value)}
                type="number"
                placeholder="Enter your age"
                className=" border-gray-200"
              />
              <ProfileField 
                label="Gender" 
                value={editedProfile.gender}
                onChange={(value) => handleChange('gender', value)}
                type="select"
                options={['Male', 'Female', 'Other']}
                placeholder="Select gender"
                className=" border-gray-200"
              />
            </div>

            <div className="space-y-6 p-6 rounded-xl">
              <ProfileField 
                label="Height" 
                value={editedProfile.height}
                suffix="cm"
                onChange={(value) => handleChange('height', value)}
                type="number"
                placeholder="Enter height in cm"
                className=" border-gray-200"
              />
              <ProfileField 
                label="Weight" 
                value={editedProfile.weight}
                suffix="kg"
                onChange={(value) => handleChange('weight', value)}
                type="number"
                placeholder="Enter weight in kg"
                className=" border-gray-200"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              {profile ? 'Save Changes' : 'Create Profile'}
            </button>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

const ProfileField = ({ 
  label, 
  value, 
  suffix = '', 
  type = 'text',
  options = [],
  placeholder = '',
  onChange, 
  className 
}) => (
  <div className={`px-4 py-3 rounded-lg ${className}`}>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    {type === 'select' ? (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-900"
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-gray-900"
      />
    )}

  </div>
);

export default Profile;