import Header from "../../components/pages/header";
import Footer from "../../components/pages/footer";
import Navbar from '../../components/pages/navbar';
import Sikar from "../../components/FranchiseSikar/Sikar";

export default function SikarFranchise() {
    return (
        <div className="bg-[#FAF9F6]">
            {/* Added a light background color matching the design over the entire layout wrapper */}
            <Navbar />
            <Header />
            <Sikar />
            <Footer />
        </div>
    );
}
