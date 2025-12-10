// generate a funds added to wallet email template
export const fundsAddedToWalletTemplate = (userName: string, amount: number) => {
    return `
    <html>
        <body>
            <h1>Funds Added to Your Wallet</h1>
            <p>Dear ${userName},</p>
            <p>An amount of <strong>$${amount}</strong> has been successfully added to your wallet.</p>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
