import AssessmentsPage from "../../components/pages/admin/AssessmentsPage";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";


const AssessmentsPagePage = () => {
  return (
    <ProtectedRouteForAdmin>
      <AssessmentsPage/>
    </ProtectedRouteForAdmin>
  );
};
export default AssessmentsPagePage;