import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2, Circle, Clock, Lock } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "../../component/Sidebar";
import { getLessonById, type LessonItem } from "../../services/lessonService";
import {
  completeLesson,
  getLessonProgressStatus,
  getMyCourseProgress,
  uncompleteLesson,
} from "../../services/lessonProgressService";
import { getDummyCourseBySlug } from "../../constants/dummyCourse";
import { getMyEnrollmentByCourse } from "../../services/enrollmentService";
import { useAuthStore } from "../../store/authStore";
const LessonViewer: React.FC = () => {
  const { slug, lessonId } = useParams();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lesson, setLesson] = useState<LessonItem | null>(null);
  const [courseLessons, setCourseLessons] = useState<any[]>([]);
  const [courseId, setCourseId] = useState<string>("");
  const [courseTitle, setCourseTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        setError("");

        if (!slug || !lessonId) {
          setError("Lesson not found");
          return;
        }

        if (!token) {
          navigate("/sign-in");
          return;
        }

        let enrolled = false;
        let currentCourseId = "";

        try {
          const courseResponse = await import("../../services/courseService").then(
            (m) => m.getCourseBySlug(slug)
          );

          currentCourseId = courseResponse.data._id;
          setCourseId(currentCourseId);
          setCourseTitle(courseResponse.data.title || "");

          if (courseResponse.data.lessons) {
            setCourseLessons(
              courseResponse.data.lessons.slice().sort((a, b) => a.order - b.order)
            );
          }

          try {
            await getMyEnrollmentByCourse(currentCourseId);
            enrolled = true;
            setIsEnrolled(true);
          } catch {
            enrolled = false;
            setIsEnrolled(false);
          }
        } catch {
          const fallbackCourse = getDummyCourseBySlug(slug);

          if (fallbackCourse) {
            setUsingFallback(true);
            setCourseId(fallbackCourse._id);
            setCourseTitle(fallbackCourse.title);
            setCourseLessons(
              (fallbackCourse.lessons || []).slice().sort((a, b) => a.order - b.order)
            );

            const fallbackLesson =
              fallbackCourse.lessons?.find((item) => item._id === lessonId) || null;

            if (!fallbackLesson) {
              setError("Lesson not found");
              return;
            }

            if (!fallbackLesson.isPreview) {
              setError("This demo lesson is locked. Enroll in a real course to continue.");
              return;
            }

            setLesson({
              ...fallbackLesson,
              content:
                fallbackLesson.content ||
                "This is demo lesson content. Real lesson content will appear here when connected to your backend.",
              course: {
                _id: fallbackCourse._id,
                title: fallbackCourse.title,
                slug: fallbackCourse.slug,
                category: fallbackCourse.category,
              },
            });
            return;
          }
        }

        const lessonResponse = await getLessonById(lessonId);
        const fetchedLesson = lessonResponse.data;

        if (!fetchedLesson.isPreview && !enrolled) {
          setError("You must enroll in this course to access this lesson");
          return;
        }

        setLesson(fetchedLesson);

        if (currentCourseId) {
          try {
            const progressResponse = await getMyCourseProgress(currentCourseId);
            setProgress(progressResponse.data.progress || 0);
          } catch {}

          try {
            const statusResponse = await getLessonProgressStatus(lessonId);
            setCompleted(statusResponse.data.completed || false);
          } catch {
            setCompleted(false);
          }
        }
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load lesson");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [slug, lessonId, token, navigate]);

  const currentLessonIndex = useMemo(() => {
    return courseLessons.findIndex((item) => item._id === lessonId);
  }, [courseLessons, lessonId]);

  const previousLesson =
    currentLessonIndex > 0 ? courseLessons[currentLessonIndex - 1] : null;

  const nextLesson =
    currentLessonIndex >= 0 && currentLessonIndex < courseLessons.length - 1
      ? courseLessons[currentLessonIndex + 1]
      : null;

  const handleToggleComplete = async () => {
    try {
      if (!token || !lesson?._id || usingFallback) return;

      setMarking(true);
      setError("");

      if (completed) {
        await uncompleteLesson(lesson._id);
        setCompleted(false);
      } else {
        await completeLesson(lesson._id);
        setCompleted(true);
      }

      if (courseId) {
        const progressResponse = await getMyCourseProgress(courseId);
        setProgress(progressResponse.data.progress || 0);
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update lesson progress");
    } finally {
      setMarking(false);
    }
  };

  const handleNavigateLesson = (targetLesson: any) => {
    if (!targetLesson) return;

    if (!targetLesson.isPreview && !isEnrolled) return;

    navigate(`/courses/${slug}/lessons/${targetLesson._id}`);
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
          onClick={() => navigate(`/courses/${slug}`)}
          className="flex items-center gap-2 text-gray-700 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Course
        </button>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading lesson...</div>
        ) : error ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <p className="text-red-500 font-medium">{error}</p>
          </div>
        ) : !lesson ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-500">
            Lesson not found.
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1.6fr_0.8fr] gap-8">
            <section className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-brand-100 text-brand-600 text-sm font-semibold">
                  {lesson.course?.title || courseTitle || "Course"}
                </span>

                {lesson.isPreview && (
                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
                    Preview Lesson
                  </span>
                )}

                {usingFallback && (
                  <span className="text-sm text-orange-500 font-medium">
                    Demo lesson
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {lesson.order}. {lesson.title}
                </h1>
                <div className="flex items-center gap-2 text-gray-500 mt-3">
                  <Clock size={16} />
                  <span>{lesson.duration || "Duration unavailable"}</span>
                </div>
              </div>

              <div className="rounded-2xl border bg-slate-50 p-6">
                {lesson.videoUrl ? (
                  <video
                    controls
                    className="w-full rounded-xl"
                    src={lesson.videoUrl}
                  >
                    Your browser does not support video playback.
                  </video>
                ) : (
                  <div className="h-64 rounded-xl bg-slate-200 flex items-center justify-center text-gray-500">
                    Video placeholder
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Lesson Content</h2>
                <p className="text-gray-700 leading-8 whitespace-pre-line">
                  {lesson.content ||
                    "No lesson content has been added yet. Connect your lesson body here from the backend."}
                </p>
              </div>

              {!lesson.isPreview && isEnrolled && !usingFallback && (
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={handleToggleComplete}
                    disabled={marking}
                    className="px-6 py-3 rounded-full text-white font-semibold bg-gradient-to-r from-brand-500 to-brand-600 disabled:opacity-60"
                  >
                    {marking
                      ? "Updating..."
                      : completed
                      ? "Mark as Incomplete"
                      : "Mark as Complete"}
                  </button>

                  {completed && (
                    <div className="flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle2 size={18} />
                      Lesson completed
                    </div>
                  )}
                </div>
              )}

              <div className="flex justify-between pt-4 gap-4">
                <button
                  onClick={() => handleNavigateLesson(previousLesson)}
                  disabled={!previousLesson}
                  className="px-5 py-3 rounded-full border border-gray-300 text-gray-700 font-medium disabled:opacity-50"
                >
                  Previous Lesson
                </button>

                <button
                  onClick={() => handleNavigateLesson(nextLesson)}
                  disabled={!nextLesson || (!nextLesson.isPreview && !isEnrolled)}
                  className="px-5 py-3 rounded-full border border-brand-500 text-brand-500 font-medium disabled:opacity-50"
                >
                  Next Lesson
                </button>
              </div>
            </section>

            <aside className="space-y-6">
              <section className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4">Course Progress</h3>

                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-brand-500 to-brand-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-sm text-gray-600">{progress}% completed</p>
              </section>

              <section className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold mb-4">Lessons</h3>

                <div className="space-y-3">
                  {courseLessons.map((item) => {
                    const locked = !item.isPreview && !isEnrolled;
                    const active = item._id === lessonId;

                    return (
                      <button
                        key={item._id}
                        onClick={() => handleNavigateLesson(item)}
                        disabled={locked}
                        className={`w-full text-left border rounded-xl p-4 transition disabled:opacity-50 ${
                          active
                            ? "border-brand-500 bg-brand-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-semibold text-gray-900">
                              {item.order}. {item.title}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                              {item.duration || "Duration unavailable"}
                            </p>
                          </div>

                          <div className="shrink-0">
                            {locked ? (
                              <Lock size={18} className="text-gray-400" />
                            ) : active ? (
                              <CheckCircle2 size={18} className="text-brand-500" />
                            ) : (
                              <Circle size={18} className="text-gray-400" />
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </section>
            </aside>
          </div>
        )}
      </main>
    </div>
  );
};

export default LessonViewer;