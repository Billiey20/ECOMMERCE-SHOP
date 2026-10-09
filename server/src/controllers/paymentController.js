const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_mock');

exports.createPaymentIntent = async (req, res) => {
    try {
        const { amount } = req.body;
        
        // Mock success if no real key is provided
        if (!process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY === 'sk_test_mock') {
            return res.status(200).json({ 
                success: true, 
                clientSecret: 'pi_mock_secret_12345',
                mock: true
            });
        }

        // Stripe expects amount in smallest currency unit (e.g. cents)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: 'usd',
            automatic_payment_methods: { enabled: true }
        });

        res.status(200).json({
            success: true,
            clientSecret: paymentIntent.client_secret
        });
    } catch (err) {
        console.error('Error creating payment intent:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
};
