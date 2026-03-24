import React, { useEffect, useState } from "react";
import { ArrowLeft, Clock, PlayCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "../../component/Sidebar";
import {
  getCourseBySlug,
  type CourseApiItem,
} from "../../services/courseService";
import { getDummyCourseBySlug } from "../../constants/dummyCourse";
import {
  enrollInCourse,
  getMyEnrollmentByCourse,
} from "../../services/enrollmentService";
import { useAuthStore } from "../../store/authStore";
const CourseDetails: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState<CourseApiItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollError, setEnrollError] = useState("");
  const [enrollSuccess, setEnrollSuccess] = useState("");

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);

        if (!slug) {
          setCourse(null);
          return;
        }

        const response = await getCourseBySlug(slug);
        const apiCourse = response?.data;

        if (apiCourse) {
          setCourse(apiCourse);
          setUsingFallback(false);
        } else {
          const fallbackCourse = getDummyCourseBySlug(slug);
          setCourse(fallbackCourse);
          setUsingFallback(true);
        }
      } catch (error) {
        console.error("Failed to fetch course:", error);

        const fallbackCourse = slug ? getDummyCourseBySlug(slug) : null;
        setCourse(fallbackCourse);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  useEffect(() => {
    const checkEnrollment = async () => {
      try {

        if (!token || !course?._id || usingFallback) {
          return;
        }

        const response = await getMyEnrollmentByCourse(course._id);

        if (response?.data) {
          setIsEnrolled(true);
        }
      } catch (error: any) {
        setIsEnrolled(false);
      }
    };

    checkEnrollment();
  }, [course?._id, usingFallback]);

  const handleEnroll = async () => {
    try {
      setEnrollError("");
      setEnrollSuccess("");


      if (!token) {
        navigate("/sign-in");
        return;
      }

      if (!course?._id) {
        setEnrollError("Course not found");
        return;
      }

      if (usingFallback) {
        setEnrollError("Demo courses cannot be enrolled yet");
        return;
      }

      setIsEnrolling(true);

      await enrollInCourse(course._id);

      setIsEnrolled(true);
      setEnrollSuccess("You have successfully enrolled in this course");
    } catch (error: any) {
      setEnrollError(
        error?.response?.data?.message ||
          "Failed to enroll in course. Please try again."
      );
    } finally {
      setIsEnrolling(false);
    }
  };

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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading course...</div>
        ) : !course ? (
          <div className="text-center py-16 text-gray-500">
            Course not found.
          </div>
        ) : (
          <div className="space-y-8">
            <section className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-600 text-sm font-semibold">
                    {course.category}
                  </span>

                  {usingFallback && (
                    <span className="text-sm text-orange-500 font-medium">
                      Showing demo content
                    </span>
                  )}

                  {isEnrolled && !usingFallback && (
                    <span className="text-sm text-green-600 font-medium">
                      Enrolled
                    </span>
                  )}
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                  {course.title}
                </h1>

                <p className="text-gray-600 leading-7">
                  {course.description || "Course details coming soon."}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span>Instructor: {course.instructor}</span>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{course.duration}</span>
                  </div>
                  <span>•</span>
                  <span>
                    {course.lessons?.length || course.lessonsCount || 0} lessons
                  </span>
                </div>

                {enrollError && (
                  <p className="text-sm font-medium text-red-500">
                    {enrollError}
                  </p>
                )}

                {enrollSuccess && (
                  <p className="text-sm font-medium text-green-600">
                    {enrollSuccess}
                  </p>
                )}

                <div className="pt-4 flex gap-4 flex-wrap">
                  <button
                    onClick={handleEnroll}
                    disabled={isEnrolling || isEnrolled}
                    className="px-8 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-brand-500 to-brand-600 shadow-lg disabled:opacity-60"
                  >
                    {isEnrolling
                      ? "Enrolling..."
                      : isEnrolled
                      ? "Already Enrolled"
                      : "Enroll Now"}
                  </button>

                  {isEnrolled && (
                    <button
                        onClick={() => navigate(`/learn/${course.slug}`)}
                        className="px-8 py-3 rounded-full border border-brand-500 text-brand-500 font-semibold"
                    >
                      Start Learning
                    </button>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6">Course Lessons</h2>

              {!course.lessons || course.lessons.length === 0 ? (
                <div className="text-gray-500">No lessons available yet.</div>
              ) : (
                <div className="space-y-4">
                  {course.lessons
                    .slice()
                    .sort((a, b) => a.order - b.order)
                    .map((lesson) => (
                      <div
                        key={lesson._id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border rounded-xl p-4"
                      >
                        <div className="flex items-start gap-3">
                          <PlayCircle className="text-brand-500 mt-1" size={20} />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {lesson.order}. {lesson.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mt-1">
                              <span>{lesson.duration || "Duration unavailable"}</span>
                              {lesson.isPreview && (
                                <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                                  Preview
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                        onClick={() => navigate(`/courses/${course.slug}/lessons/${lesson._id}`)}
                        disabled={!lesson.isPreview && !isEnrolled}
                        className="px-5 py-2 rounded-full border border-brand-500 text-brand-500 font-medium disabled:opacity-50"
                        >
                        {lesson.isPreview || isEnrolled ? "View Lesson" : "Locked"}
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default CourseDetails;