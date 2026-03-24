import React, { useEffect, useMemo, useState } from "react";
import { Bell, Clock, Menu } from "lucide-react";
import { useNavigate } from "react-router";
import Sidebar from "../../component/Sidebar";
import { getCourses, type CourseApiItem } from "../../services/courseService";
import { dummyCourses } from "../../constants/dummyCourse";
import { useAuthStore } from "../../store/authStore";
const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("All Courses");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<CourseApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const currentUser = useAuthStore((state) => state.user);
  const navigate = useNavigate();
  const tabs = ["All Courses", "Digital Assets", "Trading", "Cybersecurity"];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);

        const response = await getCourses();
        const apiCourses = response?.data || [];

        if (apiCourses.length > 0) {
          setCourses(apiCourses);
          setUsingFallback(false);
        } else {
          setCourses(dummyCourses);
          setUsingFallback(true);
        }
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses(dummyCourses);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = useMemo(() => {
    if (activeTab === "All Courses") return courses;
    return courses.filter((course) => course.category === activeTab);
  }, [activeTab, courses]);

  return (
    <div className="flex h-screen font-outfit bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-auto p-6">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden">
              <Menu />
            </button>

            <h2 className="text-3xl font-bold text-gray-800">
              Welcome {currentUser?.fullname || "User"},
            </h2>
          </div>

          <button className="p-3 bg-white rounded-full shadow">
            <Bell />
          </button>
        </header>

        <section className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl p-6 text-white shadow-xl bg-linear-to-br from-brand-500 to-brand-600">
            <p className="text-sm text-gray-100">My Courses</p>
            <p className="text-5xl text-black font-bold">{courses.length}</p>
          </div>

          <div className="rounded-2xl p-6 text-white shadow-xl bg-linear-to-br from-brand-500 to-brand-600">
            <p className="text-sm text-gray-100">Completed Courses</p>
            <p className="text-5xl text-black font-bold">0</p>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-xl p-6">
          <div className="flex justify-between items-center mb-6 gap-4">
            <h3 className="text-2xl font-bold">List of Courses</h3>

            {usingFallback && (
              <span className="text-sm text-orange-500 font-medium">
                Showing demo courses
              </span>
            )}
          </div>

          <div className="flex gap-6 border-b mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold whitespace-nowrap ${
                  activeTab === tab
                    ? "text-brand-500 border-b-2 border-brand-500"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="py-10 text-center text-gray-500">
              Loading courses...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              No courses available yet.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course) => (
                <div
                  key={course._id}
                  className="flex flex-col sm:flex-row justify-between gap-4 p-6 border rounded-xl hover:shadow-md transition"
                >
                  <div>
                    <h4 className="font-bold text-lg">{course.title}</h4>
                    <p className="text-sm text-gray-500">
                      {course.description || "Course details coming soon."}
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-sm text-gray-600">
                      <span>{course.category}</span>
                      <span>•</span>
                      <span>{course.instructor}</span>
                      {course.lessonsCount !== undefined && (
                        <>
                          <span>•</span>
                          <span>{course.lessonsCount} lessons</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock size={16} />
                      {course.duration}
                    </div>

                    <button
                        onClick={() => navigate(`/courses/${course.slug}`)}
                        className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg"
                      >
                        View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;