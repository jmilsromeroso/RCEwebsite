import React, { useState, useEffect, useRef } from 'react';

  // ── 1. ASSET CONFIGURATION ──
  const GRC_RED = '#C8102E';
  const NOISE = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

  const GRC_ICON_PHOTO = "src/img/grc logo.png";

  // ── 2. PROJECT DATA ──
  const PROJECTS = [
    { id: 1, tag: 'Research',      title: 'Academic Research Initiative',  desc: 'A faculty-led multi-disciplinary research program bridging local industry needs with institutional expertise.',       year: '2023'      },
    { id: 2, tag: 'Community',      title: 'NSTP Community Outreach',       desc: 'Student-driven extension programs delivering livelihood training, health aid, and civic education to partner communities.', year: '2023–2024' },
    { id: 3, tag: 'Innovation',     title: 'Innovation & Tech Expo',        desc: 'Annual showcase of student capstone projects, faculty inventions, and industry-sponsored technology challenges.',           year: '2024'      },
    { id: 4, tag: 'Alumni',          title: 'Alumni Mentorship Network',     desc: 'Connecting graduating students with alumni professionals for career guidance, internship referrals, and lifelong support.', year: '2024'      },
    { id: 5, tag: 'Sustainability', title: 'Green Campus Program',          desc: 'Institutional sustainability drive covering waste management, energy reduction, and environmental literacy campaigns.',     year: '2022–2024' },
  ];

  // ── 3. STYLES ──
  const styles = {
    container:  { fontFamily: "'Poppins', sans-serif", color: '#333' },
    sectionMax: { maxWidth: '1200px', margin: '0 auto', padding: '0 48px' },

    hero: {
      backgroundColor: GRC_RED,
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    },

    noise: {
      position: 'absolute', inset: 0, opacity: 0.06,
      backgroundImage: NOISE, backgroundSize: '100px 100px', pointerEvents: 'none',
    },
  };

  // ── NAV BUTTON ──
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

  // ── PROJECT CARD RENDERER ──
  function renderProjectCard(item, isActive) {
    const iconsByTag = {
      Research: (
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5">
          <path d="M9 12h6M9 16h6M9 8h2M3 7a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"/>
        </svg>
      ),
      Community: (
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5">
          <circle cx="12" cy="7" r="4"/><path d="M4 21v-2a4 4 0 014-4h8a4 4 0 014 4v2"/>
        </svg>
      ),
      Innovation: (
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M6 17l-1.5 1.5M18 17l1.5 1.5M12 12a3 3 0 100-6 3 3 0 000 6z"/>
        </svg>
      ),
      Alumni: (
        <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5">
          <path d="M17 20h5v-1a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-1a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/>
        </svg>
      ),
      Sustainability: (
        <svg width="36" height="36" fill="none" viewBox="0 0 24 24" stroke={GRC_RED} strokeWidth="1.5">
          <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h2a2 2 0 002-2v-1a2 2 0 012-2h1.945M8 21l4-4 4 4M3.055 11a9 9 0 1117.89 0"/>
        </svg>
      ),
    };

    return (
      <div style={{
        position: 'relative',
        width: 220,
        borderRadius: 16,
        border: `2px solid ${isActive ? 'rgba(200,16,46,0.5)' : 'rgba(200,16,46,0.12)'}`,
        background: isActive ? '#FDE8EC' : 'rgba(253,232,236,0.45)',
        padding: '24px 20px 20px',
        display: 'flex', flexDirection: 'column', gap: 12,
        boxShadow: isActive ? '0 20px 50px rgba(200,16,46,0.18)' : 'none',
        transition: 'all 0.5s ease',
      }}>
        {isActive && (
          <div style={{
            position: 'absolute', top: -6, left: -6, right: -6, bottom: -6,
            borderRadius: 20, border: `2px solid ${GRC_RED}`,
            opacity: 0.3, pointerEvents: 'none',
          }} />
        )}
        <span style={{
          display: 'inline-block',
          background: 'rgba(200,16,46,0.10)', color: '#9b0020',
          fontSize: 10, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', padding: '4px 10px', borderRadius: 20,
          alignSelf: 'flex-start',
        }}>{item.tag}</span>
        <div style={{
          width: '100%', height: 110,
          background: 'rgba(200,16,46,0.07)', borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {iconsByTag[item.tag]}
        </div>
        <p style={{ fontWeight: 700, fontSize: 14, color: '#111', margin: 0, lineHeight: 1.4 }}>{item.title}</p>
        <p style={{ fontSize: 12, color: '#666', lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
        <p style={{ fontSize: 11, fontWeight: 700, color: GRC_RED, margin: 0 }}>{item.year}</p>
      </div>
    );
  }

  // ── 3D ROTATING CAROUSEL ──
  function RotatingCarousel({ items, cardRenderer, autoPlay = true, interval = 3200 }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const timerRef = useRef(null);
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

    const prev = () => rotateTo((activeIndex - 1 + count) % count);
    const next = () => rotateTo((activeIndex + 1) % count);

    const angleStep = 360 / count;
    const radius = count <= 3 ? 200 : count <= 4 ? 240 : 280;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 36 }}>
        <div
          style={{ position: 'relative', width: '100%', height: 520, perspective: 900 }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div style={{
            position: 'absolute', top: '65%', left: '50%',
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
                    opacity: isActive ? 1 : z < -20 ? 0.25 : 0.55,
                    cursor: isActive ? 'default' : 'pointer',
                    zIndex: isActive ? 10 : 1,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {cardRenderer(item, isActive)}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, paddingTop: 120 }}>
          <NavBtn onClick={prev}>‹</NavBtn>
          <div style={{ display: 'flex', gap: 8 }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => rotateTo(i)}
                style={{
                  width: i === activeIndex ? 24 : 8, height: 8,
                  borderRadius: 4, border: 'none', padding: 0,
                  background: i === activeIndex ? GRC_RED : 'rgba(200,16,46,0.2)',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
          <NavBtn onClick={next}>›</NavBtn>
        </div>
      </div>
    );
  }

  // ── GALLERY ROW ──
  function GalleryRow() {
    return (
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.3fr 1fr',
        gap: '16px',
        marginBottom: '16px',
      }}>
        <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', height: '200px' }} />
        <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', height: '200px' }} />
        <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: '10px', height: '200px' }} />
      </div>
    );
  }

  // ── MAIN PAGE ──
  export default function Achievements() {
    return (
      <div style={styles.container}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
          *, *::before, *::after { box-sizing: border-box; }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(28px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .hero-eyebrow { animation: fadeUp 0.6s ease both; animation-delay: 0.1s; }
          .hero-heading { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
          .hero-divider { animation: fadeUp 0.6s ease both; animation-delay: 0.42s; }
          .hero-body    { animation: fadeUp 0.6s ease both; animation-delay: 0.55s; }
          .hero-image   { animation: fadeUp 0.8s ease both; animation-delay: 0.3s; }
        `}</style>

        {/* HERO SECTION */}
        <section style={styles.hero}>
          <div style={styles.noise} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(105deg, rgba(0,0,0,0.3) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', backgroundColor: '#8B0000', zIndex: 2 }} />

          <div style={{ ...styles.sectionMax, width: '100%', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '60px', flexWrap: 'wrap', padding: '100px 0',
            }}>
              <div style={{ flex: 1, minWidth: '300px', maxWidth: '580px' }}>
                <div className="hero-eyebrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
                  <span style={{ display: 'block', width: '40px', height: '2px', backgroundColor: 'rgba(255,255,255,0.5)' }} />
                  <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                    Our Achievements
                  </span>
                </div>
                <h1 className="hero-heading" style={{
                  fontFamily: "'Times New Roman', Times, serif", color: 'white', fontSize: 'clamp(38px, 5vw, 66px)',
                  fontWeight: 900, lineHeight: 1.08, letterSpacing: '-0.01em', margin: 0,
                }}>
                  Integrity in Learning, <br />
                  <span style={{ fontStyle: 'italic' }}>Trust</span> in Leadership.
                </h1>
                <div className="hero-divider" style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '32px 0', maxWidth: '340px' }}>
                  <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
                  <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: 'white', flexShrink: 0 }} />
                  <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
                </div>
                <p className="hero-body" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: 1.9, maxWidth: '450px', margin: '0' }}>
                  Four decades of academic milestones and career breakthroughs. Shaping the future of global industries.
                </p>
              </div>
              <div className="hero-image" style={{ flexShrink: 0 }}>
                <img src={GRC_ICON_PHOTO} alt="GRC Logo" style={{ width: 'clamp(260px, 33vw, 440px)', height: 'clamp(260px, 33vw, 440px)', objectFit: 'contain', filter: 'drop-shadow(0 15px 30px rgba(0,0,0,0.3))' }} />
              </div>
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section style={{ backgroundColor: 'white', padding: '100px 0' }}>
          <div style={styles.sectionMax}>
            <p style={{ textAlign: 'center', color: '#aaa', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '8px' }}>Our Work</p>
            <h2 style={{ textAlign: 'center', fontWeight: 900, fontSize: '32px', color: GRC_RED, marginBottom: '0px' }}>Projects</h2>
            <p style={{ textAlign: 'center', color: '#bbb', fontSize: '13px', marginBottom: '-40px', fontStyle: 'italic' }}>Click any card to bring it forward</p>
            <RotatingCarousel items={PROJECTS} cardRenderer={renderProjectCard} autoPlay interval={3200} />
            <hr style={{ marginTop: '60px', border: 'none', height: '2px', background: `linear-gradient(to right, transparent, ${GRC_RED}, transparent)`, opacity: 0.2 }} />
          </div>
        </section>

        {/* INNOVATION & GROWTH */}
        <section style={{ backgroundColor: 'white', paddingBottom: '150px' }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center', padding: '0 32px' }}>
            <h2 style={{ fontWeight: 900, fontSize: '36px', color: GRC_RED, marginBottom: '15px' }}>Innovation & Growth</h2>
            <p style={{ color: '#999', fontSize: '14px', marginBottom: '30px', fontStyle: 'italic' }}>Future-forward thinking and academic excellence.</p>
            <div style={{ marginBottom: '60px' }}>
              <p style={{ color: '#555', fontSize: '16px', lineHeight: 1.9, maxWidth: '800px', margin: '0 auto' }}>
                Our journey is defined by milestones bridging academic research and industry application.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '30px', textAlign: 'left', flexWrap: 'wrap', justifyContent: 'center' }}>
              <div style={{ flex: '1 1 300px', maxWidth: '450px', padding: '40px 32px', borderTop: `4px solid ${GRC_RED}`, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GRC_RED} strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: GRC_RED, textTransform: 'uppercase', margin: 0 }}>Our Mission</h3>
                </div>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, margin: 0 }}>Values-based quality education for socially responsible professionals.</p>
              </div>
              <div style={{ flex: '1 1 300px', maxWidth: '450px', padding: '40px 32px', borderTop: `4px solid ${GRC_RED}`, background: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', borderRadius: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={GRC_RED} strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: GRC_RED, textTransform: 'uppercase', margin: 0 }}>Our Vision</h3>
                </div>
                <p style={{ fontSize: '15px', color: '#444', lineHeight: 1.8, margin: 0 }}>A global community of excellent individuals with values.</p>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section style={{ backgroundColor: GRC_RED, padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
          <div style={{ ...styles.noise, opacity: 0.05 }} />
          <div style={styles.sectionMax}>
            <GalleryRow />
            <GalleryRow />
          </div>
        </section>

        {/* FOOTER & MAP */}
        <footer style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '60px 0 0 0' }}>
            <div style={styles.sectionMax}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px', paddingBottom: '60px' }}>
                    <div style={{ maxWidth: '300px' }}>
                        <h3 style={{ color: 'white', marginBottom: '20px' }}>Global Reciprocal Colleges</h3>
                        <p style={{ fontSize: '14px', color: '#aaa', lineHeight: 1.6 }}>Building a foundation of integrity and excellence for the leaders of tomorrow.</p>
                    </div>
                    <div>
                        <h4 style={{ color: GRC_RED, marginBottom: '20px' }}>Navigation</h4>
                        <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', color: '#aaa', lineHeight: 2 }}>
                            <li>Home</li>
                            <li>About Us</li>
                            <li>Achievements</li>
                            <li>Projects</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div style={{ width: '100%', height: '300px', filter: 'grayscale(100%) invert(90%)' }}>
                <iframe title="GRC Location" src="about:blank" style={{ width: '100%', height: '100%', border: 'none' }} />
            </div>
            <div style={{ textAlign: 'center', padding: '20px', fontSize: '12px', borderTop: '1px solid #333' }}>
                © 2026 Global Reciprocal Colleges. All Rights Reserved.
            </div>
        </footer>
      </div>
    );
  }