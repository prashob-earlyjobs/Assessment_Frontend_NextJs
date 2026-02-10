import AdminDashboard from "../components/pages/admin/AdminDashboard";
import ProtectedRouteForAdmin from "../components/services/protectedRouteForAdmin";


const AdminDashboardPage = () => {
  return (
    <ProtectedRouteForAdmin>
      <AdminDashboard/>
    </ProtectedRouteForAdmin>
  );
};
export default AdminDashboardPage;