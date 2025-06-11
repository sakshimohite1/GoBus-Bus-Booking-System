import React, { useState } from 'react';
import './OTPLogin.css';

const OtpLogin = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');

  const handleGetOtp = () => {
    if (!email) return alert("Please enter Email or Mobile");
    setOtpSent(true);
    alert(`OTP sent to ${email}`);
    // You can integrate backend OTP logic here
  };

  const handleLogin = () => {
    if (!otp) return alert("Please enter OTP");
    alert(`Logged in with ${email} using OTP: ${otp}`);
  };

  const handleSignup = () => {
    alert('Redirect to signup page!');
  };

  const handleSocialClick = (platform) => {
    alert(`Login with ${platform}`);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="left-panel">
          <h1>Login to Your Account</h1>
          <p>Login using social networks</p>

          <div className="social-login">
            <button className="social-btn" onClick={() => handleSocialClick("Facebook")}>f</button>
            <button className="social-btn google" onClick={() => handleSocialClick("Google")}>G+</button>
            <button className="social-btn" onClick={() => handleSocialClick("LinkedIn")}>in</button>
          </div>

          <div className="or-divider">OR</div>

          <div className="input-group">
            <input
              type="text"
              placeholder="Email / Mobile"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {!otpSent && (
            <button className="login-btn" onClick={handleGetOtp}>
              Get OTP
            </button>
          )}

          {otpSent && (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <button className="login-btn" onClick={handleLogin}>
                Sign In
              </button>
            </>
          )}
        </div>

        <div className="right-panel">
          <h2>New Here?</h2>
          <p>Sign up and discover a great amount of new opportunities!</p>
          <button className="signup-btn" onClick={handleSignup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default OtpLogin;
