"use client";

import ProtectedRoute from "../components/services/protectedRoute";
import DashboardV2 from "../dashboard-v2/page";
import DashboardV1 from "../components/pages/Dashboard";

const DashboardPage = () => {
  return (
    <ProtectedRoute>
      {/* <DashboardV2 /> */}
      <DashboardV1 />
    </ProtectedRoute>
  );
};

export default DashboardPage;