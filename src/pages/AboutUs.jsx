// ─────────────────────────────────────────────────────────────────────────────
// ABOUT US PAGE
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";

// ── IMAGES ──
const HERO_BG_PHOTO = "/img/schoool_Image_aeq4ijaeq4ijaeq4.png";
const HERO_PORTRAIT = "/img/head.1-removebg-preview.png";
const RCE_LOGO      = "/img/grc logo.png";
const DEAN_PORTRAIT = "/img/Image1-removebg-preview.png";

// ── COLORS ──
const RED   = '#C8102E';
const DKRED = '#8B0000';

// ── DATA ──
const PROFESSORS = [
  {
    id: 1,
    name: "Samuel Cubacub",
    title: "Professor, NSTP",
    bio: "Passionate about youth empowerment and civic engagement, Prof. Cubacub brings energy and purpose to every session — inspiring students to become active contributors to society.",
    highlight: false,
    image: "/img/sam.png",
  },
  {
    id: 2,
    name: "Emmanuel Dela Cruz",
    title: "Professor, NSTP",
    bio: "A visionary in social advocacy and pedagogy, Prof. Dela Cruz integrates decades of field experience into the classroom. By championing a values-first curriculum, they empower the next generation of leaders to navigate complex societal challenges with a steadfast commitment to ethical practice.",
    highlight: true,
    image: "/img/dela cruz.png",
  },
  {
    id: 3,
    name: "Jay Evangelista",
    title: "Professor, NSTP",
    bio: "With a strong background in social work and education, Prof. Evangelista champions values-based learning and equips students with the skills to serve their communities with integrity.",
    highlight: false,
    image: "/img/jay.png",
  },
  {
    id: 4,
    name: "Gezzel Marter",
    title: "Professor, NSTP",
    bio: "Prof. Gezzel bridges the gap between academic theory and community impact. Drawing from a robust background in social work, they equip students with a practical toolkit for civic engagement, ensuring every graduate is prepared to lead sustainable, integrity-driven initiatives in their local sectors.",
    highlight: true,
    image: "/img/gezzel.png",
  }
];

const SENIOR_SAS = [
  { id: 1, name: "ROMEROSO", label: "SENIOR S.A", highlight: false, image: "/img/Image_jmil.png" },
  { id: 2, name: "CLAVIO",   label: "SENIOR S.A", highlight: true, image: "/img/clavio.png" },
  { id: 3, name: "DEMAIN",   label: "SENIOR S.A", highlight: false, image: "/img/demain.png" },
  { id: 4, name: "GUARINO",  label: "SENIOR S.A", highlight: true, image: "/img/guarino.png" },
  { id: 5, name: "DISPO",    label: "SENIOR S.A", highlight: false, image: "/img/dispo.png" },
  
];

const NEW_SAS = [
  { id: 1, name: "ALAGOS",  label: "NEW S.A", image: "/img/alagos.png" },
  { id: 2, name: "SELORIO", label: "NEW S.A", image: "/img/selorio.png" },
  { id: 3, name: "NARAJA",  label: "NEW S.A", image: "/img/naraja.png" },
  { id: 4, name: "SINGHID", label: "NEW S.A", image: "/img/singhid.png" },
  { id: 5, name: "AGULLO",  label: "NEW S.A", image: "/img/agullo.png" },
  { id: 6, name: "DACULAN",  label: "NEW S.A", image: "/img/daculan.png" },
  { id: 7, name: "SOMIDO",  label: "NEW S.A", image: "/img/somido.png" },
  { id: 7, name: "ABUT",  label: "NEW S.A", image: "/img/abut.png" },
  { id: 8, name: "CALIAGA",  label: "NEW S.A", image: "/img/caliaga.png" },
  { id: 9, name: "DELA CRUZ",  label: "NEW S.A", image: "/img/dela cruz...png" },
  { id: 10, name: "ALFONSO",  label: "NEW S.A", image: "/img/alfonso.png" },
];

