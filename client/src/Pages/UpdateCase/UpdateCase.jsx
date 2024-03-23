import React, { useState } from 'react';
import './Updatecase.css';
import LogoImage from '../../assets/LOGO.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

// UpdateCase component to render multiple CaseCards and a navigation bar
export default function UpdateCase() {
  const [searchTerm, setSearchTerm] = useState('');

  const cases = [
    // Example cases
    {
      caseNumber: '123',
      caseType: 'Civil',
      plaintiffLawyer: 'John Doe',
      defendantLawyer: 'Jane Smith',
      plaintiffName: 'Alice Johnson',
      defendantName: 'Bob Brown',
      judgeName: 'Judge Judy',
      courtType: 'Supreme Court',
      description: 'This is a sample case description.',
    },
    {
      caseNumber: '124',
      caseType: 'Criminal',
      plaintiffLawyer: 'Henry Gale',
      defendantLawyer: 'Saul Goodman',
      plaintiffName: 'Victor Strand',
      defendantName: 'James McGill',
      judgeName: 'Harold Tatum',
      courtType: 'Federal Court',
      description: 'An intricate case involving fraud and embezzlement.',
    },
    {
      caseNumber: '125',
      caseType: 'Family',
      plaintiffLawyer: 'Miranda Bailey',
      defendantLawyer: 'Alex Karev',
      plaintiffName: 'Meredith Grey',
      defendantName: 'Derek Shepherd',
      judgeName: 'Lexie Grey',
      courtType: 'State Court',
      description: 'A dispute over custody and child support.',
    },
    {
      caseNumber: '126',
      caseType: 'Civil',
      plaintiffLawyer: 'Olivia Benson',
      defendantLawyer: 'Eliot Stabler',
      plaintiffName: 'John Stamos',
      defendantName: 'Bob Saget',
      judgeName: 'Danny Tanner',
      courtType: 'District Court',
      description: 'A civil lawsuit over property damage.',
    },
    {
      caseNumber: '127',
      caseType: 'Bankruptcy',
      plaintiffLawyer: 'Kim Wexler',
      defendantLawyer: 'Howard Hamlin',
      plaintiffName: 'Chuck McGill',
      defendantName: 'Jimmy McGill',
      judgeName: 'Michael Ehrmantraut',
      courtType: 'Bankruptcy Court',
      description: 'A complex bankruptcy case with multiple parties involved.',
    },
    {
      caseNumber: '128',
      caseType: 'Criminal',
      plaintiffLawyer: 'Annalise Keating',
      defendantLawyer: 'Connor Walsh',
      plaintiffName: 'Wes Gibbins',
      defendantName: 'Frank Delfino',
      judgeName: 'Bonnie Winterbottom',
      courtType: 'Superior Court',
      description: 'A criminal case involving charges of murder.',
    },
    {
      caseNumber: '129',
      caseType: 'Civil',
      plaintiffLawyer: 'Alicia Florrick',
      defendantLawyer: 'Diane Lockhart',
      plaintiffName: 'Kalinda Sharma',
      defendantName: 'Will Gardner',
      judgeName: 'Cary Agos',
      courtType: 'Appellate Court',
      description: 'Intellectual property dispute over a new invention.',
    },
    {
      caseNumber: '130',
      caseType: 'Family',
      plaintiffLawyer: 'Harvey Specter',
      defendantLawyer: 'Mike Ross',
      plaintiffName: 'Rachel Zane',
      defendantName: 'Louis Litt',
      judgeName: 'Jessica Pearson',
      courtType: 'Family Court',
      description: 'A case focusing on the enforcement of a prenuptial agreement.',
    },
    {
      caseNumber: '131',
      caseType: 'Criminal',
      plaintiffLawyer: 'Billy McBride',
      defendantLawyer: 'Donald Cooperman',
      plaintiffName: 'Patty Solis-Papagian',
      defendantName: 'Lucy Kittridge',
      judgeName: 'Joseph Potter',
      courtType: 'Criminal Court',
      description: 'A high-profile criminal trial for corporate espionage.',
    },
    {
      caseNumber: '132',
      caseType: 'Civil',
      plaintiffLawyer: 'Matt Murdock',
      defendantLawyer: 'Foggy Nelson',
      plaintiffName: 'Karen Page',
      defendantName: 'Wilson Fisk',
      judgeName: 'Claire Temple',
      courtType: 'Municipal Court',
      description: 'A civil case involving allegations of corruption.',
    },
    {
      caseNumber: '133',
      caseType: 'Bankruptcy',
      plaintiffLawyer: 'Howard Hamlin',
      defendantLawyer: 'Kim Wexler',
      plaintiffName: 'Jimmy McGill',
      defendantName: 'Chuck McGill',
      judgeName: 'Michael Ehrmantraut',
      courtType: 'Federal Court',
      description: 'Bankruptcy proceedings following a failed business venture.',
    }
    
    // Add more cases as needed
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter cases based on search term
  const filteredCases = cases.filter((caseDetails) =>
  caseDetails.caseNumber.includes(searchTerm) ||
  caseDetails.caseType.toLowerCase().includes(searchTerm.toLowerCase()) ||
  caseDetails.plaintiffLawyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
  caseDetails.defendantLawyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
  caseDetails.plaintiffName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  caseDetails.defendantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  caseDetails.judgeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  caseDetails.courtType.toLowerCase().includes(searchTerm.toLowerCase()) ||
  caseDetails.description.toLowerCase().includes(searchTerm.toLowerCase())
);


  return (
    <>
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
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} />
          <span>Student Name</span>
        </div>
      </div>

      <div className="update-case-form-container">
        {filteredCases.map((caseDetails, index) => (
          <div className="case-card" key={index}>
            <h3>{caseDetails.caseNumber}</h3>
            <p>Case Type: {caseDetails.caseType}</p>
            <p>Plaintiff's Lawyer: {caseDetails.plaintiffLawyer}</p>
            <p>Defendant's Lawyer: {caseDetails.defendantLawyer}</p>
            <p>Plaintiff's Name: {caseDetails.plaintiffName}</p>
            <p>Defendant's Name: {caseDetails.defendantName}</p>
            <p>Judge's Name: {caseDetails.judgeName}</p>
            <p>Type of Court: {caseDetails.courtType}</p>
            <p>Case Description: {caseDetails.description}</p>
            <button>View</button>
            <button>Edit</button>
          </div>
        ))}
      </div>
    </>
  );
}
