import React, { useState, useEffect, useRef } from 'react';

// ── 1. ASSET CONFIGURATION ──
const GRC_RED = '#C8102E';
const NOISE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const GRC_ICON_PHOTO = "/img/grc logo.png";

// ── 2. PROJECT DATA ──
const PROJECTS = [
  { id: 1, tag: 'Research', title: 'Academic Research Initiative', desc: 'A faculty-led multi-disciplinary research program bridging local industry needs.', year: '2023' },
  { id: 2, tag: 'Community', title: 'NSTP Community Outreach', desc: 'Student-driven extension programs delivering livelihood training to partner communities.', year: '2023–2024' },
  { id: 3, tag: 'Innovation', title: 'Innovation & Tech Expo', desc: 'Annual showcase of student capstone projects and industry-sponsored challenges.', year: '2024' },
  { id: 4, tag: 'Alumni', title: 'Alumni Mentorship Network', desc: 'Connecting graduating students with alumni professionals for career guidance.', year: '2024' },
  { id: 5, tag: 'Sustainability', title: 'Green Campus Program', desc: 'Institutional sustainability drive covering waste management and energy reduction.', year: '2022–2024' },
];

// ── 3. CUSTOM RESPONSIVE HOOK ──
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);
  return isMobile;
}

const styles = {
  container: { fontFamily: "'Poppins', sans-serif", color: '#333', overflowX: 'hidden' },
  sectionMax: { maxWidth: '1200px', margin: '0 auto', padding: '0 24px' },
  hero: {
    backgroundColor: GRC_RED,
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    padding: '60px 0',
  },
  noise: {
    position: 'absolute', inset: 0, opacity: 0.06,
    backgroundImage: NOISE, backgroundSize: '100px 100px', pointerEvents: 'none',
  },
};

function NavBtn({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 42, height: 42, borderRadius: '50%',
        border: `2px solid ${hov ? 'rgba(200,16,46,0.7)' : 'rgba(200,16,46,0.3)'}`,
        background: hov ? 'rgba(200,16,46,0.1)' : 'transparent',
        color: GRC_RED, fontSize: 20, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.2s',
      }}
    >{children}</button>
  );
}

