import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const programs = [
  {
    title: "Diploma in Human Resource Management",
    desc: "Gain a solid foundation in HR principles, recruitment, training, performance management, and employment law. Ideal for aspiring HR professionals.",
    duration: "8 Month"
  },
  {
    title: "Diploma in Business Administration",
    desc: "Master core business concepts including management, finance, marketing, and operations to thrive in any business environment.",
    duration: "12 Month"
  },
  {
    title: "Diploma in English",
    desc: "Enhance your English communication, writing, and comprehension skills. Perfect for both academic and professional development.",
    duration: "6 Month"
  },
  {
    title: "Diploma in Internal Sales & Marketing",
    desc: "Learn effective sales techniques, customer relationship management, and marketing strategies to boost your career in sales.",
    duration: "14 Month"
  }
];

const Programmes = () => {
  return (
    <div className="container py-5">
      <h2 className="text-center text-success mb-5">Programs</h2>
      <div className="row justify-content-center">
        {programs.map((prog, index) => (
          <div key={index} className="col-md-6 col-lg-5 m-3">
            <div className="p-4 bg-light shadow rounded">
              <h5 className="fw-bold">{prog.title}</h5>
              <p className="mt-2">{prog.desc}</p>
              
              <button className="btn btn-success fw-bold"
                style={{
                  width: "150px",
                  height: "30px",
                  fontSize: "15px",
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#95C436",
                  color: "white",
                  border: "1px solid #3E9355",
                  borderRadius: "6px"
                }} > Duration: {prog.duration} </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programmes;