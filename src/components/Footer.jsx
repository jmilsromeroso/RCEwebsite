import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

// ─── Brand Color ──────────────────────────────────────────────────────────────
const GRC_RED = '#C8102E'

// ─── Data & Styles (Unchanged) ───────────────────────────────────────────────
const SOCIAL_LINKS = [
  { label: 'Facebook', href: 'https://www.facebook.com/GrcRCExtension', icon: (<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978 1.602 0 2.44.119 2.84.174v3.307l-1.957.001c-1.936 0-2.312.911-2.312 2.272v1.804h4.333l-.565 3.667h-3.768v7.981H9.101z" /></svg>) },
  { label: 'Instagram', href: '#', icon: (<svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>) },
  { label: 'Youtube', href: '#', icon: (<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" /></svg>) },
  { label: 'LinkedIn', href: '#', icon: (<svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>) },
]

const NAV_LINKS = [
  { label: 'Achievements', path: '/achievements' },
  { label: 'Alumni', path: '/alumni' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
]

const styles = {
  columnHeading: { fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'white', marginBottom: '20px' },
  mutedText: { color: 'rgba(255,255,255,0.6)', fontSize: '13px', lineHeight: 1.8 },
}

// ─── Sub-components (Unchanged) ───────────────────────────────────────────────
function SocialIcon({ label, href, icon }) {
  return (
    <a href={href} aria-label={label} style={{ width: '32px', height: '32px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', textDecoration: 'none', flexShrink: 0 }}>
      {icon}
    </a>
  )
}

function FollowUsColumn({ isMobile }) {
  return (
    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
      <p style={styles.columnHeading}>Follow Us</p>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap' }}>
        {SOCIAL_LINKS.map((social) => <SocialIcon key={social.label} {...social} />)}
      </div>
      <Link to="/contact" style={{ display: 'inline-block', backgroundColor: GRC_RED, color: 'white', fontSize: '12px', fontWeight: 700, padding: '10px 20px', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.08em', borderRadius: '4px' }}>
        Contact Us
      </Link>
    </div>
  )
}

function OfficeHoursColumn({ isMobile }) {
  return (
    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
      <p style={styles.columnHeading}>Office Hours</p>
      <p style={{ ...styles.mutedText, lineHeight: 2 }}>Monday to Saturday<br />8:00 AM – 5:00 PM<br /><br />Sunday<br />Closed</p>
    </div>
  )
}

function CompanyLinksColumn({ isMobile }) {
  return (
    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
      <p style={styles.columnHeading}>Company</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {NAV_LINKS.map((link) => (
          <Link key={link.label} to={link.path} style={{ ...styles.mutedText, textDecoration: 'none' }}>{link.label}</Link>
        ))}
      </div>
    </div>
  )
}

function ContactColumn({ isMobile }) {
  return (
    <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
      <p style={styles.columnHeading}>Contact</p>
      <p style={styles.mutedText}>
        454 GRC Building, Rizal Ave Ext,<br />Cor. 9th Avenue Grace Park,<br />Caloocan, City<br /><br />
        0999-999-9999<br />(63+) 900-000-0000<br /><br />
        <a href="mailto:rceassistextension0104@gmail.com" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'underline', wordBreak: 'break-all' }}>
          rceassistextension0104@gmail.com
        </a>
      </p>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Footer() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth > 768 && windowWidth <= 1024;

  return (
    <footer
      style={{
        backgroundColor: '#111',
        color: 'white',
        padding: isMobile ? '40px 20px 24px' : '56px 32px 32px',
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Responsive Grid System */}
        <div
          style={{
            display: 'grid',
            // 1 column for mobile, 2 for tablet, 4 for desktop
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
            gap: isMobile ? '32px' : '40px',
          }}
        >
          <FollowUsColumn isMobile={isMobile} />
          <OfficeHoursColumn isMobile={isMobile} />
          <CompanyLinksColumn isMobile={isMobile} />
          <ContactColumn isMobile={isMobile} />
        </div>

        {/* Bottom copyright bar */}
        <div
          style={{
            marginTop: '48px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingTop: '20px',
            textAlign: isMobile ? 'center' : 'left'
          }}
        >
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
            © {new Date().getFullYear()} Global Reciprocal Colleges. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}