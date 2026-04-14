import { useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & DATA
// ─────────────────────────────────────────────────────────────────────────────

const RED      = '#C8102E';
const DARK_RED = '#8B0000';

const NOISE_TEXTURE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const INFO_CARDS = [
  {
    title: 'Head Office',
    lines: ['454 GRC Building, Rizal Ave Ext, Cor. 9th Avenue Grace Park, Caloocan, City'],
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={RED} strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
  {
    title: 'Email',
    lines: ['rceassistextension0104@gmail.com'],
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={RED} strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
  },
  {
    title: 'Phone',
    lines: ['0999-999-9999', '(63+)900-000-0000'],
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={RED} strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 0112 18.9a19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
      </svg>
    ),
  },
  {
    title: 'Office Hours',
    lines: ['MONDAY - SATURDAY', '8:00AM – 5:00PM', '', 'SUNDAY – Closed'],
    icon: (
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke={RED} strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    name: 'Facebook',
    handle: '@RCE',
    url: 'https://www.facebook.com/GrcRCExtension',
    color: '#1877F2',
    icon: (
      <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    handle: '@RCE',
    url: 'https://www.instagram.com/YOUR_HANDLE_HERE',
    gradient: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    handle: '@RCE',
    url: 'https://www.tiktok.com/@YOUR_HANDLE_HERE',
    color: '#010101',
    icon: (
      <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    handle: '@RCE',
    url: 'https://www.linkedin.com/company/YOUR_COMPANY_HERE',
    color: '#0A66C2',
    icon: (
      <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
];

const INPUT_STYLE = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  fontSize: '14px',
  outline: 'none',
  color: '#333',
  fontFamily: "'Poppins', sans-serif",
  backgroundColor: 'white',
  boxSizing: 'border-box',
};

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hero-eyebrow { animation: fadeUp 0.6s ease both; animation-delay: 0.10s; }
  .hero-heading { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
  .hero-divider { animation: fadeUp 0.6s ease both; animation-delay: 0.42s; }
  .hero-body    { animation: fadeUp 0.6s ease both; animation-delay: 0.55s; }
  .hero-image   { animation: fadeUp 0.8s ease both; animation-delay: 0.30s; }

  @media (max-width: 900px) {
    .contact-grid { grid-template-columns: 1fr !important; }
    .social-grid  { grid-template-columns: repeat(2, 1fr) !important; }
    .hero-inner   { flex-direction: column !important; align-items: flex-start !important; padding: 60px 24px 64px !important; }
    .hero-image   { align-self: center !important; }
    .hero-image img { width: clamp(240px, 60vw, 360px) !important; height: clamp(240px, 60vw, 360px) !important; }
  }

  @media (max-width: 560px) {
    .hero-heading    { font-size: 28px !important; }
    .social-grid     { grid-template-columns: repeat(2, 1fr) !important; }
    .contact-section { padding: 48px 20px !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function InfoCard({ card }) {
  return (
    <div style={{ backgroundColor: '#FDECEA', borderRadius: '10px', padding: '18px 20px', border: '1px solid rgba(200,16,46,0.08)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: 'rgba(200,16,46,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {card.icon}
        </div>
        <p style={{ fontWeight: 700, color: '#111', fontSize: '14px', margin: 0 }}>{card.title}</p>
      </div>
      <div style={{ paddingLeft: '44px' }}>
        {card.lines.map((line, i) => (
          <p key={i} style={{ color: '#555', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{line}</p>
        ))}
      </div>
    </div>
  );
}

function SocialCard({ social }) {
  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit our ${social.name} page`}
      style={{
        textDecoration: 'none',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', gap: '10px',
        padding: '20px 12px', borderRadius: '12px',
        backgroundColor: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.15)',
        transition: 'transform 0.2s',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <div style={{ width: '52px', height: '52px', borderRadius: '12px', background: social.gradient || social.color, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.3)' }}>
        {social.icon}
      </div>
      <p style={{ color: 'white', fontWeight: 700, fontSize: '13px', margin: 0 }}>{social.name}</p>
      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', margin: 0 }}>{social.handle}</p>
    </a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PAGE SECTIONS
// ─────────────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section style={{ backgroundColor: RED, minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none', backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', backgroundColor: DARK_RED, zIndex: 2 }} />

      <div className="hero-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '60px', flexWrap: 'wrap', position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{ flex: 1, minWidth: '300px', maxWidth: '580px' }}>
          <div className="hero-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span style={{ display: 'block', width: '40px', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
            <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>Contact Us</span>
          </div>
          <h1 className="hero-heading" style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 66px)', fontFamily: "'Times New Roman', Times, serif", fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.01em', margin: '0 0 20px 0' }}>
            Let's Build Your <span style={{ fontStyle: 'italic' }}>Future,</span><br />Together.
          </h1>
          <div className="hero-divider" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '0 0 20px 0', maxWidth: '320px' }}>
            <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white', flexShrink: 0 }} />
            <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
          </div>
          <p className="hero-body" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: 1.9, maxWidth: '440px', margin: 0 }}>
            From protecting your career goals to empowering the next generation of professionals — a dedicated network of alumni offering career guidance and lifelong support.
          </p>
        </div>

        <div className="hero-image" style={{ flexShrink: 0 }}>
          <img src="/img/nstp removebg-preview.png" alt="NSTP Logo" style={{ width: 'clamp(280px, 35vw, 460px)', height: 'clamp(280px, 35vw, 460px)', objectFit: 'contain', filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))' }} />
        </div>
      </div>
    </section>
  );
}

function ContactSection({ fields, onFieldChange, onSubmit }) {
  return (
    <section id="contact-form" className="contact-section" style={{ backgroundColor: 'white', padding: '72px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ color: '#888', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>Contact Information</p>
        <h2 style={{ fontSize: 'clamp(22px, 3.5vw, 36px)', fontWeight: 900, color: '#111', marginBottom: '12px' }}>
          Start with a free <span style={{ color: RED }}>Consultation</span>
        </h2>
        <p style={{ color: '#666', fontSize: '13px', lineHeight: 1.75, maxWidth: '480px', marginBottom: '40px' }}>
          No obligation, no runaround. Whether you're looking to connect with alumni, need guidance, or just want to know your options — we're happy to talk it through.
        </p>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {INFO_CARDS.map((card) => <InfoCard key={card.title} card={card} />)}
          </div>

          <div style={{ backgroundColor: '#FDECEA', borderRadius: '10px', padding: '28px', border: '1px solid rgba(200,16,46,0.08)' }}>
            <p style={{ color: '#555', fontSize: '13px', marginBottom: '16px', fontWeight: 500 }}>Send Us a Message</p>
            <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input name="name"     placeholder="Name:"    value={fields.name}    onChange={onFieldChange} style={INPUT_STYLE} />
              <input name="email"    placeholder="Email:"   value={fields.email}   onChange={onFieldChange} style={INPUT_STYLE} type="email" />
              <input name="contact"  placeholder="Contact:" value={fields.contact} onChange={onFieldChange} style={INPUT_STYLE} />
              <textarea name="message" placeholder="Message:" value={fields.message} onChange={onFieldChange} rows={7} style={{ ...INPUT_STYLE, resize: 'none' }} />
              <button type="submit" style={{ backgroundColor: RED, color: 'white', border: 'none', padding: '15px', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', borderRadius: '4px', cursor: 'pointer', fontFamily: "'Poppins', sans-serif" }}>
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function MapSection() {
  return (
    <div style={{ width: '100%', height: '340px', position: 'relative' }}>
      <iframe
        title="GRC Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5!2d120.9813!3d14.6507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b1234567890a%3A0x1234567890abcdef!2sGlobal%20Reciprocal%20Colleges!5e0!3m2!1sen!2sph!4v1234567890"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
      />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: RED }} />
    </div>
  );
}

function FollowUsSection() {
  return (
    <section style={{ background: 'linear-gradient(170deg, #9b0020 0%, #6b0010 100%)', padding: '64px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', backgroundImage: NOISE_TEXTURE, backgroundSize: '200px 200px' }} />
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '10px' }}>Stay Connected</p>
        <h2 style={{ color: 'white', fontWeight: 900, fontSize: 'clamp(26px, 4vw, 42px)', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.03em' }}>
          Follow Us <span style={{ color: '#FFD0D8' }}>Online</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', lineHeight: 1.7, maxWidth: '380px', margin: '0 auto 44px' }}>
          Stay up to date with news, tips, and updates from our team.
        </p>
        <div className="social-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {SOCIALS.map((social) => <SocialCard key={social.name} social={social} />)}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactUs() {
  const [fields, setFields] = useState({ name: '', email: '', contact: '', message: '' });

  const handleChange = (e) => setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); alert('Message sent!'); };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{GLOBAL_CSS}</style>
      <HeroSection />
      <ContactSection fields={fields} onFieldChange={handleChange} onSubmit={handleSubmit} />
      <MapSection />
      <FollowUsSection />
    </div>
  );
}
