import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

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
};

// ── CUSTOM HOOK ──
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
    body: "An RCE initiative addressing the challenges of manual operation at Roller Space. Our integrated web-based system transitions manual tracking into a streamlined digital experience.",
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
    body: "Beyond code, we aim for sustainable local growth. By automating inventory and rentals, we empower local skating hubs to serve more citizens safely.",
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
    body: "RCE ensures that IT students use their skills to solve tangible paper-dependency issues, creating zero-paper environments for local enterprises.",
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
    body: "Every implementation is backed by a systematic data gathering procedure to meet the high-traffic demands of the Metro Manila community.",
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

          <p style={{ color: '#374151', fontSize: 'clamp(13px, 1.1vw, 16px)', lineHeight: 1.95, margin: `0 0 ${isMobile ? '24px' : '44px'}`, maxWidth: 500 }}>
            {card.body}
          </p>

          <div style={{ display: 'flex', gap: 10 }}>
            <NavBtn onClick={() => advance(-1)} dark>‹</NavBtn>
            <NavBtn onClick={() => advance(1)} dark>›</NavBtn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const isMobile = useIsMobile();

  // ── EMAILJS FORM STATE ──
  const [formData, setFormData] = useState({
    fullName: '',
    studentNo: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  // Initialize using your 2nd set of credentials
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_CONCERN_TEMPLATE_ID;

    if (!formData.fullName || !formData.message) {
      alert('Please fill in your name and message.');
      return;
    }

    setStatus('sending');
    
    const templateParams = {
      from_name: formData.fullName,
      student_no: formData.studentNo,
      message: formData.message,
      to_email: "jmilsromeroso@gmail.com",
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams);
      setStatus('success');
      setFormData({ fullName: '', studentNo: '', message: '' }); 
      setTimeout(() => setStatus('idle'), 6000);
    } catch (err) {
      console.error("Submission Error:", err);
      setStatus('error');
    }
  };

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
        @keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
        .hero-inner { animation: fadeUp 0.8s ease forwards; }
        * { box-sizing: border-box; }
        @media (max-width: 768px) {
          .contact-inner { flex-direction: column !important; gap: 40px !important; }
        }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section style={styles.heroSection}>
        <div style={styles.noiseOverlay} />
        <div style={{ ...styles.sectionMax, padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '60px', flexWrap: 'wrap', width: '100%', position: 'relative', zIndex: 1 }}>
          <div className="hero-inner" style={{ flex: 1, minWidth: '280px', maxWidth: '580px' }}>
            <h1 style={{ fontFamily: "'Times New Roman', serif", color: 'white', fontSize: 'clamp(34px, 5vw, 66px)', fontWeight: 900, lineHeight: 1.08, margin: '0' }}>
              Research and <span style={{ fontStyle: 'italic' }}>Community</span><br />Extension
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: 1.9, maxWidth: '440px', margin: '32px 0 44px' }}>
              Empowering society through purposeful research and dedicated service. We bridge the gap between academic theory and community action.
            </p>
            <Link to="/contact" style={styles.btnDark}>ENROLL NOW!</Link>
          </div>
          <div style={{ flexShrink: 0 }}>
            <img src="/img/RCE logo.png" alt="Logo" style={{ width: 'clamp(200px, 35vw, 460px)', objectFit: 'contain' }} />
          </div>
        </div>
      </section>

      {/* ── INFORMATION SECTION ── */}
      <section style={{ backgroundColor: '#fafafa', padding: '88px 48px' }}>
        <div style={styles.sectionMax}>
           <InfoCarousel />
        </div>
      </section>

      {/* ── ABOUT US SECTION ── */}
      <section style={{ backgroundColor: 'white', padding: '100px 48px' }}>
        <div style={{ ...styles.sectionMax, display: 'flex', alignItems: 'center', gap: '80px', flexWrap: 'wrap' }}>
          <img src="/img/grc logo.png" alt="GRC" style={{ width: 'clamp(200px, 40vw, 450px)', objectFit: 'contain' }} />
          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 48px)', fontWeight: 900, marginBottom: '25px' }}>Advancing Knowledge, Serving Community.</h2>
            <p style={{ color: '#555', lineHeight: 1.8, marginBottom: '32px' }}>The RCE office is dedicated to technical excellence and civic duty.</p>
            <Link to="/about" style={{ ...styles.btnDark, backgroundColor: GRC_RED }}>Extension Details</Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT SECTION ── */}
      <section 
        className="contact-section" 
        style={{ 
          background: `linear-gradient(135deg, #e0102e 0%, #9b0020 100%)`, 
          padding: '120px 32px', 
          position: 'relative', 
          overflow: 'hidden',
          minHeight: '100vh', 
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div style={styles.noiseOverlay} />
        <div style={{ ...styles.sectionMax, position: 'relative', zIndex: 1, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(22px, 4vw, 46px)', fontWeight: 900, marginBottom: '14px' }}>
              Partner with <span style={{ color: '#FFCCD5' }}>RCE Today.</span>
            </h2>
            <h5 style={{ color: 'white', fontSize: '1.2rem', fontWeight: 300 }}>
              Submit your <span style={{ color: '#FFCCD5' }}>Concern Today!</span>
            </h5>
          </div>

          <div className="contact-inner" style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <ContactInfo icon="📍" text="454 GRC Building, Rizal Ave Ext, Grace Park, Caloocan City" />
              <ContactInfo icon="📞" text="0999-999-9999" />
              <ContactInfo icon="✉️" text="rceassistextension0104@gmail.com" />
            </div>

            <div style={{ flex: 1.3, minWidth: '260px' }}>
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input style={styles.inputField} placeholder="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
                <input style={styles.inputField} placeholder="Student No." name="studentNo" value={formData.studentNo} onChange={handleChange} />
                <textarea 
                  style={{ 
                    ...styles.inputField, 
                    resize: 'none', 
                    minHeight: '250px' 
                  }} 
                  placeholder="Message Concern." 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                />

                {status === 'success' && (
                  <div style={{ padding: '12px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.2)', color: '#fff', border: '1px solid #90EE90', textAlign: 'center' }}>
                    ✅ Success! Your message has been submitted to RCE.
                  </div>
                )}
                {status === 'error' && (
                  <div style={{ padding: '12px', borderRadius: '4px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#FFB3B3', textAlign: 'center' }}>
                    ❌ Something went wrong. Please check your connection.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    ...styles.btnDark,
                    border: 'none',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    backgroundColor: '#6B0000',
                    width: '100%',
                    justifyContent: 'center',
                    opacity: status === 'sending' ? 0.7 : 1,
                  }}
                >
                  {status === 'sending' ? 'Sending...' : 'Submit Message!'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAP SECTION ── */}
      <div style={{ width: '100%', height: '380px', backgroundColor: '#eee' }}>
        <iframe
          title="GRC Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d965.0193!2d120.9835096!3d14.6498596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b5d4fab883bb%3A0x96f1adb22bed4d5e!2sGlobal%20Reciprocal%20Colleges%20-%20GRC!5e0!3m2!1sen!2sph!4v1744000000000!5m2!1sen!2sph"
          style={{ width: '100%', height: '100%', border: 'none' }}
          loading="lazy"
          allowFullScreen
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