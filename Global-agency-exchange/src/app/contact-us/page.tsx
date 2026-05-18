import PageBanner from "@/components/Common/PageBanner";
import ContactForm from "@/components/ContactUs/ContactForm";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Contact Us"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <ContactForm />

      <Footer />
    </>
  );
}
