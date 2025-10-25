import MultiStepForm from "../components/pages/applyform"
import Navbar from "../components/pages/navbar"
import Footer from "../components/pages/footer"
import Header from "../components/pages/header"
const page=()=>{
    return(
        <>
        <Navbar/>
        <div className="px-4 md:px-10 lg:px-25">
          <MultiStepForm/>
        </div>
        <Footer/>
        </>
    )
}
export default page;