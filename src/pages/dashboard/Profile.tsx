import React, { useState } from 'react';
import {
  Bell,
  Menu,
  Edit2,
  Camera,
} from 'lucide-react';
import Sidebar from '../../component/Sidebar';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  country: string;
  occupation: string;
  gender: string;
  courseEnroll: string;
}

const Profile: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'John . B . Crown',
    email: 'john.b.crown@gmail.com',
    phone: '+234/1/1344543',
    country: '',
    occupation: '',
    gender: '',
    courseEnroll: '',
  });

 

  const handleChange = (key: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade">

          {/* Header */}
          <header className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu />
              </button>
              <h2 className="text-3xl font-bold text-gray-800">Welcome John,</h2>
            </div>
            <button className="p-3 bg-white rounded-full shadow-lg animate-swing">
              <Bell />
            </button>
          </header>

          {/* Profile */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Photo */}
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-44 h-44 rounded-full border-4 border-gray-200 bg-white shadow-lg group cursor-pointer hover:scale-105 transition">
                <div className="w-full h-full rounded-full flex items-center justify-center bg-gray-100">
                  <Camera className="w-12 h-12 text-gray-400 group-hover:text-[#6B9E3E]" />
                </div>
                <div className="absolute bottom-2 right-2 w-10 h-10 bg-[#6B9E3E] rounded-full flex items-center justify-center">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2 space-y-5">
              {(
                [
                  ['name', 'Full Name'],
                  ['email', 'Email Address'],
                  ['phone', 'Phone Number'],
                ] as [keyof ProfileData, string][]
              ).map(([key, placeholder]) => (
                <div key={key} className="relative">
                  <input
                    value={profileData[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#6B9E3E] focus:ring-4 focus:ring-green-100 outline-none"
                  />
                  <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Other Info */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold mb-6">Other Information</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {(
                [
                  ['country', 'Country of Residence'],
                  ['occupation', 'Occupation'],
                  ['gender', 'Gender'],
                  ['courseEnroll', 'Course Enroll'],
                ] as [keyof ProfileData, string][]
              ).map(([key, placeholder]) => (
                <div key={key} className="relative">
                  <input
                    value={profileData[key]}
                    onChange={e => handleChange(key, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#6B9E3E] focus:ring-4 focus:ring-green-100 outline-none"
                  />
                  <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Save */}
          <div className="mt-10 flex justify-end">
            <button className="px-12 py-4 rounded-full text-white font-semibold
            bg-gradient-to-r from-[#6B9E3E] to-[#5A8633]
            shadow-lg hover:scale-105 transition">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