// ─────────────────────────────────────────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────────────────────────────────────────

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;900&display=swap');
  *, *::before, *::after { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-eyebrow { animation: fadeUp 0.6s ease both; animation-delay: 0.10s; }
  .hero-heading { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
  .hero-divider { animation: fadeUp 0.6s ease both; animation-delay: 0.42s; }
  .hero-body    { animation: fadeUp 0.6s ease both; animation-delay: 0.55s; }
  .hero-name    { animation: fadeUp 0.6s ease both; animation-delay: 0.68s; }
  .hero-image   { animation: fadeUp 0.8s ease both; animation-delay: 0.30s; }

  .prof-text-animate { animation: fadeIn 0.45s ease both; }

  /* Tablet: stack professor layout vertically */
  @media (max-width: 1024px) {
    .prof-layout        { flex-direction: column !important; }
    .prof-text-panel    { max-width: 100% !important; flex: unset !important; text-align: center !important; padding-right: 0 !important; }
    .prof-divider       { margin-left: auto !important; }
    .prof-dots          { justify-content: center !important; }
    .prof-carousel-col  { padding-left: 0 !important; }
  }

  @media (max-width: 900px) {
    .hero-inner          { flex-direction: column !important; align-items: center !important; padding: 60px 24px 0 !important; }
    .hero-text           { max-width: 100% !important; padding-bottom: 32px !important; text-align: center; }
    .hero-eyebrow        { justify-content: center; }
    .hero-divider        { margin-left: auto !important; margin-right: auto !important; }
    .hero-portrait-wrap  { width: 100% !important; align-items: center !important; }
    .hero-portrait-wrap img { width: clamp(240px, 70vw, 420px) !important; max-height: 55vh !important; }
    .hero-name-tag       { width: clamp(240px, 70vw, 420px) !important; }
    .rce-section         { flex-direction: column !important; min-height: auto !important; }
    .rce-portrait-col    { width: 100% !important; height: 60vw !important; max-height: 420px !important; }
    .rce-portrait-col img { height: 100% !important; }
    .rce-text-col        { padding: 48px 32px !important; }
    .rce-text-col > div  { margin-left: 0 !important; }
  }

  @media (max-width: 560px) {
    .hero-heading  { font-size: 30px !important; }
    .sa-section    { padding: 48px 20px 64px !important; }
    .prof-section  { padding: 48px 20px 64px !important; }
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// PORTRAIT CARD
// ─────────────────────────────────────────────────────────────────────────────

function PortraitCard({ image, width = 140, borderRadius = 10 }) {
  const height = Math.round(width * 1.42);
  return (
    <div style={{
      width, height, borderRadius,
      overflow: "hidden", flexShrink: 0,
      background: "linear-gradient(160deg, #7f1d1d 0%, #450a0a 100%)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
    }}>
      {image && (
        <img src={image} alt="profile"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAV BUTTON (carousel prev/next)
// ─────────────────────────────────────────────────────────────────────────────

function NavBtn({ onClick, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 42, height: 42, borderRadius: "50%",
        border: `2px solid ${hov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)"}`,
        background: hov ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
        color: "#fff", fontSize: 20, cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s",
      }}
    >{children}</button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D ROTATING CAROUSEL
// ─────────────────────────────────────────────────────────────────────────────

function RotatingCarousel({ items, cardRenderer, autoPlay = true, interval = 3000, onActiveChange }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused]           = useState(false);
  const timerRef                      = useRef(null);
  const count                         = items.length;

  useEffect(() => { onActiveChange?.(activeIndex); }, [activeIndex]);

  useEffect(() => {
    if (!autoPlay || paused) return;
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % count);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [paused, autoPlay, count, interval]);

  const rotateTo = (idx) => {
    setActiveIndex(idx);
    clearInterval(timerRef.current);
    setPaused(true);
    setTimeout(() => setPaused(false), 4000);
  };

  const prev = () => rotateTo((activeIndex - 1 + count) % count);
  const next = () => rotateTo((activeIndex + 1) % count);

  const angleStep = 360 / count;
  const radius    = count <= 3 ? 200 : count <= 4 ? 240 : 280;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>

      {/* 3D Stage */}
      <div
        style={{ position: "relative", width: "100%", height: 380, perspective: 900 }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 0, height: 0, transformStyle: "preserve-3d",
        }}>
          {items.map((item, i) => {
            const angle    = angleStep * i - angleStep * activeIndex;
            const rad      = (angle * Math.PI) / 180;
            const x        = Math.sin(rad) * radius;
            const z        = Math.cos(rad) * radius;
            const isActive = i === activeIndex;
            return (
              <div
                key={item.id}
                onClick={() => rotateTo(i)}
                style={{
                  position: "absolute",
                  transform: `translate(-50%, -50%) translate3d(${x}px, 0, ${z}px) rotateY(${-angle}deg)`,
                  transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.5s ease",
                  opacity: isActive ? 1 : z < -20 ? 0.28 : 0.6,
                  cursor: isActive ? "default" : "pointer",
                  zIndex: isActive ? 10 : 1,
                  transformStyle: "preserve-3d",
                }}
              >
                {cardRenderer(item, isActive)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Prev / dots / Next */}
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <NavBtn onClick={prev}>‹</NavBtn>
        <div style={{ display: "flex", gap: 8 }}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => rotateTo(i)}
              style={{
                width: i === activeIndex ? 24 : 8, height: 8,
                borderRadius: 4, border: "none", padding: 0,
                background: i === activeIndex ? RED : "rgba(255,255,255,0.3)",
                cursor: "pointer", transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
        <NavBtn onClick={next}>›</NavBtn>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARD RENDERERS
// ─────────────────────────────────────────────────────────────────────────────

function renderProfCard(person, isActive) {
  const { name, image } = person;
  return (
    <div style={{
      position: "relative",
      display: "flex", flexDirection: "column", alignItems: "center",
      borderRadius: 16,
      border: `2px solid ${isActive ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.1)"}`,
      background: isActive ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.05)",
      padding: "24px 20px 20px", gap: 14, width: 190,
      boxShadow: isActive ? "0 24px 60px rgba(0,0,0,0.6)" : "none",
      transition: "all 0.5s ease",
      backdropFilter: "blur(8px)",
    }}>
      {isActive && (
        <div style={{
          position: "absolute", top: -6, left: -6, right: -6, bottom: -6,
          borderRadius: 20, border: `2px solid ${RED}`,
          opacity: 0.55, pointerEvents: "none",
        }} />
      )}
      <PortraitCard image={image} width={150} borderRadius={10} />
      <span style={{ color: "#fff", fontWeight: 600, fontSize: 15, textAlign: "center" }}>{name}</span>
    </div>
  );
}

function renderSACard(person, isActive) {
  const { name, label, image } = person;
  const isSenior = label?.includes("SENIOR");
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      borderRadius: 16,
      border: `2px solid ${isActive ? (isSenior ? "#ef4444" : "rgba(255,255,255,0.4)") : "rgba(255,255,255,0.09)"}`,
      background: isActive
        ? isSenior ? "linear-gradient(160deg, #dc2626 0%, #991b1b 100%)" : "rgba(255,255,255,0.13)"
        : "rgba(255,255,255,0.04)",
      padding: "16px 14px 22px", gap: 12, width: 165,
      boxShadow: isActive
        ? isSenior ? "0 12px 44px rgba(220,38,38,0.55)" : "0 12px 44px rgba(0,0,0,0.4)"
        : "none",
      transition: "all 0.5s ease",
      backdropFilter: "blur(6px)",
    }}>
      {label && (
        <span style={{
          fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
          color: isActive && isSenior ? "#fff" : "#f87171",
          background: isActive && isSenior ? "rgba(255,255,255,0.18)" : "rgba(220,38,38,0.25)",
          borderRadius: 20, padding: "3px 12px",
        }}>{label}</span>
      )}
      <PortraitCard image={image} width={120} borderRadius={8} />
      <span style={{ color: "#fff", fontWeight: 600, fontSize: 14, textAlign: "center", marginTop: 4 }}>{name}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROFESSOR SECTION
// Left: large text panel. Right: carousel nudged further right via paddingLeft.
// ─────────────────────────────────────────────────────────────────────────────

function ProfessorsSection() {
  const [activeProfIndex, setActiveProfIndex] = useState(0);
  const activeProfessor = PROFESSORS[activeProfIndex];

  return (
    <section
      className="prof-section"
      style={{
        background: "linear-gradient(180deg, #cc1f1f 0%, #a81818 100%)",
        padding: "72px 32px 96px",
        overflow: "hidden",
      }}
    >
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase" }}>
          Meet Our
        </span>
      </div>
      <h2 style={{
        textAlign: "center", color: "#fff", fontWeight: 900, fontSize: 22,
        letterSpacing: "0.22em", textTransform: "uppercase", margin: "0 0 12px",
        fontFamily: "'Times New Roman', serif",
      }}>
        Professors
      </h2>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 52 }}>
        <div style={{ width: 56, height: 3, background: "rgba(255,255,255,0.35)", borderRadius: 4 }} />
      </div>

      {/* Two-column layout */}
      <div
        className="prof-layout"
        style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 0 }}
      >

        {/* ── LEFT: text panel — wider + bigger typography ── */}
        <div
          className="prof-text-panel"
          style={{
            flex: "0 0 460px",   // wider panel (was 340px)
            maxWidth: 460,
            color: "#fff",
            paddingRight: 40,
          }}
        >
          {/* key re-mounts on change → triggers fadeIn animation */}
          <div key={activeProfessor.id} className="prof-text-animate">

            {/* Eyebrow */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ display: "block", width: 48, height: 2, backgroundColor: "rgba(255,255,255,0.4)" }} />
              <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" }}>
                Faculty
              </span>
            </div>

            {/* Name — significantly larger */}
            <h3 style={{
              fontFamily: "'Times New Roman', Times, serif",
              fontSize: "clamp(34px, 4vw, 54px)",   // was clamp(24px,3vw,36px)
              fontWeight: 900,
              lineHeight: 1.1,
              margin: "0 0 12px 0",
              color: "#fff",
            }}>
              {activeProfessor.name}
            </h3>

            {/* Title — larger */}
            <p style={{
              fontSize: 15,                          // was 12
              fontWeight: 700,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 26px 0",
            }}>
              {activeProfessor.title}
            </p>

            {/* Decorative divider */}
            <div
              className="prof-divider"
              style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 26px 0", maxWidth: 340 }}
            >
              <span style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: "#fff", flexShrink: 0 }} />
              <span style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.2)" }} />
            </div>

            {/* Bio — larger */}
            <p style={{
              fontSize: 17,                          // was 14
              lineHeight: 1.9,
              color: "rgba(255,255,255,0.82)",
              margin: "0 0 36px 0",
              maxWidth: 440,
            }}>
              {activeProfessor.bio}
            </p>

            {/* Dot indicators — also control the carousel */}
            <div className="prof-dots" style={{ display: "flex", gap: 8 }}>
              {PROFESSORS.map((_, i) => (
                <span
                  key={i}
                  onClick={() => setActiveProfIndex(i)}
                  style={{
                    width: i === activeProfIndex ? 28 : 9,
                    height: 9,
                    borderRadius: 5,
                    background: i === activeProfIndex ? "#fff" : "rgba(255,255,255,0.3)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "inline-block",
                  }}
                />
              ))}
            </div>

          </div>
        </div>

        {/* ── RIGHT: carousel — paddingLeft pushes it toward the right edge ── */}
        <div
          className="prof-carousel-col"
          style={{
            flex: 1,
            minWidth: 0,
            paddingLeft: 80,   // shifts carousel to the right
          }}
        >
          <RotatingCarousel
            items={PROFESSORS}
            cardRenderer={renderProfCard}
            autoPlay
            interval={3000}
            onActiveChange={setActiveProfIndex}
          />
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutUs() {
  return (
    <main style={{ minHeight: "100vh", fontFamily: "'Poppins', sans-serif" }}>
      <style>{GLOBAL_CSS}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${HERO_BG_PHOTO})`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(139,0,0,0.4) 60%, rgba(200,16,46,0.2) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, backgroundColor: DKRED, zIndex: 2 }} />

        <div className="hero-inner" style={{ position: "relative", zIndex: 3, maxWidth: 1200, margin: "0 auto", padding: "0 48px", width: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 40, flexWrap: "wrap" }}>
          <div className="hero-text" style={{ flex: 1, minWidth: 280, maxWidth: 540, paddingBottom: 60 }}>
            <div className="hero-eyebrow" style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "block", width: 40, height: 2, backgroundColor: RED }} />
              <span style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase" }}>About Us</span>
            </div>
            <h1 className="hero-heading" style={{ fontFamily: "'Times New Roman', Times, serif", color: "white", fontSize: "clamp(32px, 5.5vw, 70px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.01em", margin: "0 0 20px 0" }}>
              Built on <span style={{ fontStyle: "italic", color: RED }}>Integrity,</span>
              <br />Bound by Community.
            </h1>
            <div className="hero-divider" style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 20px 0", maxWidth: 320 }}>
              <span style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.18)" }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: RED, flexShrink: 0 }} />
              <span style={{ flex: 1, height: 1, backgroundColor: "rgba(255,255,255,0.18)" }} />
            </div>
            <p className="hero-body" style={{ color: "rgba(255,255,255,0.78)", fontSize: 15, lineHeight: 1.9, maxWidth: 460, margin: 0 }}>
              Leaders in transformative research and grassroots extension.
              Building knowledge. Empowering communities. Changing lives.
            </p>
          </div>

          <div className="hero-image hero-portrait-wrap" style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src={HERO_PORTRAIT} alt="MRS. FRANCIS BEJOSA" style={{ width: "clamp(300px, 38vw, 520px)", height: "auto", maxHeight: "88vh", objectFit: "contain", objectPosition: "bottom", display: "block", marginBottom: 0 }} />
            <div className="hero-name hero-name-tag" style={{ backgroundColor: RED, padding: "10px 28px", width: "100%", textAlign: "center" }}>
              <p style={{ margin: 0, color: "white", fontWeight: 800, fontSize: 13, letterSpacing: "0.18em", textTransform: "uppercase" }}>MRS. FRANCIS BEJOSA</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROFESSORS ────────────────────────────────────────────────────────── */}
      <ProfessorsSection />

      {/* ── RCE ENTREPRENEUR ──────────────────────────────────────────────────── */}
      <section className="rce-section" style={{ background: "#fff", minHeight: "100vh", width: "100%", display: "flex", alignItems: "stretch", overflow: "hidden" }}>
        <div className="rce-portrait-col" style={{ width: "45%", minWidth: 280, flexShrink: 0, display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden", backgroundColor: "#f9f9f9" }}>
          <img src={DEAN_PORTRAIT} alt="DR. WILMA CARIDAD C. TOLENTINO" style={{ width: "100%", maxWidth: 600, height: "90vh", objectFit: "contain", objectPosition: "bottom", display: "block" }} />
        </div>
        <div className="rce-text-col" style={{ flex: 1, display: "flex", alignItems: "center", padding: "80px 64px" }}>
          <div style={{ marginLeft: 40 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <span style={{ display: "block", width: 40, height: 2, backgroundColor: RED }} />
            </div>
            <h2 style={{ fontFamily: "'Times New Roman', Times, serif", fontSize: "clamp(1.8rem, 3.5vw, 3rem)", fontWeight: 900, margin: "0 0 20px 0", letterSpacing: "0.02em", lineHeight: 1.1 }}>
              <span style={{ color: "#111" }}>THE </span>
              <span style={{ color: RED }}>RCE</span>
              <br />
              <span style={{ color: "#111" }}>ENTREPRENEUR</span>
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "0 0 20px 0", maxWidth: 300 }}>
              <span style={{ flex: 1, height: 1, backgroundColor: "#e5e7eb" }} />
              <span style={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: RED, flexShrink: 0 }} />
              <span style={{ flex: 1, height: 1, backgroundColor: "#e5e7eb" }} />
            </div>
            <p style={{ color: "#4b5563", fontSize: 15, lineHeight: 1.9, maxWidth: 520, margin: "0 0 28px 0" }}>
              The person who started the journey of helping people and having care at the soul of their work has now seen that vision bloom into RCE. What began as a single act of kindness is now a pillar of hope for our community.
            </p>
            <p style={{ color: "#b91c1c", fontWeight: 800, fontSize: 15, letterSpacing: "0.1em", textTransform: "uppercase", borderBottom: "2.5px solid #b91c1c", display: "inline-block", paddingBottom: 6, margin: 0 }}>
              DR. WILMA CARIDAD C. TOLENTINO
            </p>
          </div>
        </div>
      </section>

      {/* ── STUDENT ASSISTANTS ────────────────────────────────────────────────── */}
      <section className="sa-section" style={{ background: "linear-gradient(180deg, #1c1c1c 0%, #0f0f0f 100%)", padding: "72px 32px 100px", overflow: "hidden" }}>
        <h2 style={{ textAlign: "center", color: "#fff", fontWeight: 800, fontSize: 28, margin: "0 0 12px", fontFamily: "Georgia, serif" }}>
          Student Assistants
        </h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 60 }}>
          <div style={{ width: 64, height: 3, background: RED, borderRadius: 4 }} />
        </div>

        {/* Senior SAs */}
        <div style={{ marginBottom: 72 }}>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.38)", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 40 }}>
            Senior Student Assistants
          </p>
          <RotatingCarousel items={SENIOR_SAS} cardRenderer={renderSACard} autoPlay interval={3200} />
        </div>

        {/* Divider */}
        <div style={{ maxWidth: 480, margin: "0 auto 64px", display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: RED }} />
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.07)" }} />
        </div>

        {/* New SAs */}
        <div>
          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.38)", fontSize: 11, fontWeight: 700, letterSpacing: "0.24em", textTransform: "uppercase", marginBottom: 40 }}>
            New Student Assistants
          </p>
          <RotatingCarousel items={NEW_SAS} cardRenderer={renderSACard} autoPlay interval={2600} />
        </div>
      </section>

    </main>
  );
}
