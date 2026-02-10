import CandidatesPage from "@/app/components/pages/admin/CandidatesPage";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";


const CandidatesPagePage = () => {
  return (
    <ProtectedRouteForAdmin>
      <CandidatesPage/>
    </ProtectedRouteForAdmin>
  );
};
export default CandidatesPagePage;