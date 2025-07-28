"use client";
import Dashboard from "../components/pages/Dashboard";
import ProtectedRoute from "../components/services/protectedRoute";


const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>
  );
};
export default DashboardPage;