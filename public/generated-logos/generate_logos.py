#!/usr/bin/env python3
"""
Usonian Logo Generator
Generates SVG logos in the FLW v2 style with prairie/organic architecture influence.

Color Palette:
- Terracotta: rgb(194,114,84) / #C27254
- Charcoal: rgb(55,52,50) / #373432
- Sand: rgb(232,218,195) / #E8DAC3
"""

import os

# Color definitions
TERRACOTTA = "#C27254"
CHARCOAL = "#373432"
SAND = "#E8DAC3"

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))


def generate_wordmark():
    """
    Generate the USONIAN wordmark with geometric, prairie-style angular letterforms.
    Features horizontal emphasis lines characteristic of FLW prairie style.
    """
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 80" width="400" height="80">
  <defs>
    <style>
      .letter {{
        fill: {CHARCOAL};
        transition: fill 0.3s ease;
      }}
      .accent-line {{
        stroke: {TERRACOTTA};
        stroke-width: 2;
        transition: stroke-width 0.3s ease;
      }}
      svg:hover .accent-line {{
        stroke-width: 3;
      }}
      @keyframes lineGrow {{
        0% {{ stroke-dashoffset: 400; }}
        100% {{ stroke-dashoffset: 0; }}
      }}
      .animated-line {{
        stroke-dasharray: 400;
        stroke-dashoffset: 400;
        animation: lineGrow 1.5s ease-out forwards;
      }}
    </style>
  </defs>

  <!-- Background accent lines - prairie horizontal emphasis -->
  <line class="accent-line animated-line" x1="0" y1="68" x2="400" y2="68"/>
  <line class="accent-line animated-line" x1="0" y1="72" x2="400" y2="72" style="animation-delay: 0.2s;"/>

  <!-- U -->
  <path class="letter" d="M10,15 L10,45 Q10,60 25,60 L35,60 Q50,60 50,45 L50,15 L42,15 L42,45 Q42,52 35,52 L25,52 Q18,52 18,45 L18,15 Z"/>

  <!-- S -->
  <path class="letter" d="M60,15 L60,23 L85,23 Q90,23 90,28 L90,32 Q90,37 85,37 L70,37 Q60,37 60,47 L60,52 Q60,60 70,60 L100,60 L100,52 L72,52 Q67,52 67,47 L67,45 Q67,40 72,40 L87,40 Q100,40 100,30 L100,25 Q100,15 87,15 Z"/>

  <!-- O -->
  <path class="letter" d="M110,15 L110,60 L150,60 L150,15 Z M118,23 L142,23 L142,52 L118,52 Z"/>

  <!-- N -->
  <path class="letter" d="M160,15 L160,60 L168,60 L168,30 L195,60 L205,60 L205,15 L197,15 L197,45 L170,15 Z"/>

  <!-- I -->
  <path class="letter" d="M215,15 L215,60 L223,60 L223,15 Z"/>

  <!-- A -->
  <path class="letter" d="M233,60 L233,15 L275,15 L275,60 L267,60 L267,42 L241,42 L241,60 Z M241,34 L267,34 L267,23 L241,23 Z"/>

  <!-- N -->
  <path class="letter" d="M285,15 L285,60 L293,60 L293,30 L320,60 L330,60 L330,15 L322,15 L322,45 L295,15 Z"/>

  <!-- Decorative prairie elements -->
  <rect x="340" y="32" width="50" height="3" fill="{TERRACOTTA}"/>
  <rect x="350" y="38" width="40" height="2" fill="{TERRACOTTA}" opacity="0.7"/>
  <rect x="360" y="43" width="30" height="2" fill="{TERRACOTTA}" opacity="0.5"/>
