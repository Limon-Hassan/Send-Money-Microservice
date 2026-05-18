import PricingPlan from "@/components/Common/PricingPlan";
import AboutContent from "@/components/OnlinePayment/AboutContent";
import AnimatedText from "@/components/OnlinePayment/AnimatedText";
import ChooseYourPlan from "@/components/OnlinePayment/ChooseYourPlan";
import FaqContent from "@/components/Common/FaqContent";
import Footer from "@/components/OnlinePayment/Footer";
import FunFacts from "@/components/Common/FunFacts";
import HeroBanner from "@/components/OnlinePayment/HeroBanner";
import HowItWorks from "@/components/OnlinePayment/HowItWorks";
import HowPeopleUse from "@/components/OnlinePayment/HowPeopleUse";
import LovedByCustomersWorldwide from "@/components/OnlinePayment/LovedByCustomersWorldwide";
import MobileApp from "@/components/OnlinePayment/MobileApp";
import Navbar from "@/components/OnlinePayment/Navbar";
import Partners from "@/components/OnlinePayment/Partners";
import SimplifyPaymentsCTA from "@/components/OnlinePayment/SimplifyPaymentsCTA";
import SolutionsForEveryone from "@/components/OnlinePayment/SolutionsForEveryone";

export default function Page() {
  return (
    <>
      <Navbar />

      <HeroBanner />

      <Partners />

      <ChooseYourPlan />

      <AboutContent />

      <FunFacts />

      <HowItWorks />

      <AnimatedText />

      <SolutionsForEveryone />

      <HowPeopleUse />

      <PricingPlan />

      <LovedByCustomersWorldwide />

      <MobileApp />

      <FaqContent />

      <div className="bg-secondary">
        <SimplifyPaymentsCTA />

        <Footer />
      </div>
    </>
  );
}
