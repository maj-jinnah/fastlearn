'use server';

import { formatAmountForStripe } from '@/lib/stripe-helpers';
import { headers } from 'next/headers';
import { stripe } from '../../lib/stripe';

const CURRENCY = 'bdt';

export async function createCheckoutSession(data) {
    const ui_mode = 'hosted';
    const headersList = await headers();
    const origin = headersList.get('origin');

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'auto',
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: CURRENCY,
                    product_data: {
                        name: data.get('courseTitle'),
                        description: data.get('description'),
                        // images: [data.image] ,
                    },
                    unit_amount: formatAmountForStripe(data.get('coursePrice'), CURRENCY),

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