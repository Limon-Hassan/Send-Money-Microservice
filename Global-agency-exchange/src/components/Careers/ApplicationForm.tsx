import React from "react";

const ApplicationForm = () => {
  // Dynamic data for hiring process steps
  const hiringProcessSteps = [
    {
      id: 1,
      count: "01",
      title: "Application Review",
      description:
        "Our hiring team reviews all applications and selects candidates for initial screening.",
    },
    {
      id: 2,
      count: "02",
      title: "Phone Screening",
      description:
        "Selected candidates will have a phone conversation with our HR team.",
    },
    {
      id: 3,
      count: "03",
      title: "Interviews",
      description:
        "Qualified candidates will be invited for interviews with team members and partners.",
    },
    {
      id: 4,
      count: "04",
      title: "Offer",
      description:
        "Successful candidates will receive an offer to join our team.",
    },
  ];

  return (
    <>
      <div className="build-your-career-area ptb-120">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-5">
              <div className="build-your-career-content">
                <h2 className="main-title style-two mb-4">
                  Start your journey with Expa
                </h2>
                <h3 className="fw-semibold fs-24 mb-3">Our Hiring Process</h3>
                <p className="mb-4">
                  We&apos;ve designed our hiring process to be thorough yet
                  efficient, ensuring we find the right fit for both candidates
                  and our firm.
                </p>

                <div className="build-your-career-inner">
                  {hiringProcessSteps.map((step) => (
                    <div
                      key={step.id}
                      className="d-flex gap-20 build-your-career-item mb-4"
                    >
                      <div className="flex-shrink-0">
                        <span className="count bg-f7f7f7 text-secondary d-flex justify-content-center align-items-center rounded-circle fw-semibold">
                          {step.count}
                        </span>
                      </div>
                      <div className="flex-grow-1">
                        <h3 className="mb-3">{step.title}</h3>
                        <p>{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="contact-us-form mw-648">
                <h3>Application form</h3>

                <form>
                  <div className="currency-input position-relative z-1">
                    <label className="label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ricky"
                    />
                  </div>

                  <div className="currency-input position-relative z-1">
                    <label className="label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Hudson"
                    />
                  </div>

                  <div className="currency-input position-relative z-1">
                    <label className="label">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="ricky@expa.com"
                    />
                  </div>

                  <div className="currency-input position-relative z-1">
                    <label className="label">Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="+44 (0506) 258 7485"
                    />
                  </div>

                  <div className="currency-input position-relative z-1">
                    <label className="label">Position Applying for</label>
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
                    <label className="label">Cover Letter</label>
                    <textarea
                      rows={5}
                      className="form-control h-auto"
                      placeholder="Tell us why you are interested in joining Expa"
                    ></textarea>
                  </div>

                  <div className="currency-input position-relative z-1">
                    <label className="label">Upload Your Resume</label>
                    <input type="file" className="form-control" />
                  </div>

                  <button type="submit" className="btn btn-secondary w-100">
                    Submit Application
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

export default ApplicationForm;
