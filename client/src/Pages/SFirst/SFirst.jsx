import React, { useState } from 'react';
import './SFirst.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlayCircle,faBookmark } from '@fortawesome/free-solid-svg-icons'; // Make sure you have faPlayCircle imported
import LogoImage from '../../assets/LOGO.png';
import adminlaw from '../../assets/adminlaw.webp';
import civillaw from '../../assets/civillaw.webp';
import corplaw from '../../assets/corplaw.webp';
import criminallaw from '../../assets/Criminallaw.webp';
import intlaw from '../../assets/intlaw.webp';
import publiclaw from '../../assets/publiclaw.webp';
import { useNavigate } from 'react-router-dom';


export default function SFirst() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Sample data for cases
  const cases = [
      {
        id: 1,
        title: "Criminal Law",
        description: "Homicide & Theft : Unlawful death cases and burglary incidents. Drug Crimes & Assault : Substance-related offenses and harm-related violations, including DUI/DWI.",
        imageUrl: criminallaw
      },
      {
        id: 2,
        title: "Civil Law",
        description: "Contract, Torts, & Property Disputes: Contract enforcement, personal injury, and zoning issues. Family Law & Estate Planning: Covers divorce, custody, and estate management.",
        imageUrl: civillaw
      },
      {
        id: 3,
        title: "Commercial and Corporate Law",
        description: "Intellectual Property & Employment Law: Patent/trademark issues and workplace disputes. Bankruptcy & Securities: Insolvency cases and financial market compliance.",
        imageUrl: corplaw
      },
      {
        id: 4,
        title: "Administrative Law",
        description: "Immigration Law : Issues with visas, asylum and citizenship. Social Security / Disability and Licensing : Benefit disputes and regulatory compliance.",
        imageUrl: adminlaw
      },
      {
        id: 5,
        title: "International Law",
        description: "Human Rights Cases : Allegations of rights violations. Trade & Environmental Law : International trade disputes and environmental protection.",
        imageUrl: intlaw
      },
      {
        id: 6,
        title: "Public Law",
        description: "Constitutional Law : Interpretation / application of constitutional issues. Tax Law: Disputes on tax obligations.",
        imageUrl: publiclaw
      }
  ];
      
  const classes = [
    {
      id: 1,
      lawyerName: "Mohammad Kashif Alam",
      law: "Criminal Law",
      title: "Bank robbery",
      views: "1.1K",
      language: "English"
    },
    {
      id: 2,
      lawyerName: "Arvind Kalia",
      law: "Civil Law",
      title: "Amber Heard vs Johnny depp",
      views: "1.3K",
      language: "English"
    },
    {
      id: 3,
      lawyerName: "Shruti Punjabi",
      law: "Legal Law",
      title: "The Famous Divorce",
      views: "103K",
      language: "English"
    },
    {
      id: 4,
      lawyerName: "Parth Puranik",
      law: "Litigation",
      title: "Dowry",
      views: "69K",
      language: "English"
    },
    {
      id: 5,
      lawyerName: "Arvind Kalia",
      law: "Crime",
      title: "Forgeries",
      views: "7k",
      language: "English"
    },
  ];

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredCases = cases.filter(caseItem =>
    caseItem.title.toLowerCase().includes(searchQuery) ||
    caseItem.description.toLowerCase().includes(searchQuery)
  );

  const filteredClasses = classes.filter(classItem =>
    classItem.law.toLowerCase().includes(searchQuery) ||
    classItem.title.toLowerCase().includes(searchQuery) ||
    classItem.lawyerName.toLowerCase().includes(searchQuery)
  );

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    navigate('/Profile'); // Navigate to SFirst page
  };


  return (
    <div>
      <div className="navbar">
        <div className='navbar-brand'>
          <img src={LogoImage} alt="Logo" style={{ height: '50px' }} />
          LegalEye
        </div>
        <div>
          <input
            type="text"
            placeholder="Search cases..."
            onChange={handleSearchChange}
          />
          <select>
            <option value="">Filter by</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            {/* More filter options */}
          </select>
        </div>

        <button 
          type="button" 
          className="btn btn-primary nav-btn" 
          style={{width: '185px'}}
          onClick={handleSubmit}  // Use onClick to handle the navigation
          >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
            <span>Student Name</span>
          </div>
        </button>
      </div>  
      
      {/* Ensure the rest of the content is outside and below the navbar */}
      <div className="content">
        <div className="case-container">
          {filteredCases.map(caseItem => (
            <div className="case-card" key={caseItem.id}>
              <img src={caseItem.imageUrl} alt={caseItem.title} />
              <h3>{caseItem.title}</h3>
              <p>{caseItem.description}</p>
            </div>
          ))}
        </div>
        <h2>Most engaging Cases of 2023</h2>
        <div className="class-container">
          {filteredClasses.map(classItem => (
            <div className="class-card" key={classItem.id}>
              <div className="class-card-header">                
                <span>{classItem.views}</span>
                <button type="button" class="bookmark-btn btn"> <FontAwesomeIcon icon={faBookmark}></FontAwesomeIcon> </button>
              </div>
              <div className="class-card-body">
                <span className="law">{classItem.law}</span>
                <h3>{classItem.title}</h3>
                <p>{classItem.lawyerName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
