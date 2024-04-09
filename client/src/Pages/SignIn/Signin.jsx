import React, { useState } from 'react';
import './Signin.css'; // Ensure this path matches your CSS file's location
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate(); // Create navigate function

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    navigate('/SFirst'); // Navigate to SFirst page
  };

  return (
    <div className={`signin-container ${isSignUp ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSubmit}> {/* Add handleSubmit to the onSubmit event */}
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form action="#" className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="College Name" />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Referral Code" />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Register and discover a great amount of new opportunities!</p>
            <button className="btn transparent" id="sign-up-btn" onClick={() => setIsSignUp(true)}>
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>If you already has an account, just sign in. We've missed you!</p>
            <button className="btn transparent" id="sign-in-btn" onClick={() => setIsSignUp(false)}>
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}
