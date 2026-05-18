import AboutContent from "@/components/AboutUs/AboutContent";
import PageBanner from "@/components/Common/PageBanner"; 
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar"; 
import FunFacts from "@/components/Common/FunFacts";
import SecurityAndBenefits from "@/components/AboutUs/SecurityAndBenefits";
import ChooseYourPlan from "@/components/AboutUs/ChooseYourPlan";
import Partners from "@/components/Common/Partners";
import CustomerFeedbacks from "@/components/Common/CustomerFeedbacks";
import ExperiencedLeadershipTeam from "@/components/Common/ExperiencedLeadershipTeam";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="About Us"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <AboutContent />

      <FunFacts />

      <SecurityAndBenefits />

      <ChooseYourPlan />

      <Partners />

      <CustomerFeedbacks />

      <ExperiencedLeadershipTeam />

      <Footer />
    </>
  );
}
