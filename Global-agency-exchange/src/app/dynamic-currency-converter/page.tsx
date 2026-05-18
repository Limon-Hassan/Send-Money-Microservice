import PageBanner from "@/components/Common/PageBanner";
import CurrencyConverter from "@/components/DynamicCurrencyConverter/CurrencyConverter";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Dynamic Currency Converter"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <CurrencyConverter />

      <Footer />
    </>
  );
}
