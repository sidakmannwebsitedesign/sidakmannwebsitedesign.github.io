import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const INCLUDED = [
  'Custom design, built for your business, not a template picker',
  'Mobile-first: most of your customers will meet you there first',
  'Domain registered and pointed correctly (billed to you at cost, monthly or annually — depends on the domain)',
  'Hosting set up and paid for by me, permanently — never a bill from me for that',
  'Live in about a week from the deposit',
  'You own everything. I just run it so you don\u2019t have to.',
];

export default function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="pricing__blob" />
      <div className="wrap pricing__inner">
        <motion.div
          className="pricing__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Pricing</span>
          <h2 className="section-title">
            One build price. <span className="italic">No dashboard,</span> no surprise invoice.
          </h2>
          <p className="pricing__lead">
            Most agencies quote you a build fee, then a monthly fee, then a "maintenance"
            fee you find out about later. This is one build number, paid in two halves.
            Hosting is on me for as long as I run your site. The only thing that renews
            is your domain, billed at cost.
          </p>
        </motion.div>
        <motion.div
          className="pricing__card"
          initial={{ opacity: 0, y: 32, rotate: 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: -1.5 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ rotate: 0, y: -6 }}
        >
          <div className="pricing__figure">
            <span className="pricing__currency">$</span>
            <span className="pricing__amount">300</span>
          </div>
          <p className="pricing__split">$150 to start &nbsp;•&nbsp; $150 at launch</p>
          <ul className="pricing__list">
            {INCLUDED.map((item) => (
              <li key={item}>
                <span className="pricing__check">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="pricing__note">
            + your domain, billed monthly or yearly at whatever the registrar charges — no markup.
          </p>
          <Link to="/contact" className="btn btn--primary btn--full">Start with $150</Link>
        </motion.div>
      </div>
    </section>
  );
}
