const fs = require('fs');
let css = fs.readFileSync('frontend/css/style.css', 'utf8');

// 1. Root variables
css = css.replace(/:root \{[\s\S]*?\}/, `:root {
  /* Warm Cream & Navy Light Theme Palette */
  --clr-bg-main: #FAF7F2;      /* Warm Cream */
  --clr-card: #F0EAE0;         /* Soft Linen */
  --clr-bg-deep: #E8DFD0;      /* Sand */
  --clr-text-light: #FAF7F2;   /* Canvas Light */
  --clr-text-dark: #1C1C1C;    /* Near Black */
  --clr-text-secondary: #5A5347; /* Warm Brown Grey */
  --clr-muted: #8C8279;        /* Muted Warm Grey */
  
  --clr-accent: #1B3A6B;       /* Deep Navy */
  --clr-accent-hover: #142D54; /* Darker Navy */
  --clr-highlight: #C9A84C;    /* Antique Gold */
  --clr-highlight-hover: #A8893C; /* Deeper Gold */
  --clr-border: #DDD5C8;       /* Warm Grey */

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Poppins', sans-serif;

  /* Spacing & Utilities */
  --border-radius: 16px;
  --shadow-soft: 0 4px 15px rgba(0, 0, 0, 0.05);
  --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.1);
  --transition: all 0.4s ease;
}`);

// 2. Global
css = css.replace(/body \{[\s\S]*?\}/, `body {
  font-family: var(--font-body);
  background-color: var(--clr-bg-main);
  color: var(--clr-text-secondary);
  line-height: 1.6;
  overflow-x: hidden;
}`);
css = css.replace(/h1, h2, h3, h4, .logo \{[\s\S]*?\}/, `h1, h2, .logo {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--clr-text-dark);
}

h3, h4 {
  font-family: var(--font-heading);
  font-weight: 600;
  color: var(--clr-accent);
}`);
css = css.replace(/a:hover \{\s*color: var\(--clr-highlight\);\s*\}/, '');
css = css.replace(/a \{[\s\S]*?\}/, `a {
  text-decoration: none;
  color: var(--clr-accent);
  transition: var(--transition);
}
a:hover {
  color: var(--clr-highlight);
}`);

// 3. Navbar
css = css.replace(/\.navbar \{[\s\S]*?\}/, `.navbar {
  position: fixed;
  top: 0;
  background-color: rgba(250, 247, 242, 0.95);
  backdrop-filter: blur(12px);
  z-index: 1000;
  padding: 1.5rem 0;
  width: 100%;
  border-bottom: 1px solid var(--clr-border);
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}`);
css = css.replace(/\.nav-links a \{[\s\S]*?\}/, `.nav-links a {
  font-weight: 500;
  transition: var(--transition);
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--clr-text-dark);
}`);
css = css.replace(/\.nav-links a:hover,[\s\S]*?\}/, `.nav-links a:hover,
.nav-links a.active {
  color: var(--clr-accent); 
}`);

// 4. Buttons
css = css.replace(/\.btn-primary \{[\s\S]*?\}/, `.btn-primary {
  background-color: var(--clr-accent);
  color: var(--clr-text-light);
  box-shadow: 0 4px 15px rgba(27, 58, 107, 0.2); 
  font-weight: 600;
}`);
css = css.replace(/\.btn-primary:hover \{[\s\S]*?\}/, `.btn-primary:hover {
  background-color: var(--clr-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(27, 58, 107, 0.3);
  color: var(--clr-text-light);
}`);
css = css.replace(/\.btn-outline \{[\s\S]*?\}/, `.btn-outline {
  border: 1.5px solid var(--clr-accent);
  color: var(--clr-accent);
  background: transparent;
  font-weight: 600;
}`);
css = css.replace(/\.btn-outline:hover \{[\s\S]*?\}/, `.btn-outline:hover {
  background-color: var(--clr-accent);
  color: var(--clr-text-light); 
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(27, 58, 107, 0.2);
}`);

