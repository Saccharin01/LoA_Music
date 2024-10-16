import nodemailer, { Transporter } from 'nodemailer';

export default async function MailNotification(requestCount: number): Promise<void> {
  const transporter: Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `요청 수 알림: ${requestCount}개의 요청이 있습니다.`,
    text: `현재 ${requestCount}개의 요청이 데이터베이스에 저장되어 있습니다.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully: ${requestCount}개의 요청 알림`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
