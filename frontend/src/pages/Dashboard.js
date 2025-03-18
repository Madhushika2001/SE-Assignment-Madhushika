import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus, FaSort } from "react-icons/fa";

export default function Dashboard() {
  const [students, setStudents] = useState([]);
  const [sortOption, setSortOption] = useState("active");
  const token = localStorage.getItem("token");

  
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get("http://localhost:5000/api/students", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/students/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/students/${id}/status`, {
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      fetchStudents();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-400 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-white flex items-center gap-2">
                Student Management Dashboard
              </h1>
              <Link
                to="/add-student"
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg 
                         transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <FaPlus className="inline-block" />
                Add Student
              </Link>
            </div>
          </div>

          <div className="px-8 py-6">
            <div className="rounded-xl border border-gray-100 overflow-hidden shadow-sm">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      <span className="flex items-center gap-1">
                        <FaSort className="text-gray-400" />
                        Image
                      </span>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Age</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {students.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <img 
                          src={`http://localhost:5000/${student.image}`} 
                          alt={student.name}
                          className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-md"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900">{student.name}</td>
                      <td className="px-6 py-4 text-gray-700">{student.age}</td>
                      <td className="px-6 py-4">
                        <select
                          value={student.status}
                          onChange={(e) => updateStatus(student._id, e.target.value)}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            student.status === 'Active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          } focus:ring-2 focus:ring-blue-500 outline-none`}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Link
                            to={`/edit-student/${student._id}`}
                            className="p-2 text-blue-600 hover:text-blue-900 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            <FaEdit className="text-lg" />
                          </Link>
                          <button
                            onClick={() => deleteStudent(student._id)}
                            className="p-2 text-red-600 hover:text-red-900 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <FaTrash className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {students.length === 0 && (
                <div className="py-12 text-center text-gray-500">
                  <p className="text-lg">No students found. Add your first student!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}