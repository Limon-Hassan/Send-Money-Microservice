import CustomerFeedbacks from "@/components/Common/CustomerFeedbacks";
import MoneyTransferRoutes from "@/components/Common/MoneyTransferRoutes";
import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import BestRates from "@/components/Personal/BestRates";
import ChooseYourPlan from "@/components/Personal/ChooseYourPlan";
import CurrencyConverter from "@/components/Personal/CurrencyConverter";
import MoneyTransferFeatures from "@/components/Personal/MoneyTransferFeatures";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Personal"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <MoneyTransferFeatures />

      <CurrencyConverter />

      <ChooseYourPlan />

      <div className="pt-120">
        <MoneyTransferRoutes />
      </div>

      <CustomerFeedbacks />

      <BestRates />

      <Footer />
    </>
  );
}
