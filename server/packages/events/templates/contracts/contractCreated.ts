// generate a contract created email template
export const contractCreatedTemplate = (userName: string, contractTitle: string) => {
    return `
    <html>
        <body>
            <h1>Contract Created Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your contract for <strong>${contractTitle}</strong> has been created successfully.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
