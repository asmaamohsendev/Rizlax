// generate a job published email template
export const jobPublishedTemplate = (userName: string, jobTitle: string) => {
    return `
    <html>
        <body>
            <h1>Job Published Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your job listing for <strong>${jobTitle}</strong> has been published successfully.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
