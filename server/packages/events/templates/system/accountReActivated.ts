// generate an account reactivated email template
export const accountReActivatedTemplate = (userName: string) => {
    return `
    <html>
        <body>
            <h1>Account Reactivated</h1>
            <p>Dear ${userName},</p>
            <p>Your account has been reactivated successfully.</p>
            <br/>
            <p>If you have any questions or need further assistance, please contact our support team.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
