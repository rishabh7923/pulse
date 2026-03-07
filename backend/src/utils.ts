import nodemailer from 'nodemailer'

export const generateOTP = (digits: number = 6): number => {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;

    return Math.floor(min + Math.random() * (max - min + 1));
}

export const sendOTPMail = async (email: string, otp: number): Promise<boolean> => {
    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST!,
        port: parseInt(process.env.MAIL_PORT!),
        auth: {
            user: process.env.MAIL_USER!,
            pass: process.env.MAIL_PASS!
        }
    })

    const emailReponse = await transporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: "Your OTP Code",
        html: 
        `
            <h2>Email Verification</h2>
            <p>Your OTP code is <b>${otp}</b></p>
            <p>This code will expire in 3 minutes</p>
        `
    })

    return emailReponse.accepted.length > 0;
}