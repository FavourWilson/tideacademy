import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Bell,
  Menu,
  Calendar,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router";
import Sidebar from "../../component/Sidebar";
import { getMyEnrollments } from "../../services/enrollmentService";
import { useAuthStore } from "../../store/authStore";
interface CourseItem {
  id: string;
  title: string;
  description: string;
  slug: string;
  status: "in-progress" | "completed";
  objectives?: string;
  completionDate?: string;
  progress?: number;
}

const MyCourses: React.FC = () => {
  const [activeView, setActiveView] =
    useState<"in-progress" | "completed">("in-progress");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUser = useAuthStore((state) => state.user);
    const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchEnrollments = async () => {
    try {
      if (!token) {
        navigate("/sign-in");
        return;
      }

      setLoading(true);

      const response = await getMyEnrollments();

      const mappedCourses: CourseItem[] = (response?.data || []).map(
        (enrollment: any) => {
          const course =
            typeof enrollment.course === "string" ? null : enrollment.course;

          const isCompleted = enrollment.status === "completed";

          return {
            id: course?._id || enrollment._id,
            title: course?.title || "Untitled Course",
            description:
              course?.description ||
              "Course details will appear here once available.",
            slug: course?.slug || "",
            status: isCompleted ? "completed" : "in-progress",
            objectives: isCompleted
              ? undefined
              : `Progress: ${enrollment.progress || 0}%`,
            completionDate:
              isCompleted && enrollment.completedAt
                ? `Completed: ${new Date(
                    enrollment.completedAt
                  ).toLocaleDateString()}`
                : undefined,
            progress: enrollment.progress || 0,
          };
        }
      );

      setCourses(mappedCourses);
    } catch (error) {
      console.error("Failed to fetch my courses:", error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  fetchEnrollments();
}, [token, navigate]);

  const filteredCourses = useMemo(() => {
    return courses.filter((course) => course.status === activeView);
  }, [courses, activeView]);

  return (
    <div className="flex h-screen font-outfit bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fadeIn"
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-auto p-6 animate-fadeIn">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu />
            </button>
            <h2 className="text-3xl font-bold text-gray-800">
              Welcome {currentUser?.fullname || "User"},
            </h2>
          </div>

          <button className="p-3 bg-white rounded-full shadow animate-swing">
            <Bell />
          </button>
        </header>

        <div className="flex gap-4 mb-8">
          {["in-progress", "completed"].map((view) => (
            <button
              key={view}
              onClick={() =>
                setActiveView(view as "in-progress" | "completed")
              }
              className={`px-8 py-3 rounded-full font-semibold transition ${
                activeView === view
                  ? "bg-primary-200 text-white shadow-lg"
                  : "bg-primary-200 border-2 border-gray-200 text-white hover:border-brand-500 hover:text-brand-500"
              }`}
            >
              {view === "in-progress" ? "In Progress" : "Completed"}
            </button>
          ))}
        </div>

        <div className="space-y-5">
          {loading ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <h3 className="text-xl font-bold mb-2">Loading your courses...</h3>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <BookOpen className="mx-auto mb-4 text-gray-400" size={40} />
              <h3 className="text-xl font-bold mb-2">
                No {activeView} courses
              </h3>
              <p className="text-gray-500">
                {activeView === "in-progress"
                  ? "Enroll in a course to see it here!"
                  : "Complete a course to see it here!"}
              </p>
            </div>
          ) : (
            filteredCourses.map((course, i) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 animate-slideUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col sm:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">{course.title}</h3>

                    {activeView === "in-progress" ? (
                      <>
                        <div className="flex gap-2 text-gray-600 mb-2">
                          <Target size={16} />
                          <span className="text-sm font-semibold">
                            Objectives:
                          </span>
                          <span className="text-sm text-gray-500">
                            {course.objectives}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 ml-6">
                          {course.description}
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 max-w-2xl">
                          {course.description}
                        </p>
                        {course.completionDate && (
                          <div className="flex items-center gap-2 text-gray-500 mt-3">
                            <Calendar size={16} />
                            <span className="text-sm">
                              {course.completionDate}
                            </span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    onClick={() =>
                      activeView === "in-progress"
                        ? navigate(`/courses/${course.slug}`)
                        : navigate(`/certificate/course/${course.id}`)
                    }
                    className="px-8 py-3 lg:w-64 rounded-full font-semibold text-white bg-primary-900 shadow-lg hover:shadow-xl whitespace-nowrap"
                  >
                    {activeView === "in-progress"
                      ? "Continue"
                      : "View Certification"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default MyCourses;