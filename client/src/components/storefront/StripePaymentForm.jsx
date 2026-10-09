import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const StripePaymentForm = ({ total, onPaymentSuccess, onBack }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      // 1. Create PaymentIntent on the backend
      const res = await fetch('http://localhost:5000/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total })
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to initialize payment');
      }

      // If mock mode (no real Stripe keys on backend), simulate success
      if (data.mock) {
        setProcessing(false);
        onPaymentSuccess();
        return;
      }

      // 2. Confirm the payment with Stripe
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          }
        }
      );

      if (stripeError) {
        setError(stripeError.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        onPaymentSuccess();
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'An error occurred during payment');
    }

    setProcessing(false);
  };

  const CARD_OPTIONS = {
    iconStyle: 'solid',
    style: {
      base: {
        iconColor: '#374151',
        color: '#111827',
        fontWeight: 500,
        fontFamily: 'Inter, sans-serif',
        fontSize: '15px',
        fontSmoothing: 'antialiased',
        ':-webkit-autofill': { color: '#fce883' },
        '::placeholder': { color: '#9ca3af' },
      },
      invalid: {
        iconColor: '#ef4444',
        color: '#ef4444',
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: 8 }}>Payment</h3>
      <p style={{ color: 'var(--brand-muted)', fontSize: 13, marginBottom: 16 }}>🔒 Secure Stripe Payment</p>
      
      <div style={{ padding: '12px 14px', border: '1px solid var(--brand-border)', borderRadius: 4, marginBottom: 16, backgroundColor: '#fff' }}>
        <CardElement options={CARD_OPTIONS} />
      </div>

      {error && <div style={{ color: '#ef4444', fontSize: 13, marginBottom: 16 }}>{error}</div>}

      <div style={{ display: 'flex', gap: 12 }}>
        <button 
          type="button" 
          onClick={onBack}
          style={{ flex: 1, padding: '12px', background: '#fff', border: '1px solid var(--brand-border)', borderRadius: 4, cursor: 'pointer', fontWeight: 500 }}>
          Back
        </button>
        <button 
          type="submit" 
          disabled={!stripe || processing} 
          className="btn-primary"
          style={{ flex: 2, padding: '12px', background: 'var(--brand-dark)', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', fontWeight: 500 }}>
          {processing ? 'Processing…' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

export default StripePaymentForm;
