import PageBanner from "@/components/Common/PageBanner";
import PricingPlan from "@/components/Common/PricingPlan";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Pricing"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <PricingPlan />

      <Footer />
    </>
  );
}
