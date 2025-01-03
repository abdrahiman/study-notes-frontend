"use client";
import React, { useState } from "react";
import {
  Users,
  BookOpen,
  FileText,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Home,
  Settings,
  UserPlus,
  Trash2,
  Edit,
  Moon,
  Sun,
  Mail,
} from "lucide-react";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  // Sample data
  const [users] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "student",
      status: "active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "teacher",
      status: "active",
    },
  ]);

  const [lessons] = useState([
    {
      id: 1,
      title: "Biology 101",
      subject: "Biology",
      teacher: "Jane Smith",
      status: "active",
      students: 25,
    },
    {
      id: 2,
      title: "Chemistry Basics",
      subject: "Chemistry",
      teacher: "Mike Johnson",
      status: "active",
      students: 30,
    },
  ]);

  const [submissions] = useState([
    {
      id: 1,
      title: "Biology Notes Ch.1",
      student: "John Doe",
      lesson: "Biology 101",
      status: "accepted",
    },
    {
      id: 2,
      title: "Chemistry Equations",
      student: "Sarah Chen",
      lesson: "Chemistry Basics",
      status: "pending",
    },
  ]);

  const navItems = [
    { icon: Home, label: "لوحة التحكم", id: "dashboard" },
    { icon: Users, label: "المستخمين", id: "users" },
    { icon: BookOpen, label: "الدروس", id: "lessons" },
    { icon: FileText, label: "الطلبات", id: "submissions" },
    { icon: Settings, label: "الاعدادات", id: "settings" },
  ];

  // Sidebar component
  const Sidebar = () => (
    <div
      className={`fixed top-0 right-0 h-full bg-white border-r border-gray-200 transition-all duration-300 ease-in-out z-20
      ${isSidebarCollapsed ? "w-16" : "w-64"}`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div
          className={`flex items-center p-4 ${
            isSidebarCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isSidebarCollapsed && (
            <h1 className="text-xl font-bold text-gray-800">خلاصة</h1>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100"
          >
            {isSidebarCollapsed ? (
              <ChevronRight className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronLeft className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 px-3 py-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex gap-2 items-center space-x-3 px-3 py-3 mb-2 rounded-lg transition-colors
                ${
                  activeSection === item.id
                    ? "bg-violet-50 text-violet-600"
                    : "text-gray-600 hover:bg-gray-50"
                }
                ${isSidebarCollapsed ? "justify-center" : ""}`}
              title={isSidebarCollapsed ? item.label : ""}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isSidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="p-3 border-t">
          <button
            className={`w-full flex items-center gap-2 space-x-3 px-3 py-3 text-gray-600 hover:bg-gray-50 rounded-lg
            ${isSidebarCollapsed ? "justify-center" : ""}`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!isSidebarCollapsed && <span>تسجيل الخروج</span>}
          </button>
        </div>
      </div>
    </div>
  );

  // Settings Content Component
  const SettingsContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">اعدادات الملف</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الاسم
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="Admin User"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              البريد الاكتبروني
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="admin@example.com"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">اعدادات المضهر</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {darkMode ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
            <span>الوضع اليلي</span>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              darkMode ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                darkMode ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Notifications</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Email Notifications</span>
          </div>
          <button
            onClick={() => setEmailNotifications(!emailNotifications)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              emailNotifications ? "bg-blue-600" : "bg-gray-200"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                emailNotifications ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );

  // Dashboard overview component
  const DashboardOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">عدد المستخدمين</h3>
        <p className="text-3xl font-bold text-blue-600">{452}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">الدروس المنشورة</h3>
        <p className="text-3xl font-bold text-green-600">{122}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">الطلبات المعلقة</h3>
        <p className="text-3xl font-bold text-yellow-600">{999}</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "settings":
        return <SettingsContent />;
      case "dashboard":
        return <DashboardOverview />;
      case "users":
        return (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Users</h2>
                <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add User
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 text-sm">{user.name}</td>
                      <td className="px-6 py-4 text-sm">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-600">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-600">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Edit className="h-4 w-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-red-100 rounded">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      // Add other cases as needed
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main
        className={`transition-all duration-300 ease-in-out ${
          isSidebarCollapsed ? "mr-16" : "mr-64"
        } p-6`}
      >
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {navItems.find((item) => item.id === activeSection)?.label}
            </h1>
          </header>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
