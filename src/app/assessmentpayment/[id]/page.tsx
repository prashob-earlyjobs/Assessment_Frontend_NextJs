import Assessment from "@/app/components/pages/Assessment";
import ProtectedRoute from "../../components/services/protectedRoute";


const AssessmentPage = () => {
  return (
    <ProtectedRoute>
      <Assessment/>
    </ProtectedRoute>
  );
};
export default AssessmentPage;