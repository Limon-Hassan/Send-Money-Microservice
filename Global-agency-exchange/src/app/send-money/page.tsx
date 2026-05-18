import PageBanner from "@/components/Common/PageBanner";
import Partners from "@/components/Common/Partners";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import SendMoneyForm from "@/components/SendMoney/SendMoneyForm";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Send Money"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <SendMoneyForm />

      <div className="pb-120">
        <Partners />
      </div>

      <Footer />
    </>
  );
}
