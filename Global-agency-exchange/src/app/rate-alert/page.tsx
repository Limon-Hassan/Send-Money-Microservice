import DownloadTheApp from "@/components/Common/DownloadTheApp";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import HowRateAlertsWork from "@/components/RateAlert/HowRateAlertsWork";
import MarketExchangeRate from "@/components/RateAlert/MarketExchangeRate";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Rate Alert"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <MarketExchangeRate />

      <HowRateAlertsWork />

      <DownloadTheApp />

      <Footer />
    </>
  );
}
