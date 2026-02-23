#!/usr/bin/env python3
"""
Generate Tier 1 Architect Portrait SVGs following V2 Style Spec
Generates 12 SVG files (6 architects x 2 sizes each)
"""

import os

# V2 Color Palette
COLORS = {
    'terracotta': 'rgb(194, 114, 84)',
    'terracotta_dark': 'rgb(156, 88, 64)',
    'charcoal': 'rgb(55, 52, 50)',
    'gold': 'rgb(212, 178, 112)',
    'cypress': 'rgb(168, 132, 98)',
    'cypress_dark': 'rgb(138, 105, 75)',
    'slate': 'rgb(82, 90, 100)',
    'slate_light': 'rgb(140, 155, 175)',
    'sand': 'rgb(232, 218, 195)',
    'warm_white': 'rgb(252, 250, 247)',
}

def get_animation_styles():
    """Return CSS animation styles for V2 spec"""
    return """
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.85; }
    }
    @keyframes breathe {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02); }
    }
    .accent { animation: pulse 4s ease-in-out infinite; }
    .portrait-main { transform-origin: center center; }
    """

def generate_john_lautner_portrait(width=400, height=400):
    """John Lautner - Angular face with octagonal framing, Chemosphere silhouette"""
    is_wide = width == 800
    cx = width // 2
    cy = height // 2
    scale = 1.0 if not is_wide else 0.9
    offset_x = 0 if not is_wide else 200

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>{get_animation_styles()}</style>
    <linearGradient id="face-grad-lautner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{COLORS['cypress']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{COLORS['cypress_dark']};stop-opacity:1" />
    </linearGradient>
    <linearGradient id="hair-grad-lautner" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{COLORS['slate']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{COLORS['charcoal']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Warm White Background -->
  <rect width="{width}" height="{height}" fill="{COLORS['warm_white']}"/>

  <!-- Subtle Chemosphere silhouette in background -->
  <g class="building-accent" opacity="0.12" transform="translate({offset_x}, 0)">
    <polygon points="{cx},30 {cx+70},65 {cx+95},135 {cx+70},205 {cx},240 {cx-70},205 {cx-95},135 {cx-70},65" fill="{COLORS['terracotta']}"/>
    <rect x="{cx-12}" y="240" width="24" height="50" fill="{COLORS['charcoal']}"/>
  </g>

  <!-- Portrait Composition -->
  <g class="portrait-main" transform="translate({offset_x}, 0)">
    <!-- Octagonal face frame - signature Lautner geometry -->
    <polygon points="{cx},{cy-90} {cx+55},{cy-55} {cx+70},{cy+10} {cx+55},{cy+75} {cx},{cy+100} {cx-55},{cy+75} {cx-70},{cy+10} {cx-55},{cy-55}"
      fill="url(#face-grad-lautner)" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Hair - Angular geometric form -->
    <polygon points="{cx-55},{cy-55} {cx},{cy-110} {cx+55},{cy-55} {cx+45},{cy-70} {cx},{cy-95} {cx-45},{cy-70}"
      fill="url(#hair-grad-lautner)"/>

    <!-- Eyes - Bold geometric rectangles -->
    <g class="eyes">
      <rect x="{cx-45}" y="{cy-20}" width="32" height="14" fill="{COLORS['charcoal']}" rx="2"/>
      <rect x="{cx+13}" y="{cy-20}" width="32" height="14" fill="{COLORS['charcoal']}" rx="2"/>
      <rect x="{cx-42}" y="{cy-17}" width="10" height="5" fill="{COLORS['gold']}" class="accent"/>
      <rect x="{cx+16}" y="{cy-17}" width="10" height="5" fill="{COLORS['gold']}" class="accent"/>
    </g>

    <!-- Glasses - Distinctive geometric frames -->
    <g class="glasses" fill="none" stroke="{COLORS['charcoal']}" stroke-width="3">
      <rect x="{cx-52}" y="{cy-28}" width="44" height="26" rx="3"/>
      <rect x="{cx+8}" y="{cy-28}" width="44" height="26" rx="3"/>
      <line x1="{cx-8}" y1="{cy-15}" x2="{cx+8}" y2="{cy-15}"/>
      <line x1="{cx-52}" y1="{cy-15}" x2="{cx-65}" y2="{cy-22}"/>
      <line x1="{cx+52}" y1="{cy-15}" x2="{cx+65}" y2="{cy-22}"/>
    </g>

    <!-- Nose - Angular triangle -->
    <polygon points="{cx},{cy+5} {cx+12},{cy+45} {cx-12},{cy+45}" fill="{COLORS['cypress_dark']}"/>

    <!-- Mouth - Minimal horizontal line -->
    <line x1="{cx-28}" y1="{cy+65}" x2="{cx+28}" y2="{cy+65}" stroke="{COLORS['charcoal']}" stroke-width="3"/>

    <!-- Collar - Architectural angular form -->
    <polygon points="{cx-55},{cy+100} {cx},{cy+140} {cx+55},{cy+100} {cx+60},{cy+180} {cx-60},{cy+180}" fill="{COLORS['slate']}"/>
    <polygon points="{cx-20},{cy+100} {cx},{cy+125} {cx+20},{cy+100}" fill="{COLORS['warm_white']}"/>
  </g>

  <!-- Baseline accent -->
  <line x1="{cx-100+offset_x}" y1="{height-30}" x2="{cx+100+offset_x}" y2="{height-30}" stroke="{COLORS['terracotta']}" stroke-width="2" class="accent"/>
</svg>'''


def generate_efay_jones_portrait(width=400, height=400):
    """E. Fay Jones - Profile with chapel glass spires as background"""
    is_wide = width == 800
    cx = width // 2
    cy = height // 2
    offset_x = 0 if not is_wide else 200

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>{get_animation_styles()}</style>
    <linearGradient id="face-grad-jones" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{COLORS['cypress']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{COLORS['cypress_dark']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Warm White Background -->
  <rect width="{width}" height="{height}" fill="{COLORS['warm_white']}"/>

  <!-- Thorncrown Chapel spires background pattern -->
  <g class="building-accent" opacity="0.1" transform="translate({offset_x}, 0)">
    <line x1="{cx-80}" y1="{height}" x2="{cx-60}" y2="40" stroke="{COLORS['gold']}" stroke-width="3"/>
    <line x1="{cx-40}" y1="{height}" x2="{cx-30}" y2="20" stroke="{COLORS['gold']}" stroke-width="3"/>
    <line x1="{cx}" y1="{height}" x2="{cx}" y2="10" stroke="{COLORS['gold']}" stroke-width="4"/>
    <line x1="{cx+40}" y1="{height}" x2="{cx+30}" y2="20" stroke="{COLORS['gold']}" stroke-width="3"/>
    <line x1="{cx+80}" y1="{height}" x2="{cx+60}" y2="40" stroke="{COLORS['gold']}" stroke-width="3"/>
    <!-- Cross beams -->
    <line x1="{cx-90}" y1="100" x2="{cx+90}" y2="100" stroke="{COLORS['cypress']}" stroke-width="2"/>
    <line x1="{cx-70}" y1="180" x2="{cx+70}" y2="180" stroke="{COLORS['cypress']}" stroke-width="2"/>
    <line x1="{cx-50}" y1="260" x2="{cx+50}" y2="260" stroke="{COLORS['cypress']}" stroke-width="2"/>
  </g>

  <!-- Portrait - Profile facing right -->
  <g class="portrait-main" transform="translate({offset_x}, 0)">
    <!-- Head profile - pentagon shape -->
    <polygon points="{cx-30},{cy-80} {cx+40},{cy-60} {cx+60},{cy} {cx+30},{cy+70} {cx-30},{cy+60} {cx-50},{cy}"
      fill="url(#face-grad-jones)" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Hair - swept back geometric -->
    <polygon points="{cx-30},{cy-80} {cx-60},{cy-70} {cx-70},{cy-30} {cx-50},{cy} {cx-30},{cy+60} {cx-50},{cy} {cx-40},{cy-50}"
      fill="{COLORS['slate']}"/>

    <!-- Eye - profile view -->
    <polygon points="{cx+10},{cy-20} {cx+30},{cy-15} {cx+10},{cy-10}" fill="{COLORS['charcoal']}"/>
    <circle cx="{cx+15}" cy="{cy-15}" r="3" fill="{COLORS['gold']}" class="accent"/>

    <!-- Eyebrow -->
    <line x1="{cx+5}" y1="{cy-30}" x2="{cx+35}" y2="{cy-25}" stroke="{COLORS['charcoal']}" stroke-width="3"/>

    <!-- Nose - profile angular -->
    <polygon points="{cx+60},{cy} {cx+75},{cy+10} {cx+60},{cy+20} {cx+50},{cy+15}" fill="{COLORS['cypress_dark']}"/>

    <!-- Mouth -->
    <line x1="{cx+45}" y1="{cy+40}" x2="{cx+65}" y2="{cy+38}" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Ear -->
    <ellipse cx="{cx-35}" cy="{cy}" rx="12" ry="18" fill="{COLORS['cypress']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>

    <!-- Collar -->
    <polygon points="{cx-50},{cy+60} {cx+30},{cy+70} {cx+40},{cy+150} {cx-60},{cy+150}" fill="{COLORS['terracotta']}"/>
    <line x1="{cx-10}" y1="{cy+70}" x2="{cx-20}" y2="{cy+150}" stroke="{COLORS['charcoal']}" stroke-width="2"/>
  </g>

  <!-- Chapel spire accent -->
  <polygon points="{cx+offset_x},{height-25} {cx-8+offset_x},{height-10} {cx+8+offset_x},{height-10}" fill="{COLORS['gold']}" class="accent"/>
</svg>'''


def generate_alden_dow_portrait(width=400, height=400):
    """Alden B. Dow - Face composed of interlocking geometric blocks"""
    is_wide = width == 800
    cx = width // 2
    cy = height // 2
    offset_x = 0 if not is_wide else 200

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>{get_animation_styles()}</style>
  </defs>

  <!-- Warm White Background -->
  <rect width="{width}" height="{height}" fill="{COLORS['warm_white']}"/>

  <!-- Interlocking blocks pattern background (Dow Studio reference) -->
  <g class="building-accent" opacity="0.08" transform="translate({offset_x}, 0)">
    <rect x="{cx-120}" y="40" width="60" height="40" fill="{COLORS['terracotta']}"/>
    <rect x="{cx-60}" y="60" width="60" height="40" fill="{COLORS['cypress']}"/>
    <rect x="{cx}" y="40" width="60" height="40" fill="{COLORS['slate']}"/>
    <rect x="{cx+60}" y="60" width="60" height="40" fill="{COLORS['terracotta']}"/>
    <rect x="{cx-100}" y="320" width="50" height="30" fill="{COLORS['cypress']}"/>
    <rect x="{cx-50}" y="340" width="50" height="30" fill="{COLORS['slate']}"/>
    <rect x="{cx}" y="320" width="50" height="30" fill="{COLORS['terracotta']}"/>
    <rect x="{cx+50}" y="340" width="50" height="30" fill="{COLORS['cypress']}"/>
  </g>

  <!-- Portrait - Interlocking block composition -->
  <g class="portrait-main" transform="translate({offset_x}, 0)">
    <!-- Face blocks - interlocking geometric composition -->
    <rect x="{cx-50}" y="{cy-90}" width="100" height="35" fill="{COLORS['cypress']}" stroke="{COLORS['charcoal']}" stroke-width="2"/>
    <rect x="{cx-60}" y="{cy-55}" width="55" height="50" fill="{COLORS['cypress_dark']}" stroke="{COLORS['charcoal']}" stroke-width="2"/>
    <rect x="{cx+5}" y="{cy-55}" width="55" height="50" fill="{COLORS['cypress']}" stroke="{COLORS['charcoal']}" stroke-width="2"/>
    <rect x="{cx-55}" y="{cy-5}" width="110" height="45" fill="{COLORS['sand']}" stroke="{COLORS['charcoal']}" stroke-width="2"/>
    <rect x="{cx-45}" y="{cy+40}" width="90" height="40" fill="{COLORS['cypress']}" stroke="{COLORS['charcoal']}" stroke-width="2"/>
    <rect x="{cx-35}" y="{cy+80}" width="70" height="25" fill="{COLORS['cypress_dark']}" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Hair blocks -->
    <rect x="{cx-55}" y="{cy-120}" width="45" height="30" fill="{COLORS['charcoal']}"/>
    <rect x="{cx-10}" y="{cy-125}" width="35" height="35" fill="{COLORS['slate']}"/>
    <rect x="{cx+25}" y="{cy-120}" width="30" height="30" fill="{COLORS['charcoal']}"/>

    <!-- Eyes as geometric blocks -->
    <rect x="{cx-45}" y="{cy-45}" width="28" height="12" fill="{COLORS['charcoal']}"/>
    <rect x="{cx+17}" y="{cy-45}" width="28" height="12" fill="{COLORS['charcoal']}"/>
    <rect x="{cx-42}" y="{cy-42}" width="8" height="6" fill="{COLORS['gold']}" class="accent"/>
    <rect x="{cx+20}" y="{cy-42}" width="8" height="6" fill="{COLORS['gold']}" class="accent"/>

    <!-- Glasses - rectangular frames -->
    <rect x="{cx-50}" y="{cy-52}" width="38" height="24" fill="none" stroke="{COLORS['charcoal']}" stroke-width="3"/>
    <rect x="{cx+12}" y="{cy-52}" width="38" height="24" fill="none" stroke="{COLORS['charcoal']}" stroke-width="3"/>
    <line x1="{cx-12}" y1="{cy-40}" x2="{cx+12}" y2="{cy-40}" stroke="{COLORS['charcoal']}" stroke-width="3"/>

    <!-- Nose block -->
    <rect x="{cx-8}" y="{cy}" width="16" height="30" fill="{COLORS['terracotta']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>

    <!-- Mouth -->
    <rect x="{cx-20}" y="{cy+55}" width="40" height="6" fill="{COLORS['charcoal']}"/>

    <!-- Collar blocks -->
    <rect x="{cx-55}" y="{cy+105}" width="50" height="60" fill="{COLORS['slate']}"/>
    <rect x="{cx+5}" y="{cy+105}" width="50" height="60" fill="{COLORS['slate']}"/>
    <polygon points="{cx-5},{cy+105} {cx},{cy+130} {cx+5},{cy+105}" fill="{COLORS['warm_white']}"/>
  </g>

  <!-- Block accent baseline -->
  <g class="accent">
    <rect x="{cx-60+offset_x}" y="{height-25}" width="20" height="10" fill="{COLORS['terracotta']}"/>
    <rect x="{cx-30+offset_x}" y="{height-25}" width="20" height="10" fill="{COLORS['cypress']}"/>
    <rect x="{cx+offset_x}" y="{height-25}" width="20" height="10" fill="{COLORS['slate']}"/>
    <rect x="{cx+30+offset_x}" y="{height-25}" width="20" height="10" fill="{COLORS['gold']}"/>
  </g>
</svg>'''


def generate_edgar_tafel_portrait(width=400, height=400):
    """Edgar Tafel - Classic geometric portrait with drafting tools"""
    is_wide = width == 800
    cx = width // 2
    cy = height // 2
    offset_x = 0 if not is_wide else 200

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>{get_animation_styles()}</style>
    <linearGradient id="face-grad-tafel" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{COLORS['sand']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{COLORS['cypress']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Warm White Background -->
  <rect width="{width}" height="{height}" fill="{COLORS['warm_white']}"/>

  <!-- Drafting tools background -->
  <g class="building-accent" opacity="0.12" transform="translate({offset_x}, 0)">
    <!-- T-square -->
    <rect x="{cx-150}" y="60" width="300" height="8" fill="{COLORS['cypress']}"/>
    <rect x="{cx-150}" y="55" width="15" height="80" fill="{COLORS['cypress']}"/>
    <!-- Triangle -->
    <polygon points="{cx+80},320 {cx+150},380 {cx+10},380" fill="none" stroke="{COLORS['charcoal']}" stroke-width="2"/>
    <!-- Compass hint -->
    <circle cx="{cx-90}" cy="340" r="30" fill="none" stroke="{COLORS['gold']}" stroke-width="2"/>
  </g>

  <!-- Portrait -->
  <g class="portrait-main" transform="translate({offset_x}, 0)">
    <!-- Face - Classic hexagonal -->
    <polygon points="{cx},{cy-95} {cx+60},{cy-60} {cx+65},{cy+30} {cx+45},{cy+80} {cx},{cy+100} {cx-45},{cy+80} {cx-65},{cy+30} {cx-60},{cy-60}"
      fill="url(#face-grad-tafel)" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Hair - Receding, distinguished -->
    <polygon points="{cx-50},{cy-70} {cx-30},{cy-100} {cx+30},{cy-100} {cx+50},{cy-70} {cx+40},{cy-85} {cx},{cy-95} {cx-40},{cy-85}"
      fill="{COLORS['slate']}"/>

    <!-- Forehead wrinkles - wisdom lines -->
    <line x1="{cx-30}" y1="{cy-75}" x2="{cx+30}" y2="{cy-75}" stroke="{COLORS['charcoal']}" stroke-width="1" opacity="0.4"/>
    <line x1="{cx-25}" y1="{cy-68}" x2="{cx+25}" y2="{cy-68}" stroke="{COLORS['charcoal']}" stroke-width="1" opacity="0.3"/>

    <!-- Eyes - Thoughtful rectangles -->
    <rect x="{cx-45}" y="{cy-30}" width="30" height="14" fill="{COLORS['charcoal']}" rx="2"/>
    <rect x="{cx+15}" y="{cy-30}" width="30" height="14" fill="{COLORS['charcoal']}" rx="2"/>
    <rect x="{cx-42}" y="{cy-27}" width="8" height="5" fill="{COLORS['gold']}" class="accent"/>
    <rect x="{cx+18}" y="{cy-27}" width="8" height="5" fill="{COLORS['gold']}" class="accent"/>

    <!-- Eyebrows - Distinguished -->
    <line x1="{cx-48}" y1="{cy-40}" x2="{cx-12}" y2="{cy-42}" stroke="{COLORS['charcoal']}" stroke-width="3"/>
    <line x1="{cx+12}" y1="{cy-42}" x2="{cx+48}" y2="{cy-40}" stroke="{COLORS['charcoal']}" stroke-width="3"/>

    <!-- Nose - Classic proportions -->
    <polygon points="{cx},{cy-15} {cx+12},{cy+30} {cx},{cy+35} {cx-12},{cy+30}" fill="{COLORS['cypress_dark']}"/>

    <!-- Mouth - Slight smile -->
    <path d="M {cx-22} {cy+55} Q {cx} {cy+62} {cx+22} {cy+55}" fill="none" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Bow tie - Classic drafting room attire -->
    <polygon points="{cx-35},{cy+115} {cx-15},{cy+105} {cx-15},{cy+125}" fill="{COLORS['terracotta']}"/>
    <polygon points="{cx+35},{cy+115} {cx+15},{cy+105} {cx+15},{cy+125}" fill="{COLORS['terracotta']}"/>
    <circle cx="{cx}" cy="{cy+115}" r="8" fill="{COLORS['terracotta_dark']}"/>

    <!-- Collar and jacket -->
    <polygon points="{cx-45},{cy+100} {cx-15},{cy+105} {cx-60},{cy+180} {cx-100},{cy+180}" fill="{COLORS['charcoal']}"/>
    <polygon points="{cx+45},{cy+100} {cx+15},{cy+105} {cx+60},{cy+180} {cx+100},{cy+180}" fill="{COLORS['charcoal']}"/>
    <polygon points="{cx-15},{cy+105} {cx},{cy+140} {cx+15},{cy+105}" fill="{COLORS['warm_white']}"/>
  </g>

  <!-- Drafting pencil accent -->
  <g class="accent" transform="translate({offset_x}, 0)">
    <rect x="{cx+60}" y="{height-50}" width="80" height="6" fill="{COLORS['gold']}" transform="rotate(-15, {cx+100}, {height-47})"/>
    <polygon points="{cx+142},{height-52} {cx+155},{height-47} {cx+142},{height-42}" fill="{COLORS['charcoal']}" transform="rotate(-15, {cx+100}, {height-47})"/>
  </g>
</svg>'''


def generate_arthur_dyson_portrait(width=400, height=400):
    """Arthur Dyson - Dynamic angular composition reflecting organic forms"""
    is_wide = width == 800
    cx = width // 2
    cy = height // 2
    offset_x = 0 if not is_wide else 200

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>{get_animation_styles()}
      .portrait-main {{ animation: breathe 8s ease-in-out infinite; transform-origin: center center; }}
    </style>
    <linearGradient id="face-grad-dyson" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:{COLORS['cypress']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{COLORS['terracotta_dark']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Warm White Background -->
  <rect width="{width}" height="{height}" fill="{COLORS['warm_white']}"/>

  <!-- Dynamic angular background - organic architecture reference -->
  <g class="building-accent" opacity="0.1" transform="translate({offset_x}, 0)">
    <polygon points="{cx-120},50 {cx-80},30 {cx-60},80 {cx-100},100" fill="{COLORS['terracotta']}"/>
    <polygon points="{cx+60},40 {cx+120},60 {cx+100},110 {cx+50},90" fill="{COLORS['slate']}"/>
    <polygon points="{cx-80},320 {cx-30},300 {cx-20},370 {cx-90},380" fill="{COLORS['cypress']}"/>
    <polygon points="{cx+20},310 {cx+90},330 {cx+80},380 {cx+10},360" fill="{COLORS['gold']}"/>
  </g>

  <!-- Portrait - Dynamic angular composition -->
  <g class="portrait-main" transform="translate({offset_x}, 0)">
    <!-- Face - Dynamic asymmetric polygon -->
    <polygon points="{cx-10},{cy-100} {cx+55},{cy-70} {cx+70},{cy-10} {cx+60},{cy+60} {cx+20},{cy+95} {cx-40},{cy+85} {cx-65},{cy+20} {cx-60},{cy-50}"
      fill="url(#face-grad-dyson)" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Hair - Dynamic flowing angles -->
    <polygon points="{cx-60},{cy-50} {cx-40},{cy-110} {cx+20},{cy-120} {cx+60},{cy-85} {cx+55},{cy-70} {cx-10},{cy-100}"
      fill="{COLORS['charcoal']}"/>
    <polygon points="{cx-40},{cy-110} {cx-10},{cy-115} {cx+20},{cy-120} {cx},{cy-100}"
      fill="{COLORS['slate']}"/>

    <!-- Eyes - Angular, expressive -->
    <polygon points="{cx-40},{cy-30} {cx-10},{cy-35} {cx-10},{cy-20} {cx-40},{cy-18}" fill="{COLORS['charcoal']}"/>
    <polygon points="{cx+10},{cy-35} {cx+45},{cy-25} {cx+45},{cy-12} {cx+10},{cy-20}" fill="{COLORS['charcoal']}"/>
    <polygon points="{cx-35},{cy-28} {cx-25},{cy-28} {cx-25},{cy-22} {cx-35},{cy-22}" fill="{COLORS['gold']}" class="accent"/>
    <polygon points="{cx+15},{cy-30} {cx+28},{cy-25} {cx+28},{cy-18} {cx+15},{cy-22}" fill="{COLORS['gold']}" class="accent"/>

    <!-- Eyebrows - Dynamic angles -->
    <line x1="{cx-45}" y1="{cy-42}" x2="{cx-5}" y2="{cy-48}" stroke="{COLORS['charcoal']}" stroke-width="3"/>
    <line x1="{cx+5}" y1="{cy-50}" x2="{cx+50}" y2="{cy-38}" stroke="{COLORS['charcoal']}" stroke-width="3"/>

    <!-- Nose - Angular, prominent -->
    <polygon points="{cx},{cy-20} {cx+18},{cy+25} {cx+5},{cy+35} {cx-8},{cy+30}" fill="{COLORS['cypress_dark']}"/>

    <!-- Mouth - Confident line -->
    <line x1="{cx-20}" y1="{cy+55}" x2="{cx+30}" y2="{cy+50}" stroke="{COLORS['charcoal']}" stroke-width="3"/>

    <!-- Beard stubble suggestion -->
    <polygon points="{cx-30},{cy+60} {cx+35},{cy+55} {cx+20},{cy+95} {cx-40},{cy+85}" fill="{COLORS['slate']}" opacity="0.3"/>

    <!-- Collar - Dynamic angular -->
    <polygon points="{cx-40},{cy+85} {cx+20},{cy+95} {cx+40},{cy+180} {cx-60},{cy+180}" fill="{COLORS['slate']}"/>
    <polygon points="{cx-10},{cy+95} {cx+5},{cy+130} {cx+20},{cy+95}" fill="{COLORS['warm_white']}"/>
  </g>

  <!-- Dynamic line accent -->
  <g class="accent">
    <line x1="{cx-80+offset_x}" y1="{height-30}" x2="{cx-20+offset_x}" y2="{height-25}" stroke="{COLORS['terracotta']}" stroke-width="3"/>
    <line x1="{cx-20+offset_x}" y1="{height-25}" x2="{cx+50+offset_x}" y2="{height-35}" stroke="{COLORS['gold']}" stroke-width="3"/>
    <line x1="{cx+50+offset_x}" y1="{height-35}" x2="{cx+90+offset_x}" y2="{height-28}" stroke="{COLORS['cypress']}" stroke-width="3"/>
  </g>
</svg>'''


def generate_eric_lloyd_wright_portrait(width=400, height=400):
    """Eric Lloyd Wright - Profile with strong horizontal lines (prairie influence)"""
    is_wide = width == 800
    cx = width // 2
    cy = height // 2
    offset_x = 0 if not is_wide else 200

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>{get_animation_styles()}</style>
    <linearGradient id="face-grad-elwright" x1="100%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{COLORS['sand']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{COLORS['cypress']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Warm White Background -->
  <rect width="{width}" height="{height}" fill="{COLORS['warm_white']}"/>

  <!-- Prairie horizontal lines background -->
  <g class="building-accent" opacity="0.15" transform="translate({offset_x}, 0)">
    <line x1="20" y1="80" x2="{width-20-offset_x*2}" y2="80" stroke="{COLORS['terracotta']}" stroke-width="4"/>
    <line x1="40" y1="95" x2="{width-40-offset_x*2}" y2="95" stroke="{COLORS['cypress']}" stroke-width="3"/>
    <line x1="60" y1="108" x2="{width-60-offset_x*2}" y2="108" stroke="{COLORS['terracotta']}" stroke-width="2"/>

    <line x1="20" y1="320" x2="{width-20-offset_x*2}" y2="320" stroke="{COLORS['terracotta']}" stroke-width="4"/>
    <line x1="40" y1="335" x2="{width-40-offset_x*2}" y2="335" stroke="{COLORS['cypress']}" stroke-width="3"/>
    <line x1="60" y1="348" x2="{width-60-offset_x*2}" y2="348" stroke="{COLORS['terracotta']}" stroke-width="2"/>
  </g>

  <!-- Portrait - Profile facing left (opposite direction from E. Fay Jones) -->
  <g class="portrait-main" transform="translate({offset_x}, 0)">
    <!-- Head profile - strong horizontal emphasis -->
    <polygon points="{cx+30},{cy-80} {cx-50},{cy-65} {cx-70},{cy-10} {cx-50},{cy+60} {cx+20},{cy+75} {cx+40},{cy+10}"
      fill="url(#face-grad-elwright)" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Hair - Horizontal swept style -->
    <polygon points="{cx+30},{cy-80} {cx+60},{cy-90} {cx+70},{cy-50} {cx+50},{cy-20} {cx+40},{cy+10} {cx+40},{cy-40}"
      fill="{COLORS['charcoal']}"/>
    <rect x="{cx+35}" y="{cy-85}" width="40" height="8" fill="{COLORS['slate']}"/>

    <!-- Horizontal accent lines across forehead -->
    <line x1="{cx-40}" y1="{cy-55}" x2="{cx+25}" y2="{cy-60}" stroke="{COLORS['charcoal']}" stroke-width="1" opacity="0.3"/>

    <!-- Eye - profile view facing left -->
    <polygon points="{cx-20},{cy-25} {cx-45},{cy-18} {cx-20},{cy-12}" fill="{COLORS['charcoal']}"/>
    <circle cx="{cx-28}" cy="{cy-18}" r="4" fill="{COLORS['gold']}" class="accent"/>

    <!-- Strong eyebrow -->
    <line x1="{cx-48}" y1="{cy-32}" x2="{cx-15}" y2="{cy-38}" stroke="{COLORS['charcoal']}" stroke-width="4"/>

    <!-- Nose - profile, distinguished -->
    <polygon points="{cx-70},{cy-10} {cx-88},{cy+5} {cx-75},{cy+18} {cx-60},{cy+12}" fill="{COLORS['cypress_dark']}"/>

    <!-- Mouth -->
    <line x1="{cx-75}" y1="{cy+35}" x2="{cx-50}" y2="{cy+38}" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Ear -->
    <ellipse cx="{cx+35}" cy="{cy-5}" rx="12" ry="20" fill="{COLORS['sand']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>

    <!-- Collar with prairie horizontal bands -->
    <polygon points="{cx+20},{cy+75} {cx-50},{cy+60} {cx-70},{cy+170} {cx+40},{cy+170}" fill="{COLORS['slate']}"/>
    <line x1="{cx-60}" y1="{cy+100}" x2="{cx+30}" y2="{cy+95}" stroke="{COLORS['terracotta']}" stroke-width="3"/>
    <line x1="{cx-55}" y1="{cy+115}" x2="{cx+25}" y2="{cy+110}" stroke="{COLORS['terracotta']}" stroke-width="2"/>

    <!-- Shirt collar V -->
    <polygon points="{cx-15},{cy+60} {cx-25},{cy+100} {cx-35},{cy+60}" fill="{COLORS['warm_white']}"/>
  </g>

  <!-- Prairie-style horizontal accent baseline -->
  <g class="accent">
    <rect x="{cx-100+offset_x}" y="{height-28}" width="200" height="4" fill="{COLORS['terracotta']}"/>
    <rect x="{cx-80+offset_x}" y="{height-22}" width="160" height="3" fill="{COLORS['cypress']}"/>
    <rect x="{cx-60+offset_x}" y="{height-17}" width="120" height="2" fill="{COLORS['terracotta']}"/>
  </g>
</svg>'''


def generate_albert_kahn_portrait(width=400, height=400):
    """Albert Kahn - Distinguished industrial architect with factory/classical elements"""
    is_wide = width == 800
    cx = width // 2
    cy = height // 2
    offset_x = 0 if not is_wide else 200

    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="{width}" height="{height}">
  <defs>
    <style>{get_animation_styles()}</style>
    <linearGradient id="face-grad-kahn" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{COLORS['sand']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{COLORS['cypress']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Warm White Background -->
  <rect width="{width}" height="{height}" fill="{COLORS['warm_white']}"/>

  <!-- Industrial factory elements background (Ford Plant reference) -->
  <g class="building-accent" opacity="0.12" transform="translate({offset_x}, 0)">
    <!-- Steel I-beam structure -->
    <rect x="{cx-140}" y="30" width="12" height="120" fill="{COLORS['charcoal']}"/>
    <rect x="{cx+128}" y="30" width="12" height="120" fill="{COLORS['charcoal']}"/>
    <rect x="{cx-140}" y="30" width="280" height="10" fill="{COLORS['charcoal']}"/>
    <rect x="{cx-140}" y="70" width="280" height="8" fill="{COLORS['slate']}"/>
    <rect x="{cx-140}" y="110" width="280" height="8" fill="{COLORS['slate']}"/>

    <!-- Factory windows grid -->
    <rect x="{cx-110}" y="42" width="25" height="25" fill="{COLORS['gold']}" opacity="0.5"/>
    <rect x="{cx-75}" y="42" width="25" height="25" fill="{COLORS['gold']}" opacity="0.5"/>
    <rect x="{cx-40}" y="42" width="25" height="25" fill="{COLORS['gold']}" opacity="0.5"/>
    <rect x="{cx+15}" y="42" width="25" height="25" fill="{COLORS['gold']}" opacity="0.5"/>
    <rect x="{cx+50}" y="42" width="25" height="25" fill="{COLORS['gold']}" opacity="0.5"/>
    <rect x="{cx+85}" y="42" width="25" height="25" fill="{COLORS['gold']}" opacity="0.5"/>

    <!-- Classical column hints (residential work) -->
    <rect x="{cx-100}" y="300" width="16" height="70" fill="{COLORS['slate']}"/>
    <rect x="{cx+84}" y="300" width="16" height="70" fill="{COLORS['slate']}"/>
    <rect x="{cx-105}" y="295" width="26" height="10" fill="{COLORS['slate']}"/>
    <rect x="{cx+79}" y="295" width="26" height="10" fill="{COLORS['slate']}"/>
  </g>

  <!-- Portrait -->
  <g class="portrait-main" transform="translate({offset_x}, 0)">
    <!-- Face - Distinguished oval with strong jaw -->
    <ellipse cx="{cx}" cy="{cy}" rx="65" ry="85" fill="url(#face-grad-kahn)" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Strong jawline overlay -->
    <polygon points="{cx-50},{cy+30} {cx-55},{cy+70} {cx},{cy+90} {cx+55},{cy+70} {cx+50},{cy+30}"
      fill="{COLORS['cypress']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>

    <!-- Hair - Receding, distinguished early 1900s style -->
    <ellipse cx="{cx}" cy="{cy-75}" rx="55" ry="25" fill="{COLORS['charcoal']}"/>
    <ellipse cx="{cx-35}" cy="{cy-65}" rx="20" ry="15" fill="{COLORS['slate']}"/>
    <ellipse cx="{cx+35}" cy="{cy-65}" rx="20" ry="15" fill="{COLORS['slate']}"/>

    <!-- Balding forehead -->
    <ellipse cx="{cx}" cy="{cy-60}" rx="40" ry="20" fill="{COLORS['sand']}"/>

    <!-- Forehead wrinkles - wisdom of experience -->
    <line x1="{cx-30}" y1="{cy-50}" x2="{cx+30}" y2="{cy-50}" stroke="{COLORS['charcoal']}" stroke-width="1" opacity="0.3"/>
    <line x1="{cx-25}" y1="{cy-43}" x2="{cx+25}" y2="{cy-43}" stroke="{COLORS['charcoal']}" stroke-width="1" opacity="0.25"/>

    <!-- Eyes - Thoughtful, experienced -->
    <g class="eyes">
      <ellipse cx="{cx-25}" cy="{cy-15}" rx="18" ry="10" fill="{COLORS['warm_white']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>
      <ellipse cx="{cx+25}" cy="{cy-15}" rx="18" ry="10" fill="{COLORS['warm_white']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>
      <circle cx="{cx-25}" cy="{cy-15}" r="7" fill="{COLORS['charcoal']}"/>
      <circle cx="{cx+25}" cy="{cy-15}" r="7" fill="{COLORS['charcoal']}"/>
      <circle cx="{cx-24}" cy="{cy-16}" r="2" fill="{COLORS['gold']}" class="accent"/>
      <circle cx="{cx+26}" cy="{cy-16}" r="2" fill="{COLORS['gold']}" class="accent"/>
    </g>

    <!-- Distinguished eyebrows -->
    <path d="M {cx-45} {cy-28} Q {cx-25} {cy-35} {cx-8} {cy-30}" fill="none" stroke="{COLORS['charcoal']}" stroke-width="3"/>
    <path d="M {cx+8} {cy-30} Q {cx+25} {cy-35} {cx+45} {cy-28}" fill="none" stroke="{COLORS['charcoal']}" stroke-width="3"/>

    <!-- Nose - Strong, distinguished -->
    <polygon points="{cx},{cy-5} {cx+10},{cy+30} {cx},{cy+38} {cx-10},{cy+30}" fill="{COLORS['cypress_dark']}"/>

    <!-- Nostrils hint -->
    <ellipse cx="{cx-6}" cy="{cy+32}" rx="4" ry="2" fill="{COLORS['charcoal']}" opacity="0.3"/>
    <ellipse cx="{cx+6}" cy="{cy+32}" rx="4" ry="2" fill="{COLORS['charcoal']}" opacity="0.3"/>

    <!-- Mustache - Early 1900s style -->
    <path d="M {cx-30} {cy+45} Q {cx-15} {cy+52} {cx} {cy+48} Q {cx+15} {cy+52} {cx+30} {cy+45}"
      fill="{COLORS['charcoal']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>
    <path d="M {cx-25} {cy+48} Q {cx} {cy+55} {cx+25} {cy+48}"
      fill="{COLORS['slate']}" opacity="0.5"/>

    <!-- Mouth - Serious, determined -->
    <line x1="{cx-18}" y1="{cy+58}" x2="{cx+18}" y2="{cy+58}" stroke="{COLORS['charcoal']}" stroke-width="2"/>

    <!-- Ears -->
    <ellipse cx="{cx-62}" cy="{cy}" rx="10" ry="18" fill="{COLORS['cypress']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>
    <ellipse cx="{cx+62}" cy="{cy}" rx="10" ry="18" fill="{COLORS['cypress']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>

    <!-- High collar and formal suit (early 1900s) -->
    <polygon points="{cx-55},{cy+85} {cx},{cy+110} {cx+55},{cy+85} {cx+70},{cy+180} {cx-70},{cy+180}" fill="{COLORS['charcoal']}"/>

    <!-- White dress shirt collar -->
    <polygon points="{cx-25},{cy+90} {cx},{cy+115} {cx+25},{cy+90} {cx+15},{cy+105} {cx},{cy+100} {cx-15},{cy+105}" fill="{COLORS['warm_white']}"/>

    <!-- Tie -->
    <polygon points="{cx-8},{cy+100} {cx},{cy+105} {cx+8},{cy+100} {cx+5},{cy+150} {cx},{cy+155} {cx-5},{cy+150}" fill="{COLORS['terracotta']}"/>
    <polygon points="{cx-5},{cy+105} {cx},{cy+110} {cx+5},{cy+105}" fill="{COLORS['terracotta_dark']}"/>

    <!-- Suit lapels -->
    <polygon points="{cx-55},{cy+85} {cx-25},{cy+90} {cx-35},{cy+140} {cx-65},{cy+140}" fill="{COLORS['slate']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>
    <polygon points="{cx+55},{cy+85} {cx+25},{cy+90} {cx+35},{cy+140} {cx+65},{cy+140}" fill="{COLORS['slate']}" stroke="{COLORS['charcoal']}" stroke-width="1"/>
  </g>

  <!-- Industrial baseline accent -->
  <g class="accent">
    <rect x="{cx-90+offset_x}" y="{height-28}" width="180" height="6" fill="{COLORS['charcoal']}"/>
    <rect x="{cx-70+offset_x}" y="{height-20}" width="40" height="10" fill="{COLORS['terracotta']}"/>
    <rect x="{cx-20+offset_x}" y="{height-20}" width="40" height="10" fill="{COLORS['gold']}"/>
    <rect x="{cx+30+offset_x}" y="{height-20}" width="40" height="10" fill="{COLORS['terracotta']}"/>
  </g>
</svg>'''


def generate_all_portraits():
    """Generate all portrait SVGs in both sizes"""
    architects = [
        ('john-lautner', generate_john_lautner_portrait),
        ('e-fay-jones', generate_efay_jones_portrait),
        ('alden-b-dow', generate_alden_dow_portrait),
        ('edgar-tafel', generate_edgar_tafel_portrait),
        ('arthur-dyson', generate_arthur_dyson_portrait),
        ('eric-lloyd-wright', generate_eric_lloyd_wright_portrait),
        ('albert-kahn', generate_albert_kahn_portrait),
    ]

    script_dir = os.path.dirname(os.path.abspath(__file__))

    for slug, generator in architects:
        # Generate square portrait (400x400)
        square_svg = generator(400, 400)
        square_path = os.path.join(script_dir, f'{slug}-portrait.svg')
        with open(square_path, 'w') as f:
            f.write(square_svg)
        print(f'Generated: {slug}-portrait.svg')

        # Generate wide portrait (800x400)
        wide_svg = generator(800, 400)
        wide_path = os.path.join(script_dir, f'{slug}-portrait-wide.svg')
        with open(wide_path, 'w') as f:
            f.write(wide_svg)
        print(f'Generated: {slug}-portrait-wide.svg')

    print(f'\nTotal: 12 SVG files generated in {script_dir}')


if __name__ == '__main__':
    generate_all_portraits()
