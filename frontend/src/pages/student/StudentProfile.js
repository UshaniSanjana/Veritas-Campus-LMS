import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileimage from "../../assets/profileimage.png";
import axios from "axios";

const StudentProfile = () => {
  const studentId = "68187117c8e50295c68bba3e";
  const [courses, setCourse] = useState([]);
  const [student, setStudent] = useState();
  const [previewImage, setPreviewImage] = useState("");

  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/editprofile");
  };

  const handleChangePassword = () => {
    navigate("/changepassowrd");
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const courses = await axios.get(
          `http://localhost:5000/api/enrolled/${studentId}`
        );
        setCourse(courses.data);
      } catch (err) {
        console.error("error fetching enrolled courses");
      }
    };
    fetchCourses();
  }, [studentId]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/student/${studentId}`
        );
        const student = res.data.student;

        setPreviewImage(
          student.image ? `http://localhost:5000/${student.image}` : ""
        ); // adjust based on backend
        setStudent(student); // Make sure to update the student state
      } catch (error) {
        console.error("Failed to fetch student", error);
      }
    };
    fetchStudent();
  }, [studentId]); // Include studentId as the dependency

  return (
    <div>
      <div className="container d-flex justify-content-center">
        <h2
          className="fw-bold fs-2 fs-md-3 fs-sm-4 "
          style={{ color: "#55B649" }}
        >
          Student Profile
        </h2>
      </div>
      <div className="container mt-5">
        <div className="row mt-4">
          <div className="col-12 col-md-6 text-center">
            <img
              src={previewImage || profileimage}
              alt="Student Profile"
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "50%",
                border: "2px solid #ccc",
              }}
            />
          </div>
          <div className="col-12 col-md-6 mt-4">
            <h6 className="mt-3">Name : {student?.name}</h6>
            <h6 className="mt-3">studentId: {studentId}</h6>
            <h6 className="mt-3">Email : {student?.email}</h6>
            <h6 className="mt-3">Diploma : {student?.degree}</h6>
          </div>
        </div>
      </div>
      <Link
        to="/enrolledcourses"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="container border border-dark mt-5 px-3">
          <h3 className="mb-4 mt-4">Enrolled Courses</h3>
          <div className="d-flex flex-column mb-4 ms-4">
            {courses.length > 0 ? (
              courses.map((course, index) => (
                <div className="d-flex align-items-center" key={index}>
                  <i className="bi bi-book-half me-3"></i>
                  <h6>{course.title}</h6>
                </div>
              ))
            ) : (
              <h6>No enrolled courses</h6>
            )}
          </div>
        </div>
      </Link>

      <Link to="/progress" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="container border border-dark mt-5 px-3">
          <h3 className="mb-4 mt-4">Graded Summery</h3>
          <div className="d-flex flex-column mb-4 ms-4">
            <div className="d-flex align-items-center">
              <i className="bi bi-bookmark-check-fill me-3"></i>
              <h6>Semester GPA: </h6>
            </div>
            <div className="d-flex align-item-center">
              <i className="bi bi-bookmark-check-fill me-3"></i>
              <h6>Total Credits Earned: </h6>
            </div>
            <div className="d-flex align-item-center">
              <i className="bi bi-bookmark-check-fill me-3"></i>
              <h6>Completed Courses Count: </h6>
            </div>
          </div>
        </div>
      </Link>
      <div className="container border border-dark mt-5 px-3">
        <h3 className="mb-4 mt-4">Login Activity</h3>
        <div className="d-flex flex-column mb-4 ms-4">
          <div className="d-flex align-items-center">
            <i className="bi bi-calendar3 me-3"></i>
            <h6>First access to site: {student?.createdAt}</h6>
          </div>
          <div className="d-flex align-item-center">
            <i className="bi bi-calendar3 me-3"></i>
            <h6>Last access to site: {student?.updatedAt}</h6>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success fw-bold mt-5"
          style={{
            width: "300px",
            height: "30px",
            fontSize: "15px",
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "#95C436",
            color: "white",
            border: "1px solid #3E9355",
            borderRadius: "6px",
          }}
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-success fw-bold mt-2"
          style={{
            width: "300px",
            height: "30px",
            fontSize: "15px",
            fontFamily: "'Poppins', sans-serif",
            backgroundColor: "#95C436",
            color: "white",
            border: "1px solid #3E9355",
            borderRadius: "6px",
          }}
          onClick={handleChangePassword}
        >
          Change Password
        </button>
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary fw-bold mt-2"
          style={{
            width: "300px",
            height: "30px",
            fontSize: "15px",
            fontFamily: "'Poppins', sans-serif",
            //backgroundColor: "#95C436",
            color: "white",
            border: "1px solid #3E9355",
            borderRadius: "6px",
          }}
          // onClick={onClick}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
