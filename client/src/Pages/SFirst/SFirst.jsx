import React, { useState, useRef, useEffect } from "react";
import "./SFirst.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faPlayCircle,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons"; // Make sure you have faPlayCircle imported
import LogoImage from "../../assets/LOGO.png";
import adminlaw from "../../assets/adminlaw.webp";
import civillaw from "../../assets/civillaw.webp";
import corplaw from "../../assets/corplaw.webp";
import criminallaw from "../../assets/Criminallaw.webp";
import intlaw from "../../assets/intlaw.webp";
import publiclaw from "../../assets/publiclaw.webp";
import { Link, useNavigate } from "react-router-dom";

export default function SFirst() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isGovt, setIsGovt] = useState(false);
  const [topviewCases, setTopviewCases] = useState([]);
  const navigate = useNavigate();

  const getUserType = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const resp = await fetch("http://localhost:5000/govt/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const data = await resp.json();
    console.log(data.userType);
    if (data.userType == "govt") {
      setIsGovt(true);
      localStorage.setItem("userRole","govt")
    }
    else{
      localStorage.setItem("userRole","student")
    }
  };

  const getViewCases = async () => {
    const resp = await fetch("http://localhost:5000/cases/getCasesByViews");
    const data = await resp.json();
    console.log(data);
    setTopviewCases(data);
  };

  useEffect(() => {
    getUserType();
    getViewCases();
  }, []);
  const scrollRef = useRef(null);

  // Function to handle scrolling
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Define the scroll amount
      const { current } = scrollRef;
      if (direction === "right") {
        current.scrollLeft += scrollAmount;
      } else if (direction === "left") {
        current.scrollLeft -= scrollAmount;
      }
    }
  };

  // Sample data for cases
  const cases = [
    {
      id: 1,
      title: "Criminal Law",
      description:
        "Homicide & Theft : Unlawful death cases and burglary incidents. Drug Crimes & Assault : Substance-related offenses and harm-related violations, including DUI/DWI.",
      imageUrl: criminallaw,
    },
    {
      id: 2,
      title: "Civil Law",
      description:
        "Contract, Torts, & Property Disputes: Contract enforcement, personal injury, and zoning issues. Family Law & Estate Planning: Covers divorce, custody, and estate management.",
      imageUrl: civillaw,
    },
    {
      id: 3,
      title: "Commercial and Corporate Law",
      description:
        "Intellectual Property & Employment Law: Patent/trademark issues and workplace disputes. Bankruptcy & Securities: Insolvency cases and financial market compliance.",
      imageUrl: corplaw,
    },
    {
      id: 4,
      title: "Administrative Law",
      description:
        "Immigration Law : Issues with visas, asylum and citizenship. Social Security / Disability and Licensing : Benefit disputes and regulatory compliance.",
      imageUrl: adminlaw,
    },
    {
      id: 5,
      title: "International Law",
      description:
        "Human Rights Cases : Allegations of rights violations. Trade & Environmental Law : International trade disputes and environmental protection.",
      imageUrl: intlaw,
    },
    {
      id: 6,
      title: "Public Law",
      description:
        "Constitutional Law : Interpretation / application of constitutional issues. Tax Law: Disputes on tax obligations.",
      imageUrl: publiclaw,
    },
  ];

  const classes = [
    {
      id: 1,
      lawyerName: "Mohammad Kashif Alam",
      law: "Criminal Law",
      title: "Bank robbery",
      views: "1.1K",
      language: "English",
    },
    {
      id: 2,
      lawyerName: "Arvind Kalia",
      law: "Civil Law",
      title: "Amber Heard vs Johnny depp",
      views: "1.3K",
      language: "English",
    },
    {
      id: 3,
      lawyerName: "Shruti Punjabi",
      law: "Legal Law",
      title: "The Famous Divorce",
      views: "103K",
      language: "English",
    },
    {
      id: 4,
      lawyerName: "Parth Puranik",
      law: "Litigation",
      title: "Dowry",
      views: "69K",
      language: "English",
    },
    {
      id: 5,
      lawyerName: "Arvind Kalia",
      law: "Crime",
      title: "Forgeries",
      views: "7k",
      language: "English",
    },
    {
      id: 4,
      lawyerName: "Parth Puranik",
      law: "Litigation",
      title: "Dowry",
      views: "69K",
      language: "English",
    },
    {
      id: 5,
      lawyerName: "Arvind Kalia",
      law: "Crime",
      title: "Forgeries",
      views: "7k",
      language: "English",
    },
  ];

  const handleBookmark = async (id) => {
    console.log("caseId", id)
    const token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    const resp = await fetch("http://localhost:5000/student/bookmark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify({
        id: id
      })
    })
    const data = await resp.json()
    console.log(data)
    navigate('/SFirst')
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const filteredCases = cases.filter(
    (caseItem) =>
      caseItem.title.toLowerCase().includes(searchQuery) ||
      caseItem.description.toLowerCase().includes(searchQuery)
  );

  const filteredClasses = topviewCases.filter(
    (classItem) =>
      classItem.typeOfCase.toLowerCase().includes(searchQuery) ||
      // classItem.title.toLowerCase().includes(searchQuery) ||
      classItem.plaintiffLawyer.toLowerCase().includes(searchQuery) ||
      classItem.defendantLawyer.toLowerCase().includes(searchQuery) ||
      classItem.judgeName.toLowerCase().includes(searchQuery)
  );

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    navigate("/Profile"); // Navigate to SFirst page
  };
  const handleModifySelection = (event) => {
    const path = event.target.value;
    navigate(path); // Programmatically navigate to the new path
  };

  return (
    <div>
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
          <select>
            <option value="">Filter by</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            {/* More filter options */}
          </select>
        </div>
        {isGovt && (
          <div>
            {/* Updated dropdown with new navigation method */}
            <select
              className="modify-dropdown"
              onChange={handleModifySelection}
              defaultValue=""
            >
              <option value="" disabled>
                Select an action
              </option>{" "}
              {/* Placeholder option */}
              <option value="/AddCase">Add Case</option>
              <option value="/UpdateCase">Update Case</option>
            </select>
          </div>
        )}

        <button
          type="button"
          className="btn btn-primary nav-btn"
          style={{ width: "185px" }}
          onClick={handleSubmit} // Use onClick to handle the navigation
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <FontAwesomeIcon icon={faUser} style={{ marginRight: "10px" }} />
            <span>Student Name</span>
          </div>
        </button>
      </div>

      {/* Ensure the rest of the content is outside and below the navbar */}
      <div className="content">
        <div className="case-container">
          {filteredCases.map((caseItem) => (
            <div className="case-card" key={caseItem.id}>
              <img src={caseItem.imageUrl} alt={caseItem.title} />
              <h3>{caseItem.title}</h3>
              <p>{caseItem.description}</p>
            </div>
          ))}
        </div>
        <h2>Most engaging Cases of 2023</h2>

        <div className="cards-slider">
          <button
            className="slide-arrow left-arrow"
            onClick={() => scroll("left")}
          >
            &lt;
          </button>

          <div className="cards-container" ref={scrollRef}>
            {filteredClasses.map((classItem) => (
              <div
                className="class-card"
                key={classItem.id}
                onClick={() => navigate(`/SingleCase/${classItem._id}`)}
              >
                <div className="class-card-header">
                  <span>{classItem.totalViews}</span>
                  <button type="button" className="bookmark-btn btn" onClick={() => handleBookmark(classItem._id)}>
                    <FontAwesomeIcon icon={faBookmark} />
                  </button>
                </div>
                <div className="class-card-body">
                  <span className="law">{classItem.typeOfCase}</span>
                  <h3>{classItem.title}</h3>
                  <p>{classItem.judgeName}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            className="slide-arrow right-arrow"
            onClick={() => scroll("right")}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
