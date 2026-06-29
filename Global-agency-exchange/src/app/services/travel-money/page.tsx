import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";
import PageBanner from "@/components/Common/PageBanner";
import Partners from "@/components/Common/Partners";
import FaqContent from "@/components/MoneyTransfer/FaqContent";
import WhatOurCustomersSay from "@/components/MoneyTransfer/WhatOurCustomersSay";
import Link from "next/link";

/**
 * Images are pulled live from LoremFlickr (free, keyword-based, no API key)
 * by tag. Nothing is stored inside the project — change the keyword
 * string anywhere below to swap the photo.
 */
const img = (keywords: string, w = 700, h = 520) =>
    `https://loremflickr.com/${w}/${h}/${keywords}`;

export default function Page() {
    const stats = [
        { value: "60+", label: "Currencies on offer" },
        { value: "24hr", label: "Fastest delivery window" },
        { value: "0%", label: "Hidden markup on our quoted rate" },
        { value: "30 days", label: "Buy-back window on unused cash" },
    ];

    const reasons = [
        {
            title: "The airport kiosk isn't your only option",
            body:
                "Most travelers exchange money at the last possible moment, usually at the worst possible rate. Ordering ahead online means you lock in a rate days before departure, while the kiosk at the gate is still marking its rate up by 8-10% over the real market price.",
        },
        {
            title: "Delivery that fits your schedule, not ours",
            body:
                "Choose a courier drop-off at home or work, or collect from a partner branch on your way to the airport. Either way, your order is tracked end-to-end and insured until it reaches your hands.",
        },
        {
            title: "A safety net if plans change",
            body:
                "Trips get cancelled and itineraries shift. Bring back whatever you didn't spend within 30 days and we'll buy it back at a fair rate — you're never stuck holding currency you can't use.",
        },
    ];

    return (
        <>
            <Navbar />

            <PageBanner
                homePageUrl="/"
                homePageText="Home"
                pageTitle="Travel Money"
                phoneNumber="+44 (0506) 258 7485"
                email="information@expa.com"
            />

            {/* Hero narrative */}
            <div className="services-details-area ptb-120">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-7">
                            <span className="sub-title">Travel Money</span>
                            <h2 className="main-title mb-20">
                                Land with cash in hand, not regrets about the rate
                            </h2>
                            <p>
                                Every year, travelers hand over millions in unnecessary fees
                                simply because they exchanged money in the wrong place at
                                the wrong time. A currency counter at the airport knows
                                you're in a hurry — and prices accordingly. Ordering your
                                travel money online removes that pressure entirely. You see
                                the real rate, you decide when to lock it, and your currency
                                shows up before you've even packed.
                            </p>
                            <p>
                                It works the same whether you need a few hundred dollars for
                                a weekend abroad or a large sum for relocation, tuition, or
                                an extended stay. Pick your currency, confirm your delivery
                                method, and you're done.
                            </p>
                            <Link href="/register" className="btn mt-3">
                                Get a Live Quote
                            </Link>
                        </div>
                        <div className="col-lg-5">
                            <img
                                src={img("airport,currency,cash")}
                                alt="Traveler exchanging currency before a trip"
                                width={700}
                                height={520}
                                style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Stat strip */}
            <div className="ptb-60 bg-secondary">
                <div className="container">
                    <div className="row g-4 text-center">
                        {stats.map((s, i) => (
                            <div key={i} className="col-lg-3 col-sm-6">
                                <h3 className="mb-1">{s.value}</h3>
                                <p className="mb-0">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Alternating reason rows */}
            <div className="ptb-120">
                <div className="container">
                    {reasons.map((r, i) => (
                        <div
                            key={i}
                            className={`row align-items-center g-5 ${i !== 0 ? "mt-5" : ""}`}
                        >
                            <div
                                className={`col-lg-6 ${i % 2 === 1 ? "order-lg-2" : ""
                                    }`}
                            >
                                <img
                                    src={img(
                                        i === 0
                                            ? "airport,exchange,counter"
                                            : i === 1
                                                ? "courier,delivery,package"
                                                : "travel,suitcase,planning"
                                    )}
                                    alt={r.title}
                                    width={700}
                                    height={460}
                                    style={{ width: "100%", height: "auto", borderRadius: "12px" }}
                                />
                            </div>
                            <div
                                className={`col-lg-6 ${i % 2 === 1 ? "order-lg-1" : ""
                                    }`}
                            >
                                <h3 className="mb-20">{r.title}</h3>
                                <p>{r.body}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Partners />
            <WhatOurCustomersSay />
            <FaqContent />

            <div className="cta-area ptb-120 text-center">
                <div className="container">
                    <h2 className="main-title mb-20">Your trip starts with the right rate</h2>
                    <p className="mw-600 mx-auto mb-30">
                        Check today's rate and have your currency on its way in minutes.
                    </p>
                    <Link href="/register" className="btn mx-auto">
                        Order Travel Money
                    </Link>
                </div>
            </div>

            <Footer />
        </>
    );
}