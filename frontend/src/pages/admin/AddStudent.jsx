import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
    gender: 'male',
    mobile: '',
    course: '',
    password: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const courses = [
    { _id: '1', name: 'Diploma in Human Resource Management' },
    { _id: '2', name: 'Diploma in Business Administration' },
    { _id: '3', name: 'Diploma in English' },
    { _id: '4', name: 'Diploma in Internal Sales & Marketing' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const formDataToSend = new FormData();
      
      // Append all form fields to formData
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      
      // Append the image file
      if (image) {
        formDataToSend.append('image', image);
      }

      // Make API call to add student
      const response = await axios.post('/api/students', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Student added successfully!');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        age: '',
        address: '',
        gender: 'male',
        mobile: '',
        course: '',
        password: '',
      });
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Add New Student</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Image Upload */}
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 border-2 border-gray-300 rounded-full overflow-hidden mb-2">
                {imagePreview ? (
                  <img 
                    src={imagePreview} 
                    alt="Profile Preview" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
              </div>
              <label className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
                Upload Image
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden" 
                />
              </label>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Age */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                Mobile
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="male">Male</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <label htmlFor="female">Female</label>
                </div>
              </div>
            </div>

            {/* Course */}
            <div>
              <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
                Course
              </label>
              <select
                id="course"
                name="course"
                value={formData.course}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Address - Full Width */}
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Adding Student...' : 'Add Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudent;