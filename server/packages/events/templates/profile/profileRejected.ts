// generate a profile rejected email template
export const profileRejectedTemplate = (userName: string, reason: string) => {
    return `
    <html>
        <body>
            <h1>Profile Rejected</h1>
            <p>Dear ${userName},</p>
            <p>Your profile has been rejected for the following reason:</p>
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
