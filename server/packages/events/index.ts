import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import logger from '@rizlax/logs';
import { DomainError } from '@rizlax/common-middleware';
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendEmail = async (to: string, subject: string, text: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${to}`);
  } catch (error) {
    logger.error(`Error sending email to ${to}:`, error);
    throw new DomainError('Failed to send email', 'EMAIL_SENDING_ERROR', 500);
  }
}