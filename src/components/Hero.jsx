import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';

export default function Hero() {
  const { scrollY } = useScroll();
  const lift = useTransform(scrollY, [0, 160], [0, -18]);

  // The sample site flips between before and after on a timer, but only while
  // it's on screen, so phones (where it sits below the fold) see both states.
  const visualRef = useRef(null);
  const inView = useInView(visualRef, { amount: 0.5 });
  const reduceMotion = useReducedMotion();
  const [after, setAfter] = useState(false);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay || !inView || reduceMotion) return;
    const timer = setTimeout(() => setAfter((a) => !a), after ? 5000 : 3200);
    return () => clearTimeout(timer);
  }, [after, autoplay, inView, reduceMotion]);

  function show(next) {
    setAutoplay(false);
    setAfter(next);
  }

  return (
    <section id="top" className="hero">
      <div className="wrap hero__inner">
        <motion.div
          className="hero__copy"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <span className="eyebrow">North Scottsdale, AZ</span>
          <h1 className="hero__title">
            Your business deserves a site that actually works.
          </h1>
          <p className="hero__sub">
            I build and host real websites for local businesses running on nothing,
            or something slow, dated, and broken on a phone. You see a free demo first and
            tweak it as much as you want, then pay one flat $799. You never touch a
            dashboard again.
          </p>
          <div className="hero__actions">
            <Link to="/contact" className="btn btn--primary">Get a free demo</Link>
            <Link to="/how-it-works" className="btn btn--ghost">See how it works</Link>
          </div>
          <div className="hero__proof">
            <ProofItem k="$799" v="one payment, after you approve" />
            <ProofItem k="Free" v="demo + unlimited tweaks" />
            <ProofItem k="0" v="dashboards you manage" />
          </div>
        </motion.div>

        <motion.div
          className="hero__visual"
          ref={visualRef}
          style={{ y: lift }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          <div className="browser">
            <div className="browser__bar">
              <span className="browser__dot" />
              <span className="browser__dot" />
              <span className="browser__dot" />
              <div className="browser__address">desertbloomaz.com</div>
            </div>
            {/* decorative sample site; the caption below describes it */}
            <div className="browser__screen" aria-hidden="true">
              <div className="site old">
                <div className="old__title">Welcome to Desert Bloom Landscaping!!!</div>
                <div className="old__links">
                  <u>Home</u> | <u>About Us</u> | <u>Services</u> | <u>Photo Gallery</u> | <u>Contact</u> | <u>Guestbook</u>
                </div>
                <div className="old__body">
                  <div className="old__img">cactus_pic1.jpg</div>
                  <p>
                    We are a family owned business serving Scottsdale and the surrounding
                    areas since 2009. We do it all!! Lawns, trees, sprinklers, rocks and
                    more. Please call for pricing. Ask about our spring special!!
                  </p>
                </div>
                <div className="old__call">*** CALL NOW: (480) 555-0142 *** FREE ESTIMATES ***</div>
                <div className="old__foot">
                  Last updated 3/14/2011 &middot; You are visitor #004127 &middot; Best viewed in Internet Explorer 8
                </div>
                <span className="old__badge">Not mobile-friendly</span>
              </div>

              {/* the rebuild wipes down over the old site */}
              <motion.div
                className="site new"
                initial={false}
                animate={{ clipPath: after ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }}
                transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.65, 0, 0.35, 1] }}
              >
                <div className="new__nav">
                  <span className="new__logo"><DesertMark /> Desert Bloom</span>
                  <span className="new__links">
                    <span>Services</span><span>Our work</span><span>Reviews</span>
                  </span>
                  <span className="new__btn">Get a quote</span>
                </div>
                <div className="new__hero">
                  <div className="new__copy">
                    <span className="new__kicker">Scottsdale landscaping since 2009</span>
                    <span className="new__title">Yards built for the Sonoran sun.</span>
                    <span className="new__text">
                      Desert landscaping, drip irrigation, and pavers. Free on-site
                      estimate within 48 hours.
                    </span>
                    <span className="new__btn new__btn--big">Book a free estimate</span>
                  </div>
                  <DesertScene />
                </div>
                <div className="new__cards">
                  <span><b>Xeriscaping</b>Native, low-water plants</span>
                  <span><b>Irrigation</b>Drip systems and repairs</span>
                  <span><b>Hardscape</b>Pavers, patios, fire pits</span>
                </div>
                <div className="new__review">
                  <span className="new__stars">★★★★★</span>
                  “They redid our whole backyard in a week.” &mdash; Maria G., Scottsdale
                </div>
              </motion.div>
            </div>
          </div>
          <div className="hero__compare">
            <span className="hero__caption">Sample redesign</span>
            <div className="toggle" role="group" aria-label="Show the sample site">
              <button type="button" aria-pressed={!after} onClick={() => show(false)}>Before</button>
              <button type="button" aria-pressed={after} onClick={() => show(true)}>After</button>
            </div>
          </div>
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

function DesertMark() {
  return (
    <svg viewBox="0 0 20 20" className="new__mark">
      <rect width="20" height="20" rx="5" fill="#2F4A35" />
      <path d="M10 15V6M10 11H7V8M10 9.5h3V7" stroke="#F4E6CF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function DesertScene() {
  return (
    <svg className="new__photo" viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8FB8DE" />
          <stop offset="0.65" stopColor="#F2CFA4" />
          <stop offset="1" stopColor="#F6B98A" />
        </linearGradient>
      </defs>
      <rect width="200" height="150" fill="url(#sky)" />
      <circle cx="148" cy="66" r="15" fill="#FFF1D6" opacity="0.9" />
      <path d="M0 92 L26 74 L48 84 L80 60 L112 80 L138 68 L168 84 L200 72 V150 H0Z" fill="#C9A58E" />
      <path d="M0 104 Q40 90 82 100 T160 96 T200 100 V150 H0Z" fill="#B07A5A" />
      <path d="M0 118 Q62 108 122 116 T200 112 V150 H0Z" fill="#8C5A3F" />
      <g stroke="#3D5A3B" strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M54 134 V86 M54 112 H45 V98 M54 104 H63 V92" strokeWidth="7" />
        <path d="M170 128 V100 M170 116 H164 V108 M170 111 H176 V104" strokeWidth="4.5" />
      </g>
      <ellipse cx="100" cy="132" rx="12" ry="5" fill="#6F7F4C" />
      <ellipse cx="128" cy="138" rx="8" ry="3.5" fill="#7E8B55" />
    </svg>
  );
}
