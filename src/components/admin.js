import React, { useState, useEffect } from 'react';
import './admin.css';
import baseURL from './baseurl';

const AdminPortal = ({ loggedInUser }) => {
  const [activeView, setActiveView] = useState('messages');
  const [messages, setMessages] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [interns, setInterns] = useState([]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${baseURL}/fetchContacts`);
      const data = await response.json();

      if (response.ok) {
        setMessages(data);
      } else {
        console.error('Failed to fetch messages');
      }
    } catch (error) {
      console.error('Error during fetchMessages:', error);
    }
  };

  const fetchEmployers = async () => {
    try {
      const response = await fetch(`${baseURL}/fetchEmployers`);
      const data = await response.json();

      if (response.ok) {
        setEmployers(data);
      } else {
        console.error('Failed to fetch employers');
      }
    } catch (error) {
      console.error('Error during fetchEmployers:', error);
    }
  };

  const fetchInterns = async () => {
    try {
      const response = await fetch(`${baseURL}/fetchInterns`);
      const data = await response.json();

      if (response.ok) {
        setInterns(data);
      } else {
        console.error('Failed to fetch interns');
      }
    } catch (error) {
      console.error('Error during fetchInterns:', error);
    }
  };

  const readMessages = () => {
    setActiveView('messages');
    fetchMessages();
  };

  const viewEmployers = () => {
    setActiveView('employers');
    fetchEmployers();
  };

  const viewInterns = () => {
    setActiveView('interns');
    fetchInterns();
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="admin-page">
      <header className="masthead bg-primary text-white text-center">
      <div className="container d-flex align-items-center flex-column">
          <img className="masthead-avatar mb-5" src="../images/logo-no-background.png" alt="Logo" />
          <h3 className="text-uppercase mb-0">
            Welcome
            <p>To your Admin portal. Manage messages, view employers, and explore interns.</p>
          </h3>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon"><i className="fas fa-star" /></div>
            <div className="divider-custom-line" />
          </div>
        </div>
      </header>

      <div className="admin-container">
        <div className="button-row">
          <button className="admin-button" onClick={readMessages}>
            Read Messages
          </button>
          <button className="admin-button" onClick={viewEmployers}>
            View Employers
          </button>
          <button className="admin-button" onClick={viewInterns}>
            View Interns
          </button>
        </div>

        <div className="messages-container" style={{ display: activeView === 'messages' ? 'block' : 'none' }}>
          <h3>Contact Messages</h3>
          <ul>
          {messages.map((message) => (
              <li key={message.id}>
                <strong>Email:</strong> {message.email}, <strong>Message:</strong> {message.message}
              </li>
            ))}
          </ul>
        </div>

        <div className="employers-container" style={{ display: activeView === 'employers' ? 'block' : 'none' }}>
          <h3>Registered Employers</h3>
          <ul>
          {employers.map((employer) => (
              <li key={employer.id}>
                <strong>Company Name:</strong> {employer.companyName}, <strong>Position:</strong> {employer.position}
              </li>
            ))}
          </ul>
        </div>

        <div className="interns-container" style={{ display: activeView === 'interns' ? 'block' : 'none' }}>
          <h3>Registered Interns</h3>
          <ul>
          {interns.map((intern) => (
      <li key={intern.id}>
        <strong>First Name:</strong> {intern.firstName},{' '}
        <strong>Last Name:</strong> {intern.lastName},{' '}
        <strong>University:</strong> {intern.university},{' '}
        <strong>Contact:</strong> {intern.contact}
      </li>
    ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
