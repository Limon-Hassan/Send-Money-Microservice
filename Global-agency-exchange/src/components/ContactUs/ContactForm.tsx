import React from "react"; 

const ContactForm = () => {
  return (
    <>
      <div className="contact-us-area-two ptb-120">
        <div className="container">
          <div className="mb-40">
            <h2 className="main-title style-two mx-auto mb-0 text-center mw-1208">
              Our team is here to answer your questions and help you with all
              your currency exchange needs.
            </h2>
          </div>

          <div className="row g-4">
            <div className="col-lg-6">
              <div className="contact-us-info">
                <div className="d-flex justify-content-between gap-20 mb-40">
                  <div>
                    <h3>Phone Support</h3>
                    <a
                      href="tel:+44(0506)2587485"
                      className="text-decoration-none"
                    >
                      +44 (0506) 258 7485
                    </a>
                    <span className="d-block">Monday-Friday: 8am-8pm</span>
                    <span className="d-block">Saturday: 9am-6pm</span>
                  </div>
                  <div>
                    <h3>Email Us</h3>
                    <a
                      href="mailto:info@expa.com"
                      className="text-decoration-none"
                    >
                      info@expa.com
                    </a>
                    <a
                      href="mailto:support@expa.com"
                      className="text-decoration-none"
                    >
                      support@expa.com
                    </a>
                    <span className="d-block">We respond within 24 hours</span>
                  </div>
                </div>
                <h3>Office Hours</h3>
                <div className="d-flex justify-content-between gap-20 mb-40">
                  <div>
                    <span className="d-block">Monday - Friday</span>
                    <span className="d-block">Saturday</span>
                    <span className="d-block">Sunday</span>
                    <span className="d-block">Public Holidays</span>
                  </div>
                  <div>
                    <span className="d-block text-body">8:00 AM - 8:00 PM</span>
                    <span className="d-block text-body">9:00 AM - 6:00 PM</span>
                    <span className="d-block text-body">
                      10:00 AM - 4:00 PM
                    </span>
                    <span className="d-block text-body">Closed</span>
                  </div>
                </div>

                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46830151.11795828!2d-119.8093025!3d44.24236485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2sbd!4v1759916893549!5m2!1sen!2sbd"
                  style={{
                    border: "0",
                    width: "100%",
                    height: "310px",
                    borderRadius: "16px",
                  }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="contact-us-form">
                <h3>Send Us a Message</h3>

                <form>
                  <div className="currency-input position-relative z-1">
                    <label className="label">Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="currency-input position-relative z-1">
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div className="currency-input position-relative z-1">
                    <label className="label">Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Your email address"
                    />
                  </div>

                  <div className="currency-input position-relative z-1">
                    <label className="label">Subject</label>
                    <select
                      className="form-select form-control"
                      aria-label="Default select example"
                    >
                      <option value="0">Select a subject</option>
                      <option value="1">
                        Personal International Transfers
                      </option>
                      <option value="2">Business FX Solutions</option>
                      <option value="3">Travel Money</option>
                      <option value="4">Online Foreign Exchange</option>
                    </select>
                  </div>

                  <div className="currency-input position-relative z-1">
                    <label className="label">Message</label>
                    <textarea
                      rows={5}
                      className="form-control h-auto"
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-secondary w-100">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
