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
  const [editIndex, setEditIndex] = useState(null);
  const { createClinic } = useClinicAPI();

  const handleEdit = (index) => {
    const editedEmployee = employees[index];
    setEmployees((prev) => prev.filter((_, i) => i !== index));
    setEmployeeType(editedEmployee.type);
    setEmployeeName(editedEmployee.name);
    setEmployeePhone(editedEmployee.phone);
    setEmployeeEmail(editedEmployee.email);
    setEmployeePassword(editedEmployee.password);
    setSpecialization(
      editedEmployee.type === "Doctor" ? editedEmployee.Specialization || "" : ""
    );
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedEmployees = [...employees];
    updatedEmployees.splice(index, 1);
    setEmployees(updatedEmployees);
  };

  const handleAddEmployee = () => {
    const uniqueCode = `${employeeName.slice(0, 2)}${employeePhone.slice(-4)}`;

    const employee = {
      type: employeeType,
      name: employeeName,
      phone: employeePhone,
      email: employeeEmail,
      password: employeePassword,
      Specialization: employeeType === "Doctor" ? specialization : "",
      uniqueCode,
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
    setIsSaving(true);
    const clinicData = {
      name: clinicName,
      about: aboutClinic,
      address,
      phone: number,
      employees,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");
      await createClinic(clinicData, token);
      console.log("Clinic created successfully");
    } catch (error) {
      console.error("Error creating clinic:", error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="p-6 ">
      <div className="bg-blue-100 border border-gray-300 p-6 rounded-lg max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Clinic Profile</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Clinic Name</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded-lg border-gray-300 focus:outline-none"
            value={clinicName}
            onChange={(e) => setClinicName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">About Clinic</label>
          <textarea
            rows="3"
            className="mt-1 block w-full p-2 border rounded-lg border-gray-300 focus:outline-none"
            value={aboutClinic}
            onChange={(e) => setAboutClinic(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded-lg border-gray-300 focus:outline-none"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            className="mt-1 block w-full p-2 border rounded-lg border-gray-300 focus:outline-none"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        {/* Employees Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Add Employees</h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <select
              className="p-2 border border-gray-300 rounded-lg"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Doctor">Doctor</option>
              <option value="Receptionist">Receptionist</option>
            </select>

            <input
              type="text"
              placeholder="Full Name"
              className="p-2 border border-gray-300 rounded-lg"
              value={employeeName}
              onChange={(e) => setEmployeeName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Phone"
              className="p-2 border border-gray-300 rounded-lg"
              value={employeePhone}
              onChange={(e) => setEmployeePhone(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              className="p-2 border border-gray-300 rounded-lg"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="p-2 border border-gray-300 rounded-lg"
              value={employeePassword}
              onChange={(e) => setEmployeePassword(e.target.value)}
            />

            {employeeType === "Doctor" && (
              <input
                type="text"
                placeholder="Specialization"
                className="p-2 border border-gray-300 rounded-lg"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            )}
          </div>

          <button
            onClick={handleAddEmployee}
            className="mt-4 bg-green-300 text-white px-6 py-2 rounded-full"
          >
            Add Employee
          </button>

          <div className="mt-6">
            {employees.map((emp, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded-md mt-2 bg-white"
              >
                <div>
                  <p className="text-gray-800 font-medium">{emp.name} ({emp.type})</p>
                  <p className="text-gray-500 text-sm">{emp.phone} | {emp.email}</p>
                  {emp.Specialization && (
                    <p className="text-gray-500 text-sm">Specialization: {emp.Specialization}</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-blue-500 text-white px-8 py-3 rounded-full hover:bg-blue-600 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Clinic Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;