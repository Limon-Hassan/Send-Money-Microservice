import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Partners from "@/components/Common/Partners";
import FaqContent from "@/components/MoneyTransfer/FaqContent";
import WhatOurCustomersSay from "@/components/MoneyTransfer/WhatOurCustomersSay";
import Link from "next/link";

const img = (keywords: string, w = 700, h = 520) =>
    `https://loremflickr.com/${w}/${h}/${keywords}`;

export default function Page() {
    const useCases = [
        {
            who: "Importers paying overseas suppliers",
            need: "Reliable same-day delivery to keep production schedules from slipping.",
        },
        {
            who: "Companies with remote international teams",
            need: "Batch payroll runs across multiple currencies without manual entry for every employee.",
        },
        {
            who: "Agencies billing clients abroad",
            need: "Clear tracking so finance can confirm a payment landed without chasing the client.",
        },
        {
            who: "Franchises and multi-country operations",
            need: "One dashboard to send and reconcile payments across every subsidiary at once.",
        },
    ];

    return (
        <>
            <Navbar />

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="International Payments"
                phoneNumber="+44 (0506) 258 7485"
                email="information@expa.com"
            />

            {/* Hero */}
            <div className="services-details-area ptb-120">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-7">
                            <span className="sub-title">International Payments</span>
                            <h2 className="main-title mb-20">
                                Payments that don't slow down because a border is involved
                            </h2>
                            <p>
                                A single late payment to an overseas supplier can stall a
                                shipment. A delayed payroll run can strain trust with a
                                remote team. Traditional international wires were built for
                                occasional use, not for businesses sending dozens of
                                cross-border payments every week — which is exactly the gap
                                our payments platform is built to close.
                            </p>
                            <p>
                                Send a single payment or upload a batch file covering
                                hundreds of recipients across different countries and
                                currencies, and track every one of them from submission to
                                confirmation, all from a single dashboard.
                            </p>
                        </div>
                        <div className="col-lg-5">
                            <img
                                src={img("world,map,network,global")}
                                alt="Global payment network connections"
                                width={700}
                                height={520}
                                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Use case rows - table-like list instead of icon grid */}
            <div className="ptb-120 bg-secondary">
                <div className="container">
                    <h2 className="main-title style-two text-center mb-50">
                        Built around how different teams actually pay
                    </h2>
                    <div className="row g-4">
                        {useCases.map((u, i) => (
                            <div key={i} className="col-lg-6">
                                <div className="d-flex gap-3 p-4 h-100 border rounded-3">
                                    <span className="fw-bold">{`0${i + 1}`}</span>
                                    <div>
                                        <h5 className="mb-2">{u.who}</h5>
                                        <p className="mb-0">{u.need}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Vertical process timeline */}
            <div className="ptb-120">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <img
                                src={img("warehouse,logistics,supply,chain")}
                                alt="Supplier payment process in action"
                                width={700}
                                height={520}
                                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                            />
                        </div>
                        <div className="col-lg-6">
                            <h3 className="mb-30">From submission to settlement</h3>
                            <ol className="ps-3">
                                <li className="mb-3">
                                    <strong>Submit:</strong> Send one payment or upload a batch
                                    file with every recipient's details.
                                </li>
                                <li className="mb-3">
                                    <strong>Verify:</strong> Our system checks recipient details
                                    and flags anything that needs a second look before funds move.
                                </li>
                                <li className="mb-3">
                                    <strong>Process:</strong> Payments route through local
                                    banking networks in the destination country for faster delivery.
                                </li>
                                <li className="mb-0">
                                    <strong>Confirm:</strong> You get a real-time status update
                                    the moment each payment lands, ready for reconciliation.
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>

            <Partners />
            <WhatOurCustomersSay />
            <FaqContent />

            <div className="cta-area ptb-120 text-center">
                <div className="container">
                    <h2 className="main-title mb-20">Stop letting borders slow down payday</h2>
                    <p className="mw-600 mx-auto mb-30">
                        Set up your business account and send your first international
                        payment today.
                    </p>
                    <Link href="/register-business" className="btn mx-auto">
                        Open a Business Account
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
}