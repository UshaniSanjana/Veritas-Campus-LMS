import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/AddCourse.css';

const AddCourse = ({ courses, setCourses }) => {
  const navigate = useNavigate();
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    instructor: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!newCourse.title.trim() || !newCourse.description.trim() || !newCourse.instructor.trim()) {
      alert('All fields are required.');
      return;
    }

    setCourses([...courses, { ...newCourse }]);
    alert('New course added successfully!');
    navigate('/admin/courses');
  };

  const handleCancel = () => {
    navigate('/admin/courses');
  };

  return (
    <div className="add-course-page">
      <h2>Add New Course</h2>
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={newCourse.title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Instructor:
          <input
            type="text"
            name="instructor"
            value={newCourse.instructor}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            rows="4"
            value={newCourse.description}
            onChange={handleInputChange}
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

export default AddCourse;
