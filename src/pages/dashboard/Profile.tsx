import React, { useEffect, useState } from "react";
import { Bell, Menu, Edit2, Camera } from "lucide-react";
import { useNavigate } from "react-router";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import { getProfile, updateProfile } from "../../services/authService";

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
  const navigate = useNavigate();

  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const setAuth = useAuthStore((state) => state.setAuth);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    country: "",
    occupation: "",
    gender: "",
    courseEnroll: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setPageLoading(true);
        setError("");

        if (!token) {
          navigate("/sign-in");
          return;
        }

        const response = await getProfile();

        const profile = response?.data;

        setProfileData((prev) => ({
          ...prev,
          name: profile?.fullname || user?.fullname || "",
          email: profile?.email || user?.email || "",
          phone: profile?.phone || "",
          country: profile?.country || "",
          occupation: profile?.occupation || "",
          gender: profile?.gender || "",
          courseEnroll: profile?.courseEnroll || "",
        }));
      } catch (err: any) {
        setProfileData((prev) => ({
          ...prev,
          name: user?.fullname || "",
          email: user?.email || "",
        }));

        setError(
          err?.response?.data?.message || "Failed to load profile data"
        );
      } finally {
        setPageLoading(false);
      }
    };

    loadProfile();
  }, [token, navigate, user]);

  const handleChange = (key: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      if (!profileData.name.trim()) {
        setError("Full name is required");
        return;
      }

      const response = await updateProfile({
        fullname: profileData.name,
      });

      const updatedUser = response?.data;

      if (token && updatedUser) {
        setAuth(token, {
          id: updatedUser._id || user?.id || "",
          fullname: updatedUser.fullname,
          email: updatedUser.email,
          dateOfBirth: updatedUser.dateOfBirth || user?.dateOfBirth || "",
          role: updatedUser.role || user?.role || "student",
        });
      }

      setMessage("Profile updated successfully");
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to save profile changes"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/sign-in");
  };

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade">
          <header className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu />
              </button>
              <h2 className="text-3xl font-bold text-gray-800">
                Welcome {user?.fullname || "User"},
              </h2>
            </div>

            <button className="p-3 bg-white rounded-full shadow-lg animate-swing">
              <Bell />
            </button>
          </header>

          {pageLoading ? (
            <div className="bg-white rounded-2xl shadow-xl p-10 text-center text-gray-500">
              Loading profile...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

                <div className="lg:col-span-2 space-y-5">
                  {(
                    [
                      ["name", "Full Name"],
                      ["email", "Email Address"],
                      ["phone", "Phone Number"],
                    ] as [keyof ProfileData, string][]
                  ).map(([key, placeholder]) => (
                    <div key={key} className="relative">
                      <input
                        value={profileData[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder={placeholder}
                        disabled={key === "email"}
                        className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#6B9E3E] focus:ring-4 focus:ring-green-100 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                      <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Other Information</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  {(
                    [
                      ["country", "Country of Residence"],
                      ["occupation", "Occupation"],
                      ["gender", "Gender"],
                      ["courseEnroll", "Course Enroll"],
                    ] as [keyof ProfileData, string][]
                  ).map(([key, placeholder]) => (
                    <div key={key} className="relative">
                      <input
                        value={profileData[key]}
                        onChange={(e) => handleChange(key, e.target.value)}
                        placeholder={placeholder}
                        className="w-full px-4 py-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-[#6B9E3E] focus:ring-4 focus:ring-green-100 outline-none"
                      />
                      <Edit2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>

              {message && (
                <p className="mt-6 text-green-600 font-medium">{message}</p>
              )}

              {error && <p className="mt-6 text-red-500 font-medium">{error}</p>}

              <div className="mt-10 flex justify-end gap-4 flex-wrap">
                <button
                  onClick={handleLogout}
                  className="px-8 py-4 rounded-full border border-red-500 text-red-500 font-semibold hover:bg-red-50 transition"
                >
                  Logout
                </button>

                <button
                  onClick={handleSaveChanges}
                  disabled={loading}
                  className="px-12 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-[#6B9E3E] to-[#5A8633] shadow-lg hover:scale-105 transition disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;