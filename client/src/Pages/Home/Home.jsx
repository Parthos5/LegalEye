import React from 'react'
import './Home.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons';
import { faGavel, faBrain, faBookReader } from '@fortawesome/free-solid-svg-icons';
import introImage from '../../assets/img.jpg';
import LogoImage from '../../assets/LOGO.png';
import Recording from '../../assets/Recording.webp';
import Transcriptor from '../../assets/Transcriptor.webp';
import Sum from '../../assets/Sum.webp';


export default function Home() {

  const navigate = useNavigate(); // Hook to get navigate function

  const handleGetStartedClick = () => {
    navigate('/login'); // Navigate to login page
  };

  const scrollToSection = (sectionId) => (event) => {
    event.preventDefault();
    document.getElementById(sectionId).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand">
          <img src={LogoImage} alt="Logo" style={{ marginRight: '10px', height: '50px' }} /> {/* Logo image */}
          LegalEye
        </div>
        <div className="navbar-menu">
          <a href="#why" className="navbar-item" onClick={scrollToSection('why')}>Why Us?</a>
          <a href="#solutions" className="navbar-item" onClick={scrollToSection('solutions')}>Solutions</a>
          <a href="#resources" className="navbar-item" onClick={scrollToSection('resources')}>Resources</a>
          <a href="#start" className="navbar-item" onClick={scrollToSection('pricing')}>Pricing</a>
        </div>
        <div className="navbar-end">
          <a href="#sign-in" className="navbar-item">Sign In</a>
          <button className="btn-started" onClick={scrollToSection('start')}>Get Started</button>
        </div>
      </nav>
      <div className="intro-container">
        <img src={introImage} alt="Intro" className="intro-image" />
        <div className="intro-text">
          <h1>LegalEye</h1>
          <p>Revolutionizing Legal Studies: From Gavel to Gravel, Capture Every Word and Unlock the Power of Summarized Knowledge.</p>
        </div>
      </div>
      {/* Add your sections here with corresponding IDs */}
      <section id="why" className="why-us-section">
        <div className="container">
          <h2 className="section-title">Why Choose LegalEye?</h2>
          <div className="features">
            <div className="feature">
              <FontAwesomeIcon icon={faGavel} className="feature-icon" />
              <i className="feature-icon fas fa-gavel"></i>
              <h3 className="feature-title">Accurate Transcription</h3>
              <p className="feature-description">Our state-of-the-art speech recognition technology ensures precise transcription of court proceedings, capturing every detail.</p>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faBrain} className="feature-icon" />
              <i className="feature-icon fas fa-brain"></i>
              <h3 className="feature-title">Intelligent Summarization</h3>
              <p className="feature-description">Leverage advanced AI to distill lengthy proceedings into concise, comprehensible summaries perfect for study and review.</p>
            </div>
            <div className="feature">
              <FontAwesomeIcon icon={faBookReader} className="feature-icon" />
              <i className="feature-icon fas fa-book-reader"></i>
              <h3 className="feature-title">Educational Resource</h3>
              <p className="feature-description">Empower law students with a database of searchable, summarized cases to enhance learning and research efficiency.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="solutions" className="solutions-section">
        <h2 className="solutions-title">Our Solutions</h2>
        <div className="solutions-wrapper">
          <div className="solution-card">
            <div className="card-image">
              <img src={Recording} alt="Recording" className="Recording" />
            </div>
            <div className="card-content">
              <h3>Recording</h3>
              <p>High-quality recording of court proceedings for accurate transcription and review.</p>
            </div>
          </div>
          <div className="solution-card">
            <div className="card-image">
              <img src={Transcriptor} alt="Transcription" />
            </div>
            <div className="card-content">
              <h3>Transcription</h3>
              <p>Transforming audio recordings into precise, searchable text documents.</p>
            </div>
          </div>
          <div className="solution-card">
            <div className="card-image">
              <img src={Sum} alt="Summarization" />
            </div>
            <div className="card-content">
              <h3>Summarization</h3>
              <p>AI-powered tools to distill lengthy proceedings into concise summaries.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="resources-section">
        <h2 className="resources-title">Comprehensive Legal Resources</h2>
        <p className="resource-description">
          Our platform offers an extensive collection of legal resources tailored to enhance the learning and research experience for law students and professionals. Below are some of the key resources we provide:
        </p>
        <ul className="resource-list">
          <li>
            <strong>Case Summaries:</strong> Concise summaries of court proceedings, capturing the essence of each case to facilitate quick understanding and review.
          </li>
          <li>
            <strong>Judge and Lawyer Profiles:</strong> Detailed information on the judges presiding over cases and the lawyers representing parties, offering insights into their legal backgrounds and expertise.
          </li>
          <li>
            <strong>Official Documents:</strong> Access to official legal documents used in the proceedings, including motions, briefs, and judgments, to provide a comprehensive view of each case.
          </li>
        </ul>
      </section>

      <section id="start" className="start-section">
        <div className="start-container">
          <div className="option" onClick={() => navigate('/login')}>
            <h3>Government Officials</h3>
            <p>Login here for access to official proceedings and documents.</p>
          </div>

          <FontAwesomeIcon icon={faBalanceScale} className="scales-icon" />

          <div className="option" onClick={() => navigate('/signin')}>
            <h3>Students</h3>
            <p>Sign in here for educational resources and case studies.</p>
          </div>
        </div>
      </section>
      
      {/* ... other sections ... */}
    </div>
  );
}

