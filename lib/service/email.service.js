import nodemailer from "nodemailer";

export const sendOTP = async (email, otp) => {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"IEC Esports" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Your Registration Verification Code",
      text: `Your verification code is ${otp}. It will expire in 10 minutes.`,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>IEC Esports Verification</h2>
          <p>Your verification code is:</p>
          <h1 style="color: #e11d48; letter-spacing: 5px;">${otp}</h1>
          <p>It will expire in 10 minutes. Do not share this code with anyone.</p>
        </div>
      `,
    });
  } else {
    // Development fallback if no SMTP credentials are provided
    console.log(`\n\n========================================`);
    console.log(`[DEVELOPMENT] Mock Email Sent`);
    console.log(`To: ${email}`);
    console.log(`OTP: ${otp}`);
    console.log(`========================================\n\n`);
  }
};
