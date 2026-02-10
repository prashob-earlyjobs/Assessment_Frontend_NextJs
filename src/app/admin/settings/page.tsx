import SettingsPage from "@/app/components/pages/admin/SettingsPage";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";


const SettingsPagePage = () => {
  return (
    <ProtectedRouteForAdmin>
      <SettingsPage/>
    </ProtectedRouteForAdmin>
  );
};
export default SettingsPagePage;