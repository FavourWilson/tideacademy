import React, { useState } from 'react';
import { Bell, Menu, Clock } from 'lucide-react';
import Sidebar from '../../component/Sidebar';

interface Course {
  id: number;
  title: string;
  subtitle: string;
  duration: string;
  category: string;
}

const Courses: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('All Courses');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const courses: Course[] = [
    {
      id: 1,
      title: 'Digital Assets',
      subtitle: 'Demystifying Digital Assets',
      duration: '3hrs',
      category: 'Digital Assets'
    },
    {
      id: 2,
      title: 'Trading & Investing',
      subtitle: 'Foundations of Crypto Markets',
      duration: '5hrs',
      category: 'Trading'
    },
    {
      id: 3,
      title: 'Cybersecurity',
      subtitle: 'Financial Digital Security',
      duration: '3hrs',
      category: 'Cybersecurity'
    }
  ];

  const tabs = ['All Courses', 'Digital Assets', 'Trading', 'Cybersecurity'];



  const filteredCourses = activeTab === 'All Courses' 
    ? courses 
    : courses.filter(course => course.category === activeTab);

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 font-sans overflow-hidden">
   

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="overlay fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 overflow-auto w-full">
        <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 fade-in">
          {/* Header */}
          <div className="flex justify-between items-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-4">
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome John,</h2>
            </div>
            <button className="notification-bell p-2 sm:p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:bg-gray-50">
              <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
            </button>
          </div>

          {/* Page Title */}
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">List of Courses</h3>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 sm:mb-8 border-b border-gray-200 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(tab)}
                className={`tab-button px-3 sm:px-6 py-3 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap ${
                  activeTab === tab
                    ? 'active text-[#6B9E3E]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Course Cards */}
          <div className="space-y-4">
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                className="course-card flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-md gap-4"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-1 w-full sm:w-auto">
                  <h4 className="text-base sm:text-lg font-bold text-gray-800 mb-1">{course.title}</h4>
                  <p className="text-xs sm:text-sm text-gray-500">{course.subtitle}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-4 sm:space-x-6">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs sm:text-sm font-medium">{course.duration}</span>
                  </div>
                  <button className="bg-primary-900 px-6 sm:px-8 py-2.5 sm:py-3 text-white rounded-full font-semibold shadow-lg hover:shadow-xl text-xs sm:text-sm whitespace-nowrap">
                    View Course
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;