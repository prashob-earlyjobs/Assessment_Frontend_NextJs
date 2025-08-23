import JDE from "../components/pages/JDE";
import ProtectedRoute from "../components/services/protectedRoute";

export default function Page() {
  return (
    <ProtectedRoute>
      <JDE />
    </ProtectedRoute>
  );
}
