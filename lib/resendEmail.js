import EmailTemplate from '@/components/email-template';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmails(emailInfo) {
    if (!emailInfo) return null;

    const response = Promise.allSettled(
        emailInfo.map(async (info) => {

            const { to, subject, courseName, name, message } = info;

            if (to && subject) {
                const sendInfo = await resend.emails.send({
                    from: 'FastLearn <onboarding@resend.dev>',
                    to: to,
                    subject: subject,
                    react: EmailTemplate(info),
                })
                return sendInfo;
            } else {
                new Promise((resolve, reject) => {
                    return reject(new Error('Email information is required'));
                });
            }
        })
    )

    return response;
}