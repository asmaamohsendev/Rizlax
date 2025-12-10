export const disputeOpenedTemplate = (disputeId: string, userName: string, reason: string, createdAt: string) => {
    return `
    <html>
        <body> 
            <h1>Dispute Opened</h1>
            <p>Dear ${userName},</p>
            <p>Your dispute with ID <strong>${disputeId}</strong> has been successfully opened.</p>
            <p><strong>Reason for Dispute:</strong> ${reason}</p>
            <p><strong>Date Opened:</strong> ${new Date(createdAt).toLocaleDateString()}</p>
            <p>Our team will review your dispute and get back to you shortly.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}