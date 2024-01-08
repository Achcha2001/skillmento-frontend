import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import logo from './logo.svg';
import './App.css';
import Header from './components/header';
import Home from './components/home';
import Footer from './components/footer';
import Login from './components/login';
import Register from './components/register';
import ContactUs from './components/ContactUs';
import AboutUs from './components/about';
import Intern from './components/interns';
import CVIdeas from './components/cvideas';
import Employer from './components/employer';
import JobPage from './components/jobs';
import AdminPortal from './components/admin';


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/contact' element={<ContactUs/>}/>
          <Route path='/about' element={<AboutUs/>}/>
          <Route path='/cvideas' element={<CVIdeas/>}/>
          <Route path='/employer' element={<Employer/>}/>
          <Route path='/jobs' element={<JobPage/>}/>
          <Route path='/adminportal' element={<AdminPortal/>}/>
          
<Route path='/intern' element={<Intern/>}/>
        </Routes>
       
        <Footer />
      </div>
    </Router>
  );
}

export default App;
