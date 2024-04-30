import React, { useEffect, useState } from 'react';
import UpdateEmployeeForm from './handleUpdate';




function ViewApplicationForm({user}) {
    const [employees, setEmployees] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');

    const [filteredEmployees, setFilteredEmployees] = useState([]);

    const [showUpdateFormForEmpId, setShowUpdateFormForEmpId] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const res = await fetch('https://localhost:7181/api/LeaveRequests')
            const data = await res.json()
            setEmployees(data.filter(employee => employee.empId === user?.empId));
            console.log(data)
        
        }
        getData()
        return;
    }, [user])


    const handleDelete = async (levId) => {
        const confi = window.confirm("Sure you wnat to cancel your leave?")
        if (confi) {
            try {

                await fetch(`https://localhost:7181/api/LeaveRequests/${levId}`, {
                    method: 'DELETE',
                });
                const updatedEmployees = employees.filter(employee => employee.levId !== levId);
                setEmployees(updatedEmployees);
                setFilteredEmployees(updatedEmployees);

                alert(`Employee with ID ${levId} deleted successfully!`);
            } catch (error) {
                alert('Error deleting employee:', error);
            }
        }
    };



    const handleUpdateButtonClick = (levId) => {
        setShowUpdateFormForEmpId(levId);
    };

    const handleUpdate = (levId, updatedData) => {

        console.log(`Updating employee with ID ${levId}`);
        console.log('Updated data:', updatedData);
    };

    useEffect(() => {
        console.log("Employees:", employees);
        const filtered = employees.filter(employee =>
            employee.reason && employee.reason.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmployees(filtered);
    }, [searchTerm, employees]);


    const calculateTotalDays = (fromDate, toDate) => {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        const difference = Math.floor((to - from) / (1000 * 60 * 60 * 24))+1;
        return difference;
    };

    return (
        <>
            <div className="text-center py-5">
                <h1 className="text-4xl font-bold">View Applied Leaves</h1>
            </div>
        <div className="container mx-auto ml-[70px] py-7 ">
            <input
                type="text"
                placeholder="Search..."
                className="w-full md:w-64 mb-4 px-4 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />


            <table className="w-2000px bg-white border border-gray-200 rounded-md">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="px-4 py-2">Leave ID</th>
                        <th className="px-4 py-2">Employee ID</th>
                        <th className="px-4 py-2">Employee Name</th>
                        <th className="px-4 py-2">Reason</th>
                        <th className="px-4 py-2">From Date</th>
                        <th className="px-4 py-2">To Date</th>
                        <th className="px-4 py-2">Total Leave Days</th>
                        {/*<th className="px-4 py-2">Status</th>*/}
                        <th className="px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredEmployees.map(employee => (
                        <tr key={employee.levId}>
                            <td className="px-4 py-2">{employee.levId}</td>
                            <td className="px-4 py-2">{employee.empId}</td>
                            <td className="px-4 py-2">{employee.empName}</td>
                            <td className="px-4 py-2">{employee.reason}</td>
                            <td className="px-4 py-2">{employee.fromDate}</td>
                            <td className="px-4 py-2">{employee.toDate}</td>
                            <td className="px-4 py-2">{calculateTotalDays(employee.fromDate, employee.toDate)}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded-md mr-2"
                                    onClick={() => handleUpdateButtonClick(employee.levId)}
                                  
                                >
                                    Edit
                                </button>
                                {showUpdateFormForEmpId === employee.levId && (
                                    <UpdateEmployeeForm
                                        levId={employee.levId}
                                        empId={employee.empId }
                                        empName={employee.empName}
                                        reason={employee.reason}
                                        fromDate={employee.fromDate}
                                        toDate={employee.toDate}
                                        employees={employees }
                                        setEmployees={setEmployees }
                                        onUpdate={handleUpdate}
                                        setShowUpdateFormForEmpId={setShowUpdateFormForEmpId}
                                    />
                                )}

                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded-md"
                                    onClick={() => handleDelete(employee.levId)}
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </>
    );
}

export default ViewApplicationForm;
