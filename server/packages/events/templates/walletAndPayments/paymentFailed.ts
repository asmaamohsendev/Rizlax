// generate a payment failed email template
export const paymentFailedTemplate = (userName: string, amount: number) => {
    return `
    <html>
        <body>
            <h1>Payment Failed</h1>
            <p>Dear ${userName},</p>
            <p>Your payment of <strong>$${amount}</strong> has failed. Please try again later.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
