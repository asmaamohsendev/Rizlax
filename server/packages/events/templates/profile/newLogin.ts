// generate a new login email template
export const newLoginTemplate = (userName: string, loginTime: string) => {
    return `
    <html>
        <body>
            <h1>New Login Detected</h1>
            <p>Dear ${userName},</p>
            <p>We detected a new login to your account on ${loginTime}. If this was you, you can ignore this message.</p>
            <p>If you did not log in, please secure your account immediately.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
