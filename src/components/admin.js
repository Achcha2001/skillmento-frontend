// AdminPortal.js
import React from 'react';
import './admin.css';  

const AdminPortal = ({ loggedInUser }) => {
  const readMessages = () => {
    // Handle read messages functionality
    console.log('Read Messages Button Clicked');
    // You can add logic to fetch and display messages
  };

  const viewEmployers = () => {
    // Handle view employers functionality
    console.log('View Employers Button Clicked');
    // You can add logic to fetch and display employers
  };

  const viewFreelancers = () => {
    // Handle view freelancers functionality
    console.log('View Freelancers Button Clicked');
    // You can add logic to fetch and display freelancers
  };

  return (
    <div className="admin-page">
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <img className="masthead-avatar mb-5" src="../images/logo-no-background.png" alt="..." />
          <h3 className="text-uppercase mb-0">
            Welcome
            <p>To your Admin portal. Manage messages, view employers, and explore freelancers.</p>
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
          <button className="admin-button" onClick={readMessages}>Read Messages</button>
          <button className="admin-button" onClick={viewEmployers}>View Employers</button>
          <button className="admin-button" onClick={viewFreelancers}>View Freelancers</button>
        </div>


      </div>
    </div>
  );
};

export default AdminPortal;
