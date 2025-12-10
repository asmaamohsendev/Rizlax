// generate a withdraw approved and released email template
export const withdrawApprovedAndReleasedTemplate = (userName: string, amount: number) => {
    return `
    <html>
        <body>
            <h1>Withdraw Approved and Released</h1>
            <p>Dear ${userName},</p>
            <p>Your withdraw request of <strong>$${amount}</strong> has been approved and the funds have been released.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
