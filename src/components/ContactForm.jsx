import { useState } from 'react';
import { motion } from 'framer-motion';

const FORM_ENDPOINT = 'https://formspree.io/f/meebpvbd';

export default function ContactForm() {
  const [status, setStatus] = useState('idle');

  async function handleSubmit(event) {
    event.preventDefault();

    setStatus('submitting');

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        form.reset();
        setStatus('success');
        return;
      }

      setStatus('error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="cta" id="contact">
      <div className="cta__blob cta__blob--a" />
      <div className="cta__blob cta__blob--b" />
      <div className="wrap cta__inner">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          Let's get your business a site<br />it's not embarrassed by.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Fifteen-minute pitch call, flat $300, live in about a week. Send a note
          and I'll get back to you at sidak@sidakswebsites.com.
        </motion.p>

        {status === 'success' ? (
          <motion.div
            className="contact-form__success"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p>Thanks. Your message is on its way. I'll reply soon.</p>
            <button
              type="button"
              className="btn btn--ghost"
              onClick={() => setStatus('idle')}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            className="contact-form"
            action={FORM_ENDPOINT}
            method="POST"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <label className="contact-form__field">
              <span>Name</span>
              <input type="text" name="name" autoComplete="name" required />
            </label>

            <label className="contact-form__field">
              <span>Email</span>
              <input type="email" name="email" autoComplete="email" required />
            </label>

            <label className="contact-form__field">
              <span>Business <em>(optional)</em></span>
              <input type="text" name="business" autoComplete="organization" />
            </label>

            <label className="contact-form__field">
              <span>Message</span>
              <textarea name="message" rows={5} required />
            </label>

            {status === 'error' && (
              <p className="contact-form__error">
                Something went wrong. Try again, or email sidakswebsites.com directly.
              </p>
            )}

            <button
              type="submit"
              className="btn btn--primary btn--large btn--full"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? 'Sending…' : 'Send message'}
            </button>
          </motion.form>
        )}
      </div>
    </section>
  );
}
