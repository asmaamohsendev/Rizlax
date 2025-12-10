// generate a proposal accepted email template
export const proposalAcceptedTemplate = (userName: string, proposalTitle: string) => {
    return `
    <html>
        <body>
            <h1>Proposal Accepted</h1>
            <p>Dear ${userName},</p>
            <p>Congratulations! Your proposal for <strong>${proposalTitle}</strong> has been accepted.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
