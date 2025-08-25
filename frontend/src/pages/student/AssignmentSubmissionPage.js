import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const AssignmentSubmissionPage = () => {
  const { assignmentId } = useParams();
  const { state } = useLocation(); // From ModulePage
  const navigate = useNavigate();

  const {
    title,
    openDate,
    dueDate,
    fileUrl,
    courseId,
    moduleId,
    studentId,
    assignmentIndex,
    moduleTitle,
  } = state || {};

  const [status, setStatus] = useState("No attempt");
  const [grading, setGrading] = useState("Not Graded");
  const [timeRemaining, setTimeRemaining] = useState("3 days and 5 hours"); // static for now

  return (
    <div
      className="container mt-4 p-4 bg-white shadow rounded"
      style={{ maxWidth: "800px" }}
    >
      {/* ✅ Module Name in Green */}
      <h5 className="fw-bold mb-4" style={{ color: "#55B649" }}>
        {moduleTitle || "Module Title"}
      </h5>

      <div className="border p-4 rounded bg-light">
        {/* ✅ Assignment Title */}
        <h6 className="fw-semibold mb-3">
          Assignment{" "}
          {assignmentIndex ? String(assignmentIndex).padStart(2, "0") : "01"}
        </h6>

        {/* ✅ Open and Due Date (Same line) */}
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <div>
            <strong>Opened:</strong>{" "}
            {openDate || "Saturday, 05 April 2025, 12:00 AM"}
          </div>
          <div>
            <strong>Due:</strong>{" "}
            {dueDate || "Saturday, 12 April 2025, 12:00 AM"}
          </div>
        </div>

        {/* ✅ Buttons aligned horizontally and vertically */}
        <div className="col-md-4 d-flex justify-content-start align-items-center gap-2">
          <button
            className="btn btn-sm btn-outline-primary d-inline-flex align-items-center"
            style={{
              height: "38px",
              padding: "0.375rem 0.75rem",
              whiteSpace: "nowrap",
            }}
            onClick={() => {
              const cleanedUrl = fileUrl?.replace(/\\/g, "/");
              window.open(
                `https://veritas-campus-lms-production.up.railway.app/${cleanedUrl}`,
                "_blank"
              );
            }}
          >
            View Assignment File
          </button>

          <button
            className="btn btn-sm btn-outline-success d-inline-flex align-items-center"
            style={{
              height: "38px",
              padding: "0.375rem 0.75rem",
              whiteSpace: "nowrap",
            }}
          >
            Mark as Done
          </button>
        </div>

        {/* ✅ Submission Status Table */}
        <table className="table table-bordered bg-white">
          <tbody>
            <tr>
              <th>Submission Status</th>
              <td>{status}</td>
            </tr>
            <tr>
              <th>Grading Status</th>
              <td>{grading}</td>
            </tr>
            <tr>
              <th>Time Remaining</th>
              <td>{timeRemaining}</td>
            </tr>
            <tr>
              <th>Last Modified</th>
              <td>-</td>
            </tr>
            <tr>
              <th>Submission Comments</th>
              <td>Comments</td>
            </tr>
          </tbody>
        </table>

        {/* ✅ Submit & Back Buttons side by side */}
        <div className="d-flex justify-content-between mt-3">
          <button
            className="btn btn-secondary"
            onClick={() =>
              navigate(
                `/student/courses/${courseId}/modules/${moduleId}/${studentId}`
              )
            }
          >
            Back to Course
          </button>
          <button className="btn btn-dark">Submit Assignment</button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentSubmissionPage;
