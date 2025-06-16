import React from 'react';
import { useParams } from 'react-router-dom';
import '../../css/course.css';

const CourseDetailsPage = () => {
  const { courseName } = useParams();

  const courseData = {
    "English": {
      title: 'Diploma in English',
      modules: ['Module 1', 'Module 2', 'Module 3', 'Module 4', 'Module 5'],
      assignments: ['Assignment 1', 'Assignment 2', 'Assignment 3', 'Assignment 4', 'Assignment 5'],
      exams: ['Exam 1', 'Exam 2', 'Exam 3', 'Exam 4', 'Exam 5'],
      quizzes: ['Quiz 1', 'Quiz 2', 'Quiz 3', 'Quiz 4', 'Quiz 5'],
    },
    "Business Administration": {
      title: 'Diploma in Business Administration',
      modules: ['BA Module 1', 'BA Module 2', 'BA Module 3', 'BA Module 4', 'BA Module 5'],
      assignments: ['BA Assignment 1', 'BA Assignment 2', 'BA Assignment 3', 'BA Assignment 4', 'BA Assignment 5'],
      exams: ['BA Exam 1', 'BA Exam 2', 'BA Exam 3', 'BA Exam 4', 'BA Exam 5'],
      quizzes: ['BA Quiz 1', 'BA Quiz 2', 'BA Quiz 3', 'BA Quiz 4', 'BA Quiz 5'],
    },
    "Human Resource Management": {
      title: 'Diploma in Human Resource Management',
      modules: ['HR Module 1', 'HR Module 2', 'HR Module 3', 'HR Module 4', 'HR Module 5'],
      assignments: ['HR Assignment 1', 'HR Assignment 2', 'HR Assignment 3', 'HR Assignment 4', 'HR Assignment 5'],
      exams: ['HR Exam 1', 'HR Exam 2', 'HR Exam 3', 'HR Exam 4', 'HR Exam 5'],
      quizzes: ['HR Quiz 1', 'HR Quiz 2', 'HR Quiz 3', 'HR Quiz 4', 'HR Quiz 5'],
    },
    "Internal Sales & Marketing": {
      title: 'Diploma in Internal Sales & Marketing',
      modules: ['Sales Module 1', 'Sales Module 2', 'Sales Module 3', 'Sales Module 4', 'Sales Module 5'],
      assignments: ['Sales Assignment 1', 'Sales Assignment 2', 'Sales Assignment 3', 'Sales Assignment 4', 'Sales Assignment 5'],
      exams: ['Sales Exam 1', 'Sales Exam 2', 'Sales Exam 3', 'Sales Exam 4', 'Sales Exam 5'],
      quizzes: ['Sales Quiz 1', 'Sales Quiz 2', 'Sales Quiz 3', 'Sales Quiz 4', 'Sales Quiz 5'],
    },
  };

  const decodedCourse = decodeURIComponent(courseName);
  const data = courseData[decodedCourse];

  if (!data) return <p>No details available for "{decodedCourse}".</p>;

  return (
    <div className="course-details">
      <h3>{data.title}</h3>
      <div className="details-columns">
        <div>
          <h4>Lecture Materials:</h4>
          <ul>{data.modules.map((mod, i) => <li key={i}>{mod}</li>)}</ul>
        </div>
        <div>
          <h4>Exams:</h4>
          <ul>{data.exams.map((e, i) => <li key={i}>{e}</li>)}</ul>
        </div>
      </div>
      <div className="details-columns">
        <div>
          <h4>Assignments:</h4>
          <ul>{data.assignments.map((a, i) => <li key={i}>{a}</li>)}</ul>
        </div>
        <div>
          <h4>Quizzes:</h4>
          <ul>{data.quizzes.map((q, i) => <li key={i}>{q}</li>)}</ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
