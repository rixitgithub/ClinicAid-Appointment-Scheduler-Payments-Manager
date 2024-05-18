import React, { useState } from "react";
import useClinicAPI from "../api/useClinicAPI";

const ProfilePage = () => {
  const [clinicName, setClinicName] = useState("");
  const [aboutClinic, setAboutClinic] = useState("");
  const [address, setAddress] = useState("");
  const [number, setNumber] = useState("");
  const [employeeType, setEmployeeType] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeePhone, setEmployeePhone] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [employees, setEmployees] = useState([]);
  const [specialization, setSpecialization] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [editIndex, setEditIndex] = useState(null); // Track index of employee being edited
  const { createClinic } = useClinicAPI();

  const handleEdit = (index) => {
    // Remove the specific employee from the list
    const editedEmployee = employees[index]; // Get the edited employee
    setEmployees((prevEmployees) => {
      const updatedEmployees = prevEmployees.filter((_, i) => i !== index); // Remove the employee from the list
      // Populate input fields with the employee's current details
      setEmployeeType(editedEmployee.type);
      setEmployeeName(editedEmployee.name);
      setEmployeePhone(editedEmployee.phone);
      setEmployeeEmail(editedEmployee.email);
      setEmployeePassword(editedEmployee.password);
      setSpecialization(
        editedEmployee.type === "Doctor"
          ? editedEmployee.Specialization || ""
          : ""
      );
      setEditIndex(index); // Set the index of the employee being edited
      return updatedEmployees; // Return the updated employees list
    });
  };

  const handleDelete = (index) => {
    // Remove the selected employee from the list
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleAddEmployee = () => {
    // Generate unique code
    const uniqueCode = `${employeeName.slice(0, 2)}${employeePhone.slice(-4)}`;

    const employee = {
      type: employeeType,
      name: employeeName,
      phone: employeePhone,
      email: employeeEmail,
      password: employeePassword,
      Specialization: employeeType === "Doctor" ? specialization : "",
      uniqueCode: uniqueCode, // Assign unique code to employee
    };

    setEmployees([...employees, employee]);
    clearEmployeeFields();
  };

  const clearEmployeeFields = () => {
    setEmployeeType("");
    setEmployeeName("");
    setEmployeePhone("");
    setEmployeeEmail("");
    setEmployeePassword("");
    setSpecialization("");
  };

  const handleSave = async () => {
    setIsSaving(true); // Set isSaving to true when saving
    const clinicData = {
      name: clinicName,
      about: aboutClinic,
      address,
      phone: number,
      employees,
    };

    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage or context
      console.log({ token });
      if (!token) {
        throw new Error("Authentication token not found");
      }
      await createClinic(clinicData, token); // Call the API to create the clinic
      console.log("Clinic created successfully");
    } catch (error) {
      console.error("Error creating clinic:", error.message);
    } finally {
      setIsSaving(false); // Set isSaving to false after saving (whether successful or not)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="kbd-container mb-4">
        Press <kbd className="kbd kbd-sm">tab</kbd> to move to next field.
      </div>
      <div className="max-w-3xl w-full p-8 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Clinic Profile</h1>
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-xs">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M5 8v8a1 1 0 0 0 1 1h2v-4h4v4h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-3V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v2H6a1 1 0 0 0-1 1z" />
              </svg>

              <input
                type="text"
                id="clinicName"
                className="grow"
                placeholder="Clinic Name"
                value={clinicName}
                onChange={(e) => setClinicName(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-xs">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M5 8v8a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1z" />
              </svg>

              <input
                type="text"
                id="aboutClinic"
                className="grow"
                placeholder="About Clinic"
                value={aboutClinic}
                onChange={(e) => setAboutClinic(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-xs">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9 3a1 1 0 0 1 2 0v1h1a1 1 0 0 1 .993.883L13 5v10a2 2 0 0 1-2 2H9.5l-.354-.354a.5.5 0 0 0-.146-.146L8.5 17H7a2 2 0 0 1-2-2V5a1 1 0 0 1 1-1h1V3zm1-2a3 3 0 0 1 3 3v1H8V4a3 3 0 0 1 3-3zm-2 6v1h4V7H8zm0 2v1h4V9H8zm0 2v1h2v-1H8zm4 0h2v-1h-2v1zm0 2h2v-1h-2v1z"
                />
              </svg>

              <input
                type="text"
                id="address"
                className="grow"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="flex justify-center mb-4">
          <div className="w-full max-w-xs">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="w-4 h-4 opacity-70"
              >
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                type="text"
                id="number"
                className="grow"
                placeholder="Phone Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </label>
          </div>
        </div>
        <hr className="my-8" />
        <div>
          <h2 className="text-xl font-bold mb-4 text-center">Add Employee</h2>
          <div className="flex justify-center mb-4">
            <div className="w-full max-w-xs">
              <select
                id="employeeType"
                className="select select-primary w-full"
                value={employeeType}
                onChange={(e) => setEmployeeType(e.target.value)}
              >
                <option value="">Select Employee Type</option>
                <option value="Accountant">Accountant</option>
                <option value="Doctor">Doctor</option>
                <option value="Assistant">Assistant</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Name"
                  value={employeeName}
                  onChange={(e) => setEmployeeName(e.target.value)}
                />
              </label>
            </div>
            <div className="w-1/2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Phone Number"
                  value={employeePhone}
                  onChange={(e) => setEmployeePhone(e.target.value)}
                />
              </label>
            </div>
          </div>
          {employeeType === "Doctor" && (
            <div className="flex space-x-4 mb-4">
              <div className="w-full">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4 opacity-70"
                  >
                    <path
                      fillRule="evenodd"
                      d="M13.414 6l1.293-1.293a1 1 0 0 1 1.414 1.414L14.414 7l1.293 1.293a1 1 0 0 1-1.414 1.414L13.414 8l-1.293 1.293a1 1 0 0 1-1.414-1.414L12.414 6l-1.293-1.293a1 1 0 0 1 1.414-1.414L13.414 5l1.293-1.293a1 1 0 0 1 1.414 1.414L14.414 6zM5.586 14L4.293 15.293a1 1 0 0 1-1.414-1.414L5.586 14zM7 14.414l1.293 1.293a1 1 0 0 1-1.414 1.414L7 14.414zM5.293 5.293L6.707 6.707a1 1 0 0 1-1.414 1.414L5.293 5.293zM7 5.586L5.707 4.293a1 1 0 0 1 1.414-1.414L7 5.586zM9.586 15.293L11 13.879l1.414 1.414a1 1 0 1 1-1.414 1.414L9.586 15.293zM11 6.707L9.707 5.414a1 1 0 1 1 1.414-1.414L11 6.707zM15.293 14L14 15.293l-1.293-1.293a1 1 0 0 1 1.414-1.414L15.293 14zM11.707 15.293L13 14l1.293 1.293a1 1 0 0 1-1.414 1.414L11.707 15.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <input
                    type="text"
                    className="grow"
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                </label>
              </div>
            </div>
          )}
          <div className="flex space-x-4 mb-4">
            <div className="w-1/2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="Email"
                  value={employeeEmail}
                  onChange={(e) => setEmployeeEmail(e.target.value)}
                />
              </label>
            </div>
            <div className="w-1/2">
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Password"
                  value={employeePassword}
                  onChange={(e) => setEmployeePassword(e.target.value)}
                />
              </label>
            </div>
          </div>
          <button
            className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded"
            onClick={handleAddEmployee}
            disabled={
              !employeeType ||
              !employeeName ||
              !employeePhone ||
              !employeeEmail ||
              !employeePassword
            }
          >
            Add Employee
          </button>
        </div>
        <hr className="my-8" />
        <div>
          {employees.map((employee, index) => (
            <div
              key={index}
              className={`flex flex-col p-4 rounded-md shadow ${
                employee.type === "Doctor"
                  ? "bg-blue-100" // Blue background for Doctors
                  : employee.type === "Accountant"
                  ? "bg-green-100" // Green background for Accountants
                  : "bg-yellow-100" // Yellow background for Assistants
              }`}
            >
              <div className="flex justify-between">
                <p className="font-bold text-right">{employee.type}</p>{" "}
                {/* Display employee type on the top right */}
                <p className="font-bold">{employee.uniqueCode}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-semibold">{employee.name}</p>
                <p>{employee.phone}</p>
                <p>{employee.email}</p>
                {employee.type === "Doctor" && (
                  <p>Specialization: {employee.Specialization}</p>
                )}
                {/* Display unique code */}
              </div>
              <div className="flex gap-2 mt-2">
                {/* Edit button */}
                <button
                  className="bg-blue-500 text-white font-semibold py-1 px-2 rounded"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                {/* Delete button */}
                <button
                  className="bg-red-500 text-white font-semibold py-1 px-2 rounded"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-8" />
        <div className="flex justify-center">
          <button
            className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded"
            onClick={handleSave}
            disabled={
              !clinicName || !address || !number || employees.length === 0
            }
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
