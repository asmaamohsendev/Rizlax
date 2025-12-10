// generate a job applied email template
export const jobAppliedTemplate = (userName: string, jobTitle: string) => {
    return `
    <html>
        <body>
            <h1>Job Application Received</h1>
            <p>Dear ${userName},</p>
            <p>We have received your application for the position of <strong>${jobTitle}</strong>.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
