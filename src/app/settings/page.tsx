"use client";

import Settings from "../components/pages/Settings";
import ProtectedRoute from "../components/services/protectedRoute";

const SettingsPage = () => {
  return (
    <ProtectedRoute>
      <Settings/>
    </ProtectedRoute>
  );
};

export default SettingsPage;
