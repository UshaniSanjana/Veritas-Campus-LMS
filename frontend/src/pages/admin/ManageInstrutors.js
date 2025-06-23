import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../css/ManageInstructors.css';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Icons
const SpinnerIcon = () => (
  <svg className="spinner" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="2" x2="12" y2="6"></line>
    <line x1="12" y1="18" x2="12" y2="22"></line>
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
    <line x1="2" y1="12" x2="6" y2="12"></line>
    <line x1="18" y1="12" x2="22" y2="12"></line>
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4a6cf7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

const DeleteIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f44336" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const AddIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const ReportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const PDFIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <rect x="8" y="12" width="8" height="2"></rect>
    <rect x="8" y="16" width="8" height="2"></rect>
  </svg>
);

const ExcelIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <polyline points="8 16 12 12 16 16"></polyline>
    <polyline points="8 12 12 16 16 12"></polyline>
  </svg>
);

const InstructorList = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [departments, setDepartments] = useState(['All']);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [showReportMenu, setShowReportMenu] = useState(false);
  const navigate = useNavigate();
  
  // API base URL
  const API_URL = 'http://localhost:5000/api/instructors';

  // Fetch instructors on component mount
  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL);
      const instructorsData = response.data.data;
      setInstructors(instructorsData);
      
      // Extract unique departments for filtering
      const uniqueDepartments = [...new Set(instructorsData.map(instructor => instructor.department))];
      setDepartments(['All', ...uniqueDepartments]);
      
      setError(null);
    } catch (err) {
      setError('Failed to fetch instructors. Please try again later.');
      console.error('Error fetching instructors:', err);
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter instructors based on search and department
  const filteredInstructors = instructors.filter(instructor => {
    const matchesSearch = 
      `${instructor.firstName} ${instructor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) || 
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.address?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = 
      selectedDepartment === 'All' || 
      instructor.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Pagination
  const indexOfLastInstructor = currentPage * rowsPerPage;
  const indexOfFirstInstructor = indexOfLastInstructor - rowsPerPage;
  const currentInstructors = filteredInstructors.slice(indexOfFirstInstructor, indexOfLastInstructor);
  const totalPages = Math.ceil(filteredInstructors.length / rowsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Navigate to edit instructor page
  const handleEditInstructor = (id) => {
    navigate(`/editinstructor/${id}`);
  };

  // Navigate to add instructor page
  const handleAddInstructor = () => {
    navigate('/addinstructor');
  };

  // Handle delete instructor
  const handleDeleteInstructor = async (id) => {
    if (window.confirm('Are you sure you want to delete this instructor?')) {
      try {
        await axios.delete(`${API_URL}/${id}`);
        // Refresh the list after deletion
        fetchInstructors();
      } catch (err) {
        setError('Failed to delete instructor. Please try again.');
        console.error('Error deleting instructor:', err);
      }
    }
  };

  // Toggle report menu
  const toggleReportMenu = () => {
    setShowReportMenu(!showReportMenu);
  };

  // Generate PDF report - FIXED VERSION
  const generatePDFReport = () => {
    try {
      // Create new jsPDF instance with landscape orientation for better fit
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Add title
      doc.setFontSize(18);
      doc.text('Faculty Instructors Report', 14, 20);
      
      // Add current date
      doc.setFontSize(11);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 28);
      
      // If department filter is active, add it to the report
      if (selectedDepartment !== 'All') {
        doc.text(`Department: ${selectedDepartment}`, 14, 34);
      }
      
      // Table data preparation
      const tableData = filteredInstructors.map((instructor) => [
        `${instructor.firstName} ${instructor.lastName}`,
        instructor.email,
        instructor.phone,
        instructor.department,
        instructor.qualification,
        instructor.experience,
        formatDate(instructor.joinDate)
      ]);
      
      // Add table with autoTable - using the imported function directly
      autoTable(doc, {
        startY: selectedDepartment !== 'All' ? 40 : 35,
        head: [['Name', 'Contact', 'Department', 'Qualification', 'Experience', 'Join Date']],
        body: tableData,
        theme: 'grid',
        styles: {
          fontSize: 9,
          cellPadding: 3,
          overflow: 'linebreak',
          lineColor: [200, 200, 200],
          lineWidth: 0.1
        },
        headStyles: {
          fillColor: [74, 108, 247],
          textColor: 255,
          fontStyle: 'bold',
          halign: 'center'
        },
        alternateRowStyles: {
          fillColor: [240, 240, 250]
        },
        margin: { top: 40, right: 14, bottom: 20, left: 14 }
      });
      
      // Save the PDF
      doc.save('faculty-instructors-report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      setError('Failed to generate PDF report. Please try again.');
    }
  };
  
  // Generate Excel report
  const generateExcelReport = () => {
    try {
      // Data preparation for Excel
      const excelData = filteredInstructors.map((instructor) => ({
        Name: `${instructor.firstName} ${instructor.lastName}`,
        Email: instructor.email,
        Phone: instructor.phone,
        Department: instructor.department,
        Qualification: instructor.qualification,
        Experience: instructor.experience,
        'Join Date': formatDate(instructor.joinDate)
      }));
      
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(excelData);
      
      // Column widths
      const columnWidths = [
        { wch: 20 }, // Name
        { wch: 25 }, // Email
        { wch: 15 }, // Phone
        { wch: 15 }, // Department
        { wch: 20 }, // Qualification
        { wch: 15 }, // Experience
        { wch: 20 }  // Join Date
      ];
      
      worksheet['!cols'] = columnWidths;
      
      // Create workbook
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Faculty Instructors');
      
      // Generate Excel file
      XLSX.writeFile(workbook, 'faculty-instructors-report.xlsx');
    } catch (error) {
      console.error('Error generating Excel report:', error);
      setError('Failed to generate Excel report. Please try again.');
    }
  };

  return (
    <div className="instructor-dashboard">
      <div className="dashboard-header">
        <h1>Faculty Instructors</h1>
        <div className="dashboard-actions">
          <div className="search-container">
            <SearchIcon />
            <input 
              type="text" 
              placeholder="Search instructors..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <select 
            value={selectedDepartment} 
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="department-filter"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <div className="report-container">
            <button className="report-button" onClick={toggleReportMenu}>
              <ReportIcon /> Generate Report
            </button>
            {showReportMenu && (
              <div className="report-menu">
                <button onClick={generatePDFReport} className="report-option">
                  <PDFIcon /> Export as PDF
                </button>
                <button onClick={generateExcelReport} className="report-option">
                  <ExcelIcon /> Export as Excel
                </button>
              </div>
            )}
          </div>
          <button className="add-button" onClick={handleAddInstructor}>
            <AddIcon /> Add Instructor
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="loading-container">
          <SpinnerIcon />
          <p>Loading instructors...</p>
        </div>
      ) : (
        <div className="material-table-container">
          <table className="faculty-table">
            <thead>
              <tr>
                <th className="image-col">IMAGE</th>
                <th className="name-col">NAME</th>
                <th className="contact-col">CONTACT</th>
                <th className="department-col">DEPARTMENT</th>
                <th className="qualification-col">QUALIFICATION</th>
                <th className="experience-col">EXPERIENCE</th>
                <th className="joindate-col">JOIN DATE</th>
                <th className="actions-col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {currentInstructors.length === 0 ? (
                <tr>
                  <td colSpan="8" className="no-results">No instructors found matching your criteria.</td>
                </tr>
              ) : (
                currentInstructors.map(instructor => (
                  <tr key={instructor._id} className="faculty-row">
                    <td className="image-col">
                      {instructor.profileImage ? (
                        <img
                          className="avatar"
                          src={`http://localhost:5000${instructor.profileImage}`}
                          alt={`${instructor.firstName} ${instructor.lastName}`}
                        />
                      ) : (
                        <div className="avatar-placeholder">
                          {instructor.firstName.charAt(0)}{instructor.lastName.charAt(0)}
                        </div>
                      )}
                    </td>
                    
                    <td className="name-col">
                      <div className="instructor-name">
                        {instructor.firstName}<br />
                        {instructor.lastName}
                      </div>
                    </td>
                    
                    <td className="contact-col">
                      <div className="contact-details">
                        <div className="contact-item">
                          <EmailIcon /> <span>{instructor.email}</span>
                        </div>
                        <div className="contact-item">
                          <PhoneIcon /> <span>{instructor.phone}</span>
                        </div>
                        <div className="address-text">
                          {instructor.address}
                        </div>
                      </div>
                    </td>
                    
                    <td className="department-col">
                      <div className="department-chip">{instructor.department}</div>
                    </td>
                    
                    <td className="qualification-col">
                      {instructor.qualification}
                    </td>
                    
                    <td className="experience-col">
                      {instructor.experience}
                    </td>
                    
                    <td className="joindate-col">
                      {formatDate(instructor.joinDate)}
                    </td>
                    
                    <td className="actions-col">
                      <div className="action-buttons">
                        <button 
                          className="edit-button" 
                          onClick={() => handleEditInstructor(instructor._id)}
                          title="Edit instructor"
                        >
                          <EditIcon />
                        </button>
                        <button 
                          className="delete-button" 
                          onClick={() => handleDeleteInstructor(instructor._id)}
                          title="Delete instructor"
                        >
                          <DeleteIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          {/* Pagination */}
          {filteredInstructors.length > 0 && (
            <div className="pagination">
              <div className="pagination-info">
                Showing {indexOfFirstInstructor + 1} to {Math.min(indexOfLastInstructor, filteredInstructors.length)} of {filteredInstructors.length} entries
              </div>
              <div className="pagination-controls">
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className="pagination-button"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logic to show pages around current page
                  const startPage = Math.max(1, currentPage - 2);
                  const pageNum = startPage + i;
                  if (pageNum <= totalPages) {
                    return (
                      <button 
                        key={pageNum} 
                        onClick={() => paginate(pageNum)} 
                        className={`pagination-button ${currentPage === pageNum ? 'active' : ''}`}
                      >
                        {pageNum}
                      </button>
                    );
                  }
                  return null;
                })}
                
                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className="pagination-button"
                >
                  Next
                </button>
              </div>
              
              <div className="rows-per-page">
                <label>
                  Rows per page:
                  <select 
                    value={rowsPerPage} 
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1); // Reset to first page when changing rows per page
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                </label>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InstructorList;