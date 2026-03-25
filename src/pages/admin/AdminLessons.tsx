import React, { useEffect, useState } from "react";
import { Bell, Menu, Pencil, Plus, Trash2, X, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import { getCourseBySlug } from "../../services/courseService";
import {
  createLesson,
  deleteLesson,
  getAdminLessonsByCourse,
  updateLesson,
  type LessonItem,
  type LessonPayload,
} from "../../services/lessonService";

const initialForm: LessonPayload = {
  course: "",
  title: "",
  content: "",
  videoUrl: "",
  duration: "",
  order: 1,
  isPreview: false,
  isPublished: true,
};

const AdminLessons: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<LessonItem | null>(null);
  const [courseId, setCourseId] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [form, setForm] = useState<LessonPayload>(initialForm);

  const { slug } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  const fetchLessons = async (targetCourseId: string) => {
    try {
      setLoading(true);
      setError("");
      const response = await getAdminLessonsByCourse(targetCourseId);
      const sorted = (response.data || []).slice().sort((a, b) => a.order - b.order);
      setLessons(sorted);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch lessons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchCourseAndLessons = async () => {
      try {
        if (!slug) {
          setError("Course slug is missing");
          return;
        }

        setLoading(true);
        const courseResponse = await getCourseBySlug(slug);
        const course = courseResponse.data;

        setCourseId(course._id);
        setCourseTitle(course.title);
        setForm((prev) => ({ ...prev, course: course._id }));

        await fetchLessons(course._id);
      } catch (err: any) {
        setError(err?.response?.data?.message || "Failed to load course");
        setLoading(false);
      }
    };

    fetchCourseAndLessons();
  }, [slug]);

  const openCreateModal = () => {
    setEditingLesson(null);
    setForm({
      ...initialForm,
      course: courseId,
      order: lessons.length > 0 ? lessons.length + 1 : 1,
    });
    setError("");
    setMessage("");
    setShowModal(true);
  };

  const openEditModal = (lesson: LessonItem) => {
    setEditingLesson(lesson);
    setForm({
      course: courseId,
      title: lesson.title,
      content: lesson.content || "",
      videoUrl: lesson.videoUrl || "",
      duration: lesson.duration || "",
      order: lesson.order,
      isPreview: lesson.isPreview ?? false,
      isPublished: lesson.isPublished ?? true,
    });
    setError("");
    setMessage("");
    setShowModal(true);
  };

  const handleChange = (
    key: keyof LessonPayload,
    value: string | number | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setError("");
      setMessage("");
      setActionLoadingId(editingLesson?._id || "create");

      if (!form.title.trim() || !form.course || !form.order) {
        setError("Title, course, and order are required");
        return;
      }

      if (editingLesson) {
        await updateLesson(editingLesson._id, form);
        setMessage("Lesson updated successfully");
      } else {
        await createLesson(form);
        setMessage("Lesson created successfully");
      }

      setShowModal(false);
      setEditingLesson(null);
      setForm({ ...initialForm, course: courseId });
      await fetchLessons(courseId);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save lesson");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDelete = async (lessonId: string) => {
    const confirmed = window.confirm("Delete this lesson?");
    if (!confirmed) return;

    try {
      setActionLoadingId(lessonId);
      setError("");
      setMessage("");
      await deleteLesson(lessonId);
      setMessage("Lesson deleted successfully");
      await fetchLessons(courseId);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete lesson");
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <header className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu />
              </button>

              <div>
                <h2 className="text-3xl font-bold text-gray-800">
                  Manage Lessons — {currentUser?.fullname || "Admin"}
                </h2>
                <p className="text-gray-500 mt-1">
                  {courseTitle || "Loading course..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-900 text-white font-semibold shadow-lg"
              >
                <Plus size={18} />
                Add Lesson
              </button>
              <button className="p-3 bg-white rounded-full shadow-lg">
                <Bell />
              </button>
            </div>
          </header>

          <div className="mb-6">
            <button
              onClick={() => navigate("/admin/courses")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border bg-white hover:bg-gray-50"
            >
              <ArrowLeft size={16} />
              Back to Courses
            </button>
          </div>

          {message && (
            <div className="mb-6 bg-green-50 text-green-700 border border-green-200 rounded-xl px-4 py-3">
              {message}
            </div>
          )}

          {error && !showModal && (
            <div className="mb-6 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {loading ? (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center text-gray-500">
              Loading lessons...
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-6 py-4">Order</th>
                      <th className="text-left px-6 py-4">Title</th>
                      <th className="text-left px-6 py-4">Duration</th>
                      <th className="text-left px-6 py-4">Preview</th>
                      <th className="text-left px-6 py-4">Published</th>
                      <th className="text-left px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lessons.map((lesson) => (
                      <tr key={lesson._id} className="border-t">
                        <td className="px-6 py-4 font-medium">{lesson.order}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{lesson.title}</div>
                          {lesson.content && (
                            <div className="text-xs text-gray-500 mt-1 line-clamp-2">
                              {lesson.content}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {lesson.duration || "—"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              lesson.isPreview
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {lesson.isPreview ? "Yes" : "No"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              lesson.isPublished
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {lesson.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => openEditModal(lesson)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(lesson._id)}
                              disabled={actionLoadingId === lesson._id}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {lessons.length === 0 && (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No lessons found for this course.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b">
                  <h3 className="text-xl font-bold">
                    {editingLesson ? "Edit Lesson" : "Create Lesson"}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {error && (
                    <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3">
                      {error}
                    </div>
                  )}

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      value={form.title}
                      onChange={(e) => handleChange("title", e.target.value)}
                      placeholder="Lesson Title"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                    <input
                      type="number"
                      value={form.order}
                      onChange={(e) => handleChange("order", Number(e.target.value))}
                      placeholder="Order"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      value={form.duration || ""}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      placeholder="Duration e.g. 15 mins"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                    <input
                      value={form.videoUrl || ""}
                      onChange={(e) => handleChange("videoUrl", e.target.value)}
                      placeholder="Video URL"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  <textarea
                    value={form.content || ""}
                    onChange={(e) => handleChange("content", e.target.value)}
                    placeholder="Lesson content"
                    rows={7}
                    className="w-full border rounded-xl px-4 py-3"
                  />

                  <div className="flex flex-wrap gap-6">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!form.isPreview}
                        onChange={(e) =>
                          handleChange("isPreview", e.target.checked)
                        }
                      />
                      <span>Preview Lesson</span>
                    </label>

                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!form.isPublished}
                        onChange={(e) =>
                          handleChange("isPublished", e.target.checked)
                        }
                      />
                      <span>Published</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3 px-6 py-5 border-t">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-5 py-3 rounded-xl border"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!!actionLoadingId}
                    className="px-6 py-3 rounded-xl bg-primary-900 text-white font-semibold disabled:opacity-60"
                  >
                    {actionLoadingId
                      ? "Saving..."
                      : editingLesson
                      ? "Update Lesson"
                      : "Create Lesson"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminLessons;