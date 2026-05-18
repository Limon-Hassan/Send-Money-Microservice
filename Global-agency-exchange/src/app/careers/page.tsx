import BuildYourCareer from "@/components/Careers/BuildYourCareer";
import CareerContent from "@/components/Careers/CareerContent";
import CorePrinciples from "@/components/Careers/CorePrinciples";
import OurCulture from "@/components/Careers/OurCulture";
import WhyWorkWithUs from "@/components/Careers/WhyWorkWithUs";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Careers"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <BuildYourCareer />

      <WhyWorkWithUs />

      <OurCulture />

      <CareerContent />

      <CorePrinciples />

      <Footer />
    </>
  );
}
