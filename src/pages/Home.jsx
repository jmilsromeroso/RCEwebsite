import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const GRC_RED = '#C8102E';

const styles = {
  container: { fontFamily: "'Poppins', sans-serif" },
  sectionMax: { maxWidth: '1200px', margin: '0 auto' },
  heroSection: {
    backgroundColor: GRC_RED,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
  },
  btnDark: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#8B0000',
    color: 'white',
    fontSize: '13px',
    fontWeight: 700,
    padding: '15px 34px',
    textDecoration: 'none',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    borderRadius: '4px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.35)',
  },
  inputField: {
    width: '100%',
    padding: '12px 16px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    backgroundColor: 'rgba(255,255,255,0.96)',
    outline: 'none',
    color: '#333',
    boxSizing: 'border-box',
  },
  noiseOverlay: {
    position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
    backgroundSize: '200px 200px',
  },
  socialIcon: {
    width: '32px',
    height: '32px',
    transition: 'transform 0.2s ease',
    cursor: 'pointer',
  },
};

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, [breakpoint]);
  return isMobile;
}

const INFO_CARDS = [
  {
    id: 1,
    tag: "Case Study",
    title: "Roller Space: Modernizing Operations",
    body: "An RCE initiative addressing the challenges of manual operation at Roller Space. Our integrated web-based system transitions manual tracking into a streamlined digital experience, solving time-consuming data retrieval for the community.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="17" cy="17" r="9" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M23.5 23.5L31 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M13 17h8M17 13v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    accent: GRC_RED,
    stat: "100%",
    statLabel: "Digital Transition",
  },
  {
    id: 2,
    tag: "Social Impact",
    title: "Community Growth through Tech",
    body: "Beyond code, we aim for sustainable local growth. By automating inventory and rentals, we empower local skating hubs to serve more citizens safely, fostering a more vibrant recreational community in Metro Manila.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 8c-6.627 0-12 5.373-12 12 0 4.418 2.386 8.279 5.928 10.374" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M20 8c6.627 0 12 5.373 12 12a11.96 11.96 0 01-5.928 10.374" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="4" fill="currentColor"/>
        <path d="M20 24v6M17 33h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    accent: "#b91c1c",
    stat: "High",
    statLabel: "Social Impact",
  },
  {
    id: 3,
    tag: "Service",
    title: "The Extension Mission",
    body: "Extension means bringing academic expertise to the doorstep of the people. RCE ensures that IT students use their skills to solve tangible paper-dependency issues, creating zero-paper environments for local enterprises.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M12 20c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="8" cy="24" r="5" stroke="currentColor" strokeWidth="2.5"/>
        <circle cx="32" cy="24" r="5" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M13 24h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
    accent: "#991b1b",
    stat: "Direct",
    statLabel: "Community Outreach",
  },
  {
    id: 4,
    tag: "Research",
    title: "Evidence-Based Solutions",
    body: "Every implementation is backed by a systematic data gathering procedure. Our research framework ensures that software architecture meets the high-traffic demands of the Metro Manila community effectively.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M20 6v4M20 30v4M6 20h4M30 20h4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="20" cy="20" r="8" stroke="currentColor" strokeWidth="2.5"/>
        <path d="M16 18l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    accent: "#7f1d1d",
    stat: "CH3",
    statLabel: "Research Framework",
  },
];

function NavBtn({ onClick, children, dark = false }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 44, height: 44, borderRadius: '50%',
        border: `1.5px solid ${hov
          ? (dark ? 'rgba(200,16,46,0.7)' : 'rgba(255,255,255,0.7)')
          : (dark ? 'rgba(200,16,46,0.2)' : 'rgba(255,255,255,0.3)')}`,
        background: hov
          ? (dark ? 'rgba(200,16,46,0.1)' : 'rgba(255,255,255,0.2)')
          : (dark ? 'rgba(200,16,46,0.04)' : 'rgba(255,255,255,0.08)'),
        color: dark ? GRC_RED : '#fff',
        fontSize: 20, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}
    >{children}</button>
  );
}

