import CollegeTieupsPage from "@/app/components/pages/admin/CollegeTieupsPage";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";

const CollegeTieupsPageWrapper = () => {
  return (
    <ProtectedRouteForAdmin>
      <CollegeTieupsPage />
    </ProtectedRouteForAdmin>
  );
};

export default CollegeTieupsPageWrapper;

