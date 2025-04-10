import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Dashboard Container */}
      <div className="max-w-6xl mx-auto">
        {/* Welcome Section */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Welcome to Your Dashboard
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Total Projects
            </h2>
            <p className="text-3xl font-bold text-blue-600">12</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Active Tasks
            </h2>
            <p className="text-3xl font-bold text-green-600">8</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Team Members
            </h2>
            <p className="text-3xl font-bold text-purple-600">5</p>
          </div>
        </div>

        {/* Placeholder for More */}
        <div className="mt-10">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Recent Activity
          </h3>
          <div className="bg-white p-4 rounded-xl shadow-md text-gray-600">
            <p>No recent activity to display.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
