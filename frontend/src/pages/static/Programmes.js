
import React from "react";
import "../../css/programmes.css";

const Programmes = () => {
  return (
    <div className="programmes-container">
      <h2 className="programmes-title">Programs</h2>
      <div className="cards-container">
        <div className="programme-card">
          <h3>Diploma in Human Resource Management</h3>
          <p>Gain a solid foundation in HR principles, recruitment, training, performance management, and employment law. Ideal for aspiring HR professionals.</p>
          <button className="duration-button">Duration: 8 Month</button>
        </div>

        <div className="programme-card">
          <h3>Diploma in Business Administration</h3>
          <p>Master core business concepts including management, finance, marketing, and operations to thrive in any business environment.</p>
          <button className="duration-button">Duration: 12 Month</button>
        </div>

        <div className="programme-card">
          <h3>Diploma in English</h3>
          <p>Enhance your English communication, writing, and comprehension skills. Perfect for both academic and professional development.</p>
          <button className="duration-button">Duration: 6 Month</button>
        </div>

        <div className="programme-card">
          <h3>Diploma in Internal Sales & Marketing</h3>
          <p>Learn effective sales techniques, customer relationship management, and marketing strategies to boost your career in sales.</p>
          <button className="duration-button">Duration: 14 Month</button>
        </div>
      </div>

    </div>
  );
};

export default Programmes; 