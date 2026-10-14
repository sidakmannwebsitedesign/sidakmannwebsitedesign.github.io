import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { EMAIL, PHONE, PHONE_HREF } from '../contact';

// This site is static, so payments borrow Strygonia's API and the shared Stripe
// account. The server owns the real price; this one is for display only.
const PAYMENT_API = import.meta.env.VITE_PAYMENT_API || 'https://www.strygonia.com/api/sidakswebsites-payment-intent';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51ToDLWH5ZSFGFvWtkV8bRKm9TznrG7zoi8o0W3oftjv1OLSs0vYEgKue2WTBffLhhwmjFTgUHXUrdLZmuIBFb9Iy00OLBz8jEQ';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PRICE = 799;

const ELEMENTS_OPTIONS = {
  fonts: [{ cssSrc: 'https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700&display=swap' }],
  appearance: {
    theme: 'stripe',
    variables: {
      colorPrimary: '#16191E',
      colorText: '#16191E',
      colorBackground: '#F4F5F7',
      colorDanger: '#B3310B',
      borderRadius: '10px',
      fontFamily: 'Archivo, -apple-system, sans-serif',
    },
  },
};

export default function Checkout() {
  const [params] = useSearchParams();
  const [step, setStep] = useState('details');
  const [details, setDetails] = useState({});
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  // Stripe sends the buyer back here with ?redirect_status=… after paying.
  const result = params.get('redirect_status');
  const paid = result === 'succeeded' || result === 'processing';

  async function startPayment(event) {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    setDetails(form);
    setStep('pay');
    setClientSecret('');
    setError('');
    try {
      const response = await fetch(PAYMENT_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, business: form.business }),
      });
      const data = await response.json();
      if (data.clientSecret) setClientSecret(data.clientSecret);
      else setError(data.error || 'Checkout could not start.');
    } catch {
      setError(`The payment server could not be reached. Try again in a minute, or email ${EMAIL}.`);
    }
  }

  return (
    <section className="checkout">
      <div className="wrap checkout__inner">
        <motion.div
          className="checkout__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Get your site</span>
          <h1 className="section-title">
            See your site <span className="metal">before you pay a cent.</span>
          </h1>
          <p className="checkout__lead">
            I build you a free demo of your site first. Ask for as many tweaks, nitpicks, and
            full redesigns as you want. When you love it, pay one flat ${PRICE} and it goes live.
            Nothing monthly from me.
          </p>
          <ol className="checkout__next">
            <li>Tell me about your business.</li>
            <li>I build a free demo of your site.</li>
            <li>You ask for unlimited tweaks, nitpicks, and redesigns.</li>
            <li>Love it? Pay ${PRICE} here and your site goes live.</li>
          </ol>
          <div className="checkout__cta">
            <Link to="/contact" className="btn btn--primary">Request your free demo</Link>
            <p>
              Or reach me directly at <a href={`mailto:${EMAIL}`}>{EMAIL}</a> or{' '}
              <a href={PHONE_HREF}>{PHONE}</a>.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="contact-form checkout__panel"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {paid ? (
            <div className="checkout__done">
              <span className="checkout__step">Payment {result === 'succeeded' ? 'received' : 'processing'}</span>
              <h2>Thanks, your site is on its way live.</h2>
              <p>
                {result === 'succeeded'
                  ? 'Your receipt is on its way to your email. '
                  : 'Your bank is still confirming the payment. Stripe will email your receipt once it clears. '}
                I'll connect your domain and hosting and let you know the moment it's up.
              </p>
              <Link to="/" className="btn btn--ghost">Back to home</Link>
            </div>
          ) : step === 'details' ? (
            <form onSubmit={startPayment} className="checkout__form">
              <div>
                <h2 className="checkout__title">Approved your demo?</h2>
                <p className="checkout__sub">Pay once, and your site goes live.</p>
              </div>
              <span className="checkout__step">Step 1 of 2: your details</span>
              {result && (
                <p className="contact-form__error">That payment didn't go through. Try again with another card.</p>
              )}
              <label className="contact-form__field">
                <span>Name</span>
                <input type="text" name="name" autoComplete="name" required defaultValue={details.name} />
              </label>
              <label className="contact-form__field">
                <span>Email</span>
                <input type="email" name="email" autoComplete="email" required defaultValue={details.email} />
              </label>
              <label className="contact-form__field">
                <span>Business <em>(optional)</em></span>
                <input type="text" name="business" autoComplete="organization" defaultValue={details.business} />
              </label>
              <button type="submit" className="btn btn--primary btn--large btn--full">Continue to payment</button>
            </form>
          ) : (
            <div className="checkout__form">
              <span className="checkout__step">Step 2 of 2: payment</span>
              <div className="checkout__summary">
                <span>
                  <strong>Website build</strong> for {details.business || details.name}
                  <br />{details.email}
                </span>
                <button type="button" className="checkout__edit" onClick={() => setStep('details')}>Edit</button>
              </div>
              {error ? (
                <p className="contact-form__error">{error}</p>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ ...ELEMENTS_OPTIONS, clientSecret }}>
                  <PayForm />
                </Elements>
              ) : (
                <p className="checkout__loading">Loading the secure payment form…</p>
              )}
            </div>
          )}
          {!paid && <p className="checkout__secure">One payment of ${PRICE} USD, processed securely by Stripe.</p>}
        </motion.div>
      </div>
    </section>
  );
}

function PayForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState('');

  async function pay(event) {
    event.preventDefault();
    if (!stripe || !elements) return;
    setPaying(true);
    setMessage('');
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: `${window.location.origin}/start` },
    });
    // confirmPayment only returns on failure; success redirects to return_url.
    setMessage(error.message || 'Payment failed. Try again.');
    setPaying(false);
  }

  return (
    <form onSubmit={pay} className="checkout__pay">
      <PaymentElement options={{ layout: 'tabs' }} />
      <button type="submit" className="btn btn--primary btn--large btn--full" disabled={!stripe || paying}>
        {paying ? 'Processing…' : `Pay $${PRICE}`}
      </button>
      {message && <p className="contact-form__error">{message}</p>}
    </form>
  );
}
