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
        pageTitle="Privacy Policy"
        phoneNumber="+44 (0506) 258 7485"
        email="information@dldy.com"
      />

      <div className="privacy-policy-area ptb-120">
        <div className="container">
          <div className="privacy-terms-content">
            <p className="updated">Last updated: Jan 01, 2025</p>

            <h3>1. Introduction</h3>
            <div className="pl-112">
              <p>
                Expa Currency Exchange is committed to protecting your privacy
                and ensuring the security of your personal information. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use our services.
              </p>
              <p>
                By accessing or using our website, mobile application, or
                services, you consent to the practices described in this Privacy
                Policy. Please read this policy carefully to understand our
                views and practices regarding your personal data.
              </p>
            </div>

            <h3>2. Data We Collect</h3>

            <div className="pl-112">
              <p>
                We collect several types of information from and about users of
                our services, including:
              </p>

              <h5>2.1. Personal Information</h5>
              <span className="mb-3 d-block">
                When you register for an account or use our services, we may
                collect:
              </span>
              <ul className="mb-4">
                <li>Full name, date of birth, and contact information</li>
                <li>Government-issued identification details</li>
                <li>Financial information and payment details</li>
                <li>Transaction history and preferences</li>
                <li>Proof of address and source of funds documentation</li>
              </ul>

              <h5>2.2. Technical Information</h5>
              <span className="mb-3 d-block">
                When you use our website or mobile app, we automatically
                collect:
              </span>
              <ul className="mb-4">
                <li>IP address, browser type, and device information</li>
                <li>Usage data and browsing patterns</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>

              <h5>2.3. Information from Third Parties</h5>
              <span className="mb-3 d-block">
                We may receive information about you from:
              </span>
              <ul className="mb-4">
                <li>
                  Credit reference agencies and fraud prevention databases
                </li>
                <li>Financial institutions and payment processors</li>
                <li>
                  Publicly available sources and identity verification services
                </li>
              </ul>
            </div>

            <h3>3. Data Sharing and Disclosure</h3>
            <div className="pl-112">
              <p>We may share your personal information with:</p>

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
                <h5>3.1. Service Providers</h5>
                <span className="mb-3 d-block">
                  Third parties who provide services on our behalf, such as:
                </span>

                <ul>
                  <li>Payment processors and banking partners</li>
                  <li>Identity verification services</li>
                  <li>IT and cloud service providers</li>
                  <li>Customer support platforms</li>
                </ul>
              </div>

              <div className="mb-4">
                <h5>3.2. Legal and Regulatory Requirements</h5>
                <span className="mb-3 d-block">
                  We may disclose your information when required by law or to:
                </span>

                <ul>
                  <li>
                    Comply with legal obligations or regulatory requirements
                  </li>
                  <li>Protect and defend our rights or property</li>
                  <li>Prevent fraud or security issues</li>
                  <li>
                    Protect the personal safety of our users or the public
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <h5>3.3. Business Transfers</h5>
                <span className="mb-3 d-block">
                  In connection with a merger, acquisition, or sale of all or a
                  portion of our assets, your information may be transferred to
                  the new entity.
                </span>
              </div>
            </div>

            <h3>4. Data Security</h3>
            <div className="pl-112">
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal data against unauthorized access,
                alteration, disclosure, or destruction.
              </p>

              <div className="mb-4">
                <h4>4.1. Security Measures</h4>
                <span className="mb-3 d-block">
                  Our security measures include:
                </span>

                <ul>
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and testing</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Employee training on data protection</li>
                  <li>Physical security measures for our facilities</li>
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
                <h4>4.2. International Transfers</h4>
                <p>
                  Your information may be transferred to and processed in
                  countries other than your country of residence. We ensure
                  appropriate safeguards are in place for international data
                  transfers, such as Standard Contractual Clauses or adequacy
                  decisions.
                </p>
              </div>
            </div>

            <h3>5. Data Retention</h3>
            <div className="pl-112">
              <p>
                We retain your personal data only for as long as necessary to
                fulfill the purposes for which we collected it, including to
                satisfy any legal, accounting, or reporting requirements.
              </p>

              <div className="mb-4">
                <h4>5.1. Retention Periods</h4>
                <span className="mb-3 d-block">
                  Our retention periods are based on:
                </span>

                <ul>
                  <li>
                    Legal and regulatory requirements (typically 5-7 years for
                    financial records)
                  </li>
                  <li>The purpose for which we collected the data</li>
                  <li>Our legitimate business needs</li>
                </ul>
              </div>
            </div>

            <h3>6. Cookies and Tracking Technologies</h3>
            <div className="pl-112">
              <p>
                We use cookies and similar tracking technologies to track
                activity on our website and store certain information.
              </p>
              <h4>6.1. Types of Cookies We Use</h4>
              <ul>
                <li>
                  <span className="fw-semibold text-secondary">
                    Essential Cookies:
                  </span>
                   Necessary for the operation of our website
                </li>
                <li>
                  <span className="fw-semibold text-secondary">
                    Analytical/Performance Cookies:
                  </span>
                  Allow us to recognize and count visitors
                </li>
                <li>
                  <span className="fw-semibold text-secondary">
                    Functionality Cookies:
                  </span>
                  Enable enhanced functionality and personalization
                </li>
                <li>
                  <span className="fw-semibold text-secondary">
                    Targeting Cookies:
                  </span>{" "}
                  Record your visit and pages you have visited
                </li>
              </ul>
              <h6>6.2. Cookie Management</h6>
              <p>
                You can set your browser to refuse all or some browser cookies,
                or to alert you when websites set or access cookies. If you
                disable or refuse cookies, please note that some parts of our
                website may become inaccessible or not function properly.
              </p>
            </div>

            <h3>7. Children&apos;s Privacy</h3>
            <div className="pl-112">
              <p>
                Our services are not intended for individuals under the age of
                18. We do not knowingly collect personal information from
                children. If you believe we have collected information from a
                child, please contact us immediately.
              </p>
            </div>

            <h3>8. Changes to This Privacy Policy</h3>
            <div className="pl-112">
              <p>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the Last updated date.
              </p>
              <p>
                We will also provide additional notice (such as adding a
                statement to our website homepage or sending you a notification)
                if changes are material. You are advised to review this Privacy
                Policy periodically for any changes. Changes to this Privacy
                Policy are effective when they are posted on this page.
              </p>
            </div>

            <h3>9. Contact Us</h3>
            <div className="pl-112 mb-0">
              <p>
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please contact our Data Protection
                Officer:
              </p>
              <ul className="mb-0">
                <li>
                  <span className="fw-medium text-secondary">Email:</span>{" "}
                  support@expa.com
                </li>
                <li>
                  <span className="fw-medium text-secondary">Address:</span> 123
                  Financial Street, London, EC2A 4AB, United Kingdom
                </li>
                <li>
                  You also have the right to lodge a complaint with a
                  supervisory authority if you believe our processing of your
                  personal data violates applicable data protection laws.
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
