import PageBanner from "@/components/Common/PageBanner"; 
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import TeamMembers from "@/components/Team/TeamMembers";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Team"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <TeamMembers />

      <Footer />
    </>
  );
}
