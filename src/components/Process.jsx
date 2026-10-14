import { motion } from 'framer-motion';

const STEPS = [
  {
    n: '01',
    title: 'Quick pitch',
    detail: 'Fifteen minutes, no pressure. I look at what you have and what your customers need to find. The price is always a flat $799.',
  },
  {
    n: '02',
    title: 'Free demo',
    detail: 'I build a working demo of your site. You see the real thing before you pay anything.',
  },
  {
    n: '03',
    title: 'Tweak it until you love it',
    detail: 'Nitpicks, rewrites, full redesigns. Ask for as many rounds as you want. I handle everything technical behind it.',
  },
  {
    n: '04',
    title: 'Pay once, go live',
    detail: 'Happy with it? Pay $799 once. I connect your domain and hosting and everything works end to end. You get a link, not a login.',
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
