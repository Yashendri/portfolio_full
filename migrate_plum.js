const fs = require('fs');
let css = fs.readFileSync('frontend/css/style.css', 'utf8');

// 1. Root variables
css = css.replace(/:root \{[\s\S]*?\}/, `:root {
  /* Blush White & Plum Theme */
  --clr-bg-main: #FDF6F4;      /* Blush White */
  --clr-card: #F5E8E4;         /* Soft Rose */
  --clr-bg-deep: #EDD8D2;      /* Dusty Blush */
  --clr-text-light: #FDF6F4;   /* For button text */
  --clr-text-dark: #1E1218;    /* Deep Plum Black */
  --clr-text-secondary: #6B4455; /* Muted Mauve */
  --clr-muted: #9C7080;        /* Soft Muted Rose */
  
  --clr-accent: #6B2D5E;       /* Deep Plum */
  --clr-accent-hover: #521F48; /* Darker Plum */
  --clr-highlight: #E8845C;    /* Burnt Coral */
  --clr-highlight-hover: #D06A42; /* Deeper Coral */
  --clr-border: #E2CCC6;       /* Warm Rose Grey */

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Poppins', sans-serif;

  /* Spacing & Utilities */
  --border-radius: 16px;
  --shadow-soft: 0 4px 15px rgba(0, 0, 0, 0.04);
  --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.08); /* Lighter shadow to keep it airy */
  --transition: all 0.4s ease;
}`);

// Coral dot section title replacement
css = css.replace(/\.section-title::after \{[\s\S]*?\}/, `.section-title::after {
  content: '';
  display: block;
  width: 8px;
  height: 8px;
  background-color: var(--clr-highlight);
  margin: 1.2rem auto 0;
  border-radius: 50%;
}`);

// Navbar RGB updates
css = css.replace(/background-color: rgba\(250, 247, 242, 0\.95\);/, 'background-color: rgba(253, 246, 244, 0.95);');

// Shadows & glow rgba updates (switching navy rgba to plum rgba / muted)
css = css.replace(/rgba\(27, 58, 107, 0\.2\)/g, 'rgba(107, 45, 94, 0.2)');
css = css.replace(/rgba\(27, 58, 107, 0\.3\)/g, 'rgba(107, 45, 94, 0.3)');
css = css.replace(/rgba\(27, 58, 107, 0\.1\)/g, 'rgba(107, 45, 94, 0.1)');
css = css.replace(/background: rgba\(20, 45, 84, 0\.85\);/, 'background: rgba(30, 18, 24, 0.85);'); /* Modal overlay (Deep Plum Black) */

// Project Cards
// Inject the new placeholder hover overlay class just before .card h3
if (!css.includes('.card-img-placeholder')) {
  css = css.replace(/\.card h3 \{/, `.card {
  padding: 2.5rem 2.5rem; /* adjusted padding to accommodate image */
}

.card-img-placeholder {
  width: 100%;
  height: 180px;
  background-color: var(--clr-bg-deep); 
  border-radius: 8px;
  margin-bottom: 1.5rem;
  position: relative;
  overflow: hidden;
}

.card-img-placeholder::after {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background-color: rgba(107, 45, 94, 0.08); /* Plum Tint overlay */
  opacity: 0;
  transition: var(--transition);
}

.card:hover .card-img-placeholder::after {
  opacity: 1; /* blooms on hover */
}

.card h3 {`);
}

// 9. Footer styling fixes according to rules
css = css.replace(/\.footer \{[\s\S]*?\}/, `.footer {
  background-color: var(--clr-text-dark); /* #1E1218 deep plum black */
  border-top: 4px solid var(--clr-accent); /* Plum accent line */
  padding: 3rem 0;
  text-align: center;
}`);

// Write back
fs.writeFileSync('frontend/css/style.css', css, 'utf8');
