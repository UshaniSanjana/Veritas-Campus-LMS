// EditInstructorForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditInstructorForm() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get instructor ID from URL params
  
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

  const [currentImage, setCurrentImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [apiError, setApiError] = useState(null);

  // Fetch instructor data when component mounts
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        setIsLoading(true);
        
        const response = await axios.get(`http://localhost:5000/api/instructors/${id}`);
        // Check if response has a data property with nested data
        const instructorData = response.data.data || response.data;
        
        // Format join date for date input (YYYY-MM-DD)
        const joinDate = instructorData.joinDate 
          ? new Date(instructorData.joinDate).toISOString().split('T')[0] 
          : '';
        
        // Ensure we're extracting data from the correct structure
        const dataToSet = {
          firstName: instructorData.firstName || '',
          lastName: instructorData.lastName || '',
          email: instructorData.email || '',
          phone: instructorData.phone || '',
          department: instructorData.department || '',
          qualification: instructorData.qualification || '',
          experience: instructorData.experience || '',
          address: instructorData.address || '',
          joinDate: joinDate,
          profileImage: null, // We'll keep the existing image unless changed
        };
        
        setFormData(dataToSet);
        
        // Set current image URL if exists
        if (instructorData.profileImage) {
          // Fix: Ensure we have the full URL to the image
          const imageUrl = instructorData.profileImage.startsWith('http') 
            ? instructorData.profileImage 
            : `http://localhost:5000${instructorData.profileImage}`;
          
          setCurrentImage(imageUrl);
        }
        
      } catch (error) {
        console.error('Error fetching instructor:', error);
        setApiError('Failed to load instructor data. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchInstructor();
    } else {
      console.error('No instructor ID provided in URL params');
      setApiError('No instructor ID provided. Please select an instructor to edit.');
      setIsLoading(false);
    }
  }, [id]); // Only re-run if id changes

  const handleChange = (e) => {
    const { name, value } = e.target;
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
      const file = e.target.files[0];
      
      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setCurrentImage(previewUrl);
      
      setFormData({
        ...formData,
        profileImage: file,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/[^0-9]/g, ''))) {
      newErrors.phone = 'Phone number is invalid';
    }
    
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
      
      // Append the file if a new one was selected
      if (formData.profileImage) {
        formDataToSend.append('profileImage', formData.profileImage);
      }
      
      // Send data to the backend API using PUT method for updates
      const response = await axios.put(`http://localhost:5000/api/instructors/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setShowSuccess(true);
      
      // Show success message briefly before navigating
      setTimeout(() => {
        // Navigate to the ManageInstructors page after successful submission
        navigate('/allinstrutors');
      }, 2000);
    } catch (error) {
      console.error('Error updating instructor:', error);
      setApiError(
        error.response?.data?.message || 
        'An error occurred while updating the instructor. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Redesigned styles to match the image while keeping original fields
  const styles = {
    container: {
      backgroundColor: '#ffffff',
      minHeight: '100vh',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333',
    },
    formCard: {
      backgroundColor: '#ffffff',
      borderRadius: '4px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
      padding: '20px',
      maxWidth: '800px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '20px',
    },
    headerTitle: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
      margin: '0',
    },
    requiredNote: {
      backgroundColor: '#fffde7',
      padding: '10px 15px',
      borderRadius: '4px',
      marginBottom: '20px',
      fontSize: '14px',
      color: '#856404',
    },
    formGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '15px',
    },
    fullWidth: {
      gridColumn: '1 / -1',
    },
    label: {
      marginBottom: '8px',
      fontWeight: 'bold',
      fontSize: '14px',
    },
    asterisk: {
      color: '#f44336',
    },
    input: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
    },
    select: {
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '4px',
      fontSize: '14px',
      backgroundColor: '#fff',
      width: '100%',
      boxSizing: 'border-box',
    },
    imageUploadArea: {
      border: '1px dashed #ddd',
      borderRadius: '4px',
      padding: '20px',
      textAlign: 'center',
      cursor: 'pointer',
      height: '150px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    currentImageContainer: {
      marginBottom: '10px',
      textAlign: 'center',
    },
    currentImage: {
      maxWidth: '100%',
      maxHeight: '100px',
      borderRadius: '4px',
    },
    uploadIcon: {
      fontSize: '24px',
      marginBottom: '8px',
      color: '#ccc',
    },
    uploadText: {
      color: '#666',
      fontSize: '14px',
    },
    uploadInfo: {
      fontSize: '12px',
      color: '#999',
      marginTop: '8px',
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
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
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
    errorMessage: {
      color: '#f44336',
      fontSize: '12px',
      marginTop: '4px',
    },
    sectionHeader: {
      gridColumn: '1 / -1',
      borderBottom: '1px solid #eee',
      paddingBottom: '10px',
      marginBottom: '15px',
      marginTop: '15px',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 'bold',
      color: '#444',
    },
    loadingContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '400px',
      fontSize: '18px',
      color: '#666',
    },
    debugPanel: {
      backgroundColor: '#f8f9fa',
      padding: '15px',
      marginBottom: '20px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontFamily: 'monospace',
      fontSize: '12px',
      overflow: 'auto',
      whiteSpace: 'pre-wrap',
    },
    successMessage: {
      backgroundColor: '#e8f5e9',
      padding: '10px 15px',
      borderRadius: '4px',
      marginBottom: '20px',
      color: '#2e7d32',
    },
    errorAlert: {
      backgroundColor: '#ffebee',
      padding: '10px 15px',
      borderRadius: '4px',
      marginBottom: '20px',
      color: '#c62828',
    }
  };

  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.formCard}>
          <div style={styles.loadingContainer}>
            Loading instructor data...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.formCard}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Edit Instructor</h1>
        </div>
        
        <div style={styles.requiredNote}>
          Fields marked with an asterisk (*) are required.
        </div>

        {showSuccess && (
          <div style={styles.successMessage}>
            Instructor has been updated successfully. Redirecting...
          </div>
        )}

        {apiError && (
          <div style={styles.errorAlert}>
            {apiError}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={styles.formGrid}>
            {/* Personal Information Section */}
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Personal Information</h3>
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
                style={{
                  ...styles.input,
                  border: formData.firstName ? '1px solid #2196F3' : '1px solid #ddd',
                }}
                placeholder="Enter first name"
              />
              {errors.firstName && <p style={styles.errorMessage}>{errors.firstName}</p>}
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
                style={{
                  ...styles.input,
                  border: formData.lastName ? '1px solid #2196F3' : '1px solid #ddd',
                }}
                placeholder="Enter last name"
              />
              {errors.lastName && <p style={styles.errorMessage}>{errors.lastName}</p>}
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
                style={{
                  ...styles.input,
                  border: formData.email ? '1px solid #2196F3' : '1px solid #ddd',
                }}
                placeholder="Enter email address"
              />
              {errors.email && <p style={styles.errorMessage}>{errors.email}</p>}
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
                style={{
                  ...styles.input,
                  border: formData.phone ? '1px solid #2196F3' : '1px solid #ddd',
                }}
                placeholder="Enter phone number"
              />
              {errors.phone && <p style={styles.errorMessage}>{errors.phone}</p>}
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
                style={{
                  ...styles.input,
                  border: formData.address ? '1px solid #2196F3' : '1px solid #ddd',
                }}
                placeholder="Enter full address"
              />
            </div>
            
            {/* Professional Information Section */}
            <div style={styles.sectionHeader}>
              <h3 style={styles.sectionTitle}>Professional Information</h3>
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Department <span style={styles.asterisk}>*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={{
                  ...styles.select,
                  border: formData.department ? '1px solid #2196F3' : '1px solid #ddd',
                }}
              >
                <option value="">Select Department</option>
                <option value="Diploma in Human Resource Management">Diploma in Human Resource Management</option>
                <option value="Diploma in Business Administration">Diploma in Business Administration</option>
                <option value="Diploma in English">Diploma in English</option>
                <option value="Diploma in Internal Sales & Marketing">Diploma in Internal Sales & Marketing</option>
              </select>
              {errors.department && <p style={styles.errorMessage}>{errors.department}</p>}
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
                style={{
                  ...styles.input,
                  border: formData.qualification ? '1px solid #2196F3' : '1px solid #ddd',
                }}
                placeholder="E.g., Ph.D. in Computer Science"
              />
              {errors.qualification && <p style={styles.errorMessage}>{errors.qualification}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Years of Experience <span style={styles.asterisk}>*</span>
              </label>
              
               <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                style={{
                  ...styles.input,
                  border: formData.experience ? '1px solid #2196F3' : '1px solid #ddd',
                }}
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
              {errors.experience && <p style={styles.errorMessage}>{errors.experience}</p>}
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
                style={{
                  ...styles.input,
                  border: formData.joinDate ? '1px solid #2196F3' : '1px solid #ddd',
                }}
              />
              {errors.joinDate && <p style={styles.errorMessage}>{errors.joinDate}</p>}
            </div>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Profile Image
              </label>
              
              {currentImage && (
                <div style={styles.currentImageContainer}>
                  <img 
                    src={currentImage} 
                    alt="Current profile" 
                    style={styles.currentImage} 
                  />
                  <p style={{ fontSize: '12px', marginTop: '5px' }}>Current profile image</p>
                </div>
              )}
              
              <label htmlFor="profileImage" style={styles.imageUploadArea}>
                <div style={styles.uploadIcon}>📷</div>
                <div style={styles.uploadText}>
                  {currentImage ? 'Change photo' : 'Select a photo'}
                </div>
                <input
                  type="file"
                  id="profileImage"
                  name="profileImage"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </label>
              <div style={styles.uploadInfo}>
                Max size: 2MB. Formats: JPG, PNG
              </div>
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
              {isSubmitting ? 'Updating...' : 'Update Instructor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditInstructorForm;