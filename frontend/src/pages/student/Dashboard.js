import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import bbImage from "../../assets/bb.png";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // <-- Add this import

// Import the hook to fetch notifications from the service
import { useGetNotifications } from "../../Services/notificationService"; // Import API hook

const dashboardData = {
  recentlyAccessedPrograms: [
    {
      id: 1,
      title: "Diploma in Business Administration",
      description:
        "Learn core business concepts including management, marketing, and finance.",
      lastAccessed: "2 days ago",
      progress: 65,
      icon: "📊",
    },
    {
      id: 2,
      title: "Diploma in Human Resource Management",
      description:
        "Master HR skills such as recruitment, training, and performance management.",
      lastAccessed: "1 day ago",
      progress: 40,
      icon: "👥",
    },
    {
      id: 3,
      title: "Diploma in English",
      description:
        "Improve your English language skills for academic and professional use.",
      lastAccessed: "5 hours ago",
      progress: 85,
      icon: "📖",
    },
  ],
  allCourses: [
    {
      id: 1,
      semester: "Semester 01",
      name: "Principles of Management",
      code: "MG101",
      instructor: "Dr. Brown",
    },
    {
      id: 2,
      semester: "Semester 01",
      name: "Computer Systems",
      code: "CS102",
      instructor: "Prof. Johnson",
    },
    {
      id: 3,
      semester: "Semester 01",
      name: "Web Technologies",
      code: "CS103",
      instructor: "Dr. Williams",
    },
    {
      id: 4,
      semester: "Semester 02",
      name: "Data Structures",
      code: "CS201",
      instructor: "Dr. Davis",
    },
    {
      id: 5,
      semester: "Semester 02",
      name: "Machine Learning",
      code: "CS202",
      instructor: "Prof. Miller",
    },
    {
      id: 6,
      semester: "Semester 02",
      name: "Artificial Intelligence",
      code: "CS203",
      instructor: "Dr. Wilson",
    },
  ],
  privateFiles: [
    { name: "1 (1).c", date: "2023-10-15", size: "24KB" },
    { name: "1.c", date: "2023-10-10", size: "18KB" },
    { name: "2.c", date: "2023-09-28", size: "32KB" },
  ],
};

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate

  // Fetch notifications from API using a hook
  const { data: notificationsData, loading, error } = useGetNotifications(); // Assuming useGetNotifications fetches notifications

  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]); // Store events in state
  const [event, setEvent] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("All");
  const [selectedFile, setSelectedFile] = useState(null); // File state

  // Retrieve events from localStorage on initial render
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  // Save events to localStorage whenever the events state changes
  useEffect(() => {
    if (events.length > 0) {
      localStorage.setItem("events", JSON.stringify(events));
    }
  }, [events]);

  const handleDateClick = (date) => {
    setDate(date);
  };

  const handleAddEvent = () => {
    if (event.trim()) {
      const newEvent = {
        id: Date.now(),
        date: date.toDateString(),
        text: event,
        completed: false,
      };
      setEvents([...events, newEvent]);
      setEvent("");
    }
  };

  const handleDeleteEvent = (id) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleToggleComplete = (id) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, completed: !event.completed } : event
      )
    );
  };

  const filteredCourses =
    selectedSemester === "All"
      ? dashboardData.allCourses
      : dashboardData.allCourses.filter((course) => course.semester === selectedSemester);

  // Handle continue button click
  const handleContinue = () => {
    navigate("/student/programme"); // Navigate to the given path
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // Handle file upload
  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/student/upload-file", // Adjust URL as per your backend
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("File uploaded successfully");
      console.log(response.data); // Log the file info returned by the backend
      setSelectedFile(null); // Clear the selected file
    } catch (error) {
      console.error("Error uploading file", error);
      alert("Error uploading file");
    }
  };

  // Handle file download
  const handleFileDownload = (fileUrl) => {
    window.open(`http://localhost:5000${fileUrl}`, "_blank");
  };

  return (
    <div className="dashboard">
      <div className="main-content">
        {/* Left Content Section */}
        <div className="left-content">
          {/* Recently Accessed Programs */}
          <div className="rectangle-2142">
            <div className="rectangle-content">
              <h2 className="section-title">Recently accessed programs</h2>
              <div className="program-grid">
                {dashboardData.recentlyAccessedPrograms.map((program) => (
                  <div className="program-card" key={`program-${program.id}`}>
                    <div className="program-icon">{program.icon}</div>
                    <div className="program-info">
                      <h3 className="program-name">{program.title}</h3>
                      <p className="program-desc">{program.description}</p>
                      <div className="program-meta">
                        <span>Last accessed: {program.lastAccessed}</span>
                        <div className="progress-container">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${program.progress}%` }}
                            ></div>
                          </div>
                          <span>{program.progress}% complete</span>
                        </div>
                      </div>
                    </div>
                    <button className="program-button" onClick={handleContinue}>
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Overview */}
          <div className="rectangle-2143">
            <div className="rectangle-content">
              <div className="section-header">
                <h2 className="section-title">Course Overview</h2>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="semester-filter"
                >
                  <option value="All">All Semesters</option>
                  <option value="Semester 01">Semester 01</option>
                  <option value="Semester 02">Semester 02</option>
                </select>
              </div>
              <div className="course-grid">
                {filteredCourses.map((course) => (
                  <div className="course-card" key={`course-${course.id}`}>
                    <div className="course-header">
                      <h3>{course.semester}</h3>
                      <span className="course-code">{course.code}</span>
                    </div>
                    <h4 className="course-name">{course.name}</h4>
                    <p className="instructor">Instructor: {course.instructor}</p>
                    <button className="view-course-btn" onClick={handleContinue}>
                      View Materials
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="sidebar">
          {/* Notifications Section */}
          <div className="sidebar-section1">
            <h3>Notifications</h3>
            {loading && <p>Loading notifications...</p>}
            {error && <p>Error loading notifications</p>}
            <ul className="notification-list">
              {notificationsData?.data?.map((notification) => (
                <li key={notification.id} className="notification-item">
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>

          {/* Private Files Section */}
          <div className="sidebar-section2">
            <h3>Private files</h3>
            <ul className="file-list">
              {dashboardData.privateFiles.map((file, index) => (
                <li key={`file-${index}`}>
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-meta">{file.date} • {file.size}</span>
                  </div>
                  <button 
                    className="file-download" 
                    onClick={() => handleFileDownload(file.fileUrl)}>
                    Download
                  </button>
                </li>
              ))}
            </ul>

            {/* File Upload */}
            <h4>Upload a File</h4>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload File</button>
          </div>

          {/* Calendar Section */}
          <div className="sidebar-section calendar">
            <h3>Calendar</h3>
            <Calendar
              onChange={handleDateClick}
              value={date}
              className="react-calendar"
            />
            <div className="upcoming-events">
              <h3>Upcoming Events</h3>
              <div className="event-input">
                <input
                  type="text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  placeholder="Add new event"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddEvent()}
                />
                <button onClick={handleAddEvent}>Add</button>
              </div>
              {events.length > 0 ? (
                <ul className="events-list">
                  {events.map((ev) => (
                    <li key={ev.id} className={ev.completed ? "completed" : ""}>
                      <input
                        type="checkbox"
                        checked={ev.completed}
                        onChange={() => handleToggleComplete(ev.id)}
                      />
                      <div className="event-details">
                        <span className="event-date">{ev.date}</span>
                        <span className="event-text">{ev.text}</span>
                      </div>
                      <button
                        onClick={() => handleDeleteEvent(ev.id)}
                        className="delete-event"
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-events">No events scheduled</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
