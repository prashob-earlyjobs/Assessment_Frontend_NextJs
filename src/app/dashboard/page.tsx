"use client";

import ProtectedRoute from "../components/services/protectedRoute";
import DashboardV2 from "../dashboard-v2/page";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardV2 />
    </ProtectedRoute>
  );
};

export default DashboardPage;