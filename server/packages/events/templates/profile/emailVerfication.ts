// generate an email verification template
export const emailVerificationTemplate = (userName: string, OTP: string) => {
    return `
    <html>
        <body>
            <h1>Email Verification</h1>
            <p>Dear ${userName},</p>
            <p>Thank you for registering. Please verify your email by entering the OTP below:</p>
            <p><strong>${OTP}</strong></p>
            <br/>
            <p>If you did not register for this account, please ignore this email.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
