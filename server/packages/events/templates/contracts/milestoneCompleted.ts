// generate a milestone completed email template
export const milestoneCompletedTemplate = (userName: string, milestoneTitle: string) => {
    return `
    <html>
        <body>
            <h1>Milestone Completed Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your milestone <strong>${milestoneTitle}</strong> has been completed successfully.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