// 5. Hero
css = css.replace(/\.hero::before \{[\s\S]*?\}/, ''); // Remove glow
css = css.replace(/text-shadow: 2px 2px 10px rgba\(0,0,0,0\.5\);/g, ''); // Remove text shadow
css = css.replace(/\.hero-desc \{[\s\S]*?\}/, `.hero-desc {
  margin-bottom: 2.5rem;
  font-size: 1.1rem;
  line-height: 1.8;
  max-width: 550px;
  color: var(--clr-text-secondary);
}`);
css = css.replace(/background-color: var\(--clr-card\);/g, 'background-color: transparent;'); // Clear profile img bg

// 6. Section layout
css = css.replace(/#about \{/, '#about, #certifications {\\n  background-color: var(--clr-card);\\n}\\n\\n#about {');
css = css.replace(/#projects \{/, '#projects {\\n  background-color: var(--clr-bg-main);\\n}\\n\\n#projects {');

// 7. Cards & Modals logic...
css = css.replace(/\.card \{[\s\S]*?\}/, `.card {
  background-color: var(--clr-card); 
  color: var(--clr-text-secondary); 
  border-radius: var(--border-radius);
  padding: 3rem 2.5rem;
  box-shadow: var(--shadow-soft);
  transition: var(--transition);
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--clr-border);
  cursor: pointer;
}`);
css = css.replace(/\.card h3 \{[\s\S]*?\}/, `.card h3 {
  color: var(--clr-text-dark); 
  margin-bottom: 1rem;
  font-size: 1.6rem;
  font-weight: 700;
}`);
css = css.replace(/\.card p \{[\s\S]*?\}/, `.card p {
  margin-bottom: 1.5rem;
  flex-grow: 1;
  color: var(--clr-text-secondary);
}`);
css = css.replace(/\.card:hover \{[\s\S]*?\}/, `.card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: var(--shadow-hover);
  border-color: var(--clr-highlight); 
  background-color: var(--clr-bg-deep);
}`);
css = css.replace(/\.tag \{[\s\S]*?\}/, `.tag {
  background-color: var(--clr-card);
  color: var(--clr-text-dark); 
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  border: 1px solid var(--clr-highlight);
}`);

// 8. Contact Section
css = css.replace(/\.contact-section \{[\s\S]*?\}/, `.contact-section {
  background-color: var(--clr-bg-deep);
}`);
css = css.replace(/\.form-control \{[\s\S]*?\}/, `.form-control {
  width: 100%;
  padding: 1.2rem;
  border: 1px solid var(--clr-border);
  border-radius: 8px;
  font-family: var(--font-body);
  background-color: var(--clr-bg-main); 
  color: var(--clr-text-dark);
  transition: var(--transition);
}`);
css = css.replace(/\.form-control::placeholder \{[\s\S]*?\}/, `.form-control::placeholder {
  color: var(--clr-muted); 
}`);
css = css.replace(/\.form-control:focus \{[\s\S]*?\}/, `.form-control:focus {
  outline: none;
  border: 1px solid var(--clr-accent);
  box-shadow: 0 0 0 3px rgba(27, 58, 107, 0.1);
}`);

// 9. Footer
css = css.replace(/\.footer \{[\s\S]*?\}/, `.footer {
  background-color: var(--clr-accent);
  padding: 3rem 0;
  border-top: none;
  text-align: center;
}`);
css = css.replace(/\.footer-logo \{[\s\S]*?\}/, `.footer-logo {
  font-family: var(--font-heading);
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--clr-text-light);
}`);
css = css.replace(/\.footer-text \{[\s\S]*?\}/, `.footer-text {
  color: var(--clr-text-light);
  font-size: 0.95rem;
}`);
css = css.replace(/\.footer-socials a \{[\s\S]*?\}/, `.footer-socials a {
  color: var(--clr-text-light); 
  font-weight: 500;
  transition: var(--transition);
}`);
css = css.replace(/\.footer-socials a:hover \{[\s\S]*?\}/, `.footer-socials a:hover {
  color: var(--clr-highlight);
  transform: translateY(-2px);
}`);

// 10. Modals
css = css.replace(/\.modal-overlay \{[\s\S]*?\}/, `.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(20, 45, 84, 0.85); /* Navy transparent */
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}`);
css = css.replace(/\.modal \{[\s\S]*?\}/, `.modal {
  background-color: var(--clr-bg-main); 
  color: var(--clr-text-secondary); 
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  border-radius: var(--border-radius);
  padding: 3rem;
  position: relative;
  transform: translateY(50px) scale(0.95);
  transition: all 0.4s ease;
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
  border: 1px solid var(--clr-border);
}`);
css = css.replace(/\.modal-close \{[\s\S]*?\}/, `.modal-close {
  position: absolute;
  top: 1.5rem; right: 1.5rem;
  background: none;
  border: none;
  color: var(--clr-text-dark);
  font-size: 2rem;
  cursor: pointer;
  transition: var(--transition);
}`);
css = css.replace(/\.modal-section p, .modal-section ul \{[\s\S]*?\}/, `.modal-section p, .modal-section ul {
  font-size: 1.05rem;
  color: var(--clr-text-secondary);
}`);
css = css.replace(/\.modal-section h4 \{[\s\S]*?\}/, `.modal-section h4 {
  font-size: 1.2rem;
  color: var(--clr-accent); 
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--clr-border);
  padding-bottom: 0.5rem;
}`);
css = css.replace(/var\(--clr-card\)/g, 'var(--clr-text-secondary)'); // Edge cases for light theme text

// 11. Custom classes appended earlier
css = css.replace(/\.badge-internship \{[\s\S]*?\}/, `.badge-internship {
  font-size: 0.75rem;
  background-color: var(--clr-card);
  border: 1px solid var(--clr-highlight);
  color: var(--clr-text-dark);
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-weight: 500;
  white-space: nowrap;
}`);
css = css.replace(/\.social-icon \{[\s\S]*?\}/, `.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: var(--clr-card);
  border: 1px solid var(--clr-border);
  color: var(--clr-accent);
  font-size: 0.9rem;
  font-weight: 600;
  transition: var(--transition);
}`);
css = css.replace(/\.skill-pill \{[\s\S]*?\}/, `.skill-pill {
  background-color: var(--clr-card); 
  color: var(--clr-text-dark); 
  padding: 0.6rem 1.2rem;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1px solid var(--clr-highlight);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  opacity: 0;
  animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
  animation-delay: var(--delay, 0s);
  transition: var(--transition);
}`);
css = css.replace(/\.skill-pill:hover \{[\s\S]*?\}/, `.skill-pill:hover {
  background-color: var(--clr-bg-deep);
  transform: translateY(-3px) scale(1.05);
}`);

css = css.replace(/\.cert-card \{[\s\S]*?\}/, `.cert-card {
  background-color: var(--clr-card);
  border: 1px solid var(--clr-border);
  padding: 2.5rem 2rem;
  border-radius: var(--border-radius);
  transition: var(--transition);
  display: flex;
  flex-direction: column;
  height: 100%;
}`);
css = css.replace(/\.cert-card p \{[\s\S]*?\}/, `.cert-card p {
  color: var(--clr-text-secondary);
  margin-bottom: 1.5rem;
  flex-grow: 1;
}`);
css = css.replace(/\.modal-meta \{[\s\S]*?\}/, `.modal-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  background-color: var(--clr-bg-deep);
  padding: 1rem 1.5rem;
  border-radius: 8px;
  border-left: 3px solid var(--clr-accent);
  margin-bottom: 1.5rem;
  margin-top: 1rem;
}`);
css = css.replace(/\.meta-item \{[\s\S]*?\}/, `.meta-item {
  font-size: 0.95rem;
  color: var(--clr-text-dark);
}`);
css = css.replace(/\.footer-nav a \{[\s\S]*?\}/, `.footer-nav a {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 500;
  transition: var(--transition);
  color: var(--clr-text-light);
}`);
css = css.replace(/\.footer-tagline \{[\s\S]*?\}/, `.footer-tagline {
  font-size: 1rem;
  color: var(--clr-highlight);
  font-style: italic;
  font-weight: 500;
}`);

// Ticker Section
css = css.replace(/\.ticker-container \{[\s\S]*?\}/, `.ticker-container {
  width: 100%;
  background-color: var(--clr-accent);
  overflow: hidden;
  padding: 0.8rem 0;
  border-top: 1px solid var(--clr-border);
  border-bottom: 1px solid var(--clr-border);
  display: flex;
}`);
css = css.replace(/\.ticker-item \{[\s\S]*?\}/, `.ticker-item {
  color: var(--clr-highlight);
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}`);

fs.writeFileSync('frontend/css/style.css', css, 'utf8');
