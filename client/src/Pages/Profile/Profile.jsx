import React, { useEffect, useState } from 'react';
import './Profile.css'; // Ensure CSS is properly linked

export default function Profile() {
  // const student = {
  //   studentName: 'John Doe',
  //   collegeName: 'Tech University',
  //   email: 'john.doe@example.com',
  //   username:"John_Doe"
  // };

  const [student, setStudent] = useState({});
  const [bookmarkCases, setBookmarkCases] = useState([]);

  const getUser = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const resp = await fetch("http://localhost:5000/govt/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json" // Corrected typo here
      },
      body: JSON.stringify({ token: token })
    })
    const data = await resp.json();
    console.log(student)
  }

  const fetchBookmarkedCases = async () => {
    const bookmarkedCasesArray = [];
    for (const idCase of student.bookmarked) {
      const resp = await fetch(`http://localhost:5000/cases/getCaseById/${idCase}`, {
        method: "GET"
      });
      const ObjCase = await resp.json();
      bookmarkedCasesArray.push(ObjCase);
    }
    console.log(fetchBookmarkedCases)
    setBookmarkCases(bookmarkedCasesArray);
  };

  useEffect(() => {
    getUser();
    if (student.bookmarked && student.bookmarked.length > 0) {
      fetchBookmarkedCases();
    }
  }, []);


  // const bookmarkedCases = [
  //   {
  //     id: 1,
  //     lawyerName: "Mohammad Kashif Alam",
  //     law: "Criminal Law",
  //     title: "Bank robbery",
  //     views: "1.1K",
  //     language: "English"
  //   },
  //   {
  //     id: 2,
  //     lawyerName: "Arvind Kalia",
  //     law: "Civil Law",
  //     title: "Amber Heard vs Johnny Depp",
  //     views: "1.3K",
  //     language: "English"
  //   },
  //   {
  //     id: 3,
  //     lawyerName: "Shruti Punjabi",
  //     law: "Legal Law",
  //     title: "The Famous Divorce",
  //     views: "103K",
  //     language: "English"
  //   }
  // ];

  // const bookmarkedCases =  () => {
  //   student.bookmarked.map(async (idCase) => {
  //     const resp = await fetch(`http://localhost:5000/cases/getCaseById/${idCase}`,{
  //       method: "POST"
  //     })
  //     const ObjCase = await resp.json()

  //   })
  // }
  // Function to handle delete
  const handleDelete = (caseId) => {
    console.log("Delete case with ID:", caseId);
    // Add logic to delete the case from your data source
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div>
        <h3>Student Information</h3>
        <p><strong>Name:</strong> {student.username}</p>
        {/* <p><strong>College Name:</strong> {student.User.collegeName}</p> */}
        <p><strong>Username:</strong> {student.username}</p>
        {/* <p><strong>Referral Code:</strong> {student.referralCode}</p> */}
        <p><strong>Email:</strong> {student.email}</p>
      </div>

      <div>
        <h3>Bookmarked Cases</h3>
        <ul>
          {!bookmarkCases || bookmarkCases.length === 0 ? (
            <div className="empty-message">
              <p>No Bookmarked Cases!</p>
            </div>
          ) : (
            bookmarkCases.map((caseItem) => (
              <li key={caseItem.id}>
                <div className="case-details">
                  <h4>{caseItem.title} ({caseItem.judgeName})</h4>
                  {/* <p>Lawyer: {caseItem.}</p> */}
                  <p>Views: {caseItem.totalViews}</p>
                  <p>Language: {caseItem.language}</p>
                </div>
                <button className="delete-button" onClick={() => handleDelete(caseItem.id)}>Delete</button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
