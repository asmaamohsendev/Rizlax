// generate a new feature email template
export const newFeatureTemplate = (userName: string, featureDetails: string) => {
    return `
    <html>
        <body>
            <h1>New Feature Available</h1>
            <p>Dear ${userName},</p>
            <p>We are excited to announce a new feature:</p>
            <blockquote>
                <p>${featureDetails}</p>
            </blockquote>
            <br/>
            <p>Best regards,</p>
            <p>The Support Team</p>
        </body>
    </html>
    `;
}
