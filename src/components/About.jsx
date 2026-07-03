import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="about" id="about">
      <div className="wrap about__inner">
        <motion.div
          className="about__mark"
          initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="about__badge">
            <span>SM</span>
          </div>
        </motion.div>

        <motion.div
          className="about__copy"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="eyebrow">Who's building it</span>
          <h2 className="section-title">
            I'm Sidak Mann, based right here in <span className="italic">North Scottsdale.</span>
          </h2>
          <p>
            I design, build, and deploy every site myself. No subcontractors, no
            outsourced "dev team." When you talk to me about your site, you're talking
            to the person actually writing the code and pushing it live.
          </p>
          <p>
            I started this because too many good local businesses were being represented
            online by something that didn't do them justice. A $300 flat fee means this
            is actually accessible, and handling the domain and hosting myself means you
            get to run your business instead of a website.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
