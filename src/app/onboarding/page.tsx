import Onboarding from "../components/pages/Onboarding";
import ProtectedRoute from "../components/services/protectedRoute";


const OnboardingPage = () => {
  return (
    <ProtectedRoute>
      <Onboarding/>
    </ProtectedRoute>
  );
};
export default OnboardingPage;