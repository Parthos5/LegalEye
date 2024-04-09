import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Login.css';

export default function Govtlogin() {
  const navigate = useNavigate(); // Create navigate function

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    // Implement your login logic here
    // If login is successful, navigate to First.jsx
    console.log(username)
    console.log(password)

    const resp = await fetch("http://localhost:5000/govt/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username, password
      })
    }).then((data) => data.json())

    console.log(resp.success)

    if(resp.success) {
      localStorage.setItem("token", JSON.stringify(resp.token))
      localStorage.setItem("govtId", JSON.stringify(resp.govtId))

      navigate('/GFirst'); // Adjust the path as needed based on your routing setup
    }

  };

  return (
    <div className="signin-container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Welcome Back!</h3>
            <p>Sign in to continue.</p>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
