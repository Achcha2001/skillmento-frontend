import React from "react";
import './home.css';

function Home() {
  return (
    <div className="App">
      {/* Masthead */}
      <header className="masthead bg-primary text-white text-center">
        <div className="container d-flex align-items-center flex-column">
          {/* Masthead Avatar Image */}
          <img className="masthead-avatar mb-5" src="../images/logo-no-background.png" alt="..." />
          
          {/* Masthead Heading */}
          <h1 className="masthead-heading text-uppercase mb-0">Reserve the best interviewee for you...</h1>
          
          {/* Icon Divider */}
          <div className="divider-custom divider-light">
            <div className="divider-custom-line" />
            <div className="divider-custom-icon"><i className="fas fa-star" /></div>
            <div className="divider-custom-line" />
          </div>
          
          {/* Buttons */}
          <div className="button-container">
            <button className="btn1 btn-primary2">Hire a Freelancer</button>
            <button className="btn1 btn-primary2"><a href="/FindIntern">Find an Intern</a></button>
          </div>
        </div>
      </header>

      {/* Portfolio Grid Items */}
      <div className="row justify-content-center">
        {/* Portfolio Item 1 */}
        <div>
          <div>
            <section className="up">
            <h1 className="text-center mb-4">Be a Confident Intern</h1>
            <div className="row">
              {/* Box 1: Upload CV */}
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto">
                  {/* Add your content for uploading CV here */}
                  <div className="portfolio-item-content text-center">
                    <h3>Upload Your CV</h3>
                    <p>You can upload your created cv and get reviewed from the field peaople.</p>
                  </div>
                </div>
              </div>
              {/* Box 2: Book a Mock Interview */}
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto">
                 
                  <div className="portfolio-item-content text-center">
                    <h3>Book a Mock Interview</h3>
                    <p>Book a mock interview with a freelancer and get some expirience.</p>
                  </div>
                </div>
              </div>
              {/* Box 3: Direct Employer Calls */}
              <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                <div className="portfolio-item mx-auto">
                 
                  <div className="portfolio-item-content text-center">
                    <h3>Direct Employer Calls</h3>
                    <p>Your cv can directly view by an employer from our site</p>
                  </div>
                </div>
              </div>
              {/* Box 4: Experienced Interviewer */}
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto">
                 
                  <div className="portfolio-item-content text-center">
                    <h3>Are you an experienced Interviewer?</h3>
                    <p>Interview interns and make a good income</p>
                  </div>
                </div>
              </div>
              {/* Box 5: Looking for Good Interns */}
              <div className="col-md-6 col-lg-4 mb-5">
                <div className="portfolio-item mx-auto">
                  {/* Add your content for looking for good interns here */}
                  <div className="portfolio-item-content text-center">
                    <h3>Are you looking for best Interns?</h3>
                    <p>You can find good intern from skillmento now.</p>
                  </div>
                </div>
              </div>
              {/* Box 6: Sample (You can replace this with actual content later) */}
              <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                <div className="portfolio-item mx-auto">
                  {/* Add your sample content here */}
                  <div className="portfolio-item-content text-center">
                    <h3>Lets get started </h3>
                    <p>You dont have to be an intern if you want to boost your confidence just register.</p>
                  </div>
                </div>
              </div>
            </div>
            </section>
          </div>
          
        </div>
       
      </div>
    
    </div>
   
  );
}

export default Home;
