import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section className="how-it-works-section" id="how-it-works">
      <h2 className="how-it-works-title" data-aos="fade-up">
        How It Works
      </h2>
      <div className="steps-container">
        {/* Step 1 */}
        <div className="step-card" data-aos="fade-up" data-aos-delay="100">
          <div className="step-number">01</div>
          <h3 className="step-title">Submit Request</h3>
          <p className="step-description">
            Fill out our secure contact form with details about your application and the scope of the desired security review.
          </p>
        </div>

        {/* Step 2 */}
        <div className="step-card" data-aos="fade-up" data-aos-delay="300">
          <div className="step-number">02</div>
          <h3 className="step-title">Verify Authorization</h3>
          <p className="step-description">
            We confirm you are authorized to order a security test for the target URL. Ethical testing is our top priority.
          </p>
        </div>

        {/* Step 3 */}
        <div className="step-card" data-aos="fade-up" data-aos-delay="500">
          <div className="step-number">03</div>
          <h3 className="step-title">Receive Report</h3>
          <p className="step-description">
            Our experts conduct the review and deliver a comprehensive report with actionable steps to secure your application.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;