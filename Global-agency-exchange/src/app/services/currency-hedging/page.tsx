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
    const comparison = [
        { label: "Where you exchange", branch: "Queue at a branch", us: "Anywhere, from your phone or laptop" },
        { label: "Rate visibility", branch: "Posted rate, often stale", us: "Live mid-market rate, updated by the second" },
        { label: "Turnaround", branch: "Same-day at best", us: "Seconds to execute once you confirm" },
        { label: "Rate alerts", branch: "Not available", us: "Set a target rate, get notified instantly" },
        { label: "Record keeping", branch: "Paper receipt", us: "Full digital history, exportable anytime" },
    ];

    const toolkit = [
        {
            title: "Rate watch",
            body: "Set the rate you want and we'll alert you by email or push notification the moment the market hits it — no need to check the screen every hour.",
        },
        {
            title: "Trend charts",
            body: "Pull up 30-day, 6-month, or multi-year charts for any currency pair to understand whether now is a good time to move, or worth waiting out.",
        },
        {
            title: "One account, many currencies",
            body: "Hold balances in multiple currencies inside the same account and convert between them only when the rate works in your favor.",
        },
    ];

    return (
        <>
            <Navbar />

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="Online Foreign Exchange"
                phoneNumber="+44 (0506) 258 7485"
                email="information@expa.com"
            />

            {/* Hero */}
            <div className="services-details-area ptb-120">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <span className="sub-title">Online Foreign Exchange</span>
                            <h2 className="main-title mb-20">
                                The exchange desk, minus the desk
                            </h2>
                            <p>
                                A currency exchange used to mean a trip to a branch, a wait
                                in line, and a rate you had no real way to verify. None of
                                that is necessary anymore. Our platform gives you the same
                                live market access that institutional traders use, wrapped
                                in an interface built for everyday decisions — pay an
                                overseas invoice, move savings between currencies, or simply
                                watch the market until the timing is right.
                            </p>
                            <Link href="/register" className="btn mt-3">
                                Open an Account
                            </Link>
                        </div>
                        <div className="col-lg-6">
                            <img
                                src={img("laptop,finance,chart")}
                                alt="Online currency exchange dashboard"
                                width={700}
                                height={520}
                                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Comparison table */}
            <div className="ptb-120 bg-secondary">
                <div className="container">
                    <h2 className="main-title style-two text-center mb-50">
                        Branch exchange vs. our platform
                    </h2>
                    <div className="table-responsive">
                        <table className="table mb-0">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Traditional branch</th>
                                    <th>Our platform</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparison.map((row, i) => (
                                    <tr key={i}>
                                        <td className="fw-semibold">{row.label}</td>
                                        <td>{row.branch}</td>
                                        <td>{row.us}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Toolkit — text-led, no icon grid this time */}
            <div className="ptb-120">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-5">
                            <img
                                src={img("stock,market,trading,screen")}
                                alt="Currency rate trend charts"
                                width={600}
                                height={700}
                                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                            />
                        </div>
                        <div className="col-lg-7">
                            <h3 className="mb-30">What you actually get inside the account</h3>
                            {toolkit.map((t, i) => (
                                <div key={i} className="mb-30">
                                    <h5>{t.title}</h5>
                                    <p className="mb-0">{t.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Partners />
            <WhatOurCustomersSay />
            <FaqContent />

            <div className="cta-area ptb-120 text-center">
                <div className="container">
                    <h2 className="main-title mb-20">See today's rate before you decide anything</h2>
                    <p className="mw-600 mx-auto mb-30">
                        No commitment to check — open the rate screen and look around.
                    </p>
                    <Link href="/register" className="btn mx-auto">
                        View Live Rates
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
}