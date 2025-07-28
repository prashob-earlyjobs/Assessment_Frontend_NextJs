import FranchisesPage from "@/app/components/pages/admin/FranchisesPage";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";


const FranchisesPagePage = () => {
  return (
    <ProtectedRouteForAdmin>
      <FranchisesPage/>
    </ProtectedRouteForAdmin>
  );
};
export default FranchisesPagePage;