import React, { useState } from 'react';
import './AddCase.css';

export default function AddCase() {
  const [formState, setFormState] = useState({
    plaintiffLawyerName: '',
    defendantLawyerName: '',
    judgeName: '',
    caseType: '',
    courtType: '',
    plaintiffName: '',
    defendantName: '',
    caseDescription: '',
    hearingDate: '',
    caseNumber: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formState);
    // Integration for data submission to server or state management system goes here
  };

  return (
    <div className="add-case-form-container">
      <h2>Register a New Court Case</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="form-group">
            <label htmlFor="plaintiffLawyerName">Plaintiff's Lawyer Name:</label>
            <input
              type="text"
              id="plaintiffLawyerName"
              name="plaintiffLawyerName"
              value={formState.plaintiffLawyerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="defendantLawyerName">Defendant's Lawyer Name:</label>
            <input
              type="text"
              id="defendantLawyerName"
              name="defendantLawyerName"
              value={formState.defendantLawyerName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="plaintiffName">Plaintiff's Name:</label>
            <input
              type="text"
              id="plaintiffName"
              name="plaintiffName"
              value={formState.plaintiffName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="defendantName">Defendant's Name:</label>
            <input
              type="text"
              id="defendantName"
              name="defendantName"
              value={formState.defendantName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="judgeName">Judge's Name:</label>
          <input
            type="text"
            id="judgeName"
            name="judgeName"
            value={formState.judgeName}
            onChange={handleInputChange}
          />
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="courtType">Type of Court:</label>
            <select
              id="courtType"
              name="courtType"
              value={formState.courtType}
              onChange={handleInputChange}
            >
              <option value="">Select Court Type</option>
              <option value="civil">Civil Court</option>
              <option value="criminal">Criminal Court</option>
              <option value="family">Family Court</option>
              <option value="high">High Court</option>
              <option value="supreme">Supreme Court</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="caseType">Type of Case:</label>
            <select
              id="caseType"
              name="caseType"
              value={formState.caseType}
              onChange={handleInputChange}
            >
              <option value="">Select Case Type</option>
              <option value="fraud">Fraud</option>
              <option value="propertyDispute">Property Dispute</option>
              <option value="divorce">Divorce</option>
              <option value="patentInfringement">Patent Infringement</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="form-group full-width">
          <label htmlFor="caseDescription">Case Description:</label>
          <textarea
            id="caseDescription"
            name="caseDescription"
            value={formState.caseDescription}
            onChange={handleInputChange}
            rows="3" /* Start with 3 rows of height */
          />
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="hearingDate">Hearing Date:</label>
            <input
              type="date"
              id="hearingDate"
              name="hearingDate"
              value={formState.hearingDate}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="caseNumber">Case Number:</label>
            <input
              type="text"
              id="caseNumber"
              name="caseNumber"
              value={formState.caseNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">Register Case</button>
        </div>
      </form>
    </div>
  );
}