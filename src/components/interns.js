// Intern.js
import './intern.css';
import React, { useState, useEffect } from 'react';
import baseURL from './baseurl';
const Intern = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeTab, setActiveTab] = useState('cv');
  const [uploadedCV, setUploadedCV] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${baseURL}/fetchUserData`);
        const data = await response.json();

        if (response.ok) {
          setLoggedInUser(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error during fetchUserData:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedCV(file);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cv':
        return (
          <div>
            <h3>Your CV</h3>
            {uploadedCV ? (
              <div>
                <p>View your CV here:</p>
                {/* Using the <embed> tag to display PDF files */}
                <embed src={URL.createObjectURL(uploadedCV)} type="application/pdf" width="100%" height="500px" />
                {/* Alternatively, you can use the <iframe> tag */}
                {/* <iframe title="Your CV" src={URL.createObjectURL(uploadedCV)} width="100%" height="500px" /> */}
                <p>
                  <a href={URL.createObjectURL(uploadedCV)} download>
                    Download CV
                  </a>
                </p>
              </div>
            ) : (
              <div>
                <p>No CV uploaded yet.</p>
                <label className="btn1 btn-primary2">
                  Upload a CV
                  <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
                </label>
              </div>
            )}
          </div>
        );
      case 'reviews':
        return (
          <div>
            <h3>Your Reviews</h3>
            <p>View your reviews here.</p>
          </div>
        );
      case 'mockInterviews':
        return (
          <div>
            <h3>Your Mock Interview Dates</h3>
            <p>View your mock interview dates here.</p>
          </div>
        );
      case 'chat':
        return (
          <div>
            <h3>Chat</h3>
            <p>Start chatting here.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="intern-page">
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <img className="masthead-avatar mb-5" src="../images/logo-no-background.png" alt="..." />
          <h3 className=" text-uppercase mb-0">Welcome, {loggedInUser ? loggedInUser.name : ''}!
            <p>To your intern portal. Here are some things you can do:</p>
          </h3>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon"><i className="fas fa-star" /></div>
            <div className="divider-custom-line" />
          </div>
          <div className="button-container">
            <label className="btn1 btn-primary2">
              Upload a CV
              <input type="file" style={{ display: 'none' }} onChange={handleFileUpload} />
            </label>
            <button className="btn1 btn-primary2" onClick={() => setActiveTab('mockInterviews')}>
              Book a Mock Interview
            </button>
          </div>
        </div>
      </header>
      <div className='mn'>
        <div className="additional-info">
          <h3>Additional Information:</h3>
          <ul className="horizontal-list">
            <li onClick={() => setActiveTab('cv')}>View Your CV</li>
            <li onClick={() => setActiveTab('reviews')}>View Your Reviews</li>
            <li onClick={() => setActiveTab('mockInterviews')}>View Your Mock Interview Dates</li>
            <li onClick={() => setActiveTab('chat')}>Chat</li>
          </ul>
        </div>
        <div className="tab-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Intern;
