import PageBanner from "@/components/Common/PageBanner";
import Footer from "@/components/Layout/Footer";
import Navbar from "@/components/Layout/Navbar";

export default function Page() {
  return (
    <>
      <Navbar />

      <PageBanner
        homePageUrl="/"
        homePageText="Home"
        pageTitle="Terms & Conditions"
        phoneNumber="+44 (0506) 258 7485"
        email="information@expa.com"
      />

      <div className="privacy-policy-area ptb-120">
        <div className="container">
          <div className="privacy-terms-content">
            <p className="updated">Last updated: Jan 01, 2025</p>

            <h3>1. Acceptance of Terms</h3>
            <p className="pl-112">
              By accessing or using any services provided by Expa Currency
              Exchange, you agree to be bound by these Terms of Service and all
              terms incorporated by reference. If you do not agree to all of
              these terms, do not use our services. These Terms of Service apply
              to all users of the services, including without limitation users
              who are browsers, customers, merchants, and/or contributors of
              content.
            </p>

            <h3>2. Definitions</h3>
            <div className="pl-112">
              <p>
                Throughout these Terms of Service, certain terms have specific
                meanings:
              </p>

              <div className="mb-4">
                <h4>Account</h4>
                <p>
                  means a personal account opened by you with Expa for the
                  purpose of using our Services.
                </p>
              </div>
              <div className="mb-4">
                <h4>Services</h4>
                <p>
                  means all products, services, content, features, technologies,
                  or functions offered by us and all related websites,
                  applications, and services.
                </p>
              </div>
              <div className="mb-4">
                <h4>Transaction</h4>
                <p>
                  means any foreign exchange transaction or money transfer
                  instruction submitted by you through our Services.
                </p>
              </div>
              <div className="mb-4">
                <h4>Exchange Rate</h4>
                <p>
                  means the rate at which one currency will be exchanged for
                  another, which may include a margin added by Expa.
                </p>
              </div>
              <div className="mb-4">
                <h4>Fees</h4>
                <p>
                  means any fees, charges, or other amounts payable by you to us
                  in connection with our Services.
                </p>
              </div>
            </div>

            <h3>3. Services</h3>

            <div className="pl-112">
              <p>
                Expa provides currency exchange and international money transfer
                services through various platforms including our website, mobile
                applications, and telephone service.
              </p>

              <h5>3.1. Service Description</h5>
              <span className="mb-3 d-block">Our services allow you to:</span>
              <ul className="mb-4">
                <li>
                  Convert one currency to another at agreed exchange rates
                </li>
                <li>Transfer funds to bank accounts in other countries</li>
                <li>Set up regular payment schedules</li>
                <li>Use hedging tools to manage currency risk</li>
                <li>Access market information and analysis</li>
              </ul>

              <h5>3.2. Service Limitations</h5>
              <span className="mb-3 d-block">We reserve the right to:</span>
              <ul className="mb-4">
                <li>Limit the value of transactions</li>
                <li>Refuse to process certain transactions</li>
                <li>Set up regular payment schedules</li>
                <li>Suspend or terminate access to our services</li>
                <li>
                  Require additional verification for certain transactions
                </li>
              </ul>

              <h5>3.3. Exchange Rates</h5>
              <p>
                Exchange rates fluctuate continuously. The rate offered for a
                transaction is valid for a limited time as specified during the
                quotation process. We are not responsible for fluctuations that
                occur before a transaction is confirmed.
              </p>
            </div>

            <h3>4. Account Registration</h3>

            <div className="pl-112">
              <p>
                To use our services, you must register for an account and
                provide accurate, current, and complete information.
              </p>

              <div className="mb-4">
                <h5>4.1. Eligibility</h5>
                <p>
                  You must be at least 18 years old and have the legal capacity
                  to enter into binding contracts to use our services. By
                  registering for an account, you represent that you meet these
                  requirements.
                </p>
              </div>
              <div className="mb-4">
                <h5>4.2. Account Security</h5>
                <span className="mb-3 d-block">You are responsible for:</span>

                <ul>
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>
                    Notifying us immediately of any unauthorized use of your
                    account
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h5>4.3. Verification</h5>
                <p>
                  We may require you to provide additional information or
                  documentation to verify your identity, address, or the nature
                  of your transactions. We reserve the right to suspend or
                  terminate your account if we cannot verify your information.
                </p>
              </div>
            </div>

            <h3>5. Fees & Payments</h3>
            <div className="pl-112">
              <p>
                You agree to pay all fees associated with your use of our
                services as described in our Fee Schedule, which is incorporated
                into these Terms by reference.
              </p>

              <div className="mb-4">
                <h4>5.1. Transaction Fees</h4>
                <span className="mb-3 d-block">Fees may include:</span>

                <ul>
                  <li>
                    Transaction fees based on the amount and type of transaction
                  </li>
                  <li>Currency conversion margins</li>
                  <li>Payment processing fees</li>
                  <li>Other service charges as disclosed</li>
                </ul>
              </div>
              <div className="mb-4">
                <h4>5.2. Changes to Fees</h4>
                <p>
                  We may change our fees at any time by providing notice through
                  our website or by email. Changes will apply to transactions
                  initiated after the notice is provided.
                </p>
              </div>
              <div className="mb-4">
                <h4>5.3. Payment Authorization</h4>
                <p>
                  By initiating a transaction, you authorize us to charge your
                  designated payment method for the full amount of the
                  transaction, including all applicable fees.
                </p>
              </div>
            </div>

            <h3>6. Liability</h3>
            <div className="pl-112">
              <p>
                To the fullest extent permitted by law, Expa shall not be liable
                for any indirect, incidental, special, consequential, or
                punitive damages, or any loss of profits or revenues, whether
                incurred directly or indirectly, or any loss of data, use,
                goodwill, or other intangible losses resulting from:
              </p>

              <ul>
                <li>
                  Your access to or use of or inability to access or use the
                  services
                </li>
                <li>Any conduct or content</li>
              </ul>
            </div>

            <h3>7. Security and Privacy</h3>
            <div className="pl-112">
              <ul>
                <li>
                  We use industry-standard security measures to protect your
                  data and transactions.
                </li>
                <li>
                  Your use of our Services is also governed by our Privacy
                  Policy.
                </li>
              </ul>
            </div>

            <h3>8. Termination and Suspension</h3>
            <div className="pl-112">
              <ul>
                <li>
                  Expa may suspend or terminate your account for violations of
                  these Terms or suspicious activity.
                </li>
                <li>
                  You may close your account at any time by contacting our
                  support team.
                </li>
              </ul>
            </div>

            <h3>9. Governing Law</h3>
            <div className="pl-112">
              <ul>
                <li>
                  These Terms are governed by and construed in accordance with
                  the laws of Your Country.
                </li>
                <li>
                  Any disputes will be resolved in the courts of Your
                  Jurisdiction.
                </li>
              </ul>
            </div>

            <h3>10. Contact Us</h3>
            <div className="pl-112 mb-0">
              <p>If you have questions about these Terms, contact us at:</p>
              <ul className="mb-0">
                <li>
                  <span className="fw-medium text-secondary">Email:</span>{" "}
                  support@expa.com
                </li>
                <li>
                  <span className="fw-medium text-secondary">Address:</span> 123
                  Financial Street, London, EC2A 4AB, United Kingdom
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
