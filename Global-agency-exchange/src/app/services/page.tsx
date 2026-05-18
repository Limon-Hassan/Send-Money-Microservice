import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import ServicesLists from "@/components/Services/ServicesLists";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Our Services"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <ServicesLists />

      <Footer />
    </>
  );
}
