import React, { useState } from 'react';
import {
 
  Bell,
  Menu,
  Download,
} from 'lucide-react';
import Sidebar from '../../component/Sidebar';

const Certification: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  
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
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-fade">

          {/* Header */}
          <header className="flex justify-between items-center mb-12">
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

          {/* Certificate */}
          <section className="relative bg-white rounded-3xl border-8 border-[#4A6B2E]
          p-8 lg:p-12 shadow-certificate animate-zoom">

            <div className="text-center space-y-8">

              <div className="flex justify-center items-center gap-3">
                <div className="w-16 h-16 bg-linear-to-br from-[#4A6B2E] to-[#6B9E3E] rounded-xl flex items-center justify-center text-white text-2xl">
                  ⚡
                </div>
                <div className="text-left">
                  <h1 className="font-mono text-2xl font-bold text-[#4A6B2E]">TIDE</h1>
                  <p className="font-mono text-sm text-gray-600">ACADEMY</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600">Certificate</p>
                <h2 className="text-2xl font-semibold">of Completion</h2>
              </div>

              <div>
                <h3 className="font-serif text-5xl font-bold">JOHN .B. CROWS</h3>
                <p className="text-gray-600 mt-2">
                  has received this award for the successful completion of this course
                </p>
              </div>

              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300"
                className="mx-auto w-32 h-32 rounded-full border-4 border-white shadow-xl object-cover"
              />

              <div className="flex justify-between max-w-lg mx-auto pt-8 border-t">
                <div>
                  <div className="w-32 h-px bg-gray-800 mb-2" />
                  <p className="text-sm font-semibold">Date of Award</p>
                </div>
                <div>
                  <div className="w-32 h-px bg-gray-800 mb-2" />
                  <p className="text-sm font-semibold">Director Signature</p>
                </div>
              </div>
            </div>
          </section>

          {/* Download */}
          <div className="flex justify-center mt-10">
            <button className="flex items-center gap-2 px-8 py-3 rounded-full
            bg-linear-to-r from-[#6B9E3E] to-[#5A8633]
            text-white font-semibold shadow-lg hover:scale-105 transition">
              <Download />
              Download Certificate
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Certification;