</svg>'''
    return svg


def generate_icon_wordmark():
    """
    Generate icon + wordmark combination.
    Features a geometric prairie house icon with the USONIAN text.
    """
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 100" width="450" height="100">
  <defs>
    <style>
      .house-element {{
        transition: transform 0.3s ease;
      }}
      .roof {{
        fill: {TERRACOTTA};
      }}
      .structure {{
        fill: {CHARCOAL};
      }}
      .window {{
        fill: {SAND};
      }}
      .text {{
        fill: {CHARCOAL};
        font-family: 'Futura', 'Century Gothic', sans-serif;
        font-weight: 500;
        font-size: 32px;
        letter-spacing: 8px;
      }}
      .prairie-line {{
        stroke: {TERRACOTTA};
        stroke-width: 2;
      }}
      @keyframes roofFloat {{
        0%, 100% {{ transform: translateY(0); }}
        50% {{ transform: translateY(-2px); }}
      }}
      .roof-animated {{
        animation: roofFloat 3s ease-in-out infinite;
      }}
      svg:hover .roof-animated {{
        animation-duration: 1.5s;
      }}
    </style>
  </defs>

  <!-- Prairie House Icon -->
  <g class="house-element">
    <!-- Main roof - strong horizontal prairie line -->
    <polygon class="roof roof-animated" points="10,35 90,35 95,40 5,40"/>

    <!-- Secondary roof overhang -->
    <polygon class="roof" points="15,42 85,42 88,46 12,46" opacity="0.8"/>

    <!-- Main structure -->
    <rect class="structure" x="20" y="48" width="60" height="35"/>

    <!-- Horizontal prairie bands -->
    <rect class="roof" x="18" y="55" width="64" height="3"/>
    <rect class="roof" x="18" y="70" width="64" height="3"/>

    <!-- Windows - geometric grid pattern -->
    <rect class="window" x="25" y="60" width="10" height="8"/>
    <rect class="window" x="38" y="60" width="10" height="8"/>
    <rect class="window" x="52" y="60" width="10" height="8"/>
    <rect class="window" x="65" y="60" width="10" height="8"/>

    <!-- Door -->
    <rect class="structure" x="42" y="75" width="16" height="8" fill="{SAND}"/>

    <!-- Chimney accent -->
    <rect class="structure" x="70" y="28" width="8" height="12"/>
  </g>

  <!-- USONIAN Text -->
  <text class="text" x="115" y="62">USONIAN</text>

  <!-- Decorative prairie lines extending from house -->
  <line class="prairie-line" x1="95" y1="40" x2="110" y2="40"/>
  <line class="prairie-line" x1="95" y1="46" x2="108" y2="46" opacity="0.6"/>

  <!-- Bottom accent lines -->
  <line class="prairie-line" x1="115" y1="78" x2="420" y2="78"/>
  <line class="prairie-line" x1="115" y1="82" x2="400" y2="82" opacity="0.5"/>
</svg>'''
    return svg


def generate_monogram():
    """
    Generate a stylized 'U' monogram with prairie horizontal lines.
    This captures FLW's signature style of strong horizontal emphasis.
    """
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <style>
      .monogram-main {{
        fill: {CHARCOAL};
      }}
      .prairie-accent {{
        fill: {TERRACOTTA};
      }}
      .sand-fill {{
        fill: {SAND};
      }}
      @keyframes lineSlide {{
        0% {{ transform: translateX(-100%); }}
        100% {{ transform: translateX(0); }}
      }}
      .slide-in {{
        animation: lineSlide 0.8s ease-out forwards;
      }}
      .slide-in-delay-1 {{ animation-delay: 0.1s; }}
      .slide-in-delay-2 {{ animation-delay: 0.2s; }}
      .slide-in-delay-3 {{ animation-delay: 0.3s; }}

      @keyframes pulseGlow {{
        0%, 100% {{ opacity: 1; }}
        50% {{ opacity: 0.7; }}
      }}
      svg:hover .prairie-accent {{
        animation: pulseGlow 1.5s ease-in-out infinite;
      }}
    </style>
    <clipPath id="lineClip">
      <rect x="0" y="0" width="120" height="120"/>
    </clipPath>
  </defs>

  <!-- Background square -->
  <rect x="5" y="5" width="110" height="110" fill="{SAND}" rx="2"/>

  <!-- Stylized U shape with geometric angles -->
  <path class="monogram-main" d="
    M25,20
    L25,70
    Q25,95 50,95
    L70,95
    Q95,95 95,70
    L95,20
    L80,20
    L80,70
    Q80,80 70,80
    L50,80
    Q40,80 40,70
    L40,20
    Z
  "/>

  <!-- Prairie horizontal accent lines through the U -->
  <g clip-path="url(#lineClip)">
    <rect class="prairie-accent slide-in" x="15" y="35" width="90" height="4" rx="1"/>
    <rect class="prairie-accent slide-in slide-in-delay-1" x="15" y="45" width="90" height="3" rx="1" opacity="0.8"/>
    <rect class="prairie-accent slide-in slide-in-delay-2" x="15" y="53" width="90" height="2" rx="1" opacity="0.6"/>
  </g>

  <!-- Top accent bar -->
  <rect class="prairie-accent" x="20" y="12" width="80" height="4" rx="1"/>

  <!-- Bottom decorative element -->
  <rect class="prairie-accent" x="35" y="102" width="50" height="3" rx="1"/>
  <rect class="prairie-accent" x="45" y="107" width="30" height="2" rx="1" opacity="0.7"/>
