export const welcomeEmailTemplate = (userName: string) => {
    return `
    <html>
        <body>
            <h1>Welcome to Our Service</h1>
            <p>Dear ${userName},</p>
            <p>Thank you for joining our service. We are excited to have you on board!</p>
            <p>If you have any questions, feel free to reach out to our support team.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
