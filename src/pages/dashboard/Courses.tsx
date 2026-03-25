import React, { useEffect, useMemo, useState } from "react";
import { Bell, Menu, Clock } from "lucide-react";
import { useNavigate } from "react-router";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import { getCourses, type CourseApiItem } from "../../services/courseService";
import { dummyCourses } from "../../constants/dummyCourse";

const Courses: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<string>("All Courses");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [courses, setCourses] = useState<CourseApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  const currentUser = useAuthStore((state) => state.user);

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
    return activeTab === "All Courses"
      ? courses
      : courses.filter((course) => course.category === activeTab);
  }, [activeTab, courses]);

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 font-sans overflow-hidden">
      {isSidebarOpen && (
        <div
          className="overlay fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <div className="flex-1 overflow-auto w-full">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 fade-in">
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                Welcome {currentUser?.fullname || "User"},
              </h2>
            </div>

            <button className="notification-bell p-2 sm:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-gray-50">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>

          <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800">
              List of Courses
            </h3>

            {usingFallback && (
              <span className="text-sm text-orange-500 font-medium">
                Showing demo courses
              </span>
            )}
          </div>

          <div className="flex space-x-1 mb-6 sm:mb-8 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`tab-button px-3 sm:px-6 py-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? "active text-[#6B9E3E]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center text-gray-500">
              Loading courses...
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-xl shadow-md p-8 text-center text-gray-500">
              No courses available yet.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredCourses.map((course, index) => (
                <div
                  key={course._id}
                  className="course-card flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-md gap-4"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex-1 w-full sm:w-auto">
                    <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-1">
                      {course.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {course.description || "Course details coming soon."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 sm:space-x-6">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs sm:text-sm font-medium">
                        {course.duration}
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/courses/${course.slug}`)}
                      className="bg-primary-900 px-6 sm:px-8 py-2.5 sm:py-3 text-white rounded-full font-semibold shadow-lg hover:shadow-xl text-xs sm:text-sm whitespace-nowrap"
                    >
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;