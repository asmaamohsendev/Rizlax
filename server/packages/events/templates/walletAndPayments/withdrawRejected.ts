// generate a withdraw rejected email template
export const withdrawRejectedTemplate = (userName: string, amount: number) => {
    return `
    <html>
        <body>
            <h1>Withdraw Rejected</h1>
            <p>Dear ${userName},</p>
            <p>Your withdraw request of <strong>$${amount}</strong> has been rejected.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