</svg>'''
    return svg


def generate_badge():
    """
    Generate a circular badge/seal with USONIAN text and prairie motifs.
    Features geometric patterns inspired by FLW's decorative elements.
    """
    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <style>
      .badge-outer {{
        fill: {CHARCOAL};
      }}
      .badge-inner {{
        fill: {SAND};
      }}
      .badge-accent {{
        fill: {TERRACOTTA};
      }}
      .badge-text {{
        fill: {CHARCOAL};
        font-family: 'Futura', 'Century Gothic', sans-serif;
        font-weight: 600;
        font-size: 11px;
        letter-spacing: 4px;
      }}
      .center-text {{
        fill: {CHARCOAL};
        font-family: 'Futura', 'Century Gothic', sans-serif;
        font-weight: 300;
        font-size: 9px;
        letter-spacing: 2px;
      }}
      @keyframes rotateSubtle {{
        0% {{ transform: rotate(0deg); }}
        100% {{ transform: rotate(360deg); }}
      }}
      @keyframes pulseOpacity {{
        0%, 100% {{ opacity: 1; }}
        50% {{ opacity: 0.6; }}
      }}
      .rotate-element {{
        transform-origin: 100px 100px;
      }}
      svg:hover .rotate-element {{
        animation: rotateSubtle 20s linear infinite;
      }}
      svg:hover .pulse-element {{
        animation: pulseOpacity 2s ease-in-out infinite;
      }}
    </style>
  </defs>

  <!-- Outer circle -->
  <circle class="badge-outer" cx="100" cy="100" r="95"/>

  <!-- Terracotta ring -->
  <circle class="badge-accent" cx="100" cy="100" r="88"/>

  <!-- Inner sand circle -->
  <circle class="badge-inner" cx="100" cy="100" r="82"/>

  <!-- Prairie geometric pattern ring -->
  <g class="rotate-element">
    <!-- Decorative angular elements around the badge -->
    <polygon class="badge-accent pulse-element" points="100,25 105,35 95,35"/>
    <polygon class="badge-accent pulse-element" points="175,100 165,105 165,95"/>
    <polygon class="badge-accent pulse-element" points="100,175 95,165 105,165"/>
    <polygon class="badge-accent pulse-element" points="25,100 35,95 35,105"/>

    <!-- Diagonal accents -->
    <polygon class="badge-accent pulse-element" points="153,47 148,57 158,52" opacity="0.7"/>
    <polygon class="badge-accent pulse-element" points="153,153 158,148 148,143" opacity="0.7"/>
    <polygon class="badge-accent pulse-element" points="47,153 52,148 42,143" opacity="0.7"/>
    <polygon class="badge-accent pulse-element" points="47,47 42,52 52,57" opacity="0.7"/>
  </g>

  <!-- USONIAN text on curved path -->
  <defs>
    <path id="textPathTop" d="M 40,100 A 60,60 0 0,1 160,100" fill="none"/>
    <path id="textPathBottom" d="M 160,115 A 55,55 0 0,1 40,115" fill="none"/>
  </defs>

  <text class="badge-text">
    <textPath href="#textPathTop" startOffset="50%" text-anchor="middle">USONIAN</textPath>
  </text>

  <!-- Center decorative element - geometric prairie house abstraction -->
  <g transform="translate(100, 100)">
    <!-- Abstract house roof lines -->
    <rect class="badge-outer" x="-30" y="-15" width="60" height="4" rx="1"/>
    <rect class="badge-outer" x="-25" y="-9" width="50" height="3" rx="1"/>
    <rect class="badge-outer" x="-20" y="-4" width="40" height="2" rx="1"/>

    <!-- Vertical elements suggesting structure -->
    <rect class="badge-accent" x="-20" y="2" width="4" height="18"/>
    <rect class="badge-accent" x="-8" y="2" width="4" height="18"/>
    <rect class="badge-accent" x="4" y="2" width="4" height="18"/>
    <rect class="badge-accent" x="16" y="2" width="4" height="18"/>

    <!-- Base line -->
    <rect class="badge-outer" x="-25" y="22" width="50" height="3" rx="1"/>
  </g>

  <!-- Establishment text -->
  <text class="center-text">
    <textPath href="#textPathBottom" startOffset="50%" text-anchor="middle">ARCHITECT DESIGNED</textPath>
  </text>

  <!-- Inner decorative ring -->
  <circle cx="100" cy="100" r="55" fill="none" stroke="{CHARCOAL}" stroke-width="1" opacity="0.3"/>
</svg>'''
    return svg


def save_svg(content, filename):
    """Save SVG content to file."""
    filepath = os.path.join(OUTPUT_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Generated: {filepath}")


def main():
    """Generate all logo variations."""
    print("Generating Usonian logos in FLW v2 style...")
    print(f"Output directory: {OUTPUT_DIR}")
    print()

    # Generate and save each logo
    save_svg(generate_wordmark(), "usonian-wordmark.svg")
    save_svg(generate_icon_wordmark(), "usonian-icon-wordmark.svg")
    save_svg(generate_monogram(), "usonian-monogram.svg")
    save_svg(generate_badge(), "usonian-badge.svg")

    print()
    print("All logos generated successfully!")
    print()
    print("Color palette used:")
    print(f"  Terracotta: {TERRACOTTA}")
    print(f"  Charcoal: {CHARCOAL}")
    print(f"  Sand: {SAND}")


if __name__ == "__main__":
    main()
