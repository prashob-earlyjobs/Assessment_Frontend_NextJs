import ResumeBuilderFromPDF from "../components/pages/ResumeBuilderFromPDF";
import ProtectedRoute from "../components/services/protectedRoute";
export default function Page() {
  return (
    <ProtectedRoute>
      <ResumeBuilderFromPDF />
    </ProtectedRoute>
  );
}
