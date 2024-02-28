import React from 'react';
import './SFirst.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlayCircle } from '@fortawesome/free-solid-svg-icons'; // Make sure you have faPlayCircle imported
import LogoImage from '../../assets/LOGO.png';

export default function SFirst() {

  // Sample data for cases
  const cases = [
      {
        id: 1,
        title: "Criminal Law",
        description: "Homicide Cases: Involving unlawful death, including murder and manslaughter. Theft and Burglary: Involving property theft, break-ins, and robbery. Drug-Related Crimes: Including possession, distribution, and manufacturing of illegal substances. Assault and Battery: Involving physical harm or threats to a person. DUI/DWI Cases: Relating to driving under the influence of alcohol or drugs.",
        imageUrl: "path/to/criminal-law.jpg"
      },
      {
        id: 2,
        title: "Civil Law",
        description: "Contract Disputes: Involving disagreements over the terms and enforcement of contracts. Torts: Including personal injury cases, negligence, and defamation. Property Disputes: Covering issues like boundary disputes, zoning, and property damage. Family Law: Encompassing divorce, child custody, and adoption. Estate Planning and Probate: Involving wills, trusts, and estate management.",
        imageUrl: "path/to/civil-law.jpg"
      },
      {
        id: 3,
        title: "Commercial and Corporate Law",
        description: "Intellectual Property: Covering patents, copyrights, trademarks, and trade secrets. Employment Law: Involving wrongful termination, discrimination, and workplace safety. Bankruptcy: Covering both individual and corporate bankruptcy proceedings. Securities Law: Involving stock market fraud, insider trading, and compliance with financial regulations.",
        imageUrl: "path/to/commercial-law.jpg"
      },
      {
        id: 4,
        title: "Administrative Law",
        description: "Immigration Law: Covering visas, asylum, deportation, and citizenship issues. Social Security and Disability Claims: Involving disputes over benefits and entitlements. Licensing Issues: Related to professional licensure and regulatory compliance.",
        imageUrl: "path/to/administrative-law.jpg"
      },
      {
        id: 5,
        title: "International Law",
        description: "Human Rights Cases: Involving allegations of human rights violations. Trade Disputes: Covering international trade agreements and disputes. Environmental Law: Addressing international environmental protection efforts.",
        imageUrl: "path/to/international-law.jpg"
      },
      {
        id: 6,
        title: "Public Law",
        description: "Constitutional Law: Involving issues related to the interpretation and application of the constitution. Tax Law: Covering disputes over tax obligations with government entities.",
        imageUrl: "path/to/public-law.jpg"
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
  ];


  return (
    <div>
      <div className="navbar">
        <div className='navbar-brand'>
        <img src={LogoImage} alt="Logo" style={{ height: '50px' }} /> {/* Logo */}
        LegalEye</div>
        <div>
          <input type="text" placeholder="Search cases..." />
          <select>
            <option value="">Filter by</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            {/* More filter options */}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: '10px' }} /> {/* Profile Icon */}
          <span>Student Name</span> {/* Replace "Student Name" with actual data */}
        </div>
      </div>
      <div className="case-container">
        {cases.map(caseItem => (
          <div className="case-card" key={caseItem.id}>
            <img src={caseItem.imageUrl} alt={caseItem.title} />
            <h3>{caseItem.title}</h3>
            <p>{caseItem.description}</p>
          </div>
        ))}
      </div>
      <h2>Most engaging Cases of 2023</h2>
      <div className="class-container">
        {classes.map(classItem => (
          <div className="class-card" key={classItem.id}>
            <div className="class-card-header">
              <span>{classItem.views}</span>
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
  );
}
