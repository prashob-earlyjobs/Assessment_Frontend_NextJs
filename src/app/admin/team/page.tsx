import TeamMemberPage from "@/app/components/pages/admin/TeamMembersPage";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";


const TeamMembersPageWrapper = () => {
  return (
    <ProtectedRouteForAdmin>
      <TeamMemberPage adminEmail="info@earlyjobs.in"/>
    </ProtectedRouteForAdmin>
  );
};
export default TeamMembersPageWrapper;