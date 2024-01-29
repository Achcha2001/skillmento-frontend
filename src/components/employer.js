// Employer.js
import './employer.css';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import baseURL from './baseurl';
import { useSharedState } from './SharedStateContext';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Employer = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeTab, setActiveTab] = useState('postedJobs');
  const [postedJobs, setPostedJobs] = useState([]);
  const [selectedJobForBids, setSelectedJobForBids] = useState(null);
  const [showBidDetails, setShowBidDetails] = useState(false);
  const [acceptedBids, setAcceptedBids] = useState([]);
  const { updateBidStatus } = useSharedState();

const [declinedBids, setDeclinedBids] = useState([]);
const { bidStatus } = useSharedState();
  // Add state variable to store the bid details
  const [selectedBidDetails, setSelectedBidDetails] = useState(null);
  const [mockInterviews, setMockInterviews] = useState([]);

  const [isPostJobClicked, setPostJobClicked] = useState(false);
  const [jobForm, setJobForm] = useState({
    companyName: '', 
    title: '',
    duration: '',
    
    qualification: '',
    jobCategory: '',
    jobPosition: '',
    qualifications: '',
  });
 
  
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

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(`${baseURL}/deleteJob/${jobId}`, {
        method: 'DELETE',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Job deleted successfully:', data);
        // Update the posted jobs list after deletion
        fetchPostedJobs();
      } else {
        console.error('Failed to delete job:', data.message);
      }
    } catch (error) {
      console.error('Error during job deletion:', error.message);
    }
  };

  const fetchMockInterviews = async () => {
    try {
      const response = await fetch(`${baseURL}/fetchMockInterviews`);

      if (response.status === 200) {
        const mockInterviewsData = await response.json();
        setMockInterviews(mockInterviewsData);
      } else {
        console.error(`Failed to fetch mock interviews. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during mock interview fetching:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPostedJobs();
    fetchMockInterviews();
    
   
  }, []);
  


  useEffect(() => {
    fetchUserData();
    fetchPostedJobs();
    
  }, []);

  const [acceptedInterviews, setAcceptedInterviews] = useState([]);
  const [declinedInterviews, setDeclinedInterviews] = useState([]);

  const handleAcceptInterview = (interviewId) => {
    // Find the interview in the mockInterviews array
    const acceptedInterview = mockInterviews.find((interview) => interview.id === interviewId);

    // Update the acceptedInterviews state
    setAcceptedInterviews((prevAcceptedInterviews) => [...prevAcceptedInterviews, acceptedInterview]);
  };

  const handleDeclineInterview = (interviewId) => {
    // Find the interview in the mockInterviews array
    const declinedInterview = mockInterviews.find((interview) => interview.id === interviewId);

    // Update the declinedInterviews state
    setDeclinedInterviews((prevDeclinedInterviews) => [...prevDeclinedInterviews, declinedInterview]);
  };

  const handlePostJob = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}/postJob`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobForm),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Job posted successfully:', data);
        alert('Job posted successfully!');
      } else {
        console.error('Failed to post job:', data.message);
      }
    } catch (error) {
      console.error('Error during job posting:', error.message);
    } finally {
      setPostJobClicked(false);
      setJobForm({
        companyName: '', 
       
        duration: '',
        qualification: '',
        jobCategory: '',
        jobPosition: '',
        qualifications: '',
      });
    }
  };
  const handleAcceptBid = async (bidId) => {
    try {
      // Assuming you have an API endpoint to update the bid status
      const response = await fetch(`${baseURL}/acceptBid/${bidId}`, {
        method: 'PUT',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Bid accepted successfully:', data);
        alert("Bid Accepted Successfully!Contact the candidate for the interview.");
        updateBidStatus('Accepted');
        setAcceptedBids((prevAcceptedBids) => [...prevAcceptedBids, data]);
      } else {
        console.error('Failed to accept bid:', data.message);
      }
    } catch (error) {
      console.error('Error during accepting bid:', error.message);
    }
  };
  
  const handleDeclineBid = async (bidId) => {
    try {
      // Assuming you have an API endpoint to update the bid status
      const response = await fetch(`${baseURL}/declineBid/${bidId}`, {
        method: 'PUT',
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Bid declined successfully:', data);
        // Update the declinedBids state
        setDeclinedBids((prevDeclinedBids) => [...prevDeclinedBids, data]);
      } else {
        console.error('Failed to decline bid:', data.message);
      }
    } catch (error) {
      console.error('Error during declining bid:', error.message);
    }
  };
  
  // Function to send an acceptance message to the intern portal
  const sendAcceptanceMessageToIntern = (bidId) => {
    // Implement logic to send a message to the intern portal using an API or other communication method
    console.log(`Accepted bid with ID ${bidId}. Message sent to intern portal.`);
  };

  const handleViewBids = async (jobId) => {
    try {
      // Fetch bid details for the selected job
      const response = await fetch(`${baseURL}/fetchJobBids/${jobId}`);
      const data = await response.json();

      if (response.ok) {
        // Store bid details in state
        setSelectedBidDetails(data);
        // Show the bid details section or modal
        setShowBidDetails(true);
      } else {
        console.error('Failed to fetch bid details:', data.message);
      }
    } catch (error) {
      console.error('Error during fetching bid details:', error.message);
    }
  };
 

  const renderTabContent = () => {
    switch (activeTab) {
      case 'postedJobs':
        return (
          <div className="posted-jobs-container">
            <h3>Posted Jobs</h3>
            <ul>
              {postedJobs.map((job) => (
                <li key={job.id}>
                  <span>Company:</span> {job.company}
                  <br />
                  <span>Position:</span> {job.jobPosition}
                  <br />
                  <span>Category:</span> {job.jobCategory}
                  <br />
                  <span>Duration:</span> {job.duration}
                  <br />
                  <span>Qualifications:</span> {job.qualifications}
                  <div className="button-container">
                  <button
  className="view-bids-button"
  onClick={() => {
    handleViewBids(job.id);
    setActiveTab('viewBids');
  }}
>
  View Bids
</button>

                    <button className="delete-button" onClick={() => handleDeleteJob(job.id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        );
        case 'viewBids':
          return (
            <div className="bid-details">
              <h3>Bid Details</h3>
              {selectedBidDetails && selectedBidDetails.map((bid) => (
                <div key={bid.id} className="bid-set">
                  <div className="bid-details-item">
                    <p className="bid-details-label">Company:</p>
                    <p>{bid.company}</p>
          
                    <p className="bid-details-label">Job Position:</p>
                    <p>{bid.jobPosition}</p>
          
                    <p className="bid-details-label">Bid Amount:</p>
                    <p>{bid.bidAmount}</p>
          
                    <p className="bid-details-label">Maximum Duration:</p>
                    <p>{bid.maximumDuration} days</p>
          
                    <p className="bid-details-label">Contact Number:</p>
                    <p>{bid.contactNumber}</p>
          
                    {/* Add Accept and Decline buttons */}
                    <div className="button-container">
                      <button
                        className="accept-button"
                        onClick={() => handleAcceptBid(bid.id)}
                        disabled={bid.status === 'Accepted' || bid.status === 'Declined'}
                      >
                        Accept
                      </button>
                      <button
                        className="decline-button"
                        onClick={() => handleDeclineBid(bid.id)}
                        disabled={bid.status === 'Accepted' || bid.status === 'Declined'}
                      >
                        Decline
                      </button>
                      {bid.status === 'Accepted' && <p>Accepted</p>}
                      {bid.status === 'Declined' && <p>Declined</p>}
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={() => setShowBidDetails(false)}>Close</button>
            </div>
          );
      case 'reviewMockInterviews':
        return (
          <div className="review-mock-interviews-container">
            <h3>Review Mock Interviews</h3>
            {/* Display mock interview details here */}
            {mockInterviews.map((interview) => (
              <div key={interview.id} className="interview-set">
                <div className="interview-details">
                  <p>Interview Date: {interview.date}</p>
                  <p>Interview Time: {interview.time}</p>
                  <p>Job Position: {interview.jobPosition}</p>
                </div>
                <div className="button-container">
                  <button className="accept-button" onClick={() => handleAcceptInterview(interview.id)}>
                    Accept
                  </button>
                  <button className="decline-button" onClick={() => handleDeclineInterview(interview.id)}>
                    Decline
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      
     

      case 'postJobs':
        return (
          <div>
            <h3>Post a Job</h3>
            <form className="f1" onSubmit={handlePostJob}>
              <div>
                <label htmlFor="companyName">Company Name:</label>
                <input
                  type="text"
                  id="companyName"
                  value={jobForm.companyName}
                  onChange={(e) => setJobForm({ ...jobForm, companyName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="jobCategory">Select Job Category:</label>
                <select
                  id="jobCategory"
                  value={jobForm.jobCategory}
                  onChange={(e) => setJobForm({ ...jobForm, jobCategory: e.target.value })}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="IT">IT</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Sales">Sales</option>
                  <option value="Business">Business</option>
                </select>
              </div>
              <div>
                <label htmlFor="jobPosition">Enter Job Position:</label>
                <input
                  type="text"
                  id="jobPosition"
                  value={jobForm.jobPosition}
                  onChange={(e) => setJobForm({ ...jobForm, jobPosition: e.target.value })}
                  required
                />
              </div>
              <div>
                <label htmlFor="duration">Select Duration:</label>
                <select
                  id="duration"
                  value={jobForm.duration}
                  onChange={(e) => setJobForm({ ...jobForm, duration: e.target.value })}
                  required
                >
                  <option value="">Select Duration</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                </select>
              </div>
              <div>
                <label htmlFor="qualifications">Required Qualifications:</label>
                <textarea
                  id="qualifications"
                  value={jobForm.qualifications}
                  onChange={(e) => setJobForm({ ...jobForm, qualifications: e.target.value })}
                  required
                />
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="employer-page">
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          <img className="masthead-avatar mb-5" src="../images/logo-no-background.png" alt="..." />
          <h3 className=" text-uppercase mb-0">
            Welcome, {loggedInUser ? loggedInUser.name : ''}!
            <p>To your employer portal. Here are some things you can do:</p>
          </h3>
          <div className="divider-custom divider-light">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon"><i className="fas fa-star" /></div>
            <div className="divider-custom-line" />
          </div>
          <div className="button-container">
            <button className="btn1 btn-primary2" onClick={() => setActiveTab('postJobs')}>
              Post Jobs
            </button>
            <button className="btn1 btn-primary2" onClick={() => setActiveTab('reviewMockInterviews')}>
              Review Mock Interviews
            </button>
            <div>
             
            </div>
          </div>
        </div>
      </header>
      <div className="mn">
        <div className="additional-info">
          <h3>Additional Information:</h3>
          <ul className="horizontal-list">
            <li onClick={() => setActiveTab('postedJobs')}>Posted Jobs</li>
            <li onClick={() => setActiveTab('reviewMockInterviews')}>Review Mock Interviews</li>
            <li onClick={() => setActiveTab('chat')}>Chat</li>
          </ul>
        </div>
        <div className="tab-content">{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default Employer;
