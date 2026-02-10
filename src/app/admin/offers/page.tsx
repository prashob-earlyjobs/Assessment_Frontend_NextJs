import Offers from "@/app/components/pages/admin/Offers";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";


const OffersPage = () => {
  return (
    <ProtectedRouteForAdmin>
      <Offers/>
    </ProtectedRouteForAdmin>
  );
};
export default OffersPage;