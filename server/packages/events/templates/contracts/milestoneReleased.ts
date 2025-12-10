// generate a milestone released email template
export const milestoneReleasedTemplate = (userName: string, milestoneTitle: string) => {
    return `
    <html>
        <body>
            <h1>Milestone Released Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your milestone <strong>${milestoneTitle}</strong> has been released successfully.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
