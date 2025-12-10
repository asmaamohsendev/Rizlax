// generate a proposal rejected email template
export const proposalRejectedTemplate = (userName: string, proposalTitle: string, reason: string) => {
    return `
    <html>
        <body>
            <h1>Proposal Rejected</h1>
            <p>Dear ${userName},</p>
            <p>We regret to inform you that your proposal for <strong>${proposalTitle}</strong> has been rejected for the following reason:</p>
            <p><strong>${reason}</strong></p>
            <br/>
            <p>If you have any questions, please feel free to reach out to our support team.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
