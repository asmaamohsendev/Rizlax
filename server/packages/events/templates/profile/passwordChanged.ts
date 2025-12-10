// generate a password changed email template
export const passwordChangedTemplate = (userName: string) => {
    return `
    <html>
        <body>
            <h1>Password Changed Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your password has been changed successfully. If you did not make this change, please contact our support team immediately.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
