import AiResumeDashboard from "../components/pages/AiResumeDashboard";
import ProtectedRoute from "../components/services/protectedRoute";

const AiResumePage = () => {
  return (
    <ProtectedRoute>
      <AiResumeDashboard />
    </ProtectedRoute>
  );
};

export default AiResumePage;
