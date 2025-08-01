import React, { useEffect, useState } from "react";
import axios from "axios";


const EnrolledCourses = () => {
  const [courses, setCourse] = useState([]);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        
        const courses = await axios.get(
          `http://localhost:5000/api/student/enrolled/${studentId}`
        );
        setCourse(courses.data);
      } catch (err) {
        console.error("error fetching enrolledcourses");
      }
    };
    fetchCourses();
  }, [studentId]);

  return (
    <div className="container px-3">
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
          <h6>No enrolled modules</h6>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;
