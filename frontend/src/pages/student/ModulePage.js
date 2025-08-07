import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../utils/api";
import { decodeToken } from "../../utils/decodeToken";
import { FaBookOpen } from "react-icons/fa";
import { MdAssignment } from "react-icons/md";
import { FaRegFileAlt } from "react-icons/fa";
import { MdQuiz } from "react-icons/md";
import { FaVideo } from "react-icons/fa";

const ModulePage = () => {
  const navigate = useNavigate();
  const { courseId, moduleId, studentId } = useParams();
  const token = localStorage.getItem("token");
  const decoded = decodeToken(token);
  // const studentId = localStorage.getItem("studentId");

  const [courseTitle, setCourseTitle] = useState("");
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleItems, setModuleItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);

  // Fetch module content and progress
  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const moduleRes = await API.get(
          `/student/courses/${courseId}/modules/${moduleId}/${studentId}`
        );
        setModuleItems(moduleRes.data.moduleItems || []);
        setCourseTitle(moduleRes.data.courseTitle);
        setModuleTitle(moduleRes.data.moduleTitle);
        setProgressPercentage(moduleRes.data.overallProgressPercentage || 0);

        const progressRes = await API.get(
          `/student/progress/${moduleId}/${studentId}`
        );
        const data = progressRes.data.progressDetail || {};
        const completed = [
          ...(data.completedLectures || []),
          ...(data.completedTutorials || []),
          ...(data.completedAssignments || []),
          ...(data.attemptedQuizzes || []),
        ].map(String);
        setCompletedItems(completed);
      } catch (error) {
        console.error("Error fetching module data:", error);
      }
    };

    fetchModuleData();
  }, [courseId, studentId]);

  // Handle checkbox toggle
  const handleCheckbox = async (itemId, type) => {
    try {
      let url = "";
      let payloadKey = "";
      switch (type) {
        case "lecture":
          url = "/student/progress/lecture";
          payloadKey = "lectureId";
          break;
        case "tutorial":
          url = "/student/progress/tutorial";
          payloadKey = "tutorialId";
          break;
        case "quiz":
          url = "/student/progress/quiz";
          payloadKey = "quizId";
          break;
        case "assignment":
          url = "/student/progress/assignment";
          payloadKey = "assignmentId";
          break;
        default:
          return;
      }
      // await API.post(url, {
      //   studentId,
      //   courseId,
      //   [payloadKey]: itemId,
      //   completed: !completedItems.includes(itemId),
      // });
      const payload = {
        studentId,
        courseId,
        moduleId,
        [payloadKey]: itemId,
        completed: !completedItems.includes(itemId),
      };

      await API.post(url, payload);

      // setCompletedItems((prev) =>
      //   prev.includes(itemId)
      //     ? prev.filter((id) => id !== itemId)
      //     : [...prev, itemId]
      // );

      // 🔁 Re-fetch updated progress
      const progressRes = await API.get(
        `/student/progress/${moduleId}/${studentId}`
      );

      const data = progressRes.data.progressDetail || {};
      const completed = [
        ...(data.completedLectures || []),
        ...(data.completedTutorials || []),
        ...(data.completedAssignments || []),
        ...(data.attemptedQuizzes || []),
      ].map(String);
      setCompletedItems(completed);
      setProgressPercentage(progressRes.data.percentage || 0);
    } catch (error) {
      console.error("Failed to update progress:", error);
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case "lecture":
        return <FaBookOpen color="#007bff" size={20} className="me-2" />;
      case "tutorial":
        return <FaRegFileAlt color="#17a2b8" size={20} className="me-2" />;
      case "quiz":
        return <MdQuiz color="#ffc107" size={22} className="me-2" />;
      case "assignment":
        return <MdAssignment color="#28a745" size={22} className="me-2" />;
      case "recording":
        return <FaVideo color="#dc3545" size={20} className="me-2" />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-left">
        <h2 className="fw-bold fs-2" style={{ color: "#55B649" }}>
          {courseTitle}
        </h2>
      </div>
      <div className="d-flex justify-content-left mt-4">
        <h2 className="fw-bold fs-4">{moduleTitle}</h2>
      </div>

      <div className="row">
        {/* Module Items */}
        <div className="col-md-8">
          <div className="card p-3">
            {moduleItems.map((item) => (
              <div
                key={item._id}
                className="d-flex justify-content-between align-items-center mb-3"
              >
                <div
                  className="d-flex"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (item.type === "quiz") {
                      navigate(`/student/quiz/${moduleId}`, {
                        state: { courseId, itemId: item._id },
                      });
                    } else if (item.type === "assignment") {
                      navigate(`/student/assignments/${item._id}`, {
                        state: {
                          assignmentId: item._id,
                          title: item.title,
                          openDate: item.openDate,
                          dueDate: item.dueDate,
                          fileUrl: item.fileUrl,
                          courseId,
                          moduleId,
                          moduleTitle,
                          studentId,
                          assignmentIndex:
                            moduleItems
                              .filter((itm) => itm.type === "assignment")
                              .findIndex((itm) => itm._id === item._id) + 1,
                        },
                      });
                    } else if (
                      ["lecture", "tutorial", "recording"].includes(
                        item.type
                      ) &&
                      item.fileUrl
                    ) {
                      const cleanedUrl = item.fileUrl.replace(/\\/g, "/");
                      const filePath = `http://localhost:5000/${cleanedUrl}`;
                      window.open(filePath, "_blank");
                    }
                  }}
                >
                  {renderIcon(item.type)}
                  <p className="m-0">
                    {item.title}
                    {item.fileUrl && (
                      <span
                        className="text-muted ms-1"
                        style={{ fontSize: "0.8em" }}
                      >
                        {/* [view] */}
                      </span>
                    )}
                  </p>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={item._id}
                    checked={completedItems.includes(String(item._id))}
                    onChange={() => handleCheckbox(item._id, item.type)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar with Progress, Calendar, Support */}
        <div className="col-md-4">
          <div className="card p-3">
            <p className="fw-bold fs-6 text-center mt-2">Progress</p>
            <div className="progress mx-3" role="progressbar">
              <div
                className="progress-bar bg-primary"
                role="progressbar"
                style={{
                  width: `${progressPercentage}%`,
                  height: "100%", // ✅ Match parent height
                  transition: "width 0.6s ease-in-out",
                }}
              >
                {progressPercentage}%
              </div>
            </div>

            <p className="fw-bold fs-6 text-center mt-4">Calendar</p>
            <div className="d-flex justify-content-center">
              <Calendar className="react-calendar" />
            </div>

            {/* <p className="fw-bold fs-6 text-center mt-4">Support Service</p>
            <p className="text-center">
              Need help or have an issue? Click here to 
              access support services including technical 
              assistance, FAQs, and contact options for
              quick problem resolution.
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-success"
                onClick={() => navigate("/support")}
              >
                Click Here
              </button>
            </div> */}

            <p className="fw-bold fs-6 text-center mt-4">View Marks</p>
            <div className="d-flex justify-content-center mb-3">
              <button
                className="btn btn-success"
                onClick={() => navigate("/marks")}
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
