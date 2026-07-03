import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '01',
    title: 'Quick pitch',
    detail: 'Fifteen minutes, no pressure. I look at what you have, what your customers need to find, and quote the flat $300.',
  },
  {
    n: '02',
    title: 'Half down',
    detail: 'Half up front to start, half when the site goes live. Domain and hosting get set up under your name from day one.',
  },
  {
    n: '03',
    title: 'I build it',
    detail: 'Real design, real copy, mobile-first. You see drafts, you give notes, I handle everything technical behind it.',
  },
  {
    n: '04',
    title: 'Live in about a week',
    detail: 'Domain connected, hosting live, everything working end to end. You get a link, not a login.',
  },
];

export default function Process() {
  return (
    <section className="process" id="work">
      <div className="wrap">
        <div className="process__head">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
          >
            How it works
          </motion.p>
          <motion.h2
            className="section-title section-title--light"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            Four steps. Zero dashboards.
          </motion.h2>
        </div>

        <div className="process__list">
          {STEPS.map((s, i) => (
            <motion.div
              className="process__row"
              key={s.n}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="process__n">{s.n}</span>
              <div className="process__body">
                <h3>{s.title}</h3>
                <p>{s.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
