// generate a withdraw submitted email template
export const withdrawSubmittedTemplate = (userName: string, amount: number) => {
    return `
    <html>
        <body>
            <h1>Withdraw Submitted Successfully</h1>
            <p>Dear ${userName},</p>
            <p>Your withdraw request of <strong>$${amount}</strong> has been submitted successfully.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
