import React, { useState } from 'react';
import './SingleCase.css'; // Make sure the CSS file is imported

const SingleCase = () => {
  const [editMode, setEditMode] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState('');
  const [summary, setSummary] = useState('');

  // Hardcoded case data for display
  const caseData = {
    plaintiffLawyer: "John Doe",
    defendantLawyer: "Jane Smith",
    plaintiff: "Alice Johnson",
    defendant: "Bob Brown",
    judge: "Judge Judy",
    courtType: "Civil Court",
    caseType: "Contract Dispute",
    caseDescription: "Case of breach of contract",
    hearingDate: "15/04/2024",
    caseNumber: "12345ABC"
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here, you would normally process the file and update the summary.
    // After processing, we'll just set a placeholder summary for now.
    setSummary('Generated summary of the audio will appear here.');
    setEditMode(false);
  };

  return (
    <div className="single-case">
      <div className="single-case-header">
        <h1 className="single-case-title">Case Details</h1>
        <button onClick={handleEditClick} className="edit-button">Edit</button>
      </div>
      <p className="case-detail"><strong>Plaintiff's Lawyer Name:</strong> {caseData.plaintiffLawyer}</p>
      <p className="case-detail"><strong>Defendant's Lawyer Name:</strong> {caseData.defendantLawyer}</p>
      <p className="case-detail"><strong>Plaintiff's Name:</strong> {caseData.plaintiff}</p>
      <p className="case-detail"><strong>Defendant's Name:</strong> {caseData.defendant}</p>
      <p className="case-detail"><strong>Judge's Name:</strong> {caseData.judge}</p>
      <p className="case-detail"><strong>Type of Court:</strong> {caseData.courtType}</p>
      <p className="case-detail"><strong>Type of Case:</strong> {caseData.caseType}</p>
      <p className="case-detail"><strong>Case Description:</strong> {caseData.caseDescription}</p>
      <p className="case-detail"><strong>Hearing Date:</strong> {caseData.hearingDate}</p>
      <p className="case-detail"><strong>Case Number:</strong> {caseData.caseNumber}</p>

      {editMode && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="audioUpload">Upload Audio File:</label>
            <input
              type="file"
              id="audioUpload"
              accept="audio/*"
              onChange={handleFileChange}
            />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}

      {summary && <div className="summary">{summary}</div>}
      {audioFile && (
        <div className="audio-control">
          <p className="audio-file-info">Audio File: {audioFile.name}</p>
          <audio controls>
            <source src={audioUrl} type={audioFile.type} />
            Your browser does not support the audio element.
          </audio>
        </div>
      )}
    </div>
  );
};

export default SingleCase;