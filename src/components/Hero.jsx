import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const brokenOpacity = useTransform(scrollYProgress, [0, 0.35, 0.55], [1, 1, 0]);
  const fixedOpacity = useTransform(scrollYProgress, [0.35, 0.55, 1], [0, 1, 1]);
  const tilt = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], [0, -18]);

  return (
    <section id="top" className="hero" ref={sectionRef}>
      <div className="hero__blob hero__blob--coral" />
      <div className="hero__blob hero__blob--sky" />
      <div className="hero__blob hero__blob--gold" />

      <div className="wrap hero__inner">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <span className="eyebrow">North Scottsdale, AZ</span>
          <h1 className="hero__title">
            Your business deserves a site that <span className="italic">actually works.</span>
          </h1>
          <p className="hero__sub">
            I build and host real websites for local businesses running on nothing,
            or something slow, dated, and broken on a phone. Flat $300. Live in about
            a week. You never touch a dashboard again.
          </p>
          <div className="hero__actions">
            <Link to="/contact" className="btn btn--primary">Get a quote</Link>
            <Link to="/how-it-works" className="btn btn--ghost">See how it works</Link>
          </div>
          <div className="hero__proof">
            <ProofItem k="$300" v="flat, no surprises" />
            <ProofItem k="~7 days" v="pitch to live" />
            <ProofItem k="0" v="dashboards you manage" />
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          style={{ rotate: tilt, y: lift }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="browser">
            <div className="browser__bar">
              <span className="browser__dot" style={{ background: '#FF6B4A' }} />
              <span className="browser__dot" style={{ background: '#F2B138' }} />
              <span className="browser__dot" style={{ background: '#4C7A5D' }} />
              <div className="browser__address">yourbusiness.com</div>
            </div>
            <div className="browser__screen">
              <motion.div className="mock mock--broken" style={{ opacity: brokenOpacity }}>
                <div className="mock__row mock__row--title" />
                <div className="mock__row mock__row--wide" />
                <div className="mock__row" />
                <div className="mock__grid">
                  <div className="mock__box" />
                  <div className="mock__box" />
                </div>
                <div className="mock__badge">404 on mobile</div>
              </motion.div>

              <motion.div className="mock mock--fixed" style={{ opacity: fixedOpacity }}>
                <div className="mock__hero">
                  <div className="mock__hero-text">
                    <div className="mock__pill" />
                    <div className="mock__row mock__row--title mock__row--dark" />
                    <div className="mock__row mock__row--wide mock__row--dark" />
                    <div className="mock__cta" />
                  </div>
                  <div className="mock__hero-art" />
                </div>
                <div className="mock__grid mock__grid--fixed">
                  <div className="mock__card" />
                  <div className="mock__card" />
                  <div className="mock__card" />
                </div>
              </motion.div>
            </div>
          </div>
          <span className="hero__caption">scroll. this is the whole job, actually</span>
        </motion.div>
      </div>
    </section>
  );
}

function ProofItem({ k, v }) {
  return (
    <div className="proof">
      <span className="proof__k">{k}</span>
      <span className="proof__v">{v}</span>
    </div>
  );
}
