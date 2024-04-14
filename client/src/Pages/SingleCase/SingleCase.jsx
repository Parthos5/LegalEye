import React, { useEffect, useState } from "react";
import "./SingleCase.css"; // Make sure the CSS file is imported
import { useParams } from "react-router-dom";

const SingleCase = () => {
  const { caseId } = useParams();
  const [editMode, setEditMode] = useState(false);
  const [audios, setAudios] = useState([]); // Array to store audio files and dates
  const [audioFile, setAudioFile] = useState(null);
  const [audioDate, setAudioDate] = useState("");
  const [isIdMatch, setIsIdMatch] = useState(false);

  // Hardcoded case data for display
  const [caseData, setCaseData] = useState({
    plaintiffLawyer: "John Doe",
    defendantLawyer: "Jane Smith",
    plaintiffName: "Alice Johnson",
    defendantName: "Bob Brown",
    judgeName: "Judge Judy",
    typeOfCourt: "Civil Court",
    typeOfCase: "Contract Dispute",
    caseDescription: "Case of breach of contract",
    hearingDate: "15/04/2024",
    caseNumber: "12345ABC",
    // ownerId:""
  });

  const testUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token);
    const resp = await fetch("http://localhost:5000/govt/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Corrected typo here
      },
      body: JSON.stringify({ token: token }), // Pass token as an object property
    });
    const data = await resp.json();
    console.log(data);
    console.log(data.User._id);
    console.log(caseData.ownerId)
    if (data.User._id == caseData.ownerId) {
      setIsIdMatch(true);
      console.log(isIdMatch);
    } else {
      setIsIdMatch(false);
      console.log(isIdMatch);
    }
  };

  const getCase = async () => {
    const resp = await fetch(
      `http://localhost:5000/cases/getCaseById/${caseId}`,
      {
        method: "GET",
      }
    );
    const data = await resp.json();
    console.log(data);
    setCaseData(data);

    const viewresp = await fetch("http://localhost:5000/cases/addViews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ caseId }),
    });
  };

  useEffect(() => {
    getCase();
    testUser();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleDateChange = (event) => {
    setAudioDate(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newAudioData = {
      file: audioFile,
      date: audioDate,
      url: URL.createObjectURL(audioFile),
      summary: "Generated summary of the audio will appear here.", // Placeholder summary
    };
    setAudios(audios.concat(newAudioData)); // Add new audio data to the array
    // Clear the input fields
    setAudioFile(null);
    setAudioDate("");
    setEditMode(false);
  };

  return (
    <div className="single-case">
      <div className="single-case-header">
        <h1 className="single-case-title">Case Details</h1>
        {isIdMatch && (
          <button onClick={handleEditClick} className="edit-button">
            Edit
          </button>
        )}
      </div>

      {/* Display case data */}
      {Object.entries(caseData).map(([key, value]) => (
        <p className="case-detail" key={key}>
          <strong>
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
            :
          </strong>{" "}
          {value}
        </p>
      ))}

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
            <label htmlFor="audioDate">Audio Date:</label>
            <input
              type="date"
              id="audioDate"
              value={audioDate}
              onChange={handleDateChange}
            />
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Display submitted audio files and dates */}
      {audios.map((audio, index) => (
        <div key={index} className="audio-control">
          <p className="audio-file-info">
            <strong>Audio File:</strong> {audio.file.name}
            <strong>Date:</strong> {audio.date}
          </p>
          <audio controls>
            <source src={audio.url} type={audio.file.type} />
            Your browser does not support the audio element.
          </audio>
          <p className="summary">{audio.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default SingleCase;
