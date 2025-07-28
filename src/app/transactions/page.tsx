import Transactions from "../components/pages/transactions";
import ProtectedRoute from "../components/services/protectedRoute";


const TransactionsPage = () => {
  return (
    <ProtectedRoute>
      <Transactions/>
    </ProtectedRoute>
  );
};
export default TransactionsPage;