import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import TestimonialsContent from "@/components/Testimonials/TestimonialsContent";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Testimonials"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <TestimonialsContent />

      <Footer />
    </>
  );
}
