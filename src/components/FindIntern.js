// FindIntern.js

import React from 'react';
import './FindIntern.css';

const FindIntern = () => {
  return (
    <div className="find-intern-container">
      <h2>Find Your Next Internship</h2>
      <p>Explore exciting internship opportunities tailored for you!</p>

      <div className="tips-section">
        <h3>Job Search Tips</h3>
        <ul>
          <li>Customize your resume for each application.</li>
          <li>Set up job alerts to stay updated on new opportunities.</li>
          <li>Network with professionals in your industry on LinkedIn.</li>
          <li>Attend career fairs and networking events to expand your connections.</li>
        </ul>
      </div>

      <div className="search-section">
        <h3>Search Internships</h3>
        {/* Add your search form or search bar component here */}
        {/* Example: */}
        <form>
          <input type="text" placeholder="Enter keywords..." />
          <button type="submit"><a className='fi' href='/login'>Search</a></button>
        </form>
      </div>

      <div className="featured-internships">
        <h3>Featured Internships</h3>
       
        <div className="internship-card">
          <h4>Software Development Intern</h4>
          <p>Company skillmento</p>
          <p>Location: City, Country</p>
          <button><a className='fi' href='/login'>Apply Now</a></button>
        </div>
      
      </div>
    </div>
  );
};

export default FindIntern;