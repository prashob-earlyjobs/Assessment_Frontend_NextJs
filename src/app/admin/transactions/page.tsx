import TransactionsForAdmin from "@/app/components/pages/admin/transactions";
import ProtectedRouteForAdmin from "../../components/services/protectedRouteForAdmin";


const TransactionsForAdminPage = () => {
  return (
    <ProtectedRouteForAdmin>
      <TransactionsForAdmin/>
    </ProtectedRouteForAdmin>
  );
};
export default TransactionsForAdminPage;