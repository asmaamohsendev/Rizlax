// generate a proposal viewed email template
export const proposalViewedTemplate = (userName: string, proposalTitle: string) => {
    return `
    <html>
        <body>
            <h1>Proposal Viewed</h1>
            <p>Dear ${userName},</p>
            <p>Your proposal for <strong>${proposalTitle}</strong> has been viewed.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
