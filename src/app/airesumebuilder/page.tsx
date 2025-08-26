import AIResumeBuilder from "../components/pages/AiResumeBuilder";
import ProtectedRoute from "../components/services/protectedRoute";
const AiResumeBuilderPage = () => {
  return (
    <ProtectedRoute>
      <AIResumeBuilder />
    </ProtectedRoute>
  );
};

export default AiResumeBuilderPage;