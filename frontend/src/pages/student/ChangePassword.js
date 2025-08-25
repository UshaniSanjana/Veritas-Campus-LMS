import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfrimedPassword] = useState("");
  const [studentData, setStudentData] = useState("");
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(
          `https://veritas-campus-lms-production.up.railway.app/api/student/userId/${studentId}`
        );
        const userId = res.data.userId;
        console.log(userId);

        const userRes = await axios.get(
          `https://veritas-campus-lms-production.up.railway.app/api/student/user/${userId}`
        );
        const userData = userRes.data.user;
        console.log(userData);

        setStudentData(userData); // store student data in state
      } catch (error) {
        console.error("Failed to fetch student", error);
      }
    };

    fetchStudent();
  }, [studentId]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `https://veritas-campus-lms-production.up.railway.app/api/student/changePassword/${studentData._id}`,
        {
          currentPassword,
          newPassword,
          confirmPassword,
        }
      );
      alert(res.data.message || "Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfrimedPassword("");
    } catch (err) {
      console.error(err);
      alert("Failed to update password");
    }
  };

  return (
    <div>
      <div className="container d-flex justify-content-center">
        <h2 className="fw-bold fs-2" style={{ color: "#55B649" }}>
          Change Password
        </h2>
      </div>

      <div className="container border border-dark mt-4">
        <form className="mt-4 d-flex justify-content-center">
          <div className="form-group col-md-8 col-lg-6">
            <label>Current password</label>
            <input
              type="password"
              className="form-control mt-3 mb-3"
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
            />
          </div>
        </form>
        <form className="mt-4 d-flex justify-content-center">
          <div className="form-group col-md-8 col-lg-6">
            <label>New password</label>
            <input
              type="password"
              className="form-control mt-3 mb-3"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </form>
        <form className="mt-4 d-flex justify-content-center">
          <div className="form-group col-md-8 col-lg-6">
            <label>Confirm password</label>
            <input
              type="password"
              className="form-control mt-3 mb-3"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfrimedPassword(e.target.value)}
              required
            />
          </div>
        </form>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn btn-success fw-bold mt-4 mb-5"
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
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
