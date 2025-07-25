const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "manthanp1739@gmail.com",
        pass: "nkrw ykle ueah yzpm",
    },
});

const sendForgetPasswordEmail = async (email, id, otp) => {
    const link = `http://localhost:5173/resetpassword/${id}`;
    const htmlContent = `
    <h3>Password Reset</h3>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>Click the link below to reset your password:</p>
    <a href="${link}">${link}</a>
  `;

    await transporter.sendMail({
        from: `"Reset password" <manthanp1739@gmail.com>`,
        to: email,
        subject: "Reset Your Password",
        html: htmlContent,
    });
};


module.exports = sendForgetPasswordEmail;
