import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import axiosInstance from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const Navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        contact: '',
        address: '',
        purpose: '',
        department: '',
        cnic: '',
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.contact) newErrors.contact = 'Contact number is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.purpose) newErrors.purpose = 'Purpose is required';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.cnic) newErrors.cnic = 'CNIC is required';

        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors before validating

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setLoading(true);
        try {
            const response = await axiosInstance.post('/auth/register', formData);
            console.log('Response:', response.data);

            console.log("token",response?.data?.data.newUser?.token);
            
            Navigate(`/slip/${response?.data?.data.newUser?.token}`)
        } catch (error) {
            console.error('Error:', error);
            
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="bg-white w-[90%] sm:w-[400px] mx-auto mt-10 p-5 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Field */}
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Your Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Contact Field */}
                <div className="mb-4">
                    <label htmlFor="contact" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {errors.contact && <p className="text-red-500 text-xs mt-1">{errors.contact}</p>}
                </div>

                {/* Address Field */}
                <div className="mb-4">
                    <label htmlFor="address" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                {/* Purpose Dropdown */}
                <div className="mb-4">
                    <label htmlFor="purpose" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Purpose
                    </label>
                    <select
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Select Purpose</option>

                        <option value="education need">Education Need</option>
                        <option value="medical support">Medical Support</option>
                        <option value="financial assistance">Financial Assistance</option>
                        <option value="job placement">Job Placement</option>
                        <option value="housing support">Housing Support</option>
                    </select>
                    {errors.purpose && <p className="text-red-500 text-xs mt-1">{errors.purpose}</p>}
                </div>

                {/* Department Dropdown */}
                <div className="mb-4">
                    <label htmlFor="department" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        Department
                    </label>
                    <select
                        id="department"
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    >
                        <option value="">Select Department</option>
                        <option value="education">Education</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="human resources">Human Resources</option>
                        <option value="housing">Housing</option>
                    </select>
                    {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department}</p>}
                </div>

                {/* CNIC Field */}
                <div className="mb-4">
                    <label htmlFor="cnic" className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
                        CNIC (ID)
                    </label>
                    <input
                        type="text"
                        id="cnic"
                        name="cnic"
                        value={formData.cnic}
                        onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                    />
                    {errors.cnic && <p className="text-red-500 text-xs mt-1">{errors.cnic}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 h-11 text-white rounded-lg font-medium"
                >
                    {loading ? 'loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default RegisterForm;
