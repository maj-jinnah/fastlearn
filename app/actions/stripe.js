'use server';

import { formatAmountForStripe } from '@/lib/stripe-helpers';
import { headers } from 'next/headers';
import { stripe } from '../../lib/stripe';
import { getCourseDetailsById } from '@/queries/courses';
import { dbConnection } from '@/service/dbConnection';

const CURRENCY = 'bdt';

export async function createCheckoutSession(data) {
    await dbConnection();

    const ui_mode = 'hosted';
    const headersList = await headers();
    const origin = headersList.get('origin');

    const course = await getCourseDetailsById(data.get('courseId'));
    if(!course) {
        return new Error('Course not found');
    }
    const {price, title, description} = course;

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'auto',
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: CURRENCY,
                    product_data: {
                        name: title,
                        description: description,
                        // images: [data.image] ,
                    },
                    unit_amount: formatAmountForStripe(price, CURRENCY),

                }
            },
        ],
        ...(ui_mode === 'hosted' && {
            success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=${data.get('courseId')}`,
            cancel_url: `${origin}/courses`,
        }),
        ui_mode,
    });

    return {
        client_secret: checkoutSession.client_secret,
        url: checkoutSession.url,
    }
}

export async function createPaymentIntent(data) {
    await dbConnection();
    const origin = headers().get('origin');

    const paymentIntent = await stripe.paymentIntents.create({
        amount: formatAmountForStripe(data?.coursePrice, CURRENCY),
        currency: CURRENCY,
        automatic_payment_methods: {
            enabled: true,
        }
        // metadata: {
        //     courseId: data?.courseId || '123',
        //     userId: data?.userId || 'user_123',
        // },
        // description: data?.description || 'Payment for course enrollment',
    });

    return {
        client_secret: paymentIntent.client_secret,
        // url: `${origin}/payment-success?payment_intent=${paymentIntent.id}`,
    }
}