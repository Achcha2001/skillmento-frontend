// Employer.js
import './employer.css';
import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import baseURL from './baseurl';

import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Employer = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [activeTab, setActiveTab] = useState('postedJobs');
  const [postedJobs, setPostedJobs] = useState([]);
  const [selectedJobForBids, setSelectedJobForBids] = useState(null);
  const [showBidDetails, setShowBidDetails] = useState(false);

  // Add state variable to store the bid details
  const [selectedBidDetails, setSelectedBidDetails] = useState(null);

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
  const [availableSlots, setAvailableSlots] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  
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

  useEffect(() => {
    fetchUserData();
    fetchPostedJobs();
    fetchAvailableSlots();
   
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(`${baseURL}/fetchAvailableSlots`);
      const data = await response.json();

      if (response.ok) {
        setAvailableSlots(data);
        updateCalendarEvents(data);
      } else {
        console.error('Failed to fetch available slots');
      }
    } catch (error) {
      console.error('Error during fetchAvailableSlots:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchPostedJobs();
    fetchAvailableSlots();
  }, []);

  const updateCalendarEvents = (slots) => {
    const events = slots.map((slot) => ({
      start: new Date(slot),
      end: moment(slot).add(1, 'hour').toDate(),
      title: 'Free Slot',
    }));

    setCalendarEvents(events);
  };

  const updateSelectedSlot = async (selectedSlot) => {
    try {
      const response = await fetch(`${baseURL}/updateSlot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          selectedSlot,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Slot updated successfully:', data);
        fetchAvailableSlots();
      } else {
        console.error('Failed to update slot:', data.message);
      }
    } catch (error) {
      console.error('Error during slot update:', error.message);
    }
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
           </div>
         </div>
          ))}
          <button onClick={() => setShowBidDetails(false)}>Close</button>
        </div>
      );
        
      case 'reviewMockInterviews':
        return (
          <div>
            <h3>Review Mock Interviews</h3>
            <p>Update your available slots:</p>
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={updateSelectedSlot}
              style={{ height: 500 }}
            />
          </div>
        );
     
      case 'chat':
        return (
          <div>
            <h3>Chat</h3>
            <p>Start chatting here.</p>
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
