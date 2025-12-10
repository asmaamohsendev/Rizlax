// generate a received a message email template
export const receivedAMessageTemplate = (userName: string, message: string) => {
    return `
    <html>
        <body>
            <h1>New Message Received</h1>
            <p>Dear ${userName},</p>
            <p>You have received a new message:</p>
            <blockquote>
                <p>${message}</p>
            </blockquote>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
