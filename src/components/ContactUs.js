import React, { useState } from 'react';
import axios from 'axios';
import './Contact-Us.css';
import baseURL from './baseurl';

const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      email,
      message,
    };

    try {
      const response = await axios.post(`${baseURL}/contact-us`, contactData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Message sent successfully');
        setSuccessMessage('Message sent successfully');
        // Clear the form fields
        setEmail('');
        setMessage('');
        // Clear success message after a few seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 5000);
      } else {
        console.error('Failed to send message');
        setErrorMessage('Failed to send message');
      }
    } catch (error) {
      console.error('Error during message sending:', error);
      setErrorMessage('Failed to send message');
    }
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send Message</button>

        {successMessage && <div className="success-message">{successMessage}</div>}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
};

export default ContactUs;
