import React, { useEffect, useState } from "react";
import "./Updatecase.css";
import LogoImage from "../../assets/LOGO.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// UpdateCase component to render multiple CaseCards and a navigation bar
export default function UpdateCase() {
  const [searchTerm, setSearchTerm] = useState("");

  const [cases, setCases] = useState([
    // Example cases
    {
      caseNumber: "123",
      caseType: "Civil",
      plaintiffLawyer: "John Doe",
      defendantLawyer: "Jane Smith",
      plaintiffName: "Alice Johnson",
      defendantName: "Bob Brown",
      judgeName: "Judge Judy",
      courtType: "Supreme Court",
      description: "This is a sample case description.",
    },
    // Add more cases as needed
  ]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getCases = async () => {
    try {
      const govtId = JSON.parse(localStorage.getItem("govtId"));
      const resp = await fetch("https://legaleye-server.onrender.com/cases/getCasesByUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ govtId: govtId }),
      });
      if (!resp.ok) {
        throw new Error("Failed to fetch cases");
      }
      const data = await resp.json();
      console.log(data);
      setCases(data.cases); // Assuming the response contains a property called "cases" which is an array
    } catch (error) {
      console.error("Error fetching cases:", error);
    }
  };

  useEffect(() => {
    getCases();
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar-brand">
          <img src={LogoImage} alt="Logo" style={{ height: "50px" }} />
          LegalEye
        </div>
        <div>
          <input
            type="text"
            placeholder="Search cases..."
            onChange={handleSearchChange}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
          <span>Student Name</span>
        </div>
      </div>

      <div className="update-case-form-container">
        {cases.map((caseDetails, index) => (
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
            <Link to={`/SingleCase/${caseDetails._id}`}>
              <button>View</button>
            </Link>

            <Link to={`/SingleCase/${caseDetails._id}`}>
              <button>Edit</button>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