function InfoCarousel() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState('left');
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);
  const isMobile = useIsMobile();
  const count = INFO_CARDS.length;

  useEffect(() => {
    timerRef.current = setInterval(() => advance(1), 4500);
    return () => clearInterval(timerRef.current);
  }, [active]);

  const advance = (d) => {
    if (animating) return;
    setDir(d > 0 ? 'left' : 'right');
    setAnimating(true);
    setTimeout(() => {
      setActive((prev) => (prev + d + count) % count);
      setAnimating(false);
    }, 320);
    clearInterval(timerRef.current);
  };

  const goTo = (i) => {
    if (i === active || animating) return;
    setDir(i > active ? 'left' : 'right');
    setAnimating(true);
    setTimeout(() => {
      setActive(i);
      setAnimating(false);
    }, 320);
  };

  const card = INFO_CARDS[active];

  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <style>{`
        @keyframes slideInL  { from { opacity:0; transform:translateX(60px);  } to { opacity:1; transform:translateX(0); } }
        @keyframes slideInR  { from { opacity:0; transform:translateX(-60px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideOutL { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(-60px); } }
        @keyframes slideOutR { from { opacity:1; transform:translateX(0); } to { opacity:0; transform:translateX(60px);  } }
        .ic-panel {
          animation-duration: 0.36s;
          animation-fill-mode: both;
          animation-timing-function: cubic-bezier(0.4,0,0.2,1);
        }
        .ic-out-l { animation-name: slideOutL; }
        .ic-out-r { animation-name: slideOutR; }
        .ic-in-l  { animation-name: slideInL;  }
        .ic-in-r  { animation-name: slideInR;  }
        .ic-thumb { transition: all 0.25s ease; cursor: pointer; }
        .ic-thumb:hover { background: rgba(200,16,46,0.09) !important; border-color: rgba(200,16,46,0.35) !important; }
      `}</style>

      <div style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'stretch',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 20px 70px rgba(0,0,0,0.10)',
        minHeight: isMobile ? 'auto' : 420,
        border: '1px solid rgba(200,16,46,0.07)',
      }}>
        <div
          className={`ic-panel ${animating ? (dir === 'left' ? 'ic-out-l' : 'ic-out-r') : (dir === 'left' ? 'ic-in-l' : 'ic-in-r')}`}
          style={{
            width: isMobile ? '100%' : '42%',
            position: 'relative',
            overflow: 'hidden',
            background: `linear-gradient(145deg, ${card.accent} 0%, #6b0000 100%)`,
            padding: isMobile ? '36px 28px' : '56px 48px',
            display: 'flex',
            flexDirection: isMobile ? 'row' : 'column',
            justifyContent: isMobile ? 'space-between' : 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: isMobile ? '16px' : '0',
          }}
        >
          <div style={styles.noiseOverlay} />
          <div style={{ position: 'absolute', bottom: -60, right: -60, width: 220, height: 220, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.08)' }} />
          <div style={{ position: 'absolute', bottom: -30, right: -30, width: 130, height: 130, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.05)' }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: isMobile ? 8 : 32 }}>
              {card.tag}
            </span>
            <div style={{ color: 'rgba(255,255,255,0.9)', marginBottom: isMobile ? 0 : 28 }}>{card.icon}</div>
            {!isMobile && (
              <h3 style={{ fontFamily: "'Times New Roman', serif", color: '#fff', fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 900, lineHeight: 1.15, margin: 0 }}>
                {card.title}
              </h3>
            )}
          </div>

          <div style={{ position: 'relative', zIndex: 1, textAlign: isMobile ? 'right' : 'left' }}>
            <p style={{ fontSize: isMobile ? 28 : 38, fontWeight: 900, color: '#fff', lineHeight: 1, margin: '0 0 4px', fontFamily: "'Times New Roman', serif" }}>{card.stat}</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>{card.statLabel}</p>
          </div>
        </div>

        <div
          className={`ic-panel ${animating ? (dir === 'left' ? 'ic-out-l' : 'ic-out-r') : (dir === 'left' ? 'ic-in-l' : 'ic-in-r')}`}
          style={{
            flex: 1,
            padding: isMobile ? '28px 24px' : '56px 52px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: '#fff',
          }}
        >
          <div style={{ display: 'flex', gap: 6, marginBottom: isMobile ? 24 : 44 }}>
            {INFO_CARDS.map((_, i) => (
              <div key={i} onClick={() => goTo(i)} style={{
                flex: i === active ? 3 : 1, height: 4, borderRadius: 4,
                background: i === active ? GRC_RED : 'rgba(200,16,46,0.15)',
                transition: 'flex 0.45s ease, background 0.3s', cursor: 'pointer',
              }} />
            ))}
          </div>

          {isMobile && (
            <h3 style={{ fontFamily: "'Times New Roman', serif", color: '#111', fontSize: 'clamp(18px, 5vw, 26px)', fontWeight: 900, lineHeight: 1.2, margin: '0 0 16px' }}>
              {card.title}
            </h3>
          )}

          <p style={{ color: '#374151', fontSize: 'clamp(13px, 1.1vw, 16px)', lineHeight: 1.95, margin: `0 0 ${isMobile ? '24px' : '44px'}`, maxWidth: 500 }}>
            {card.body}
          </p>

          {!isMobile && (
            <div style={{ display: 'flex', gap: 10, marginBottom: 32 }}>
              {INFO_CARDS.filter((_, i) => i !== active).map((c) => (
                <div key={c.id} className="ic-thumb" onClick={() => goTo(INFO_CARDS.indexOf(c))}
                  style={{
                    flex: 1, borderRadius: 10,
                    border: '1.5px solid rgba(200,16,46,0.12)',
                    background: '#fef2f4', padding: '12px 14px',
                    display: 'flex', gap: 8, alignItems: 'center',
                  }}>
                  <div style={{ color: GRC_RED, flexShrink: 0, opacity: 0.7, transform: 'scale(0.6)', transformOrigin: 'left center' }}>{c.icon}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.04em', lineHeight: 1.4 }}>{c.tag}</span>
                </div>
              ))}
            </div>
          )}

          {isMobile && (
            <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
              {INFO_CARDS.map((_, i) => (
                <div key={i} onClick={() => goTo(i)} style={{
                  width: i === active ? 20 : 8, height: 8, borderRadius: 4,
                  background: i === active ? GRC_RED : 'rgba(200,16,46,0.25)',
                  transition: 'width 0.3s ease', cursor: 'pointer',
                }} />
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: 10 }}>
            <NavBtn onClick={() => advance(-1)} dark>‹</NavBtn>
            <NavBtn onClick={() => advance(1)} dark>›</NavBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const isMobile = useIsMobile();

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow { animation: fadeUp 0.6s ease both; animation-delay: 0.1s; }
        .hero-heading { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
        .hero-divider { animation: fadeUp 0.6s ease both; animation-delay: 0.42s; }
        .hero-body    { animation: fadeUp 0.6s ease both; animation-delay: 0.55s; }
        .hero-cta     { animation: fadeUp 0.6s ease both; animation-delay: 0.68s; }
        .hero-image   { animation: fadeUp 0.8s ease both; animation-delay: 0.3s; }
        .social-icon:hover { transform: scale(1.15); }

        * { box-sizing: border-box; }

        @media (max-width: 768px) {
          .hero-inner {
            flex-direction: column !important;
            text-align: center;
            padding: 80px 24px 60px !important;
            align-items: center !important;
          }
          .hero-text {
            max-width: 100% !important;
            align-items: center;
            display: flex;
            flex-direction: column;
          }
          .hero-image-wrap {
            order: -1;
            margin-bottom: 8px;
          }
          .hero-divider-wrap {
            justify-content: center;
          }
          .about-inner {
            flex-direction: column !important;
            gap: 32px !important;
          }
          .about-img img {
            width: 240px !important;
            height: 240px !important;
          }
          .about-section {
            padding: 60px 24px !important;
            margin-left: 0 !important;
          }
          .info-section {
            padding: 60px 20px !important;
          }
          .contact-section {
            padding: 60px 20px !important;
          }
          .contact-inner {
            flex-direction: column !important;
            gap: 40px !important;
          }
        }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section style={styles.heroSection}>
        <div style={styles.noiseOverlay} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', backgroundColor: '#8B0000', zIndex: 2 }} />

        <div className="hero-inner" style={{ ...styles.sectionMax, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '60px', flexWrap: 'wrap', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-text" style={{ flex: 1, minWidth: '280px', maxWidth: '580px' }}>
            <div className="hero-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <span style={{ display: 'block', width: '40px', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Building Community Resilience</span>
            </div>

            <h1 className="hero-heading" style={{ fontFamily: "'Times New Roman', Times, serif", color: 'white', fontSize: 'clamp(34px, 5vw, 66px)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.01em', margin: '0' }}>
              Research and <span style={{ fontStyle: 'italic' }}>Community</span><br />Extension
            </h1>

            <div className="hero-divider hero-divider-wrap" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '32px 0', maxWidth: '340px' }}>
              <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white', flexShrink: 0 }} />
              <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            </div>

            <p className="hero-body" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', fontWeight: 400, lineHeight: 1.9, maxWidth: '440px', margin: '0 0 44px 0' }}>
              Empowering society through purposeful research and dedicated service. We bridge the gap between academic theory and community action, turning innovation into lasting impact.
            </p>

            <div className="hero-cta">
              <Link to="/contact" style={styles.btnDark} onMouseEnter={e => e.currentTarget.style.opacity = '0.85'} onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                ENROLL NOW!
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>

          <div className="hero-image hero-image-wrap" style={{ flexShrink: 0 }}>
            <img src="/img/RCE logo.png" alt="RCE Medallion" style={{ width: 'clamp(200px, 35vw, 460px)', height: 'clamp(200px, 35vw, 460px)', objectFit: 'contain', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }} />
          </div>
        </div>
      </section>

      {/* ── INFORMATION SECTION ── */}
      <section className="info-section" style={{ backgroundColor: '#fafafa', padding: '88px 48px' }}>
        <div style={styles.sectionMax}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 52, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <span style={{ display: 'block', color: GRC_RED, fontSize: 11, fontWeight: 700, letterSpacing: '0.26em', textTransform: 'uppercase', marginBottom: 12 }}>RCE Initiatives</span>
              <h2 style={{ fontFamily: "'Times New Roman', serif", fontWeight: 900, fontSize: 'clamp(24px, 3.5vw, 44px)', color: '#111', margin: 0, lineHeight: 1.1 }}>
                Innovation for the <span style={{ color: GRC_RED, fontStyle: 'italic' }}>Greater Good</span>
              </h2>
            </div>
          </div>
          <InfoCarousel />
          <div style={{ marginTop: 48, height: '2px', background: `linear-gradient(to right, ${GRC_RED}, transparent)`, opacity: 0.15 }} />
        </div>
      </section>

      {/* ── ABOUT US SECTION ── */}
      <section className="about-section" style={{ backgroundColor: 'white', padding: '100px 48px', position: 'relative' }}>
        <div className="about-inner" style={{ ...styles.sectionMax, display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap' }}>
          <div className="about-img" style={{ flex: 1, display: 'flex', justifyContent: 'center', minWidth: '280px' }}>
            <img src="/img/grc logo.png" alt="GRC Icon" style={{ width: 'clamp(200px, 40vw, 450px)', height: 'clamp(200px, 40vw, 450px)', objectFit: 'contain' }} />
          </div>

          <div style={{ flex: 1, minWidth: '260px' }}>
            <p style={{ color: GRC_RED, fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '16px' }}>Our Mission</p>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, color: '#111', lineHeight: 1.15, marginBottom: '25px' }}>
              Advancing <span style={{ color: GRC_RED }}>Knowledge,</span><br />Serving the <span style={{ color: GRC_RED }}>Community.</span>
            </h2>
            <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.8, maxWidth: '520px', marginBottom: '32px' }}>
              The Research and Community Extension (RCE) office is dedicated to fostering a culture of technical excellence and civic duty. By supporting projects like the Roller Space Integrated System, we prove that digital modernization can enhance both business efficiency and quality of life.
            </p>
            <div className="stat-row" style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '36px', flexWrap: 'wrap' }}>
              {[
                { val: 'Active', label: 'Research Projects' },
                { val: '100%', label: 'Commitment' },
                { val: 'Local', label: 'Partnerships' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontSize: '30px', fontWeight: 900, color: '#111', lineHeight: 1 }}>{stat.val}</p>
                  <p style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>{stat.label}</p>
                </div>
              ))}
            </div>
            <Link to="/about" style={{ ...styles.btnDark, backgroundColor: GRC_RED, boxShadow: 'none' }}>Extension Details</Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section className="contact-section" style={{ background: `linear-gradient(135deg, #e0102e 0%, #9b0020 100%)`, padding: '80px 32px', position: 'relative', overflow: 'hidden' }}>
        <div style={styles.noiseOverlay} />
        <div style={{ ...styles.sectionMax, position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(22px, 4vw, 46px)', fontWeight: 900, lineHeight: 1.2, marginBottom: '14px' }}>
              Partner with <span style={{ color: '#FFCCD5' }}>RCE Today.</span>
            </h2>
          </div>
           <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h4 style={{ color: 'white', fontSize: 'clamp(14px, 2vw, 20px)', fontWeight: 400, lineHeight: 1.5, marginBottom: '5px' }}>
              Submit your Formal Concern or <span style={{ color: '#FFCCD5' }}>Proposals.</span>
            </h4>
          </div>

          <div className="contact-inner" style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div>
                <ContactInfo icon="📍" text={<>454 GRC Building, Rizal Ave Ext,<br />Cor. 9th Avenue Grace Park, Caloocan City</>} />
                <ContactInfo icon="📞" text="0999-999-9999" />
                <ContactInfo icon="✉️" text="rceassistextension0104@gmail.com" />
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <a href="https://www.facebook.com/GrcRCExtension" target="_blank" rel="noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="FB" style={styles.socialIcon} className="social-icon" /></a>
                  <a href="#" target="_blank" rel="noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="IG" style={styles.socialIcon} className="social-icon" /></a>
                  <a href="https://www.tiktok.com" target="_blank" rel="noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/3046/3046121.png" alt="TikTok" style={styles.socialIcon} className="social-icon" /></a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style={styles.socialIcon} className="social-icon"/></a>
                </div>
              </div>
            </div>

            <div style={{ flex: 1.3, minWidth: '260px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <input style={styles.inputField} placeholder="Full Name" />
                <input style={styles.inputField} placeholder="Student No." />
                <textarea 
                   style={{ ...styles.inputField, resize: 'none', minHeight: '290px' }} 
                   placeholder="Message Concern." 
                   rows={8} 
                />
                <button style={{ ...styles.btnDark, border: 'none', cursor: 'pointer', backgroundColor: '#6B0000', width: '100%', justifyContent: 'center' }}>Submit!</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ width: '100%', height: '380px' }}>
        <iframe
          title="GRC Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.0381446726484!2d120.98565577584898!3d14.653737575775434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b5f79986b629%3A0xc6e4c7003009026!2sGlobal%20Reciprocal%20Colleges!5e0!3m2!1sen!2sph!4v1712750000000!5m2!1sen!2sph"
          style={{ width: '100%', height: '100%', border: 'none' }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

function ContactInfo({ icon, text }) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', marginBottom: '15px' }}>
      <span style={{ fontSize: '18px' }}>{icon}</span>
      <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{text}</p>
    </div>
  );
}
