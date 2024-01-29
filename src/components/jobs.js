

import React from 'react';
import './JobPage.css'; 

const JobPage = () => {
  return (
    <div className="job-page">
      <header>
        <h1>SkillMento Job Openings</h1>
      </header>

      <section className="job-types">
        <h2>Featured Job Categories</h2>

        <div className="job-type">
          <h3>Software Developer</h3>
          <p>Join our dynamic team of software developers and contribute to cutting-edge projects.</p>
        </div>

        <div className="job-type">
          <h3>Digital Marketing Specialist</h3>
          <p>Explore the exciting world of digital marketing and help us grow our online presence.</p>
        </div>

        <div className="job-type">
          <h3>UX/UI Designer</h3>
          <p>Shape the user experience and interface of our products as a UX/UI designer.</p>
        </div>

     

      </section>
    </div>
  );
};

export default JobPage;
