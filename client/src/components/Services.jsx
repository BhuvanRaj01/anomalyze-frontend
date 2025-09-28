import React from 'react';
import './Services.css';

const Services = () => {
  const serviceData = [
    {
      icon: '🌐',
      title: 'Web App Testing',
      description: 'Comprehensive testing for modern web applications to identify and mitigate security risks.',
      aosDelay: '100',
    },
    {
      icon: '🔗',
      title: 'API Security',
      description: 'In-depth security analysis of your REST and GraphQL APIs to prevent data breaches.',
      aosDelay: '200',
    },
    {
      icon: '🛡️',
      title: 'OWASP Top 10',
      description: 'We test against the latest OWASP Top 10 vulnerabilities to cover the most critical risks.',
      aosDelay: '300',
    },
    {
      icon: '📄',
      title: 'Custom Reports',
      description: 'Receive detailed, actionable reports with clear steps for remediation and verification.',
      aosDelay: '400',
    },
  ];

  return (
    <section className="services-section" id="services">
      <h2 className="services-title" data-aos="fade-up">
        Our Core Services
      </h2>
      <div className="services-grid">
        {serviceData.map((service, index) => (
          <div
            className="service-card"
            key={index}
            data-aos="fade-up"
            data-aos-delay={service.aosDelay}
          >
            <div className="service-icon">{service.icon}</div>
            <h3 className="service-card-title">{service.title}</h3>
            <p className="service-card-description">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;