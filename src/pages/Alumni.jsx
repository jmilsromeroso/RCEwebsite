import { useState } from 'react';

// ── 1. CONFIGURATION & THEME ──
const GRC_RED = '#C8102E';
const NOISE_SVG = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const HERO_BG_PHOTO = "/img/schoool_Image_aeq4ijaeq4ijaeq4.png"; 

// ── 2. MODULAR STYLES ──
const styles = {
  input: {
    width: '100%',
    padding: '14px 18px',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '6px',
    fontSize: '14px',
    backgroundColor: 'rgba(255,255,255,0.12)',
    color: 'white',
    outline: 'none',
    fontFamily: "'Poppins', sans-serif",
    transition: 'all 0.2s ease',
  },
  button: {
    backgroundColor: GRC_RED,
    color: 'white',
    border: 'none',
    padding: '14px 36px',
    fontWeight: 700,
    fontSize: '14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '0.05em',
    transition: 'opacity 0.2s ease',
  },
  formContainer: {
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '12px',
    padding: '40px',
    backgroundColor: 'rgba(0,0,0,0.15)',
    backdropFilter: 'blur(5px)',
  },
  gridTwo: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  gridThree: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' },
  heroBg: {
    position: 'absolute', 
    inset: 0,
    backgroundImage: `url(${HERO_BG_PHOTO})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    zIndex: 0
  },
  heroOverlay: {
    position: 'absolute', 
    inset: 0, 
    background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(139,0,0,0.4) 60%, rgba(200,16,46,0.2) 100%)',
    zIndex: 1
  }
};

function Field({ placeholder, value, onChange, name }) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={styles.input}
      autoComplete="off"
    />
  );
}

export default function Alumni() {
  const [form, setForm] = useState({
    studentNo: '', name: '', address: '', facebookName: '',
    email: '', courseMajor: '', yearGraduated: '', contactNo: '',
    jobTitle: '', companyName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    if (window.confirm("Are you sure you want to clear the form?")) {
      setForm({
        studentNo: '', name: '', address: '', facebookName: '',
        email: '', courseMajor: '', yearGraduated: '', contactNo: '',
        jobTitle: '', companyName: '',
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

        input::placeholder { color: rgba(255,255,255,0.55); }
        input:focus { border-color: rgba(255,255,255,0.6); background-color: rgba(255,255,255,0.18); }
        button:hover { opacity: 0.9; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow  { animation: fadeUp 0.6s ease both; animation-delay: 0.1s; }
        .hero-heading  { animation: fadeUp 0.7s ease both; animation-delay: 0.25s; }
        .hero-divider  { animation: fadeUp 0.6s ease both; animation-delay: 0.42s; }
        .hero-body     { animation: fadeUp 0.6s ease both; animation-delay: 0.55s; }
      `}</style>

      {/* ── HERO SECTION ── */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}>
        <div style={styles.heroBg} />
        <div style={styles.heroOverlay} />

        {/* Red bottom accent line */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '6px', backgroundColor: GRC_RED, zIndex: 2 }} />

        {/* Hero content */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 48px',
          width: '100%',
        }}>

          {/* Eyebrow */}
          <div className="hero-eyebrow" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '32px',
          }}>
            <span style={{ display: 'block', width: '40px', height: '2px', backgroundColor: GRC_RED }} />
            <span style={{
              color: 'rgba(255,255,255,0.65)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: "'Poppins', sans-serif",
            }}>
              Alumni Network
            </span>
          </div>

          {/* Heading — Times New Roman */}
          <h1 className="hero-heading" style={{
            fontFamily: "'Times New Roman', Times, serif",
            color: 'white',
            fontSize: 'clamp(38px, 5.5vw, 70px)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            maxWidth: '740px',
            margin: '0',
          }}>
            Securing Our Legacy,{' '}
            <br />
            <span style={{ color: GRC_RED, fontStyle: 'italic' }}>Reciprocating</span>{' '}
            Your Success.
          </h1>

          {/* Divider */}
          <div className="hero-divider" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            margin: '36px 0',
            maxWidth: '340px',
          }}>
            <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.18)' }} />
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: GRC_RED, flexShrink: 0 }} />
            <span style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.18)' }} />
          </div>

          {/* Body */}
          <p className="hero-body" style={{
            fontFamily: "'Poppins', sans-serif",
            color: 'rgba(255,255,255,0.78)',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: 1.9,
            maxWidth: '460px',
            margin: '0',
          }}>
            From your first steps as a student to your journey as a leader,
            we provide professional connections tailored to your growth.
          </p>

        </div>
      </section>

      {/* ── ALUMNI FORM SECTION ── */}
      <section id="alumni-form" style={{ background: `linear-gradient(170deg, #9b0020 0%, #6b0010 100%)`, padding: '80px 32px', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none', backgroundImage: NOISE_SVG }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: 900, textTransform: 'uppercase', marginBottom: '40px', textAlign: 'center' }}>
            Alumni Information Sheet
          </h2>

          <div style={styles.formContainer}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={styles.gridTwo}>
                <Field placeholder="Student Number" name="studentNo" value={form.studentNo} onChange={handleChange} />
                <Field placeholder="Full Name" name="name" value={form.name} onChange={handleChange} />
              </div>

              <Field placeholder="Permanent Address" name="address" value={form.address} onChange={handleChange} />

              <div style={styles.gridTwo}>
                <Field placeholder="Facebook Name" name="facebookName" value={form.facebookName} onChange={handleChange} />
                <Field placeholder="Email Address" name="email" value={form.email} onChange={handleChange} />
              </div>

              <div style={styles.gridThree}>
                <Field placeholder="Course & Major" name="courseMajor" value={form.courseMajor} onChange={handleChange} />
                <Field placeholder="Year Graduated" name="yearGraduated" value={form.yearGraduated} onChange={handleChange} />
                <Field placeholder="Contact Number" name="contactNo" value={form.contactNo} onChange={handleChange} />
              </div>

              <div style={styles.gridTwo}>
                <Field placeholder="Current Job Title" name="jobTitle" value={form.jobTitle} onChange={handleChange} />
                <Field placeholder="Company Name" name="companyName" value={form.companyName} onChange={handleChange} />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" onClick={handleClear} style={{ ...styles.button, backgroundColor: 'transparent', border: '1px solid white' }}>
                  Clear Form
                </button>
                <button type="submit" style={styles.button}>
                  Submit!
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
