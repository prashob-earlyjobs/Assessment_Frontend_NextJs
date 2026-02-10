import Results from "../components/pages/Results";
import ProtectedRoute from "../components/services/protectedRoute";


const ResultsPage = () => {
  return (
    <ProtectedRoute>
      <Results/>
    </ProtectedRoute>
  );
};
export default ResultsPage;