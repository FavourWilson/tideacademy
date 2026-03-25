import React, { useEffect, useRef, useState } from "react";
import { Bell, Menu, Download } from "lucide-react";
import { useParams } from "react-router";
import Sidebar from "../../component/Sidebar";
import { useAuthStore } from "../../store/authStore";
import {
  getCertificateById,
  getMyCertificateByCourse,
  getMyCertificates,
  issueCertificate,
  type CertificateItem,
} from "../../services/certificateService";

const Certification: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [certificate, setCertificate] = useState<CertificateItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [issuing, setIssuing] = useState(false);
  const [error, setError] = useState("");

  const { certificateId, courseId } = useParams();
  const user = useAuthStore((state) => state.user);
  const certificateRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        setLoading(true);
        setError("");

        if (certificateId) {
          const response = await getCertificateById(certificateId);
          setCertificate(response.data);
          return;
        }

        if (courseId) {
          const response = await getMyCertificateByCourse(courseId);
          setCertificate(response.data);
          return;
        }

        const response = await getMyCertificates();
        const firstCertificate = response?.data?.[0] || null;
        setCertificate(firstCertificate);
      } catch (err: any) {
        setError(
          err?.response?.data?.message || "Failed to load certificate"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId, courseId]);

  const handleIssueCertificate = async () => {
    try {
      if (!courseId) {
        setError("No course selected for certificate issuance");
        return;
      }

      setIssuing(true);
      setError("");

      const response = await issueCertificate(courseId);
      setCertificate(response.data);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || "Failed to issue certificate"
      );
    } finally {
      setIssuing(false);
    }
  };

  const handleDownload = () => {
    window.print();
  };

  const displayName =
    certificate?.user?.fullname || user?.fullname || "Student Name";

  const courseTitle =
    certificate?.course?.title || "Course Title";

  const awardDate = certificate?.issuedAt
    ? new Date(certificate.issuedAt).toLocaleDateString()
    : "--/--/----";

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
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade">
          <header className="flex justify-between items-center mb-12">
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

          {loading ? (
            <div className="bg-white rounded-3xl p-10 shadow text-center text-gray-500">
              Loading certificate...
            </div>
          ) : error ? (
            <div className="bg-white rounded-3xl p-10 shadow text-center">
              <p className="text-red-500 font-medium mb-6">{error}</p>

              {courseId && (
                <button
                  onClick={handleIssueCertificate}
                  disabled={issuing}
                  className="px-8 py-3 rounded-full bg-gradient-to-r from-[#6B9E3E] to-[#5A8633] text-white font-semibold disabled:opacity-60"
                >
                  {issuing ? "Issuing..." : "Issue Certificate"}
                </button>
              )}
            </div>
          ) : !certificate ? (
            <div className="bg-white rounded-3xl p-10 shadow text-center text-gray-500">
              No certificate available yet.
            </div>
          ) : (
            <>
              <section
                ref={certificateRef}
                className="relative bg-white rounded-3xl border-8 border-[#4A6B2E] p-8 lg:p-12 shadow-certificate animate-zoom"
              >
                <div className="text-center space-y-8">
                  <div className="flex justify-center items-center gap-3">
                    <div className="w-16 h-16 bg-linear-to-br from-[#4A6B2E] to-[#6B9E3E] rounded-xl flex items-center justify-center text-white text-2xl">
                      ⚡
                    </div>
                    <div className="text-left">
                      <h1 className="font-mono text-2xl font-bold text-[#4A6B2E]">
                        TIDE
                      </h1>
                      <p className="font-mono text-sm text-gray-600">ACADEMY</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-600">Certificate</p>
                    <h2 className="text-2xl font-semibold">of Completion</h2>
                  </div>

                  <div>
                    <h3 className="font-serif text-4xl lg:text-5xl font-bold uppercase">
                      {displayName}
                    </h3>
                    <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
                      has received this award for the successful completion of the course{" "}
                      <span className="font-semibold">{courseTitle}</span>
                    </p>
                  </div>

                  <div className="mx-auto w-32 h-32 rounded-full border-4 border-white shadow-xl bg-slate-100 flex items-center justify-center text-3xl font-bold text-[#4A6B2E]">
                    {displayName?.charAt(0) || "T"}
                  </div>

                  <div className="text-sm text-gray-500">
                    Certificate No: {certificate.certificateNumber}
                  </div>

                  <div className="flex justify-between max-w-lg mx-auto pt-8 border-t gap-8">
                    <div>
                      <div className="w-32 h-px bg-gray-800 mb-2" />
                      <p className="text-sm font-semibold">Date of Award</p>
                      <p className="text-xs text-gray-500 mt-1">{awardDate}</p>
                    </div>
                    <div>
                      <div className="w-32 h-px bg-gray-800 mb-2" />
                      <p className="text-sm font-semibold">Director Signature</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="flex justify-center mt-10">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 px-8 py-3 rounded-full bg-linear-to-r from-[#6B9E3E] to-[#5A8633] text-white font-semibold shadow-lg hover:scale-105 transition"
                >
                  <Download />
                  Download Certificate
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Certification;
