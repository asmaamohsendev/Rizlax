// generate a security alert email template
export const securityAlertTemplate = (userName: string, alertDetails: string) => {
    return `
    <html>
        <body>
            <h1>Security Alert</h1>
            <p>Dear ${userName},</p>
            <p>We have detected a security issue with your account:</p>
            <blockquote>
                <p>${alertDetails}</p>
            </blockquote>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
