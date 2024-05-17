const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clinicSchema = new Schema({
  name: String,
  about: String,
  address: String,
  phoneNumber: String,
  employees: [{ type: Schema.Types.ObjectId, ref: "Employee" }],
});

const Clinic = mongoose.model("Clinic", clinicSchema);

module.exports = Clinic;
