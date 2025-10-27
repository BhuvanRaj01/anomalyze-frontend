import React from 'react';
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section" id="why-us">
      <h2 className="why-choose-us-title" data-aos="fade-up">
        Why Anomalise?
      </h2>
      <div className="features-container">
       
        <div className="feature-item" data-aos="fade-up" data-aos-delay="100">
          <div className="feature-icon">🤝</div>
          <h3 className="feature-title">Radical Honesty</h3>
          <p className="feature-description">
            We provide transparent assessments with no hidden fees. Our reports are direct, clear, and focused on improving your security posture.
          </p>
        </div>

        <div className="feature-item" data-aos="fade-up" data-aos-delay="200">
          <div className="feature-icon">💰</div>
          <h3 className="feature-title">Clear Affordability</h3>
          <p className="feature-description">
            Top-tier security shouldn't break the bank. We offer straightforward pricing to provide the best value for your investment.
          </p>
        </div>

        <div className="feature-item" data-aos="fade-up" data-aos-delay="300">
          <div className="feature-icon">🚀</div>
          <h3 className="feature-title">Streamlined Process</h3>
          <p className="feature-description">
            We offer a hassle-free experience from request to report. Our goal is to provide quick, actionable results with minimal disruption to you.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;