const User = require('../../models/Student/User');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

exports.signIn = async (req, res) => {
  console.log(req.body); // Debugging: Log the request body
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

  res.status(200).json({ message: 'Sign-in successful' });
};

exports.saveSignIn = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  user.lastSignIn = new Date();
  await user.save();
  res.status(200).json({ message: 'Sign-in data saved' });
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email' });

  const otp = crypto.randomInt(100000, 999999).toString();
  user.otp = otp;
  user.otpExpires = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
  await user.save();

  // Send OTP via email
  const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'Shathisalahakoon@gmail.com', pass: 'rixr vjli epxa ggka' } });
  await transporter.sendMail({
    from: 'gamagerecruiters@gmail.com',
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
  });

  res.status(200).json({ message: 'OTP sent to email' });
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email, otp, otpExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Invalid or expired OTP' });

  res.status(200).json({ message: 'OTP verified' });
};

exports.resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'Invalid email' });
  user.password = newPassword;
  user.otp = null;
  user.otpExpires = null;
  await user.save();

  res.status(200).json({ message: 'Password reset successful' });
};

exports.checkUserExists = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.status(200).json({ message: 'User exists' });
};

