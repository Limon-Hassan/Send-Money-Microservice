import PageBanner from "@/components/Common/PageBanner";
import LiveExchangeRates from "@/components/ExchangeRates/LiveExchangeRates";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import CurrencyConverter from "@/components/Personal/CurrencyConverter";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Exchange Rates"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <LiveExchangeRates />

      <CurrencyConverter />

      <Footer />
    </>
  );
}
