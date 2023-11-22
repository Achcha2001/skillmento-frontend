import React from "react";
import './header.css';

function Header() {
  return (
    <div>
      {/* Navigation*/}
      <nav className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
        <div className="container">
          <a className="navbar-brand" href="/"><img className="img" src="../images/logo-no-background.png"></img></a>
          <button className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="/">Home</a></li>
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="#jobs">Jobs</a></li>
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="/cvideas">CV Ideas</a></li>

              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="/about">About</a></li>
              <li className="nav-item mx-0 mx-lg-1"><a className="nav-link py-3 px-0 px-lg-3 rounded" href="/contact">Contact</a></li>
              {/* Modify the styling for the "Login" button */}
              <li className="nav-item mx-0 mx-lg-1">
                <a className="  rounded btn btn-outline-light btn-primary" href="/login">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

   
    </div>
  );
}

export default Header;
