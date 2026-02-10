import ResumeBuilder from "../components/pages/ResumeBuilder";
import ProtectedRoute from "../components/services/protectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <ResumeBuilder />
    </ProtectedRoute>
  );
}
