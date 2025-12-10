// generate a dispute win email template
export const disputeWinTemplate = (userName: string, amount: number) => {
    return `
    <html>
        <body>
            <h1>Dispute Won</h1>
            <p>Dear ${userName},</p>
            <p>Your dispute for the amount of <strong>$${amount}</strong> has been resolved in your favor.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
