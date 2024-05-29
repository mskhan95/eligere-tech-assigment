const express = require("express");
const User = require("../Model/user");
const Otp = require("../Model/otp");
const nodemailer = require("nodemailer");
require("dotenv").config();

const route = express.Router();

async function Sendmail({ Register, email, otp }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.email",
    port: 587,
    secure: false,
    auth: {
      user: process.env.USER,
      pass: process.env.APP_PASSWORD,
    },
  });

  if (Register) {
    return await transporter.sendMail({
      from: `Mohd Shaban Khan ${process.env.USER}`, // sender address
      to: `${email}`, // list of receivers
      subject: "Registration Successful - Welcome to Our Service!", // Subject line
      text: `Dear User,
  
    Thank you for registering with us. We're excited to have you on board!
  
    If you have any questions or need assistance, please don't hesitate to contact us.
  
    Best regards,
    Shaban Khan`,
      html: `<p>Dear User,</p>
             <p>Thank you for registering with us. We're excited to have you on board!</p>
             <p>If you have any questions or need assistance, please don't hesitate to <a href="mailto:shabhankhan123456@gmail.com">contact us</a>.</p>
             <p>Best regards,<br>Shaban Khan</p>`,
    });
  } else if (Register == false) {
    return await transporter.sendMail({
      from: `Mohd Shaban Khan ${process.env.USER}`, // sender address
      to: `${email}`, // list of receivers
      subject: "Your One-Time Password (OTP) for Verification", // Subject line
      text: `Dear User,
    
    Your One-Time Password (OTP) for verification is: ${otp}
    
    Please use this OTP to complete your verification process. This OTP is valid for the next 10 minutes.
    
    If you did not request this, please ignore this email or contact our support team.
    
    Best regards,
    Shaban Khan`, // plain text body
      html: `<p>Dear User,</p>
             <p>Your One-Time Password (OTP) for verification is: <strong>${otp}</strong></p>
             <p>Please use this OTP to complete your verification process. This OTP is valid for the next 10 minutes.</p>
             <p>If you did not request this, please ignore this email or <a href="mailto:shabhankhan123456@gmail.com">contact our support team</a>.</p>
             <p>Best regards,<br>Shaban Khan</p>`, // html body
    });
  }
}

// to POST new Data
route.post("/create", async (req, res) => {
  const data = req.body;
  const { fname, email, phone, eventSession } = data;
  if (!fname || !email || !phone || !eventSession) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    await Sendmail({ Register: true, email });
    const userData = new User(data);
    let info = await userData.save();
    res.status(201).json({ message: info });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

// for send otp
route.post("/otp", async (req, res) => {
  let { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ error: "Email not found" });
    }
    let otp = Math.floor(1000 + Math.random() * 9000);
    await Sendmail({ Register: false, email, otp });
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    return res.status(500).send({ "Error sending OTP:": err });
  }
});

module.exports = route;
