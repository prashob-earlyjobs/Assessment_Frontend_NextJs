import Footer from "../components/pages/footer";
import NavbarV2 from "../components/v2/navbar/navbar.v2";
import AgencyOnboardingClient from "../components/pages/AgencyOnboardingClient";

export default function AgencyOnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 to-white scroll-smooth flex flex-col">
      <NavbarV2 pageTitle="Agency Onboarding" showPageTitle />
      <main className="flex-1 pt-24 lg:pt-32">
        <AgencyOnboardingClient />
      </main>
      <Footer />
    </div>
  );
}
