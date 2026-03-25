import React, { useEffect, useState } from "react";
import { Bell, Menu, Pencil, Plus, Trash2, X } from "lucide-react";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import {
  createCourse,
  deleteCourse,
  getCourses,
  updateCourse,
  type CourseApiItem,
  type CreateCoursePayload,
} from "../../services/courseService";
import { useNavigate } from "react-router";

const initialForm: CreateCoursePayload = {
  title: "",
  description: "",
  category: "Digital Assets",
  duration: "",
  thumbnail: "",
  instructor: "",
  price: 0,
  level: "beginner",
  lessonsCount: 0,
  hasCertificate: true,
  isPublished: true,
};

const AdminCourses: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [courses, setCourses] = useState<CourseApiItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<CourseApiItem | null>(null);
  const [form, setForm] = useState<CreateCoursePayload>(initialForm);
  const navigate = useNavigate();
  const currentUser = useAuthStore((state) => state.user);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getCourses();
      setCourses(response.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openCreateModal = () => {
    setEditingCourse(null);
    setForm(initialForm);
    setError("");
    setMessage("");
    setShowModal(true);
  };

  const openEditModal = (course: CourseApiItem) => {
    setEditingCourse(course);
    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      duration: course.duration,
      thumbnail: course.thumbnail || "",
      instructor: course.instructor,
      price: course.price || 0,
      level: course.level || "beginner",
      lessonsCount: course.lessonsCount || 0,
      hasCertificate: course.hasCertificate ?? true,
      isPublished: course.isPublished ?? true,
    });
    setError("");
    setMessage("");
    setShowModal(true);
  };

  const handleChange = (
    key: keyof CreateCoursePayload,
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
      setActionLoadingId(editingCourse?._id || "create");

      if (
        !form.title.trim() ||
        !form.description.trim() ||
        !form.category.trim() ||
        !form.duration.trim() ||
        !form.instructor.trim()
      ) {
        setError("Please fill in all required fields");
        return;
      }

      if (editingCourse) {
        await updateCourse(editingCourse._id, form);
        setMessage("Course updated successfully");
      } else {
        await createCourse(form);
        setMessage("Course created successfully");
      }

      setShowModal(false);
      setEditingCourse(null);
      setForm(initialForm);
      await fetchCourses();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save course");
    } finally {
      setActionLoadingId("");
    }
  };

  const handleDelete = async (courseId: string) => {
    const confirmed = window.confirm("Delete this course?");
    if (!confirmed) return;

    try {
      setActionLoadingId(courseId);
      setError("");
      setMessage("");
      await deleteCourse(courseId);
      setMessage("Course deleted successfully");
      await fetchCourses();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete course");
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
              <h2 className="text-3xl font-bold text-gray-800">
                Manage Courses — {currentUser?.fullname || "Admin"}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary-900 text-white font-semibold shadow-lg"
              >
                <Plus size={18} />
                Add Course
              </button>
              <button className="p-3 bg-white rounded-full shadow-lg">
                <Bell />
              </button>
            </div>
          </header>

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
              Loading courses...
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="text-left px-6 py-4">Title</th>
                      <th className="text-left px-6 py-4">Category</th>
                      <th className="text-left px-6 py-4">Duration</th>
                      <th className="text-left px-6 py-4">Instructor</th>
                      <th className="text-left px-6 py-4">Level</th>
                      <th className="text-left px-6 py-4">Published</th>
                      <th className="text-left px-6 py-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((course) => (
                      <tr key={course._id} className="border-t">
                        <td className="px-6 py-4 font-medium">{course.title}</td>
                        <td className="px-6 py-4 text-gray-600">{course.category}</td>
                        <td className="px-6 py-4 text-gray-600">{course.duration}</td>
                        <td className="px-6 py-4 text-gray-600">{course.instructor}</td>
                        <td className="px-6 py-4 text-gray-600">
                          {course.level || "beginner"}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              course.isPublished
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {course.isPublished ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => openEditModal(course)}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 text-blue-600 hover:bg-blue-50"
                            >
                              <Pencil size={16} />
                              Edit
                            </button>

                            <button
                              onClick={() => handleDelete(course._id)}
                              disabled={actionLoadingId === course._id}
                              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                            >
                              <Trash2 size={16} />
                              Delete
                            </button>

                            <button
                            onClick={() => navigate(`/admin/courses/${course.slug}/lessons`)}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-green-200 text-green-600 hover:bg-green-50"
                            >
                                 Manage Lessons
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {courses.length === 0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-10 text-center text-gray-500"
                        >
                          No courses found.
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
              <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl">
                <div className="flex items-center justify-between px-6 py-5 border-b">
                  <h3 className="text-xl font-bold">
                    {editingCourse ? "Edit Course" : "Create Course"}
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
                      placeholder="Course Title"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                    <input
                      value={form.instructor}
                      onChange={(e) => handleChange("instructor", e.target.value)}
                      placeholder="Instructor"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  <textarea
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    placeholder="Description"
                    rows={4}
                    className="w-full border rounded-xl px-4 py-3"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <select
                      value={form.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className="w-full border rounded-xl px-4 py-3"
                    >
                      <option value="Digital Assets">Digital Assets</option>
                      <option value="Trading">Trading</option>
                      <option value="Cybersecurity">Cybersecurity</option>
                    </select>

                    <input
                      value={form.duration}
                      onChange={(e) => handleChange("duration", e.target.value)}
                      placeholder="Duration e.g. 3hrs"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <select
                      value={form.level}
                      onChange={(e) => handleChange("level", e.target.value)}
                      className="w-full border rounded-xl px-4 py-3"
                    >
                      <option value="beginner">beginner</option>
                      <option value="intermediate">intermediate</option>
                      <option value="advanced">advanced</option>
                    </select>

                    <input
                      type="number"
                      value={form.lessonsCount || 0}
                      onChange={(e) =>
                        handleChange("lessonsCount", Number(e.target.value))
                      }
                      placeholder="Lessons Count"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={form.price || 0}
                      onChange={(e) => handleChange("price", Number(e.target.value))}
                      placeholder="Price"
                      className="w-full border rounded-xl px-4 py-3"
                    />

                    <input
                      value={form.thumbnail || ""}
                      onChange={(e) => handleChange("thumbnail", e.target.value)}
                      placeholder="Thumbnail URL"
                      className="w-full border rounded-xl px-4 py-3"
                    />
                  </div>

                  <div className="flex flex-wrap gap-6">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!form.hasCertificate}
                        onChange={(e) =>
                          handleChange("hasCertificate", e.target.checked)
                        }
                      />
                      <span>Has Certificate</span>
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
                      : editingCourse
                      ? "Update Course"
                      : "Create Course"}
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

export default AdminCourses;