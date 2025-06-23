// ImprovedInstructorForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function InstructorForm() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    department: '',
    qualification: '',
    experience: '',
    address: '',
    joinDate: '',
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special validation for first name and last name (only letters)
    if ((name === 'firstName' || name === 'lastName') && value !== '') {
      // Allow only letters and spaces
      const letterRegex = /^[A-Za-z\s]+$/;
      if (!letterRegex.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Only letters and spaces are allowed'
        });
        return;
      }
    }
    
    // Special validation for phone number (only numbers)
    if (name === 'phone') {
      // Allow only numbers
      const numberRegex = /^[0-9]*$/;
      if (value !== '' && !numberRegex.test(value)) {
        setErrors({
          ...errors,
          [name]: 'Only numbers are allowed'
        });
        return;
      }
      
      // Restrict to maximum 10 digits
      if (value.length > 10) {
        return;
      }
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file size (2MB max)
      if (selectedFile.size > 2 * 1024 * 1024) {
        setErrors({
          ...errors,
          profileImage: 'File size must be less than 2MB'
        });
        return;
      }
      
      // Validate file type
      if (!selectedFile.type.match('image/jpeg|image/png|image/jpg')) {
        setErrors({
          ...errors,
          profileImage: 'Only JPG, JPEG or PNG files are allowed'
        });
        return;
      }
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setImagePreview(loadEvent.target.result);
      };
      reader.readAsDataURL(selectedFile);
      
      setFormData({
        ...formData,
        profileImage: selectedFile,
      });
      
      // Clear any previous errors
      if (errors.profileImage) {
        setErrors({
          ...errors,
          profileImage: '',
        });
      }
    }
  };

  const validateEmail = (email) => {
    // More comprehensive email validation
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase()) ;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.firstName)) {
      newErrors.firstName = 'First name should only contain letters';
    }
    
    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (!/^[A-Za-z\s]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Last name should only contain letters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    }
    
    // Other required fields
    if (!formData.department.trim()) newErrors.department = 'Department is required';
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!formData.experience.trim()) newErrors.experience = 'Experience is required';
    if (!formData.joinDate) newErrors.joinDate = 'Join date is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    setApiError(null);
    
    try {
      // Create a FormData object to handle file uploads
      const formDataToSend = new FormData();
      
      // Append all form fields to the FormData object
      Object.keys(formData).forEach(key => {
        if (key !== 'profileImage') {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Append the file if it exists
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }
      
      // Send data to the backend API
      const response = await axios.post('http://localhost:5000/api/instructors', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      console.log('Instructor added:', response.data);
      setShowSuccess(true);
      
      // Show success message briefly before navigating
      setTimeout(() => {
        // Navigate to the ManageInstructors page after successful submission
        navigate('/allinstrutors');
      }, 1500);
    } catch (error) {
      console.error('Error adding instructor:', error);
      setApiError(
        error.response?.data?.message || 
        'An error occurred while adding the instructor. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Improved styles for a better UI
  const styles = {
    container: {
      backgroundColor: '#f5f7fa',
      minHeight: '100vh',
      padding: '40px 20px',
      fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#333',
    },
    formCard: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
      padding: '30px',
      maxWidth: '900px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '30px',
      borderBottom: '1px solid #eaeaea',
      paddingBottom: '15px',
    },
    headerTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0',
    },
    requiredNote: {
      backgroundColor: '#fff8e1',
      padding: '12px 20px',
      borderRadius: '6px',
      marginBottom: '25px',
      fontSize: '14px',
      color: '#856404',
      display: 'flex',
      alignItems: 'center',
      borderLeft: '4px solid #ffc107',
    },
    infoIcon: {
      marginRight: '10px',
      fontSize: '18px',
      color: '#ffc107',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '5px',
    },
    fullWidth: {
      gridColumn: '1 / -1',
    },
    label: {
      marginBottom: '8px',
      fontWeight: '500',
      fontSize: '14px',
      color: '#4a5568',
    },
    asterisk: {
      color: '#e53e3e',
      marginLeft: '2px',
    },
    input: {
      padding: '12px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '15px',
      width: '100%',
      boxSizing: 'border-box',
      transition: 'border-color 0.3s, box-shadow 0.3s',
    },
    inputFocus: {
      borderColor: '#3182ce',
      boxShadow: '0 0 0 3px rgba(66, 153, 225, 0.2)',
      outline: 'none',
    },
    select: {
      padding: '12px 16px',
      border: '1px solid #e2e8f0',
      borderRadius: '6px',
      fontSize: '15px',
      backgroundColor: '#fff',
      width: '100%',
      boxSizing: 'border-box',
      appearance: 'none',
      backgroundImage: 'url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23718096\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3e%3cpolyline points=\'6 9 12 15 18 9\'%3e%3c/polyline%3e%3c/svg%3e")',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 12px center',
      backgroundSize: '16px',
    },
    imageUploadArea: {
      border: '2px dashed #cbd5e0',
      borderRadius: '6px',
      padding: '30px 20px',
      textAlign: 'center',
      cursor: 'pointer',
      minHeight: '180px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'border-color 0.3s, background-color 0.3s',
    },
    imageUploadAreaActive: {
      borderColor: '#4299e1',
      backgroundColor: 'rgba(66, 153, 225, 0.05)',
    },
    uploadIcon: {
      fontSize: '36px',
      marginBottom: '15px',
      color: '#718096',
    },
    uploadText: {
      color: '#4a5568',
      fontSize: '16px',
      fontWeight: '500',
      marginBottom: '5px',
    },
    uploadInfo: {
      fontSize: '13px',
      color: '#718096',
      marginTop: '8px',
    },
    imagePreviewContainer: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '15px',
    },
    imagePreview: {
      maxWidth: '100%',
      maxHeight: '180px',
      borderRadius: '6px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '10px',
    },
    removeImageButton: {
      background: 'none',
      border: 'none',
      color: '#e53e3e',
      cursor: 'pointer',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      padding: '5px 10px',
    },
    trashIcon: {
      marginRight: '5px',
      fontSize: '14px',
    },
    submitButton: {
      backgroundColor: '#95C436',
      color: 'white',
      border: "1px solid #3E9355",
      borderRadius: '6px',
      padding: '14px 24px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'background-color 0.3s',
    },
    submitButtonHover: {
      backgroundColor: '#388e3c',
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '30px',
      gap: '15px',
      
    },
    cancelButton: {
      backgroundColor: '#D7D7D7',
      color: 'white',
      border: "1px solid #9B9B9B",
      borderRadius: '6px',
      padding: '14px 24px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer',
      marginTop: '20px',
      transition: 'background-color 0.3s',
    },
    cancelButtonHover: {
      backgroundColor: '#e0e0e0',
    },
    sectionHeader: {
      gridColumn: '1 / -1',
      borderBottom: '1px solid #eaeaea',
      paddingBottom: '12px',
      marginBottom: '20px',
      marginTop: '20px',
    },
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#2c3e50',
      margin: '0',
      display: 'flex',
      alignItems: 'center',
    },
    sectionIcon: {
      marginRight: '10px',
      color: '#4299e1',
    },
    successMessage: {
      backgroundColor: '#e8f5e9',
      padding: '14px 20px',
      borderRadius: '6px',
      marginBottom: '20px',
      color: '#2e7d32',
      display: 'flex',
      alignItems: 'center',
      borderLeft: '4px solid #4caf50',
    },
    successIcon: {
      marginRight: '10px',
      fontSize: '18px',
      color: '#4caf50',
    },
    errorMessage: {
      backgroundColor: '#ffebee',
      padding: '14px 20px',
      borderRadius: '6px',
      marginBottom: '20px',
      color: '#c62828',
      display: 'flex',
      alignItems: 'center',
      borderLeft: '4px solid #f44336',
    },
    errorIcon: {
      marginRight: '10px',
      fontSize: '18px',
      color: '#f44336',
    },
    fieldError: {
      color: '#e53e3e',
      fontSize: '13px',
      marginTop: '6px',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Add New Instructor</h1>
        </div>
        
        <div style={styles.requiredNote}>
          <span style={styles.infoIcon}>ℹ️</span>
          Fields marked with an asterisk (*) are required.
        </div>

        {showSuccess && (
          <div style={styles.successMessage}>
            <span style={styles.successIcon}>✅</span>
            Instructor has been added successfully. Redirecting...
          </div>
        )}

        {apiError && (
          <div style={styles.errorMessage}>
            <span style={styles.errorIcon}>⚠️</span>
            {apiError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            {/* Personal Information Section */}
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>👤</span>
                Personal Information
              </h3>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                First Name <span style={styles.asterisk}>*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter first name"
              />
              {errors.firstName && <p style={styles.fieldError}>{errors.firstName}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Last Name <span style={styles.asterisk}>*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter last name"
              />
              {errors.lastName && <p style={styles.fieldError}>{errors.lastName}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Email Address <span style={styles.asterisk}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter email address"
              />
              {errors.email && <p style={styles.fieldError}>{errors.email}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Phone Number <span style={styles.asterisk}>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
              />
              {errors.phone && <p style={styles.fieldError}>{errors.phone}</p>}
            </div>
            
            <div style={{...styles.formGroup, ...styles.fullWidth}}>
              <label style={styles.label}>
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={styles.input}
                placeholder="Enter full address"
              />
            </div>
            
            {/* Professional Information Section */}
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>
                <span style={styles.sectionIcon}>💼</span>
                Professional Information
              </h3>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Department <span style={styles.asterisk}>*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Select Department</option>
                <option value="Diploma in Human Resource Management">Diploma in Human Resource Management</option>
                <option value="Diploma in Business Administration">Diploma in Business Administration</option>
                <option value="Diploma in English">Diploma in English</option>
                <option value="Diploma in Internal Sales & Marketing">Diploma in Internal Sales & Marketing</option>
              </select>
              {errors.department && <p style={styles.fieldError}>{errors.department}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Highest Qualification <span style={styles.asterisk}>*</span>
              </label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                style={styles.input}
                placeholder="E.g., Ph.D. in Computer Science"
              />
              {errors.qualification && <p style={styles.fieldError}>{errors.qualification}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Years of Experience <span style={styles.asterisk}>*</span>
              </label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                style={styles.select}
              >
                <option value="">Select years of experience</option>
                <option value="1">1 Year</option>
                <option value="2">2 Year</option>
                <option value="3">3 Year</option>
                <option value="4">4 Year</option>
                <option value="5">5 Year</option>
                <option value="6">6 Year</option>
                <option value="7">7 Year</option>
                <option value="8">8 Year</option>
                <option value="9">9 Year</option>
                <option value="10">10 Year</option>
                <option value="10+">10+ Year</option>
                
              </select>
              
              {errors.experience && <p style={styles.fieldError}>{errors.experience}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Join Date <span style={styles.asterisk}>*</span>
              </label>
              <input
                type="date"
                name="joinDate"
                value={formData.joinDate}
                onChange={handleChange}
                style={styles.input}
              />
              {errors.joinDate && <p style={styles.fieldError}>{errors.joinDate}</p>}
            </div>
            
            <div style={{...styles.formGroup, ...styles.fullWidth}}>
              <label style={styles.label}>
                Profile Image
              </label>
              
              {/* Image Preview */}
              {imagePreview && (
                <div style={styles.imagePreviewContainer}>
                  <img 
                    src={imagePreview} 
                    alt="Profile Preview" 
                    style={styles.imagePreview}
                  />
                  <button 
                    type="button" 
                    style={styles.removeImageButton}
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({
                        ...formData,
                        profileImage: null
                      });
                    }}
                  >
                    <span style={styles.trashIcon}>🗑️</span>
                    Remove Image
                  </button>
                </div>
              )}
              
              {/* Image Upload Area (only show if no preview) */}
              {!imagePreview && (
                <label 
                  htmlFor="profileImage" 
                  style={styles.imageUploadArea}
                >
                  <div style={styles.uploadIcon}>📷</div>
                  <div style={styles.uploadText}>Select a profile photo</div>
                  <div style={styles.uploadInfo}>
                    Click or drag and drop an image here
                  </div>
                  <input
                    type="file"
                    id="profileImage"
                    name="profileImage"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    accept="image/jpeg, image/png, image/jpg"
                  />
                </label>
              )}
              
              <div style={styles.uploadInfo}>
                Max size: 2MB. Accepted formats: JPG, JPEG, PNG
              </div>
              {errors.profileImage && <p style={styles.fieldError}>{errors.profileImage}</p>}
            </div>
          </div>
          
          <div style={styles.buttonContainer}>
            <button 
              type="button" 
              style={styles.cancelButton}
              onClick={() => navigate('/allinstrutors')}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...styles.submitButton,
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Adding...' : 'Add Instructor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InstructorForm;