import Profile from "../components/pages/Profile";
import ProtectedRoute from "../components/services/protectedRoute";


const ProfilePage = () => {
  return (
    <ProtectedRoute>
      <Profile/>
    </ProtectedRoute>
  );
};
export default ProfilePage;