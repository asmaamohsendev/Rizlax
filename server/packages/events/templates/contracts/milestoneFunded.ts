// generate a milestone funded email template
export const milestoneFundedTemplate = (userName: string, milestoneTitle: string) => {
    return `
    <html>
        <body>
            <h1>Milestone Funded Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your milestone <strong>${milestoneTitle}</strong> has been funded successfully.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
