import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'

// 1. Ensure this path points to your actual logo file
import grcLogo from '/img/logo.png'

const GRC_RED = '#C8102E'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Achievements', path: '/achievements' },
  { label: 'Alumni', path: '/alumni' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact Us', path: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setScrolled(currentY > 10)
      setVisible(currentY < lastScrollY.current || currentY < 10)
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  return (
    <>
      <style>
        {`
          /* Hide Desktop Links on Mobile */
          .desktop-menu {
            display: flex;
            align-items: center;
            gap: 4px;
            list-style: none;
            margin: 0;
            padding: 0;
          }

          /* Hide Burger Button on Desktop */
          .burger-button {
            display: none; 
            background: none; 
            border: none; 
            cursor: pointer; 
            padding: 4px; 
            color: #333;
          }

          .nav-logo {
            height: 48px;
            transition: height 0.3s ease;
          }

          /* MOBILE RESPONSIVE LOGIC */
          @media (max-width: 1024px) {
            .desktop-menu {
              display: none; /* Hide standard links */
            }
            .burger-button {
              display: block; /* Show burger button only on mobile/tablet */
            }
            .nav-logo {
              height: 36px;
            }
          }
        `}
      </style>

      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        backgroundColor: 'white',
        boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.1)' : '0 1px 4px rgba(0,0,0,0.06)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        fontFamily: "'Poppins', sans-serif",
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              src={grcLogo}
              className="nav-logo"
              alt="Logo"
              style={{ width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* DESKTOP LINKS - Now controlled by .desktop-menu class */}
          <ul className="desktop-menu">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  style={{
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontWeight: 600,
                    padding: '6px 14px',
                    borderRadius: '999px',
                    display: 'block',
                    transition: 'all 0.2s',
                    backgroundColor: isActive(link.path) ? GRC_RED : 'transparent',
                    color: isActive(link.path) ? 'white' : '#444',
                  }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* BURGER BUTTON - Now controlled by .burger-button class */}
          <button
            className="burger-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* MOBILE DROPDOWN MENU */}
        {menuOpen && (
          <div style={{
            backgroundColor: 'white',
            borderTop: '1px solid #f0f0f0',
            padding: '16px 20px 24px',
            position: 'absolute',
            width: '100%',
            left: 0,
            boxShadow: '0 10px 15px rgba(0,0,0,0.05)'
          }}>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      textDecoration: 'none', fontSize: '15px', fontWeight: 600,
                      padding: '12px 16px', borderRadius: '8px', display: 'block',
                      backgroundColor: isActive(link.path) ? GRC_RED : 'transparent',
                      color: isActive(link.path) ? 'white' : '#444',
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}
