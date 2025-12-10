// generate a milestone revision request email template
export const milestoneRevisionReqTemplate = (userName: string, milestoneTitle: string) => {
    return `
    <html>
        <body>
            <h1>Milestone Revision Requested</h1>
            <p>Dear ${userName},</p>
            <p>A revision has been requested for your milestone <strong>${milestoneTitle}</strong>.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
