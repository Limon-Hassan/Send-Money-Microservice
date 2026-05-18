import PageBanner from "@/components/Common/PageBanner";
import FaqContent from "@/components/Faq/FaqContent";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="FAQ's"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <FaqContent />

      <Footer />
    </>
  );
}
