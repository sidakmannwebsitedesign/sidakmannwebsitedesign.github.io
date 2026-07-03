import { motion } from 'framer-motion';

const ITEMS = [
  {
    label: 'No site at all',
    detail: 'Google search turns up a Yelp listing, a Facebook page from 2019, and nothing you actually control.',
    color: 'var(--coral)',
  },
  {
    label: 'A site that’s slow',
    detail: 'Ten seconds to load a menu or a phone number is ten seconds a customer spends leaving instead.',
    color: 'var(--sky)',
  },
  {
    label: 'Outdated and untrusted',
    detail: 'A site that looks like 2011 tells people your business hasn’t kept up either , fair or not.',
    color: 'var(--gold)',
  },
  {
    label: 'Broken on mobile',
    detail: 'Most of your customers are on a phone. If the site fights them there, they don’t fight back.',
    color: 'var(--violet)',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function PainPoints() {
  return (
    <section className="pain">
      <div className="wrap">
        <motion.p
          className="eyebrow"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          Sound familiar?
        </motion.p>
        <motion.h2
          className="section-title"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          If your website is one of these,<br />that’s exactly who this is for.
        </motion.h2>

        <div className="pain__grid">
          {ITEMS.map((item, i) => (
            <motion.div
              className="pain__card"
              key={item.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              transition={{ duration: 0.55, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <span className="pain__dot" style={{ background: item.color }} />
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
