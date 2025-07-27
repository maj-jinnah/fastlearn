'use server';

import { formatAmountForStripe } from '@/lib/stripe-helpers';
import { headers } from 'next/headers';
import { stripe } from '../../lib/stripe';

const CURRENCY = 'bdt';

export async function createCheckoutSession(data) {
    const ui_mode = 'hosted';
    const origin = headers().get('origin');

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: 'payment',
        submit_type: 'auto',
        line_items: [
            {
                quantity: 1,
                price_data: {
                    currency: CURRENCY,
                    product_data: {
                        name: data?.name || 'How to be a successful developer',
                        description: data?.description || 'A comprehensive guide to becoming a successful developer.',
                        // images: [data.image] ,
                    },
                    // unit_amount: formatAmountForStripe(data?.amount, CURRENCY),
                    unit_amount: formatAmountForStripe(1000, CURRENCY),
                }
            },
        ],
        ...(ui_mode === 'hosted' && {
            success_url: `${origin}/enroll-success?session_id={CHECKOUT_SESSION_ID}&courseId=123`,
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
        // amount: formatAmountForStripe(data?.amount, CURRENCY),
        amount: formatAmountForStripe(1000, CURRENCY),
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