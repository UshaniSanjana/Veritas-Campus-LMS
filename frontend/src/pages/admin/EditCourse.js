import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/EditCourse.css';

const EditCourse = ({ courses, setCourses }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(category);

  const [editedCourse, setEditedCourse] = useState({
    title: '',
    instructor: '',
    description: '',
  });

  useEffect(() => {
    const foundCourse = courses.find(c => c.title === decodedTitle);
    if (foundCourse) {
      setEditedCourse(foundCourse);
    } else {
      alert('Course not found');
      navigate('/admin/courses');
    }
  }, [decodedTitle, courses, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCourse(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editedCourse.title.trim()) {
      alert('Title is required');
      return;
    }

    const updatedCourses = courses.map(course =>
      course.title === decodedTitle ? editedCourse : course
    );

    setCourses(updatedCourses);
    alert('Course updated successfully!');
    navigate('/admin/courses');
  };

  const handleCancel = () => {
    navigate('/admin/courses');
  };

  return (
    <div className="edit-course-page">
      <h2>Edit Course</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={editedCourse.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Instructor:
          <input
            type="text"
            name="instructor"
            value={editedCourse.instructor}
            onChange={handleChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            rows="4"
            value={editedCourse.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <div className="form-buttons">
          <button type="button" className="btn-save" onClick={handleSave}>
            Save
          </button>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
