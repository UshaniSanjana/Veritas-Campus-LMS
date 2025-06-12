// import axios from "axios";
// import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const ModulePage = () => {
  const navigate = useNavigate();
  //   const [lecture, setLecture] = useState();

  //   useEffect(() => {
  //     const markLecture = async () => {
  //       const req = await axios.post(
  //         `http://localhost:5000/api/progress/lecture`,
  //         {}
  //       );
  //     };
  //   });

  return (
    <div className="container">
      <div className="container d-flex justify-content-left">
        <h2 className="fw-bold fs-2" style={{ color: "#55B649" }}>
          Course name
        </h2>
      </div>
      <div className="container d-flex justify-content-left mt-4">
        <h2 className="fw-bold fs-4">Module name</h2>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="d-flex justify-content-between align-items-center ms-5 me-5 mt-3">
              <div className="d-flex">
                <i className="bi bi-filetype-pdf me-3"></i>
                <p>Lecture</p>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lecture"
                />
                <label className="form-check-label" for="lecture"></label>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center ms-5 me-5">
              <div className="d-flex">
                <i className="bi bi-filetype-pdf me-3"></i>
                <p>Practical</p>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lecture"
                />
                <label className="form-check-label" for="lecture"></label>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center ms-5 me-5">
              <div className="d-flex">
                <i className="bi bi-filetype-pdf me-3"></i>
                <p>Tutorial</p>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lecture"
                />
                <label className="form-check-label" for="lecture"></label>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center ms-5 me-5">
              <div
                className="d-flex"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/quiz")}
              >
                <i className="bi bi-question-square me-3"></i>
                <p>
                  <u>Quiz</u>
                </p>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lecture"
                />
                <label className="form-check-label" for="lecture"></label>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center ms-5 me-5">
              <div className="d-flex">
                <i className="bi bi-journal-arrow-up me-3"></i>
                <p>Submission</p>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lecture"
                />
                <label className="form-check-label" for="lecture"></label>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center ms-5 me-5 me-3">
              <div className="d-flex">
                <i className="bi bi-file-earmark-play me-3"></i>
                <p>Recording</p>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="lecture"
                />
                <label className="form-check-label" for="lecture"></label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <p className="fw-bold fs-6 text-center mt-3">Progress</p>
            <div
              className="progress me-3 ms-3"
              role="progressbar"
              //aria-label={`${course.title} progress`}
              //aria-valuenow={progress}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div className="progress-bar" style={{ width: `25%` }}></div>
            </div>

            <p className="fw-bold fs-6 text-center mt-5">Calender</p>
            <div className="d-flex justify-content-center">
              <Calendar className="react-calendar" />
            </div>
            <p className="fw-bold fs-6 text-center mt-5">Support Center</p>
            <p className="text-center">
              Need help or have an issue? Click here to access support services
              including technical assistance, FAQs, and contact options for
              quick problem resolution.
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-success fw-bold"
                type="submit"
                style={{
                  width: "150px",
                  height: "30px",
                  fontSize: "15px",
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#95C436",
                  color: "white",
                  border: "1px solid #3E9355",
                  borderRadius: "6px",
                }}
              >
                Click here
              </button>
            </div>
            <p className="fw-bold fs-6 text-center mt-5">View marks</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-success fw-bold mb-5"
                type="submit"
                style={{
                  width: "150px",
                  height: "30px",
                  fontSize: "15px",
                  fontFamily: "'Poppins', sans-serif",
                  backgroundColor: "#95C436",
                  color: "white",
                  border: "1px solid #3E9355",
                  borderRadius: "6px",
                }}
              >
                Marks
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
