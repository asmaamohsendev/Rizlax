// generate a dispute lost email template with the reason for the loss
export const disputeLoseTemplate = (userName: string, reason: string) => {
    return `
    <html>
        <body>
            <h1>Dispute Lost</h1>
            <p>Dear ${userName},</p>
            <p>We regret to inform you that your dispute has been resolved against you for the following reason:</p>
            <p><strong>${reason}</strong></p>
            <br/>
            <p>If you have any questions or need further assistance, please contact our support team.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}