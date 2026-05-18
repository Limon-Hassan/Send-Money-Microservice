import Partners from "@/components/Common/Partners";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/MoneyTransfer/Navbar";
import AnimatedText from "@/components/MoneyTransfer/AnimatedText";
import ChooseYourPlan from "@/components/MoneyTransfer/ChooseYourPlan";
import FaqContent from "@/components/MoneyTransfer/FaqContent";
import GlobalTransfers from "@/components/MoneyTransfer/GlobalTransfers";
import HeroBanner from "@/components/MoneyTransfer/HeroBanner";
import HowToSendMoney from "@/components/MoneyTransfer/HowToSendMoney";
import MobileApp from "@/components/MoneyTransfer/MobileApp";
import MoneyTransferRoutes from "@/components/Common/MoneyTransferRoutes";
import WhatOurCustomersSay from "@/components/MoneyTransfer/WhatOurCustomersSay";
import WhoWeAre from "@/components/MoneyTransfer/WhoWeAre";
import WhyChooseUs from "@/components/Common/WhyChooseUs";
import TopHeader from "@/components/MoneyTransfer/TopHeader";

export default function Page() {
  return (
    <>
      <TopHeader />

      <Navbar />

      <HeroBanner />

      <HowToSendMoney />

      <WhoWeAre />

      <WhyChooseUs />

      <AnimatedText />

      <GlobalTransfers />

      <MoneyTransferRoutes />

      <ChooseYourPlan />

      <MobileApp />

      <WhatOurCustomersSay />

      <Partners />

      <FaqContent />

      <Footer />
    </>
  );
}
