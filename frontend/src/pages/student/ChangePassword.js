import React, { useState } from 'react';
import './ChangePassword.css';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigate = useNavigate();
  const [email, setEmail] = useState(sessionStorage.getItem('email') || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Password reset successful:', data);
        navigate('/ChangeSuccessful');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="change-password-container">
      <div className="change-password-form-wrapper">
        <h2 className="change-password-title">Change Your Password</h2>
        <form onSubmit={handleSubmit} className="change-password-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="change-password-input"
            required
            readOnly
          />
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="change-password-input"
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="change-password-input"
            required
          />
          <button type="submit" className="Submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
