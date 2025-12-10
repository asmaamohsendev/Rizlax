// generate a profile approved email template
export const profileApprovedTemplate = (userName: string) => {
    return `
    <html>
        <body>
            <h1>Profile Approved</h1>
            <p>Dear ${userName},</p>
            <p>Your profile has been approved successfully. You can now access all the features of our service.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
