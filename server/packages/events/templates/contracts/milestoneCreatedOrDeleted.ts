// generate a milestone created email template
export const milestoneCreatedTemplate = (userName: string, milestoneTitle: string) => {
    return `
    <html>
        <body>
            <h1>Milestone Created Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your milestone <strong>${milestoneTitle}</strong> has been created successfully.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}

// generate a milestone Updated email template
export const milestoneUpdatedTemplate = (userName: string, milestoneTitle: string) => {
    return `
    <html>
        <body>
            <h1>Milestone Updated Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your milestone <strong>${milestoneTitle}</strong> has been updated successfully.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
