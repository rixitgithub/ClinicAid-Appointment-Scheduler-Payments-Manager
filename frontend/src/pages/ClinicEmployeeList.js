import React from "react";

const ClinicEmployeeList = ({ employees }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-semibold mb-4">Employees</h2>
      {employees.length === 0 ? (
        <p className="text-gray-600">No employees added yet.</p>
      ) : (
        <ul>
          {employees.map((employee, index) => (
            <li key={index} className="mb-6">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="mb-2">
                  <strong>Name:</strong> {employee.name}
                </div>
                <div className="mb-2">
                  <strong>Email:</strong> {employee.email}
                </div>
                <div className="mb-2">
                  <strong>Phone:</strong> {employee.phone}
                </div>
                <div className="mb-2">
                  <strong>Type:</strong> {employee.type}
                </div>
                <div className="mb-2">
                  <strong>Specialization:</strong>{" "}
                  {employee.specialization || (
                    <span className="italic">Not specified</span>
                  )}
                </div>
                <div className="mb-2">
                  <strong>Unique Code:</strong> {employee.uniqueCode}
                </div>
                <div>
                  <strong>Created At:</strong>{" "}
                  {new Date(employee.createdAt).toLocaleDateString()}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClinicEmployeeList;
