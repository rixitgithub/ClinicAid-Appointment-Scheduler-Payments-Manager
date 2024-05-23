import express from "express";
import nodemailer from "nodemailer";
import Schedule from "../models/Schedule.js";
import Patient from "../models/Patient.js";
import Clinic from "../models/Clinic.js";
import Employee from "../models/Employee.js";
import { verifyToken } from "../middleware/auth.js";

// Define the function to send reminder emails for appointments scheduled on the same day
async function sendReminders() {
  try {
    // Get the current date
    const currentDate = new Date();
    // Set the time to midnight (00:00:00)
    currentDate.setHours(0, 0, 0, 0);
    console.log("Current Date:", currentDate);

    // Find schedules for the current day
    const schedules = await Schedule.find({
      date: {
        $gte: currentDate, // Find schedules on or after the current date
        $lt: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000), // Find schedules before the next day
      },
      status: "upcoming", // Only send reminders for upcoming appointments
    }).populate("patientId doctorId clinicId");

    console.log("Schedules for today:", schedules);

    // Iterate through each schedule and send reminder emails
    for (const schedule of schedules) {
      const { patientId, doctorId, clinicId, date, startTime, endTime } =
        schedule;

      // Fetch patient details
      const patient = await Patient.findById(patientId).populate("userId");
      if (!patient) continue;

      console.log("Patient:", patient);

      // Fetch doctor details
      const doctor = await Employee.findById(doctorId);
      if (!doctor) continue;

      console.log("Doctor:", doctor);

      // Fetch clinic details
      const clinic = await Clinic.findById(clinicId);
      if (!clinic) continue;

      console.log("Clinic:", clinic);

      // Extract email from the associated user
      const userEmail = patient.userId.email;
      console.log("User Email:", userEmail);

      // HTML content for the reminder email
      const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Appointment Reminder</title>
          <style>
              body {
                  font-family: 'Helvetica Neue', Arial, sans-serif;
                  background-color: #f0f4f8;
                  margin: 0;
                  padding: 0;
                  color: #333;
              }
              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              header {
                  background-color: #4a90e2;
                  color: #ffffff;
                  text-align: center;
                  padding: 20px;
                  border-bottom: 4px solid #357ab7;
              }
              header img {
                  width: 80px;
                  height: auto;
                  margin-bottom: 10px;
              }
              .content {
                  padding: 30px 20px;
                  text-align: center;
              }
              .content h1 {
                  color: #4a4a4a;
                  font-size: 24px;
                  margin-bottom: 10px;
              }
              .content p {
                  color: #666666;
                  line-height: 1.6;
                  font-size: 16px;
              }
              .content .details {
                  margin: 20px 0;
                  text-align: left;
                  background: #f9f9f9;
                  padding: 15px;
                  border-radius: 8px;
                  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
              }
              .content .details p {
                  margin: 8px 0;
              }
              .button {
                  display: inline-block;
                  background-color: #4a90e2;
                  color: #ffffff;
                  padding: 12px 25px;
                  text-decoration: none;
                  border-radius: 25px;
                  margin-top: 20px;
                  font-size: 16px;
              }
              .button:hover {
                  background-color: #357ab7;
              }
              .footer {
                  background-color: #4a90e2;
                  color: #ffffff;
                  text-align: center;
                  padding: 15px 0;
                  font-size: 14px;
                  border-top: 4px solid #357ab7;
              }
              .footer p {
                  margin: 5px 0;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <header>
                  <img src="https://drive.google.com/uc?export=view&id=1RZcWahXKiIpExX1pcK6GIyQC_2-ik39p" alt="Clinic Logo">
                  <h1>Appointment Reminder</h1>
              </header>
              <div class="content">
                  <h1>Hello, ${patient.name}</h1>
                  <p>This is a reminder for your upcoming appointment with Clinic Aid. Please see the details below:</p>
                  <div class="details">
                      <p><strong>Appointment Date:</strong> ${new Date(
                        schedule.date
                      ).toDateString()}</p>
                      <p><strong>Time:</strong> ${schedule.startTime} - ${
        schedule.endTime
      }</p>
                      <p><strong>Doctor:</strong> Dr. ${doctor.name}</p>
                      <p><strong>Clinic Location:</strong> ${clinic.address}</p>
                  </div>
                  <p>Please ensure you arrive on time for your appointment.</p>
              </div>
              <div class="footer">
                  <p>&copy; 2024 Clinic Aid. All rights reserved.</p>
                  <p>${clinic.name}</p>
                  <p>${clinic.address}</p>
              </div>
          </div>
      </body>
      </html>
      
        `;

      // Create a transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER, // Your Gmail email address
          pass: process.env.EMAIL_PASS, // Your Gmail password or App password
        },
      });

      // Setup email data with HTML content
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: userEmail, // Patient's email
        subject: "Appointment Reminder", // Subject line
        html: htmlContent, // HTML body
      };

      // Send mail with defined transport object
      await transporter.sendMail(mailOptions);
      console.log("Reminder email sent successfully for appointment on", date);
    }

    // Return a success message
    console.log("Reminder emails sent successfully");
  } catch (error) {
    // Log and handle errors
    console.error("Error sending reminder emails:", error);
  }
}

// Export the sendReminders function
export default sendReminders;
