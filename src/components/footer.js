import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer text-center" style={{ padding: "20px 0" }}>
        <div className="container">
          <div className="row">
            {/* Footer Location*/}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h4 className="text-uppercase mb-3">Location</h4>
              <p className="lead mb-0">
                No 26 castle-lane
                <br />
                colombo-04
              </p>
            </div>
            {/* Footer Social Icons*/}
            <div className="col-lg-4 mb-4 mb-lg-0">
              <h4 className="text-uppercase mb-3">skillmento</h4>
              <a className="btn btn-outline-light btn-social mx-1" href="#!">
                <i className="fab fa-fw fa-facebook-f" />
              </a>
              <a className="btn btn-outline-light btn-social mx-1" href="#!">
                <i className="fab fa-fw fa-twitter" />
              </a>
              <a className="btn btn-outline-light btn-social mx-1" href="#!">
                <i className="fab fa-fw fa-linkedin-in" />
              </a>
              <a className="btn btn-outline-light btn-social mx-1" href="#!">
                <i className="fab fa-fw fa-dribbble" />
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Copyright Section*/}
      <div className="copyright py-2 text-center text-white" style={{ fontSize: "14px" }}>
        <div className="container"><small>Copyright © SkillMento 2023</small></div>
      </div>
    </div>
  );
};

export default Footer;
