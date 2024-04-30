import React, { useState, useEffect } from "react";
import axios from 'axios';

function UpdateEmployeeForm({  levId, empId ,empName, mngId,reason, fromDate, toDate, totalDays, status, setShowUpdateFormForEmpId }) {
    const [updatedData, setUpdatedData] = useState({
        levId: levId,
        empId: empId,
        empName: empName,
        mngId:mngId,
        reason: reason,
        fromDate: fromDate,
        toDate: toDate,
        totalDays: totalDays,
      
    });

    useEffect(() => {
        calculateTotalLeaveDays();
    }, [updatedData.fromDate, updatedData.toDate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const calculateTotalLeaveDays = () => {
        const from = new Date(updatedData.fromDate);
        const to = new Date(updatedData.toDate);
        if (to >= from) {
            const diffTime = Math.abs(to - from);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
            setUpdatedData(prevState => ({ ...prevState, totalDays: diffDays }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch(`https://localhost:7181/api/LeaveRequests/${levId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })

            if (res.ok) {
                alert('Data stored successfully');
                setShowUpdateFormForEmpId(null);

               

            } else {
                const errorMessage = await res.text();
                throw new Error(`Error: ${res.status} - ${errorMessage}`);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                <form className="bg-white shadow-md rounded px-8 py-6 w-96" onSubmit={handleSubmit}>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Employee Id:</label>
                        <input type="text" name="empId" readOnly value={updatedData.empId} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Employee Name:</label>
                        <input type="text" name="empName" readOnly value={updatedData.empName} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Reason:</label>
                        <input type="text" name="reason" value={updatedData.reason} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">From Date:</label>
                        <input type="date" name="fromDate" value={updatedData.fromDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">To Date:</label>
                        <input type="date" name="toDate" value={updatedData.toDate} onChange={handleChange} className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Total Leave Days:</label>
                        <input type="text" name="totalDays" value={updatedData.totalDays} readOnly className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-200" />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
                        <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setShowUpdateFormForEmpId(null)}>Cancel</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default UpdateEmployeeForm;
