import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../css/courses.css';

const CoursesPage = ({ courses, setCourses }) => {
  const navigate = useNavigate();

  const handleDeleteClick = (index) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updatedCourses = [...courses];
      updatedCourses.splice(index, 1);
      setCourses(updatedCourses);
      alert('Course deleted successfully.');
    }
  };

  const handleAddNewClick = () => {
    navigate('/admin/courses/add');
  };

  return (
    <div className="courses-page">
      <h2 className="courses-title">Courses</h2>

      <table className="courses-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Instructor</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="course-row">
              <td>
                <Link
                  to={`/admin/courses/edit/${encodeURIComponent(course.title)}`}
                  className="course-link"
                >
                  {course.title}
                </Link>
              </td>
              <td>{course.instructor}</td>
              <td>{course.description}</td>
              <td>
                <Link
                  to={`/admin/courses/edit/${encodeURIComponent(course.title)}`}
                  className="btn-edit"
                >
                  ✏️
                </Link>
                <button onClick={() => handleDeleteClick(index)} className="btn-delete">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="button-container">
        <button onClick={handleAddNewClick} className="btn-add-new">
          + Add New Course
        </button>
      </div>
    </div>
  );
};

export default CoursesPage;
