import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    targetURL: '',
    phoneNumber: '',
    services: [],
    consent: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newServices = checked
        ? [...prevData.services, value]
        : prevData.services.filter((service) => service !== value);
      return { ...prevData, services: newServices };
    });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.fullName.trim()) tempErrors.fullName = 'Full name is required.';
    
    if (!formData.email) {
      tempErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email address is invalid.';
    }

    // --- UPDATED VALIDATION ---
    // Only checks if it is empty, allows "messy" URLs like https/mongo/
    if (!formData.targetURL.trim()) {
        tempErrors.targetURL = 'Target URL is required.';
    } 
    // Strict Regex validation removed to prevent getting stuck

    if (formData.services.length === 0) tempErrors.services = 'Please select at least one service.';
    if (!formData.consent) tempErrors.consent = 'You must consent to the security test.'; 

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setSubmitMessage('Submitting...');

      try {
        // Ensure VITE_API_BASE_URL is set in your frontend .env file
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/submit`;
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        
        const result = await response.json();

        if (!response.ok) throw new Error(result.message || 'Something went wrong.');
        
        setSubmitMessage('Success! Your request has been sent.');
        // Clear form on success
        setFormData({ fullName: '', email: '', targetURL: '', phoneNumber: '', services: [], consent: false });

      } catch (error) {
        console.error('Submission error:', error);
        setSubmitMessage(`Error: Could not send request.`);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="contact-form-container">
      <h2>Request a Security Review</h2>
      <p>Fill out the form below, and we'll get back to you within 24 hours.</p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="fullName">Full Name <span className="required-star">*</span></label>
          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
          {errors.fullName && <span className="error-text">{errors.fullName}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email <span className="required-star">*</span></label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="targetURL">Target URL <span className="required-star">*</span></label>
          {/* Changed type to text to prevent browser blocking */}
          <input type="text" id="targetURL" name="targetURL" value={formData.targetURL} onChange={handleInputChange} placeholder="e.g., https://example.com" required />
          {errors.targetURL && <span className="error-text">{errors.targetURL}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number (Optional)</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Services of Interest <span className="required-star">*</span></label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" name="services" value="Web App Pentesting" checked={formData.services.includes('Web App Pentesting')} onChange={handleCheckboxChange} />
              Web App Pentesting
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="services" value="API Security Testing" checked={formData.services.includes('API Security Testing')} onChange={handleCheckboxChange} />
              API Security Testing
            </label>
            <label className="checkbox-label">
              <input type="checkbox" name="services" value="Network Security Audit" checked={formData.services.includes('Network Security Audit')} onChange={handleCheckboxChange} />
              Network Security Audit
            </label>
          </div>
          {errors.services && <span className="error-text">{errors.services}</span>}
        </div>
        
        <div className="form-group">
            <label className="checkbox-label consent-label">
                <input type="checkbox" name="consent" checked={formData.consent} onChange={handleInputChange} />
                <span>I confirm that I am authorized to request a security test on the specified target URL. <span className="required-star">*</span></span>
            </label>
            {errors.consent && <span className="error-text">{errors.consent}</span>}
        </div>

        <button type="submit" className="submit-btn" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Request'}
        </button>
        {submitMessage && <p className="submit-message">{submitMessage}</p>}
      </form>
    </div>
  );
};

export default ContactForm;