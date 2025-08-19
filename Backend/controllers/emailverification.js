const nodemailer = require("nodemailer")
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "manthanp1739@gmail.com",
        pass: "nkrw ykle ueah yzpm",
    },
});
const sendVerificationEmail = async (email, id, otp) => {
    const link = `http://localhost:5173/verify/${id}`;

    const htmlContent = `
        <h3>Email Verification</h3>
        <p>Click the link below to verify your email by entering OTP:</p>
        <h1>OTP:- ${otp}</h1>
        <a href="${link}">${link}</a>
    `;

    await transporter.sendMail({
        from: '"Verify Email" <manthanp1739@gmail.com>',
        to: email,
        subject: "Verify your email",
        html: htmlContent,
    });
};

module.exports = sendVerificationEmail;