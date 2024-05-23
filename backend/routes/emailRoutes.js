import express from "express";
import nodemailer from "nodemailer";
import Employee from "../models/Employee.js";
import Patient from "../models/Patient.js";
import Clinic from "../models/Clinic.js";
import { verifyToken } from "../middleware/auth.js";
import User from "../models/User.js";

const router = express.Router();

router.post("/confirm", verifyToken, async (req, res) => {
  const { to, scheduleData } = req.body;

  try {
    // Find the patient details based on the provided ID
    const patient = await Patient.findById(to).populate("userId");

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Extract email from the associated user
    const userEmail = patient.userId.email;

    // Fetch clinic details
    const clinic = await Clinic.findById(scheduleData.clinicId);
    if (!clinic) {
      return res.status(404).json({ error: "Clinic not found" });
    }

    // Fetch doctor details
    const doctor = await Employee.findById(scheduleData.doctorId);
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // HTML content for the email
    const htmlContent = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Appointment Confirmation</title>
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
            <h1>Appointment Confirmation</h1>
        </header>
        <div class="content">
            <h1>Hello, ${patient.name}</h1>
            <p>Thank you for scheduling an appointment with Clinic Aid. We are pleased to confirm your appointment as per the details below:</p>
            <div class="details">
                <p><strong>Appointment Date:</strong> ${scheduleData.date}</p>
                <p><strong>Time:</strong> ${scheduleData.startTime} - ${scheduleData.endTime}</p>
                <p><strong>Doctor:</strong> Dr. ${doctor.name}</p>
                <p><strong>Clinic Location:</strong> ${clinic.address}</p>
            </div>
            <a href="http://localhost:3001/appointments" class="button">View Appointment</a>
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
      subject: "Appointment Confirmation", // Subject line
      html: htmlContent, // HTML body
    };

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

export default router;
