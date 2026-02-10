import UsersPage from "@/app/components/pages/admin/UsersPage";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";


const UsersPagePage = () => {
  return (
    <ProtectedRouteForAdmin>
      <UsersPage/>
    </ProtectedRouteForAdmin>
  );
};
export default UsersPagePage;