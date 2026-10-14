import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// This site is static, so payments borrow Strygonia's API and the shared Stripe
// account. The server owns the real amounts; these are for display only.
const PAYMENT_API = import.meta.env.VITE_PAYMENT_API || 'https://www.strygonia.com/api/sidakswebsites-payment-intent';
const STRIPE_PUBLISHABLE_KEY = 'pk_live_51ToDLWH5ZSFGFvWtkV8bRKm9TznrG7zoi8o0W3oftjv1OLSs0vYEgKue2WTBffLhhwmjFTgUHXUrdLZmuIBFb9Iy00OLBz8jEQ';
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

const PLANS = {
  deposit: { label: 'Deposit', amount: 400, note: 'Starts the build' },
  balance: { label: 'Launch balance', amount: 399, note: 'Due when your site goes live' },
};

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
  const [plan, setPlan] = useState(params.get('plan') === 'balance' ? 'balance' : 'deposit');
  const [step, setStep] = useState('details');
  const [details, setDetails] = useState({});
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');
  // Stripe sends the buyer back here with ?redirect_status=… after paying.
  const result = params.get('redirect_status');
  const paid = result === 'succeeded' || result === 'processing';
  const { amount } = PLANS[plan];

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
        body: JSON.stringify({ plan, name: form.name, email: form.email, business: form.business }),
      });
      const data = await response.json();
      if (data.clientSecret) setClientSecret(data.clientSecret);
      else setError(data.error || 'Checkout could not start.');
    } catch {
      setError('The payment server could not be reached. Try again in a minute, or email sidak@sidakswebsites.com.');
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
            Lock in your build with a <span className="metal">${PLANS.deposit.amount} deposit.</span>
          </h1>
          <p className="checkout__lead">
            ${PLANS.deposit.amount} starts the work and ${PLANS.balance.amount} is due when your site
            goes live. $799 total, nothing monthly from me. Haven't talked yet?{' '}
            <Link to="/contact">Get a quote first.</Link>
          </p>
          <ol className="checkout__next">
            <li>Pay the deposit here.</li>
            <li>I email you within a day to book a kickoff call.</li>
            <li>Your site goes live in about a week, then you pay the balance.</li>
          </ol>
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
              <h2>Thanks, you're in.</h2>
              <p>
                {result === 'succeeded'
                  ? 'Your receipt is on its way to your email. '
                  : 'Your bank is still confirming the payment. Stripe will email your receipt once it clears. '}
                I'll reach out within a day to set up the kickoff call.
              </p>
              <Link to="/" className="btn btn--ghost">Back to home</Link>
            </div>
          ) : step === 'details' ? (
            <form onSubmit={startPayment} className="checkout__form">
              <span className="checkout__step">Step 1 of 2: your details</span>
              {result && (
                <p className="contact-form__error">That payment didn't go through. Try again with another card.</p>
              )}
              <fieldset className="plan">
                <legend>What are you paying?</legend>
                {Object.entries(PLANS).map(([id, p]) => (
                  <label key={id} className="plan__option">
                    <input type="radio" name="plan-choice" checked={plan === id} onChange={() => setPlan(id)} />
                    <span className="plan__label">{p.label}<em>{p.note}</em></span>
                    <span className="plan__amount">${p.amount}</span>
                  </label>
                ))}
              </fieldset>
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
                  <strong>{PLANS[plan].label}</strong> for {details.business || details.name}
                  <br />{details.email}
                </span>
                <button type="button" className="checkout__edit" onClick={() => setStep('details')}>Edit</button>
              </div>
              {error ? (
                <p className="contact-form__error">{error}</p>
              ) : clientSecret ? (
                <Elements stripe={stripePromise} options={{ ...ELEMENTS_OPTIONS, clientSecret }}>
                  <PayForm amount={amount} />
                </Elements>
              ) : (
                <p className="checkout__loading">Loading the secure payment form…</p>
              )}
            </div>
          )}
          {!paid && <p className="checkout__secure">Payments are processed securely by Stripe. ${amount} USD</p>}
        </motion.div>
      </div>
    </section>
  );
}

function PayForm({ amount }) {
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
        {paying ? 'Processing…' : `Pay $${amount}`}
      </button>
      {message && <p className="contact-form__error">{message}</p>}
    </form>
  );
}
