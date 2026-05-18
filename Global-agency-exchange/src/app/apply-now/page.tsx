import ApplicationForm from "@/components/Careers/ApplicationForm";
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
        pageTitle="Apply Now"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <ApplicationForm />

      <Footer />
    </>
  );
}
