import EmailTemplate from '@/components/email-template';
import { Resend } from 'resend';


const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmails(emailInfo) {
    if (!emailInfo) return null;

    const response = Promise.allSettled(
        emailInfo.map(async (info) => {

            const { to, subject } = info;
            
            if (to && subject) {
                const sendInfo = await resend.emails.send({
                    from: 'maj.jinnah1999@gmail.com',
                    to: to,
                    subject: subject,
                    react: EmailTemplate(info),
                })
                return sendInfo;
            } else {
                const rejectedPromise = Promise.reject(new Error('Email information is required'));
                return rejectedPromise;
            }
        })
    )

    return response;
}