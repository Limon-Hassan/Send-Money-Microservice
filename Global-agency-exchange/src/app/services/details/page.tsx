import CommonUseCases from "@/components/Common/CommonUseCases";
import FaqContent from "@/components/Common/FaqContent";
import HowItWorks from "@/components/Services/HowItWorks";
import PageBanner from "@/components/Common/PageBanner";
import PricingPlan from "@/components/Common/PricingPlan";
import WhyChooseUs from "@/components/Common/WhyChooseUs";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import ServiceDetailsContent from "@/components/Services/ServiceDetailsContent";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Service Details"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <ServiceDetailsContent />

      <WhyChooseUs />

      <HowItWorks />

      <CommonUseCases />

      <PricingPlan />

      <FaqContent />

      <Footer />
    </>
  );
}
