// generate an account disabled email template
export const accountDisabledTemplate = (userName: string, reason: string) => {
    return `
    <html>
        <body>
            <h1>Account Disabled</h1>
            <p>Dear ${userName},</p>
            <p>Your account has been disabled for the following reason:</p>
            <p><strong>${reason}</strong></p>
            <br/>
            <p>If you believe this is a mistake, please contact our support team.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
    