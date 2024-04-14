import React from 'react';
import './Profile.css'; // Ensure CSS is properly linked

export default function Profile() {
  const student = {
    studentName: 'John Doe',
    collegeName: 'Tech University',
    email: 'john.doe@example.com',
    username:"John_Doe"
  };

  const bookmarkedCases = [
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
      title: "Amber Heard vs Johnny Depp",
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
    }
  ];

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
        <p><strong>Name:</strong> {student.studentName}</p>
        <p><strong>College Name:</strong> {student.collegeName}</p>
        <p><strong>Username:</strong> {student.username}</p>
        {/* <p><strong>Referral Code:</strong> {student.referralCode}</p> */}
        <p><strong>Email:</strong> {student.email}</p>
      </div>
      
      <div>
        <h3>Bookmarked Cases</h3>
        <ul>
          {bookmarkedCases.map((caseItem) => (
            <li key={caseItem.id}>
              <div className="case-details">
                <h4>{caseItem.title} ({caseItem.law})</h4>
                  <p>Lawyer: {caseItem.lawyerName}</p>
                  <p>Views: {caseItem.views}</p>
                  <p>Language: {caseItem.language}</p>
              </div>
              <button className="delete-button" onClick={() => handleDelete(caseItem.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
