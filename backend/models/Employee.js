const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  type: String,
  name: String,
  phone: String,
  email: String,
  password: String,
  specialization: { type: String, default: "" },
  uniqueCode: String,
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
