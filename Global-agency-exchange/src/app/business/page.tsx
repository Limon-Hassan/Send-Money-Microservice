import BusinessPayments from "@/components/Business/BusinessPayments";
import BusinessSolutionsWeOffer from "@/components/Business/BusinessSolutionsWeOffer";
import GlobalTransfers from "@/components/Business/GlobalTransfers";
import HowItWorks from "@/components/Business/HowItWorks";
import IndustrySolutions from "@/components/Business/IndustrySolutions";
import MoneyTransferRoutes from "@/components/Business/MoneyTransferRoutes";
import WhyChooseUs from "@/components/Business/WhyChooseUs";
import PageBanner from "@/components/Common/PageBanner";
import Partners from "@/components/Common/Partners";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import FaqContent from "@/components/MoneyTransfer/FaqContent";
import WhatOurCustomersSay from "@/components/MoneyTransfer/WhatOurCustomersSay";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Business"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <div className="business-area ptb-120">
        <div className="container">
          <h2 className="main-title style-two text-center mb-40 mw-100">
            Advanced currency solutions for businesses with international
            operations, helping you manage risk and reduce costs.
          </h2>
          <Link href="/register-business" className="btn mx-auto">
            Open A free Business Account
          </Link>
        </div>
      </div>

      <WhyChooseUs />

      <BusinessSolutionsWeOffer />

      <HowItWorks />

      <GlobalTransfers />

      <MoneyTransferRoutes />

      <Partners />

      <IndustrySolutions />

      <WhatOurCustomersSay />

      <BusinessPayments />

      <FaqContent />

      <Footer />
    </>
  );
}
