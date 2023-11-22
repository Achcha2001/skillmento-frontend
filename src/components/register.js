import React, { useState } from 'react';
import './register.css';
import axios from 'axios';

const Register = () => {
  const [selectedTab, setSelectedTab] = useState('interns');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [experience, setExperience] = useState('');
  const [preferredSubject, setPreferredSubject] = useState('');
  const [companyWorked, setCompanyWorked] = useState('');
  const [jobPosition, setJobPosition] = useState('');

  const [companyName, setCompanyName] = useState('');
  const [position, setPosition] = useState('');
  const [employerPreferredSubject, setEmployerPreferredSubject] = useState('');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      firstName,
      lastName,
      email,
      university,
      contact,
      password,
      confirmPassword,
      experience,
      preferredSubject,
      companyWorked,
      jobPosition,
      companyName,
      position,
      employerPreferredSubject,
    };

    try {
      const response = await axios.post(`http://localhost:8080/${selectedTab}`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        console.log(`Registration for ${selectedTab} successful`);
        window.alert(`Registration for ${selectedTab} successful`);
        window.location.href = '/login';
      } else {
        console.error(`Registration for ${selectedTab} failed. Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error during registration:', error);

      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };

  const renderFormFields = () => {
    switch (selectedTab) {
      case 'interns':
        return (
          <div>
            <div className="form-group">
              <label htmlFor="university">University</label>
              <input
                type="text"
                id="university"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact">Contact</label>
              <input
                type="text"
                id="contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
            </div>
          </div>
        );
      case 'freelancers':
        return (
          <div>
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <input
                type="text"
                id="experience"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="preferredSubject">Preferred Subject</label>
              <input
                type="text"
                id="preferredSubject"
                value={preferredSubject}
                onChange={(e) => setPreferredSubject(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="companyWorked">Company Worked</label>
              <input
                type="text"
                id="companyWorked"
                value={companyWorked}
                onChange={(e) => setCompanyWorked(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobPosition">Job Position</label>
              <input
                type="text"
                id="jobPosition"
                value={jobPosition}
                onChange={(e) => setJobPosition(e.target.value)}
                required
              />
            </div>
          </div>
        );
      case 'employers':
        return (
          <div>
            <div className="form-group">
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="position">Position</label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="employerPreferredSubject">Preferred Subject</label>
              <input
                type="text"
                id="employerPreferredSubject"
                value={employerPreferredSubject}
                onChange={(e) => setEmployerPreferredSubject(e.target.value)}
                required
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
      <h2>Welcome! Let's get registered.</h2>
      <div className="tab-buttons">
        <button
          className={selectedTab === 'interns' ? 'active' : ''}
          onClick={() => handleTabChange('interns')}
        >
          Intern
        </button>
        <button
          className={selectedTab === 'freelancers' ? 'active' : ''}
          onClick={() => handleTabChange('freelancers')}
        >
          Freelancer
        </button>
        <button
          className={selectedTab === 'employers' ? 'active' : ''}
          onClick={() => handleTabChange('employers')}
        >
          Employer
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
        {renderFormFields()}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
