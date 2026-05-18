import PageBanner from "@/components/Common/PageBanner";
import EurUsdExchangeRateHistory from "@/components/HistoricalExchangeRates/EurUsdExchangeRateHistory";
import ExchangeRateHistory from "@/components/HistoricalExchangeRates/ExchangeRateHistory";
import HistoricalData from "@/components/HistoricalExchangeRates/HistoricalData";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Historical Exchange Rates"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <ExchangeRateHistory />

      <EurUsdExchangeRateHistory />

      <HistoricalData />

      <Footer />
    </>
  );
}
