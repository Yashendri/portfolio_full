const fs = require('fs');
let css = fs.readFileSync('frontend/css/style.css', 'utf8');

// 1. Root variables
css = css.replace(/:root \{[\s\S]*?\}/, `:root {
  /* Dark Plum & Coral Theme */
  --clr-bg-main: #1A1117;      /* Deep Plum Charcoal */
  --clr-card: #241820;         /* Dark Rose Charcoal */
  --clr-bg-deep: #0F0A0E;      /* Obsidian Plum */
  --clr-text-light: #FDF6F4;   /* For button text & inverse elements */
  --clr-text-dark: #FDF6F4;    /* Blush White - For Headers */
  --clr-text-secondary: #B59AA6; /* Lilac Grey - For Body text */
  --clr-muted: #806372;        /* Dark Muted Lilac */
  
  --clr-accent: #A95499;       /* Vibrant Plum */
  --clr-accent-hover: #C76DB5; /* Lighter Plum */
  --clr-highlight: #E8845C;    /* Burnt Coral */
  --clr-highlight-hover: #D06A42; /* Deeper Coral */
  --clr-border: #3B2835;       /* Deep Rose Grey */

  /* Typography */
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Poppins', sans-serif;

  /* Spacing & Utilities */
  --border-radius: 16px;
  --shadow-soft: 0 4px 15px rgba(0, 0, 0, 0.3);
  --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.4); 
  --transition: all 0.4s ease;
}`);

// Navbar RGB updates (deep charcoal instead of blush white)
css = css.replace(/background-color: rgba\(253, 246, 244, 0\.95\);/, 'background-color: rgba(26, 17, 23, 0.95);');

// Shadows & glow rgba updates (switching light plum rgba to deep plum rgba / muted)
css = css.replace(/rgba\(107, 45, 94, 0\.2\)/g, 'rgba(169, 84, 153, 0.2)');
css = css.replace(/rgba\(107, 45, 94, 0\.3\)/g, 'rgba(169, 84, 153, 0.3)');
css = css.replace(/rgba\(107, 45, 94, 0\.1\)/g, 'rgba(169, 84, 153, 0.1)');

// Modal overlay 
css = css.replace(/background: rgba\(30, 18, 24, 0\.85\);/, 'background: rgba(15, 10, 14, 0.85);');

// Blockquote background match
css = css.replace(/background-color: var\(--clr-bg-deep\); \/\* Switched to Dusty Blush for darker contrast \*\//g, 'background-color: var(--clr-card);');

// Footer 
css = css.replace(/background-color: var\(--clr-text-dark\); \/\* #1E1218 deep plum black \*\//g, 'background-color: var(--clr-bg-deep);'); 

// Write back
fs.writeFileSync('frontend/css/style.css', css, 'utf8');
