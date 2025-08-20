import MyResumes from "../components/pages/ResumesList";
import ProtectedRoute from "../components/services/protectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <MyResumes />
    </ProtectedRoute>
  );
}
