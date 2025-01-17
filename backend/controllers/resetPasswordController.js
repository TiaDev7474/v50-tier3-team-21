const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/jwt");
const { sendEmail } = require("../middlewares/mail");

// Send password reset email with token
const sendPasswordResetEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    const token = generateToken(
      { id: user.id },
      process.env.JWT_RESET_SECRET,
      process.env.JWT_RESET_EXPIRES_IN,
    );

    // send email
    const address = email;
    const link = `${process.env.BACKEND_URL}/api/resetpassword/reset-link/${token}`;

    // TODO: sendEmail(address, link, subject, html)
    const subject = 'Password Reset';
    const html = `The link will expire in 15 minutes.<br/><a href="${link}">Click here</a> to reset your password.`
    sendEmail(address, subject, html);

    // send response
    return res.status(200).json({
      status: "success",
      message: "Password reset email sent",
      link: `${process.env.BACKEND_URL}/api/resetpassword/reset-link/${token}`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: "fail", message: "Failed to send password reset email" });
  }
};

const authorizeResetToken = async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res
      .status(400)
      .json({ status: "fail", message: "Token must be provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }
    res.cookie("token", token, { httpOnly: true, sameSite: "strict" });
    // redirect to reset password page
    console.log(
      `Page is redirected to ${process.env.FRONTEND_URL}/auth/change-password`,
    );
    return res.redirect(`${process.env.FRONTEND_URL}/auth/change-password`);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid or expired token" });
    }
    console.error(error);
    return res
      .status(500)
      .json({ status: "fail", message: "Failed to authorize token" });
  }
};
// Reset password with token
const resetPassword = async (req, res) => {
  const { password, confirmPassword } = req.body;

  const token = req.cookies.token;
  if (!token) {
    return res
      .status(400)
      .json({ status: "fail", message: "Token must be provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ status: "fail", message: "User not found" });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ status: "fail", message: "Passwords do not match" });
    }

    user.password = password;
    user.confirmPassword = confirmPassword;
    await user.save();

    // delete the reset cookie after successful password change
    res.clearCookie("token");
    return res
      .status(200)
      .json({ status: "success", message: "Password reset successfully" });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid or expired token" });
    }
    console.error(error);
    return res
      .status(500)
      .json({ status: "fail", message: "Failed to reset password" });
  }
};

module.exports = { sendPasswordResetEmail, resetPassword, authorizeResetToken };
