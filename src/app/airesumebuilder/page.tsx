import AIResumeBuilder from "../components/pages/JDEBuilder";
import ProtectedRoute from "../components/services/protectedRoute";
const AiResumeBuilderPage = () => {
  return (
    <ProtectedRoute>
      <AIResumeBuilder />
    </ProtectedRoute>
  );
};

export default AiResumeBuilderPage;