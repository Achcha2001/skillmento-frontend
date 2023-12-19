// Intern.js
import './intern.css';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import baseURL from './baseurl';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Intern = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeTab, setActiveTab] = useState('cv');
  const [uploadedCV, setUploadedCV] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedJobPosition, setSelectedJobPosition] = useState('');
  const [selectedEmployer, setSelectedEmployer] = useState(null);
  const [employers, setEmployers] = useState([]);
  const [postedJobs, setPostedJobs] = useState([]);
  const [bidAmount, setBidAmount] = useState('');
  const [bidMessage, setBidMessage] = useState('');
  const [maximumDuration, setMaximumDuration] = useState('');
const [contactNumber, setContactNumber] = useState('');
const [showBidForm, setShowBidForm] = useState(false);
const [selectedJobForBid, setSelectedJobForBid] = useState(null);


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

    const fetchPostedJobs = async () => {
      try {
        const response = await fetch(`${baseURL}/fetchPostedJobs`);
        const data = await response.json();

        if (response.ok) {
          setPostedJobs(data);
        } else {
          console.error('Failed to fetch posted jobs');
        }
      } catch (error) {
        console.error('Error during fetchPostedJobs:', error);
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

    fetchUserData();
    fetchEmployers();
    fetchPostedJobs();
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedCV(file);
  };

  const renderCVTab = () => {
    return (
      <div>
        <h3>Your CV</h3>
        {uploadedCV ? (
          <div>
            <p>View your CV here:</p>
            <embed src={URL.createObjectURL(uploadedCV)} type="application/pdf" width="100%" height="500px" />
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
  };

  const renderReviewsTab = () => {
    return (
      <div>
        <h3>Your Reviews</h3>
        <p>View your reviews here.</p>
      </div>
    );
  };

  const renderMockInterviewsTab = () => {
    return (
      <div>
        <h3>Your Mock Interview Dates</h3>
        <p>View your mock interview dates here.</p>
      </div>
    );
  };

  const renderChatTab = () => {
    return (
      <div>
        <h3>Chat</h3>
        <p>Start chatting here.</p>
      </div>
    );
  };

  const renderJobListButton = () => {
    return (
      <button className="btn1 btn-primary2" onClick={() => setActiveTab('jobList')}>
        Job List
      </button>
    );
  };

  const renderEmployerList = () => {
    return (
      <div>
        <h3>Select an Employer:</h3>
        <ul>
          {employers.map((employer) => (
            <li key={employer.id} onClick={() => setSelectedEmployer(employer)}>
              {employer.companyName} - {employer.position}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const renderMockInterviewBooking = () => {
    return (
      <div>
        <h3>Book a Mock Interview</h3>
        <form onSubmit={handleBookMockInterview}>
          <label>
            Select a Date for Mock Interview:
            <input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
          </label>
          <label>
            Select a Time:
            <input type="time" value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)} />
          </label>
          <label>
            Job Position:
            <input
              type="text"
              value={selectedJobPosition}
              onChange={(e) => setSelectedJobPosition(e.target.value)}
            />
          </label>
          <button type="submit" className="btn1 btn-primary2">
            Book Mock Interview
          </button>
        </form>
      </div>
    );
  };

  const handleBookMockInterview = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/bookMockInterview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         
          date: selectedDate,
          time: selectedTime,
          jobPosition: selectedJobPosition,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Mock interview booked successfully:', data);
        alert('Reservation request sent successfully!!');
      } else {
        console.error('Failed to book mock interview:', data.message);
      }
    } catch (error) {
      console.error('Error during mock interview booking:', error.message);
    } finally {
      setSelectedDate(null);
      setSelectedTime('');
      setSelectedJobPosition('');
      
    }
  };

  const handleBidForJob = async (selectedJob) => {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'end' });

    setSelectedJobForBid(selectedJob);
    setShowBidForm(true);  
    // try {
    //   const response = await fetch('http://localhost:8080/submitJobBid', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
          
    //       bidAmount,
    //       bidMessage,
    //       jobId: selectedJob.id, 
    //     }),
    

      
  };
  const handleBidForJobSubmit = async (e, selectedJob) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${baseURL}/submitJobBid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
          bidAmount,
         
          jobId: selectedJob.id,
          maximumDuration, 
          contactNumber, 
          
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Job bid submitted successfully:', data);
        alert('Job bid submitted successfully!');
      } else {
        console.error('Failed to submit job bid:', data.message);
      }
    } catch (error) {
      console.error('Error during job bidding:', error.message);
    } finally {
      setShowBidForm(false);
      setSelectedJobForBid(null);
      setBidAmount('');
      setBidMessage('');
      setMaximumDuration(''); 
      setContactNumber(''); 
     
    }
  };
  

  const renderBidForm = (selectedJob) => {
   
    const color = determineColor(selectedJob);
  
    return (
      <div id="bid-form" className={`bid-form ${color}`}>
        <h3>Bid for {selectedJob.company}- {selectedJob.jobPosition} position</h3>
        <form onSubmit={(e) => handleBidForJobSubmit(e, selectedJob)}>
          <label>
            Bid Amount:
            <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} required />
          </label>
          <label className="duration-label">
  Maximum Duration:
  <div className="duration-select-container">
    <select value={maximumDuration} onChange={(e) => setMaximumDuration(e.target.value)} required>
      <option value="10">10 days</option>
      <option value="30">30 days</option>
      <option value="60">2 months</option>
      <option value="90">3 months</option>
    </select>
  </div>
</label>

          <label>
            Contact Number:
            <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
          </label>
          <button type="submit" className="btn1 btn-primary2">
            Submit Bid
          </button>
        </form>
      </div>
    );
  };
  
  
  const determineColor = (selectedJob) => {
  
    return selectedJob.id % 3 === 0 ? 'bid-form-red' : selectedJob.id % 3 === 1 ? 'bid-form-blue' : 'bid-form-green';
  };
  

  
  const renderJobListTab = () => {
    return (
      <div className="job-list-container">
  <h3 className="job-list-header">Job List</h3>
  <ul className="job-list">
    {postedJobs.map((job) => (
      <li key={job.id} className="job-item">
        <div className="company-info">
          <span className="company-name">{job.company}</span>
        </div>
        <div className="job-details">
          <span className="job-property">Position:</span> {job.jobPosition}
          <br />
          <span className="job-property1">Category:</span> {job.jobCategory}
          <br />
          <span className="job-property2 duration-banner">Duration:</span> {job.duration}
          <br />
          <span className="job-property3">Qualifications:</span> {job.qualifications}
          <br />
          <button className="btn1 btn-primary2" onClick={() => handleBidForJob(job)}>
            Bid for the Job
          </button>
        </div>
      </li>

    ))}
  </ul>
  {showBidForm && selectedJobForBid && renderBidForm(selectedJobForBid)}
</div>

    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'cv':
        return renderCVTab();
      case 'reviews':
        return renderReviewsTab();
      case 'mockInterviews':
        return renderMockInterviewsTab();
      case 'chat':
        return renderChatTab();
      case 'jobList':
        return renderJobListTab();
      case 'bookMockInterview':
        return (
          <div>
            {renderEmployerList()}
            {renderMockInterviewBooking()}
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
          <h3 className=" text-uppercase mb-0">
            Welcome, {loggedInUser ? loggedInUser.name : ''}!
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
            {renderJobListButton()}
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
            <li onClick={() => setActiveTab('jobList')}>Job List</li>
            <li onClick={() => setActiveTab('bookMockInterview')}>Book a Mock Interview</li>
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