function renderProjectCard(item, isActive, isMobile) {
  const iconsByTag = {
    Research: <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5"><path d="M9 12h6M9 16h6M9 8h2M3 7a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/></svg>,
    Community: <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5"><circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"/></svg>,
    Innovation: <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M6 17l-1.5 1.5M18 17l1.5 1.5M12 12a3 3 0 100-6 3 3 0 000 6z"/></svg>,
    Alumni: <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5"><path d="M17 20h5v-1a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-1a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg>,
    Sustainability: <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2a2 2 0 002-2v-1a2 2 0 012-2h1.945M8 21l4-4 4 4M3.055 11a9 9 0 1117.89 0"/></svg>,
  };

  return (
    <div style={{
      position: 'relative',
      width: isMobile ? 180 : 220,
      borderRadius: 16,
      border: `2px solid ${isActive ? 'rgba(200,16,46,0.5)' : 'rgba(200,16,46,0.12)'}`,
      background: isActive ? '#FDE8EC' : 'rgba(253,232,236,0.45)',
      padding: isMobile ? '16px' : '24px 20px 20px',
      display: 'flex', flexDirection: 'column', gap: 8,
      boxShadow: isActive ? '0 20px 50px rgba(200,16,46,0.18)' : 'none',
      transition: 'all 0.5s ease',
    }}>
      <span style={{
        display: 'inline-block',
        background: 'rgba(200,16,46,0.10)', color: '#9b0020',
        fontSize: 9, fontWeight: 700, letterSpacing: '0.12em',
        textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20,
        alignSelf: 'flex-start',
      }}>{item.tag}</span>
      <div style={{
        width: '100%', height: isMobile ? 80 : 110,
        background: 'rgba(200,16,46,0.07)', borderRadius: 8,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {iconsByTag[item.tag]}
      </div>
      <p style={{ fontWeight: 700, fontSize: isMobile ? 12 : 14, color: '#111', margin: 0, lineHeight: 1.4 }}>{item.title}</p>
      <p style={{ fontSize: isMobile ? 10 : 12, color: '#666', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
      <p style={{ fontSize: 11, fontWeight: 700, color: GRC_RED, margin: 0 }}>{item.year}</p>
    </div>
  );
}

function RotatingCarousel({ items, autoPlay = true, interval = 3200 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const isMobile = useIsMobile();
  const count = items.length;

  useEffect(() => {
    if (!autoPlay || paused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [paused, autoPlay, count, interval]);

  const rotateTo = (idx) => {
    setActiveIndex(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };

  const angleStep = 360 / count;
  const radius = isMobile ? 140 : 280; // Smaller radius for mobile

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isMobile ? 20 : 36 }}>
      <div
        style={{ position: 'relative', width: '100%', height: isMobile ? 350 : 520, perspective: isMobile ? 600 : 1000 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          width: 0, height: 0,
          transformStyle: 'preserve-3d',
        }}>
          {items.map((item, i) => {
            const angle = angleStep * i - angleStep * activeIndex;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * radius;
            const z = Math.cos(rad) * radius;
            const isActive = i === activeIndex;
            return (
              <div
                key={item.id}
                onClick={() => rotateTo(i)}
                style={{
                  position: 'absolute',
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`,
                  transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease',
                  opacity: isActive ? 1 : z < -20 ? 0.2 : 0.4,
                  cursor: isActive ? 'default' : 'pointer',
                  zIndex: isActive ? 10 : 1,
                  transformStyle: 'preserve-3d',
                }}
              >
                {renderProjectCard(item, isActive, isMobile)}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 15, paddingTop: isMobile ? 40 : 80 }}>
        <NavBtn onClick={() => rotateTo((activeIndex - 1 + count) % count)}>‹</NavBtn>
        <div style={{ display: 'flex', gap: 6 }}>
          {items.map((_, i) => (
            <button key={i} onClick={() => rotateTo(i)} style={{
              width: i === activeIndex ? 20 : 6, height: 6, borderRadius: 3,
              background: i === activeIndex ? GRC_RED : 'rgba(200,16,46,0.2)',
              border: 'none', cursor: 'pointer', transition: 'all 0.3s',
            }} />
          ))}
        </div>
        <NavBtn onClick={() => rotateTo((activeIndex + 1) % count)}>›</NavBtn>
      </div>
    </div>
  );
}

export default function Achievements() {
  const isMobile = useIsMobile();

  return (
    <div style={styles.container}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .hero-anim { animation: fadeUp 0.7s ease both; }
      `}</style>

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.noise} />
        <div style={{ ...styles.sectionMax, width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center', 
            justifyContent: 'space-between',
            gap: isMobile ? '40px' : '60px',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <div style={{ flex: 1, maxWidth: isMobile ? '100%' : '580px' }}>
              <div className="hero-anim" style={{ marginBottom: '24px' }}>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                  Our Achievements
                </span>
              </div>
              <h1 className="hero-anim" style={{
                fontFamily: "'Times New Roman', serif", color: 'white', fontSize: 'clamp(32px, 8vw, 66px)',
                fontWeight: 900, lineHeight: 1.1, margin: 0,
              }}>
                Integrity in Learning, <br />
                <span style={{ fontStyle: 'italic' }}>Trust</span> in Leadership.
              </h1>
              <p className="hero-anim" style={{ color: 'rgba(255,255,255,0.8)', fontSize: isMobile ? '14px' : '16px', lineHeight: 1.8, marginTop: '24px' }}>
                Four decades of academic milestones and career breakthroughs. Shaping the future of global industries.
              </p>
            </div>
            <div className="hero-anim" style={{ opacity: 0.9 }}>
              <img src={GRC_ICON_PHOTO} alt="Logo" style={{ width: isMobile ? '200px' : '400px', height: 'auto', objectFit: 'contain' }} />
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section style={{ backgroundColor: 'white', padding: isMobile ? '60px 0' : '100px 0' }}>
        <div style={styles.sectionMax}>
          <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: isMobile ? '24px' : '32px', color: GRC_RED }}>Projects</h2>
          <p style={{ textAlign: 'center', color: '#aaa', fontSize: '12px', marginBottom: '40px' }}>Swipe or click to explore</p>
          <RotatingCarousel items={PROJECTS} />
        </div>
      </section>

      {/* INNOVATION & GROWTH */}
      <section style={{ backgroundColor: '#fff', paddingBottom: '80px' }}>
        <div style={{ ...styles.sectionMax, textAlign: 'center' }}>
          <h2 style={{ fontWeight: 900, fontSize: isMobile ? '28px' : '36px', color: GRC_RED, marginBottom: '40px' }}>Innovation & Growth</h2>
          <div style={{ 
            display: 'flex', 
            gap: '20px', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'center' 
          }}>
            <div style={{ flex: 1, padding: '30px', borderTop: `4px solid ${GRC_RED}`, background: '#fefefe', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', borderRadius: '8px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: GRC_RED, marginBottom: '10px' }}>MISSION</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6 }}>Values-based quality education for socially responsible professionals.</p>
            </div>
            <div style={{ flex: 1, padding: '30px', borderTop: `4px solid ${GRC_RED}`, background: '#fefefe', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', borderRadius: '8px', textAlign: 'left' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: GRC_RED, marginBottom: '10px' }}>VISION</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6 }}>A global community of excellent individuals with strong institutional values.</p>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section style={{ backgroundColor: GRC_RED, padding: '40px 0' }}>
        <div style={{ ...styles.sectionMax, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: '15px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', height: isMobile ? '150px' : '200px' }} />
          ))}
        </div>
      </section>

      {/* MAP */}
      <div style={{ width: '100%', height: '300px' }}>
        <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d965.0193!2d120.9835096!3d14.6498596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b5d4fab883bb%3A0x96f1adb22bed4d5e!2sGlobal%20Reciprocal%20Colleges%20-%20GRC!5e0!3m2!1sen!2sph!4v1744000000000!5m2!1sen!2sph" style={{ width: '100%', height: '100%', border: 'none' }} />
      </div>
    </div>
  );
}