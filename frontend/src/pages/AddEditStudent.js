import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserEdit, FaBirthdayCake, FaImages, FaSave } from "react-icons/fa";

export default function AddEditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    status: 'Active',
    image: null
  });

  useEffect(() => {
    if (id) fetchStudent();
  }, [id]);

  const fetchStudent = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:5000/api/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No authentication token found.");
      return;
    }
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("age", formData.age);
    data.append("status", formData.status);
  
    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }
  
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/students/${id}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios.post("http://localhost:5000/api/students", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            
          },
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error submitting student:", error.response?.data || error.message);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              <FaUserEdit className="inline-block" />
              {id ? 'Edit Student Profile' : 'Create New Student'}
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
            {/* Name  */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaUserEdit className="text-blue-600" />
                Student Name
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400
                         transition-all duration-200"
                placeholder="Enter student's full name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaBirthdayCake className="text-blue-600" />
                Age
              </label>
              <input
                type="number"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400
                         transition-all duration-200"
                placeholder="Enter student's age"
                value={formData.age}
                onChange={(e) => setFormData({...formData, age: e.target.value})}
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                Status
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none
                         bg-no-repeat bg-[right_1rem_center] bg-[length:1.5em] bg-select-arrow"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <FaImages className="text-blue-600" />
                Student Photo
              </label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center 
                ${formData.image ? 'border-green-500 bg-green-50' : 'border-gray-300 hover:border-blue-500'} 
                transition-all duration-200 cursor-pointer`}
                onClick={() => document.querySelector('input[type="file"]').click()}
              >
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setFormData({...formData, image: e.target.files[0]})}
                />
                <div className="space-y-2">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-blue-600 hover:text-blue-500">
                      Click to upload
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                  </div>
                  {formData.image && (
                    <p className="text-sm text-green-600 mt-2">
                      Selected: {formData.image.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

           
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-semibold rounded-lg shadow-lg hover:shadow-xl
                       transform hover:scale-[1.02] transition-all duration-200
                       flex items-center justify-center gap-2"
            >
              <FaSave className="text-lg" />
              {id ? 'Update Student Profile' : 'Create New Student'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
