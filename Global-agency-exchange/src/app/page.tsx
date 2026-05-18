import AboutContent from "@/components/CurrencyExchange/AboutContent";
import AdvancedSecurityMeasures from "@/components/CurrencyExchange/AdvancedSecurityMeasures";
import AnimatedText from "@/components/CurrencyExchange/AnimatedText";
import BlogPosts from "@/components/CurrencyExchange/BlogPosts";
import CurrencyExchangeCTA from "@/components/CurrencyExchange/CurrencyExchangeCTA";
import Footer from "@/components/CurrencyExchange/Footer";
import GlobalTransfers from "@/components/CurrencyExchange/GlobalTransfers";
import HeroBanner from "@/components/CurrencyExchange/HeroBanner";
import HowCurrencyExchangeWorks from "@/components/CurrencyExchange/HowCurrencyExchangeWorks";
import Navbar from "@/components/CurrencyExchange/Navbar";
import Services from "@/components/CurrencyExchange/Services";
import WhatOurCustomersSay from "@/components/CurrencyExchange/WhatOurCustomersSay";
import WhyChooseUs from "@/components/CurrencyExchange/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Navbar />

      <HeroBanner />

      <HowCurrencyExchangeWorks />

      <AboutContent />

      <AnimatedText />

      <Services />

      <GlobalTransfers />

      <WhyChooseUs />

      <AdvancedSecurityMeasures />

      <WhatOurCustomersSay />

      <BlogPosts />

      <CurrencyExchangeCTA />

      <Footer />
    </>
  );
}
