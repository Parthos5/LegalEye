import React from 'react';
import './SFirst.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import LogoImage from '../../assets/LOGO.png';

export default function SFirst() {
  // Sample data for cases
  const cases = [
    { id: 1, title: "Case 1", description: "Description for Case 1", imageUrl: "path/to/image1.jpg" },
    { id: 2, title: "Case 2", description: "Description for Case 2", imageUrl: "path/to/image2.jpg" },
    { id: 2, title: "Case 3", description: "Description for Case 3", imageUrl: "path/to/image3.jpg" },
    { id: 2, title: "Case 4", description: "Description for Case 4", imageUrl: "path/to/image4.jpg" },
    { id: 2, title: "Case 5", description: "Description for Case 5", imageUrl: "path/to/image5.jpg" },
    { id: 2, title: "Case 6", description: "Description for Case 6", imageUrl: "path/to/image6.jpg" },
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
    </div>
  );
}
