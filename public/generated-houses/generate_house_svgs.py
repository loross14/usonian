#!/usr/bin/env python3
"""
Usonian House SVG Generator
Generates animated SVG house illustrations in Frank Lloyd Wright prairie/usonian style
for the Usonian architecture platform.
"""

import json
import random
import math
import hashlib
from pathlib import Path

# FLW Color Palette
COLORS = {
    'terracotta': 'rgb(194, 114, 84)',
    'terracotta_dark': 'rgb(156, 88, 64)',
    'sand': 'rgb(232, 218, 195)',
    'sand_dark': 'rgb(205, 188, 162)',
    'slate': 'rgb(82, 90, 100)',
    'slate_light': 'rgb(140, 155, 175)',
    'cypress': 'rgb(168, 132, 98)',
    'cypress_dark': 'rgb(138, 105, 75)',
    'mahogany': 'rgb(120, 72, 56)',
    'gold': 'rgb(212, 178, 112)',
    'sky': 'rgb(195, 215, 232)',
    'charcoal': 'rgb(55, 52, 50)',
    'warm_white': 'rgb(252, 250, 247)',
}

# Animation styles (using single braces - these are not f-strings)
ANIMATIONS = {
    'float': '''
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
        }
        .house-main { animation: float 6s ease-in-out infinite; }
    ''',
    'pulse': '''
        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.85; }
        }
        .accent { animation: pulse 4s ease-in-out infinite; }
    ''',
    'draw': '''
        @keyframes draw {
            from { stroke-dashoffset: 1000; }
            to { stroke-dashoffset: 0; }
        }
        .line-draw {
            stroke-dasharray: 1000;
            animation: draw 3s ease-out forwards;
        }
    ''',
    'glow': '''
        @keyframes glow {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(212, 178, 112, 0.3)); }
            50% { filter: drop-shadow(0 0 8px rgba(212, 178, 112, 0.6)); }
        }
        .windows { animation: glow 5s ease-in-out infinite; }
    ''',
    'breathe': '''
        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
        }
        .house-main { animation: breathe 8s ease-in-out infinite; transform-origin: center bottom; }
    '''
}

def get_seed(slug: str) -> int:
    """Generate a deterministic seed from property slug."""
    return int(hashlib.md5(slug.encode()).hexdigest()[:8], 16)

def choose_colors(seed: int) -> dict:
    """Choose a color scheme based on seed."""
    random.seed(seed)

    # Primary accent choices
    primary_choices = ['terracotta', 'cypress', 'mahogany', 'slate']
    secondary_choices = ['sand', 'sand_dark', 'cypress', 'slate_light']

    return {
        'primary': COLORS[random.choice(primary_choices)],
        'secondary': COLORS[random.choice(secondary_choices)],
        'accent': COLORS['gold'],
        'dark': COLORS['charcoal'],
        'light': COLORS['warm_white'],
        'sky': COLORS['sky'],
    }

def get_animation(seed: int) -> tuple:
    """Choose animation style based on seed."""
    random.seed(seed)
    anim_keys = list(ANIMATIONS.keys())
    chosen = random.choice(anim_keys)
    return chosen, ANIMATIONS[chosen]

def generate_prairie_house(slug: str, home_name: str, year: int) -> str:
    """Generate a prairie-style house SVG with strong horizontal lines.

    Designed for object-cover CSS: house fills 85-90% of canvas width,
    vertically centered so cropping from top/bottom works well.
    """
    seed = get_seed(slug)
    colors = choose_colors(seed)
    anim_name, anim_css = get_animation(seed)
    random.seed(seed)

    # Vary proportions slightly
    roof_angle = random.uniform(5, 12)
    chimney_pos = random.randint(70, 85)
    window_count = random.randint(4, 7)

    # Edge-to-edge composition: minimal margins (5-10% on each side)
    # House spans from x=15 to x=385 (92.5% of 400px width)
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Ground Line - extends to edges -->
  <line x1="0" y1="220" x2="400" y2="220" stroke="{colors['secondary']}" stroke-width="2"/>

  <g class="house-main">
    <!-- Prairie-style horizontal roof overhangs - edge to edge -->
    <polygon
      points="10,120 390,120 410,135 -10,135"
      fill="{colors['primary']}"
      class="accent"
    />
    <polygon
      points="20,105 380,105 390,120 10,120"
      fill="{colors['dark']}"
    />

    <!-- Main structure - wider -->
    <rect x="25" y="135" width="350" height="85" fill="{colors['secondary']}"/>

    <!-- Lower horizontal band - extends past edges -->
    <rect x="5" y="190" width="390" height="30" fill="{colors['primary']}" class="accent"/>

    <!-- Windows - horizontal band -->
    <g class="windows">'''

    window_width = 320 // window_count
    for i in range(window_count):
        x = 40 + i * window_width
        svg += f'''
      <rect x="{x}" y="145" width="{window_width - 10}" height="35" fill="{colors['accent']}" opacity="0.8"/>
      <line x1="{x + (window_width-10)//2}" y1="145" x2="{x + (window_width-10)//2}" y2="180" stroke="{colors['dark']}" stroke-width="2"/>'''

    svg += f'''
    </g>

    <!-- Chimney -->
    <rect x="{chimney_pos * 4}" y="65" width="25" height="50" fill="{colors['dark']}"/>

    <!-- Decorative horizontal lines (FLW signature) -->
    <line x1="25" y1="165" x2="375" y2="165" stroke="{colors['dark']}" stroke-width="1" class="line-draw"/>
    <line x1="15" y1="112" x2="385" y2="112" stroke="{colors['accent']}" stroke-width="1"/>
  </g>

  <!-- Ground plane fills bottom -->
  <rect x="0" y="220" width="400" height="80" fill="{colors['secondary']}" opacity="0.3"/>
</svg>'''

    return svg

def generate_usonian_house(slug: str, home_name: str, year: int) -> str:
    """Generate a Usonian-style house SVG with L-shaped or angular form.

    Designed for object-cover CSS: house fills 85-90% of canvas width,
    vertically centered so cropping from top/bottom works well.
    """
    seed = get_seed(slug)
    colors = choose_colors(seed)
    anim_name, anim_css = get_animation(seed)
    random.seed(seed)

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Ground plane - extends to edges -->
  <rect x="0" y="210" width="400" height="90" fill="{colors['secondary']}" opacity="0.3"/>

  <g class="house-main">
    <!-- Main horizontal wing - wider, extends near edges -->
    <rect x="5" y="140" width="300" height="70" fill="{colors['secondary']}"/>
    <rect x="0" y="128" width="310" height="18" fill="{colors['primary']}" class="accent"/>

    <!-- Vertical wing (L-shape) - extends to right edge -->
    <rect x="260" y="85" width="120" height="125" fill="{colors['secondary']}"/>
    <rect x="255" y="72" width="130" height="18" fill="{colors['primary']}" class="accent"/>

    <!-- Flat roof overhangs - edge to edge -->
    <rect x="-5" y="122" width="320" height="10" fill="{colors['dark']}"/>
    <rect x="250" y="66" width="145" height="10" fill="{colors['dark']}"/>

    <!-- Horizontal window band (clerestory) -->
    <g class="windows">
      <rect x="20" y="150" width="230" height="20" fill="{colors['accent']}" opacity="0.7"/>
      <rect x="280" y="95" width="75" height="55" fill="{colors['accent']}" opacity="0.7"/>
    </g>

    <!-- Vertical mullions -->
    <line x1="70" y1="150" x2="70" y2="170" stroke="{colors['dark']}" stroke-width="2"/>
    <line x1="120" y1="150" x2="120" y2="170" stroke="{colors['dark']}" stroke-width="2"/>
    <line x1="170" y1="150" x2="170" y2="170" stroke="{colors['dark']}" stroke-width="2"/>
    <line x1="220" y1="150" x2="220" y2="170" stroke="{colors['dark']}" stroke-width="2"/>

    <!-- Carport/terrace extension - extends past right edge -->
    <rect x="370" y="165" width="40" height="45" fill="{colors['secondary']}" opacity="0.6"/>
    <rect x="365" y="158" width="45" height="10" fill="{colors['primary']}" opacity="0.7"/>
    <line x1="390" y1="158" x2="390" y2="210" stroke="{colors['dark']}" stroke-width="4"/>
  </g>

  <!-- Ground line -->
  <line x1="0" y1="210" x2="400" y2="210" stroke="{colors['dark']}" stroke-width="1" class="line-draw"/>
</svg>'''

    return svg

def generate_organic_house(slug: str, home_name: str, year: int) -> str:
    """Generate an organic architecture style house (Lautner-inspired).

    Designed for object-cover CSS: house fills 85-90% of canvas width,
    vertically centered so cropping from top/bottom works well.
    """
    seed = get_seed(slug)
    colors = choose_colors(seed)
    anim_name, anim_css = get_animation(seed)
    random.seed(seed)

    # Generate curved roof path - more dramatic
    curve_height = random.randint(50, 80)

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
    <linearGradient id="roof-grad-{slug[:8]}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:{colors['primary']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['dark']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <g class="house-main">
    <!-- Curved/dramatic roof - edge to edge -->
    <path
      d="M -10 175 Q 200 {80 - curve_height} 410 155 L 410 175 L -10 175 Z"
      fill="url(#roof-grad-{slug[:8]})"
      class="accent"
    />

    <!-- Main structure with angle - wider -->
    <polygon
      points="15,175 385,155 395,220 5,220"
      fill="{colors['secondary']}"
    />

    <!-- Glass wall - wider -->
    <g class="windows">
      <rect x="35" y="165" width="280" height="45" fill="{colors['accent']}" opacity="0.6"/>
      <line x1="85" y1="165" x2="85" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="135" y1="165" x2="135" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="185" y1="165" x2="185" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="235" y1="165" x2="235" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="285" y1="165" x2="285" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
    </g>

    <!-- Cantilevered element - extends past edge -->
    <rect x="330" y="140" width="80" height="15" fill="{colors['primary']}" class="accent"/>
    <line x1="330" y1="155" x2="410" y2="155" stroke="{colors['dark']}" stroke-width="2" class="line-draw"/>

    <!-- Support column (organic) -->
    <ellipse cx="370" cy="190" rx="10" ry="35" fill="{colors['dark']}"/>
  </g>

  <!-- Ground - edge to edge -->
  <path d="M 0 220 Q 100 215 200 220 Q 300 225 400 218 L 400 300 L 0 300 Z" fill="{colors['secondary']}" opacity="0.4"/>
</svg>'''

    return svg

def generate_desert_house(slug: str, home_name: str, year: int) -> str:
    """Generate a desert modernist house (Palm Springs inspired).

    Designed for object-cover CSS: house fills 85-90% of canvas width,
    vertically centered so cropping from top/bottom works well.
    """
    seed = get_seed(slug)
    colors = choose_colors(seed)
    anim_name, anim_css = get_animation(seed)
    random.seed(seed)

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Desert ground - edge to edge -->
  <rect x="0" y="215" width="400" height="85" fill="{colors['secondary']}" opacity="0.5"/>

  <g class="house-main">
    <!-- Low-slung main structure - wider -->
    <rect x="10" y="155" width="380" height="60" fill="{colors['light']}" stroke="{colors['dark']}" stroke-width="1"/>

    <!-- Butterfly/angled roof - edge to edge -->
    <polygon
      points="-10,155 200,130 200,145 -10,165"
      fill="{colors['primary']}"
      class="accent"
    />
    <polygon
      points="200,130 410,165 410,175 200,145"
      fill="{colors['primary']}"
      class="accent"
    />

    <!-- Roof edge line -->
    <line x1="-10" y1="155" x2="200" y2="130" stroke="{colors['dark']}" stroke-width="3" class="line-draw"/>
    <line x1="200" y1="130" x2="410" y2="165" stroke="{colors['dark']}" stroke-width="3" class="line-draw"/>

    <!-- Floor-to-ceiling glass - wider -->
    <g class="windows">
      <rect x="30" y="160" width="150" height="50" fill="{colors['accent']}" opacity="0.5"/>
      <rect x="220" y="160" width="150" height="50" fill="{colors['accent']}" opacity="0.5"/>
    </g>

    <!-- Vertical mullions -->
    <line x1="70" y1="160" x2="70" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
    <line x1="110" y1="160" x2="110" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
    <line x1="150" y1="160" x2="150" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
    <line x1="260" y1="160" x2="260" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
    <line x1="300" y1="160" x2="300" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
    <line x1="340" y1="160" x2="340" y2="210" stroke="{colors['dark']}" stroke-width="1"/>

    <!-- Pool - wider -->
    <ellipse cx="200" cy="245" rx="100" ry="20" fill="{colors['sky']}" opacity="0.6"/>
  </g>

  <!-- Desert plants (abstract) - at edges -->
  <line x1="10" y1="215" x2="10" y2="180" stroke="{colors['primary']}" stroke-width="3" opacity="0.6"/>
  <line x1="3" y1="188" x2="10" y2="195" stroke="{colors['primary']}" stroke-width="2" opacity="0.6"/>
  <line x1="17" y1="190" x2="10" y2="197" stroke="{colors['primary']}" stroke-width="2" opacity="0.6"/>

  <line x1="392" y1="215" x2="392" y2="175" stroke="{colors['primary']}" stroke-width="3" opacity="0.6"/>
  <line x1="385" y1="185" x2="392" y2="192" stroke="{colors['primary']}" stroke-width="2" opacity="0.6"/>
</svg>'''

    return svg

def generate_hillside_house(slug: str, home_name: str, year: int) -> str:
    """Generate a hillside/cantilevered house.

    Designed for object-cover CSS: house fills 85-90% of canvas width,
    vertically centered so cropping from top/bottom works well.
    """
    seed = get_seed(slug)
    colors = choose_colors(seed)
    anim_name, anim_css = get_animation(seed)
    random.seed(seed)

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Hillside - edge to edge -->
  <path d="M -20 145 Q 100 185 220 220 L 420 260 L 420 300 L -20 300 Z" fill="{colors['secondary']}" opacity="0.4"/>
  <path d="M -20 170 Q 80 205 180 240 L 420 280 L 420 300 L -20 300 Z" fill="{colors['secondary']}" opacity="0.3"/>

  <g class="house-main">
    <!-- Cantilevered main volume - wider -->
    <rect x="60" y="100" width="300" height="75" fill="{colors['light']}" stroke="{colors['dark']}" stroke-width="1"/>

    <!-- Roof plane - edge to edge -->
    <polygon
      points="50,100 370,100 385,92 35,92"
      fill="{colors['primary']}"
      class="accent"
    />

    <!-- Supporting structure going into hill -->
    <polygon
      points="180,175 240,175 255,250 165,230"
      fill="{colors['dark']}"
    />

    <!-- Cantilevered deck - extends to edge -->
    <rect x="290" y="170" width="120" height="10" fill="{colors['primary']}" class="accent"/>
    <line x1="290" y1="180" x2="410" y2="180" stroke="{colors['dark']}" stroke-width="2" class="line-draw"/>

    <!-- Glass facade - wider -->
    <g class="windows">
      <rect x="80" y="112" width="250" height="55" fill="{colors['accent']}" opacity="0.6"/>
    </g>

    <!-- Horizontal divisions -->
    <line x1="80" y1="140" x2="330" y2="140" stroke="{colors['dark']}" stroke-width="1"/>
    <line x1="155" y1="112" x2="155" y2="167" stroke="{colors['dark']}" stroke-width="1"/>
    <line x1="230" y1="112" x2="230" y2="167" stroke="{colors['dark']}" stroke-width="1"/>
    <line x1="305" y1="112" x2="305" y2="167" stroke="{colors['dark']}" stroke-width="1"/>
  </g>

  <!-- Structural support lines -->
  <line x1="210" y1="175" x2="190" y2="225" stroke="{colors['dark']}" stroke-width="4"/>
</svg>'''

    return svg

def generate_geometric_house(slug: str, home_name: str, year: int) -> str:
    """Generate an abstract geometric house (generic version).

    Designed for object-cover CSS: house fills 85-90% of canvas width,
    vertically centered so cropping from top/bottom works well.
    """
    seed = get_seed(slug)
    colors = choose_colors(seed)
    anim_name, anim_css = get_animation(seed)
    random.seed(seed)

    # Generate polygon points for hexagonal shape
    sides = random.choice([6, 8])
    center_x, center_y = 200, 140
    radius = 120

    points = []
    for i in range(sides):
        angle = (2 * math.pi * i / sides) - math.pi/2
        x = center_x + radius * math.cos(angle)
        y = center_y + radius * math.sin(angle) * 0.55
        points.append(f"{x:.0f},{y:.0f}")

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
    <linearGradient id="struct-grad-{slug[:8]}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{colors['primary']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['dark']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <g class="house-main">
    <!-- Central pedestal/column -->
    <polygon
      points="185,200 215,200 225,280 175,280"
      fill="url(#struct-grad-{slug[:8]})"
    />

    <!-- Main geometric form -->
    <polygon
      points="{' '.join(points)}"
      fill="{colors['secondary']}"
      stroke="{colors['dark']}"
      stroke-width="2"
      class="accent"
    />

    <!-- Roof cap -->
    <polygon
      points="200,55 145,100 255,100"
      fill="{colors['primary']}"
    />

    <!-- Windows arranged radially -->
    <g class="windows">'''

    for i in range(sides):
        angle = (2 * math.pi * i / sides) - math.pi/2
        wx = center_x + (radius * 0.55) * math.cos(angle)
        wy = center_y + (radius * 0.55 * 0.55) * math.sin(angle)
        svg += f'''
      <circle cx="{wx:.0f}" cy="{wy:.0f}" r="12" fill="{colors['accent']}" opacity="0.7"/>'''

    svg += f'''
    </g>

    <!-- Ground level -->
    <line x1="0" y1="270" x2="400" y2="270" stroke="{colors['dark']}" stroke-width="2" class="line-draw"/>
  </g>

  <!-- Ground fill -->
  <rect x="0" y="270" width="400" height="30" fill="{colors['secondary']}" opacity="0.3"/>

  <!-- Landscape accents -->
  <circle cx="35" cy="250" r="30" fill="{colors['secondary']}" opacity="0.3"/>
  <circle cx="365" cy="255" r="35" fill="{colors['secondary']}" opacity="0.3"/>
</svg>'''

    return svg


# =============================================================================
# ICONIC BUILDING GENERATORS - Specific silhouettes for famous Lautner/Jones works
# =============================================================================

def generate_chemosphere(slug: str, home_name: str, year: int) -> str:
    """Generate the Chemosphere - Lautner's iconic UFO house on a single pole.

    Key features:
    - Octagonal shape (8-sided UFO form)
    - Single 29-foot concrete pedestal/pole
    - Perched on steep hillside
    - Band of windows around perimeter
    - Flat top with slight roof cap
    """
    colors = {
        'primary': COLORS['slate'],
        'secondary': COLORS['warm_white'],
        'accent': COLORS['gold'],
        'dark': COLORS['charcoal'],
        'hillside': COLORS['sand_dark'],
    }

    anim_css = ANIMATIONS['float']

    # Octagonal UFO shape - precise 8-sided polygon
    center_x, center_y = 200, 115
    radius = 130

    # Generate octagon points (wider, flatter)
    octagon_points = []
    for i in range(8):
        angle = (2 * math.pi * i / 8) - math.pi/2
        x = center_x + radius * math.cos(angle)
        y = center_y + radius * math.sin(angle) * 0.4  # Very flat
        octagon_points.append(f"{x:.0f},{y:.0f}")

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
    <linearGradient id="pole-grad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:{colors['dark']};stop-opacity:1" />
      <stop offset="50%" style="stop-color:rgb(90,85,80);stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['dark']};stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Steep hillside - the Chemosphere sits on a 45-degree slope -->
  <path d="M 0 180 L 160 280 L 400 280 L 400 300 L 0 300 Z" fill="{colors['hillside']}" opacity="0.4"/>
  <path d="M 0 200 L 140 290 L 400 290 L 400 300 L 0 300 Z" fill="{colors['hillside']}" opacity="0.3"/>

  <g class="house-main">
    <!-- The iconic single concrete pole/pedestal - tall and narrow -->
    <polygon
      points="190,155 210,155 218,270 182,270"
      fill="url(#pole-grad)"
    />

    <!-- Pole base - buried foundation hint -->
    <ellipse cx="200" cy="270" rx="25" ry="8" fill="{colors['dark']}" opacity="0.5"/>

    <!-- Main octagonal UFO body -->
    <polygon
      points="{' '.join(octagon_points)}"
      fill="{colors['secondary']}"
      stroke="{colors['dark']}"
      stroke-width="2"
    />

    <!-- Roof overhang/cap - slightly raised center -->
    <polygon
      points="200,68 140,88 260,88"
      fill="{colors['primary']}"
      class="accent"
    />

    <!-- Horizontal roof line -->
    <line x1="70" y1="90" x2="330" y2="90" stroke="{colors['dark']}" stroke-width="2"/>

    <!-- Window band around entire perimeter -->
    <g class="windows">
      <!-- Front windows - continuous band -->
      <rect x="85" y="105" width="230" height="28" fill="{colors['accent']}" opacity="0.7"/>

      <!-- Window mullions -->
      <line x1="115" y1="105" x2="115" y2="133" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="145" y1="105" x2="145" y2="133" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="175" y1="105" x2="175" y2="133" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="200" y1="105" x2="200" y2="133" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="225" y1="105" x2="225" y2="133" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="255" y1="105" x2="255" y2="133" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="285" y1="105" x2="285" y2="133" stroke="{colors['dark']}" stroke-width="1"/>
    </g>

    <!-- Funicular track hint (access to the house) -->
    <line x1="100" y1="165" x2="50" y2="250" stroke="{colors['dark']}" stroke-width="2" stroke-dasharray="5,5"/>
  </g>
</svg>'''

    return svg


def generate_sheats_goldstein(slug: str, home_name: str, year: int) -> str:
    """Generate Sheats-Goldstein Residence - angular triangular glass house.

    Key features:
    - Triangular/zigzag roofline
    - Two triangles joined at apex
    - Glass walls cantilevered over canyon
    - Coffered ceiling with skylights
    - Angular, no right angles
    """
    colors = {
        'primary': COLORS['slate'],
        'secondary': COLORS['cypress'],
        'accent': COLORS['gold'],
        'dark': COLORS['charcoal'],
        'glass': COLORS['sky'],
    }

    anim_css = ANIMATIONS['glow']

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
    <linearGradient id="canyon-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{colors['secondary']};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:{colors['dark']};stop-opacity:0.2" />
    </linearGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Canyon/hillside below -->
  <path d="M 0 220 Q 100 200 200 230 Q 300 260 400 220 L 400 300 L 0 300 Z"
        fill="url(#canyon-grad)"/>

  <g class="house-main">
    <!-- Main triangular structure - LEFT triangle -->
    <polygon
      points="20,180 200,100 200,200"
      fill="{colors['secondary']}"
      stroke="{colors['dark']}"
      stroke-width="1"
    />

    <!-- RIGHT triangle -->
    <polygon
      points="200,100 380,160 200,200"
      fill="{colors['secondary']}"
      stroke="{colors['dark']}"
      stroke-width="1"
    />

    <!-- Triangular roof ridge - the zigzag roofline -->
    <polygon
      points="20,165 200,80 200,100 20,180"
      fill="{colors['primary']}"
      class="accent"
    />
    <polygon
      points="200,80 380,145 380,160 200,100"
      fill="{colors['primary']}"
      class="accent"
    />

    <!-- Bold roof edge lines (zigzag) -->
    <polyline
      points="20,165 200,80 380,145"
      fill="none"
      stroke="{colors['dark']}"
      stroke-width="3"
    />

    <!-- Glass walls - triangular panes -->
    <g class="windows">
      <!-- Left wing glass -->
      <polygon points="50,175 180,110 180,180" fill="{colors['accent']}" opacity="0.6"/>
      <!-- Right wing glass -->
      <polygon points="220,115 350,160 220,185" fill="{colors['accent']}" opacity="0.6"/>

      <!-- Angular mullion lines -->
      <line x1="90" y1="170" x2="180" y2="125" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="130" y1="175" x2="180" y2="145" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="260" y1="130" x2="260" y2="175" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="300" y1="145" x2="300" y2="175" stroke="{colors['dark']}" stroke-width="1"/>
    </g>

    <!-- Coffered skylight details on roof -->
    <line x1="80" y1="172" x2="120" y2="152" stroke="{colors['accent']}" stroke-width="2" opacity="0.5"/>
    <line x1="140" y1="148" x2="170" y2="132" stroke="{colors['accent']}" stroke-width="2" opacity="0.5"/>
    <line x1="240" y1="105" x2="280" y2="120" stroke="{colors['accent']}" stroke-width="2" opacity="0.5"/>
    <line x1="300" y1="125" x2="340" y2="140" stroke="{colors['accent']}" stroke-width="2" opacity="0.5"/>

    <!-- Cantilevered base extending over canyon -->
    <polygon
      points="80,200 320,200 350,210 50,210"
      fill="{colors['dark']}"
      opacity="0.8"
    />
  </g>
</svg>'''

    return svg


def generate_elrod_house(slug: str, home_name: str, year: int) -> str:
    """Generate Elrod House - concrete dome integrated with desert boulders.

    Key features:
    - 60-foot circular concrete dome/canopy
    - Radial concrete beams (9 beams fanning out)
    - Triangular clerestory windows between beams
    - Natural boulders integrated into the structure
    - Indoor-outdoor pool
    - James Bond film location
    """
    colors = {
        'primary': COLORS['slate'],
        'secondary': COLORS['sand'],
        'accent': COLORS['gold'],
        'dark': COLORS['charcoal'],
        'boulder': COLORS['cypress_dark'],
    }

    anim_css = ANIMATIONS['breathe']

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
    <radialGradient id="dome-grad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:{colors['secondary']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:{colors['primary']};stop-opacity:1" />
    </radialGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Desert ground -->
  <rect x="0" y="220" width="400" height="80" fill="{colors['secondary']}" opacity="0.4"/>

  <g class="house-main">
    <!-- The iconic circular concrete dome - 60ft diameter represented -->
    <ellipse cx="200" cy="140" rx="160" ry="70" fill="url(#dome-grad)" class="accent"/>

    <!-- Dome outer ring -->
    <ellipse cx="200" cy="140" rx="160" ry="70" fill="none" stroke="{colors['dark']}" stroke-width="3"/>

    <!-- Radial concrete beams (9 beams fanning outward) -->
    <line x1="200" y1="140" x2="60" y2="100" stroke="{colors['dark']}" stroke-width="4"/>
    <line x1="200" y1="140" x2="90" y2="75" stroke="{colors['dark']}" stroke-width="4"/>
    <line x1="200" y1="140" x2="140" y2="72" stroke="{colors['dark']}" stroke-width="4"/>
    <line x1="200" y1="140" x2="200" y2="70" stroke="{colors['dark']}" stroke-width="4"/>
    <line x1="200" y1="140" x2="260" y2="72" stroke="{colors['dark']}" stroke-width="4"/>
    <line x1="200" y1="140" x2="310" y2="75" stroke="{colors['dark']}" stroke-width="4"/>
    <line x1="200" y1="140" x2="340" y2="100" stroke="{colors['dark']}" stroke-width="4"/>

    <!-- Clerestory windows between beams (triangular gold sections) -->
    <g class="windows">
      <polygon points="200,140 90,75 140,72" fill="{colors['accent']}" opacity="0.6"/>
      <polygon points="200,140 140,72 200,70" fill="{colors['accent']}" opacity="0.5"/>
      <polygon points="200,140 200,70 260,72" fill="{colors['accent']}" opacity="0.6"/>
      <polygon points="200,140 260,72 310,75" fill="{colors['accent']}" opacity="0.5"/>
    </g>

    <!-- Base structure / living area rim -->
    <ellipse cx="200" cy="180" rx="150" ry="35" fill="{colors['secondary']}" stroke="{colors['dark']}" stroke-width="2"/>

    <!-- Natural boulders integrated into structure -->
    <ellipse cx="80" cy="190" rx="35" ry="25" fill="{colors['boulder']}" opacity="0.7"/>
    <ellipse cx="95" cy="205" rx="25" ry="18" fill="{colors['boulder']}" opacity="0.6"/>
    <ellipse cx="320" cy="185" rx="30" ry="22" fill="{colors['boulder']}" opacity="0.7"/>

    <!-- Indoor-outdoor pool hint -->
    <ellipse cx="200" cy="200" rx="60" ry="15" fill="{COLORS['sky']}" opacity="0.5"/>

    <!-- Central column hint -->
    <circle cx="200" cy="140" r="12" fill="{colors['dark']}"/>
  </g>
</svg>'''

    return svg


def generate_silvertop(slug: str, home_name: str, year: int) -> str:
    """Generate Silvertop - dramatic curved/arched concrete roof.

    Key features:
    - Billowing arched concrete vault roof
    - Spans entire living area
    - Curved brick end walls
    - Floor-to-ceiling glass walls
    - Cantilevered infinity pool
    - Sits atop Silver Lake hill
    """
    colors = {
        'primary': COLORS['slate'],
        'secondary': COLORS['warm_white'],
        'accent': COLORS['gold'],
        'dark': COLORS['charcoal'],
        'brick': COLORS['terracotta'],
        'pool': COLORS['sky'],
    }

    anim_css = ANIMATIONS['breathe']

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
    <linearGradient id="vault-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:{colors['primary']};stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(100,105,115);stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Hillside - Silver Lake topography -->
  <path d="M 0 200 Q 100 180 200 210 Q 300 240 400 190 L 400 300 L 0 300 Z"
        fill="{colors['dark']}" opacity="0.15"/>

  <g class="house-main">
    <!-- The iconic billowing/arched concrete vault roof -->
    <path
      d="M 30 180 Q 200 50 370 180 L 370 195 Q 200 65 30 195 Z"
      fill="url(#vault-grad)"
      class="accent"
    />

    <!-- Roof edge emphasis -->
    <path
      d="M 30 180 Q 200 50 370 180"
      fill="none"
      stroke="{colors['dark']}"
      stroke-width="4"
    />

    <!-- Main glass wall beneath vault -->
    <g class="windows">
      <rect x="50" y="165" width="300" height="45" fill="{colors['accent']}" opacity="0.6"/>

      <!-- Floor-to-ceiling glass mullions -->
      <line x1="100" y1="165" x2="100" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="150" y1="165" x2="150" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="200" y1="165" x2="200" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="250" y1="165" x2="250" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="300" y1="165" x2="300" y2="210" stroke="{colors['dark']}" stroke-width="1"/>
    </g>

    <!-- Curved brick end walls -->
    <path
      d="M 30 180 Q 25 190 30 210 L 50 210 L 50 165 Z"
      fill="{colors['brick']}"
    />
    <path
      d="M 370 180 Q 375 190 370 210 L 350 210 L 350 165 Z"
      fill="{colors['brick']}"
    />

    <!-- Four support columns under vault -->
    <rect x="90" y="165" width="8" height="45" fill="{colors['dark']}"/>
    <rect x="160" y="165" width="8" height="45" fill="{colors['dark']}"/>
    <rect x="232" y="165" width="8" height="45" fill="{colors['dark']}"/>
    <rect x="302" y="165" width="8" height="45" fill="{colors['dark']}"/>

    <!-- Cantilevered infinity pool -->
    <rect x="280" y="210" width="90" height="20" fill="{colors['pool']}" opacity="0.6"/>
    <line x1="280" y1="210" x2="370" y2="210" stroke="{colors['dark']}" stroke-width="2"/>

    <!-- Pool cantilever supports -->
    <line x1="310" y1="230" x2="310" y2="250" stroke="{colors['dark']}" stroke-width="3"/>
    <line x1="350" y1="230" x2="350" y2="245" stroke="{colors['dark']}" stroke-width="3"/>
  </g>
</svg>'''

    return svg


def generate_garcia_house(slug: str, home_name: str, year: int) -> str:
    """Generate Garcia House (Rainbow House) - parabolic arch on V-stilts.

    Key features:
    - Distinctive parabolic/rainbow arch roof
    - Stained glass colored panels
    - V-shaped steel support stilts
    - Sits 60 feet above canyon
    - Almond/eye shape from front
    - Two-story interior with 30ft ceiling
    """
    colors = {
        'primary': COLORS['slate'],
        'secondary': COLORS['warm_white'],
        'accent': COLORS['gold'],
        'dark': COLORS['charcoal'],
        'glass_red': COLORS['terracotta'],
        'glass_blue': COLORS['sky'],
    }

    anim_css = ANIMATIONS['float']

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Canyon below -->
  <path d="M 0 250 Q 100 240 200 260 Q 300 280 400 250 L 400 300 L 0 300 Z"
        fill="{colors['dark']}" opacity="0.15"/>

  <g class="house-main">
    <!-- The iconic parabolic/rainbow arch roof -->
    <path
      d="M 60 180 Q 200 30 340 180 L 340 200 Q 200 60 60 200 Z"
      fill="{colors['primary']}"
      class="accent"
    />

    <!-- Inner arch (roof thickness) -->
    <path
      d="M 75 180 Q 200 50 325 180"
      fill="none"
      stroke="{colors['dark']}"
      stroke-width="2"
    />

    <!-- Outer arch edge -->
    <path
      d="M 60 180 Q 200 30 340 180"
      fill="none"
      stroke="{colors['dark']}"
      stroke-width="3"
    />

    <!-- Main body beneath arch - almond shape -->
    <ellipse cx="200" cy="175" rx="120" ry="40" fill="{colors['secondary']}" stroke="{colors['dark']}" stroke-width="1"/>

    <!-- Stained glass panels (the "rainbow" colors) -->
    <g class="windows">
      <!-- Colored glass segments -->
      <rect x="90" y="145" width="25" height="40" fill="{colors['glass_red']}" opacity="0.7"/>
      <rect x="120" y="135" width="25" height="50" fill="{colors['accent']}" opacity="0.7"/>
      <rect x="150" y="130" width="25" height="55" fill="{COLORS['gold']}" opacity="0.7"/>
      <rect x="180" y="128" width="40" height="57" fill="{colors['accent']}" opacity="0.6"/>
      <rect x="225" y="130" width="25" height="55" fill="{COLORS['gold']}" opacity="0.7"/>
      <rect x="255" y="135" width="25" height="50" fill="{colors['glass_blue']}" opacity="0.7"/>
      <rect x="285" y="145" width="25" height="40" fill="{colors['glass_red']}" opacity="0.6"/>

      <!-- Window mullions -->
      <line x1="115" y1="145" x2="115" y2="185" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="145" y1="135" x2="145" y2="185" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="175" y1="130" x2="175" y2="185" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="220" y1="128" x2="220" y2="185" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="250" y1="130" x2="250" y2="185" stroke="{colors['dark']}" stroke-width="1"/>
      <line x1="280" y1="135" x2="280" y2="185" stroke="{colors['dark']}" stroke-width="1"/>
    </g>

    <!-- V-shaped support stilts (60 feet above canyon) -->
    <!-- Left V-stilt -->
    <line x1="130" y1="200" x2="100" y2="280" stroke="{colors['dark']}" stroke-width="5"/>
    <line x1="130" y1="200" x2="160" y2="280" stroke="{colors['dark']}" stroke-width="5"/>

    <!-- Right V-stilt -->
    <line x1="270" y1="200" x2="240" y2="280" stroke="{colors['dark']}" stroke-width="5"/>
    <line x1="270" y1="200" x2="300" y2="280" stroke="{colors['dark']}" stroke-width="5"/>

    <!-- Central "hole" through arch framing view -->
    <ellipse cx="200" cy="85" rx="25" ry="15" fill="white" stroke="{colors['dark']}" stroke-width="1"/>
  </g>
</svg>'''

    return svg


def generate_stoneflower(slug: str, home_name: str, year: int) -> str:
    """Generate Stoneflower - E. Fay Jones treehouse chapel precursor.

    Key features:
    - Multi-level treehouse structure
    - Natural stone/boulder integration (grotto base)
    - Vertical wood lattice elements
    - A-frame inspired triangular forms
    - Spiral staircase connection
    - Stilted above forest floor
    - Precursor to Thorncrown Chapel
    """
    colors = {
        'primary': COLORS['cypress'],
        'secondary': COLORS['sand'],
        'accent': COLORS['gold'],
        'dark': COLORS['charcoal'],
        'stone': COLORS['slate'],
        'wood': COLORS['mahogany'],
    }

    anim_css = ANIMATIONS['breathe']

    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
  <defs>
    <style>
      {anim_css}
    </style>
  </defs>

  <!-- White Background -->
  <rect width="400" height="300" fill="white"/>

  <!-- Forest floor -->
  <rect x="0" y="250" width="400" height="50" fill="{colors['primary']}" opacity="0.25"/>

  <g class="house-main">
    <!-- Stone grotto base (lower level) -->
    <ellipse cx="200" cy="250" rx="80" ry="25" fill="{colors['stone']}" opacity="0.6"/>
    <ellipse cx="180" cy="240" rx="40" ry="20" fill="{colors['stone']}" opacity="0.5"/>
    <ellipse cx="230" cy="238" rx="35" ry="18" fill="{colors['stone']}" opacity="0.5"/>

    <!-- Vertical wood stilts/posts -->
    <rect x="140" y="120" width="6" height="130" fill="{colors['wood']}"/>
    <rect x="175" y="100" width="6" height="150" fill="{colors['wood']}"/>
    <rect x="220" y="100" width="6" height="150" fill="{colors['wood']}"/>
    <rect x="255" y="120" width="6" height="130" fill="{colors['wood']}"/>

    <!-- Main triangular A-frame upper structure -->
    <polygon
      points="200,60 130,150 270,150"
      fill="{colors['secondary']}"
      stroke="{colors['dark']}"
      stroke-width="2"
    />

    <!-- A-frame roof lines -->
    <line x1="200" y1="60" x2="130" y2="150" stroke="{colors['wood']}" stroke-width="4"/>
    <line x1="200" y1="60" x2="270" y2="150" stroke="{colors['wood']}" stroke-width="4"/>

    <!-- Vertical lattice pattern (Fay Jones signature) -->
    <line x1="160" y1="80" x2="160" y2="150" stroke="{colors['wood']}" stroke-width="2"/>
    <line x1="180" y1="70" x2="180" y2="150" stroke="{colors['wood']}" stroke-width="2"/>
    <line x1="200" y1="60" x2="200" y2="150" stroke="{colors['wood']}" stroke-width="2"/>
    <line x1="220" y1="70" x2="220" y2="150" stroke="{colors['wood']}" stroke-width="2"/>
    <line x1="240" y1="80" x2="240" y2="150" stroke="{colors['wood']}" stroke-width="2"/>

    <!-- Cross bracing -->
    <line x1="145" y1="120" x2="255" y2="120" stroke="{colors['wood']}" stroke-width="2"/>

    <!-- Glass windows in A-frame -->
    <g class="windows">
      <polygon points="200,75 165,130 235,130" fill="{colors['accent']}" opacity="0.5"/>
    </g>

    <!-- Lower deck level -->
    <rect x="120" y="150" width="160" height="10" fill="{colors['primary']}" stroke="{colors['dark']}" stroke-width="1"/>

    <!-- Lower level structure (grotto view) -->
    <rect x="145" y="160" width="110" height="70" fill="{colors['secondary']}" opacity="0.7" stroke="{colors['dark']}" stroke-width="1"/>

    <!-- Lower level windows -->
    <rect x="155" y="175" width="35" height="40" fill="{colors['accent']}" opacity="0.6"/>
    <rect x="210" y="175" width="35" height="40" fill="{colors['accent']}" opacity="0.6"/>

    <!-- Spiral staircase hint -->
    <ellipse cx="280" cy="200" rx="15" ry="5" fill="{colors['dark']}" opacity="0.4"/>
    <path d="M 280 200 Q 295 180 280 160 Q 265 140 280 120" fill="none" stroke="{colors['dark']}" stroke-width="2" stroke-dasharray="4,4"/>

    <!-- Waterfall hint (from description) -->
    <line x1="120" y1="230" x2="120" y2="260" stroke="{COLORS['sky']}" stroke-width="3" opacity="0.5"/>
  </g>
</svg>'''

    return svg

def select_house_style(slug: str, home_name: str, year: int, description: str) -> str:
    """Select appropriate house style based on property characteristics.

    Uses specific iconic generators for famous Lautner and Fay Jones buildings,
    falls back to generic styles for other properties.
    """
    seed = get_seed(slug)
    random.seed(seed)

    # ICONIC BUILDING MAPPING - These get specific, recognizable silhouettes
    iconic_buildings = {
        # John Lautner iconic works
        'chemosphere-malin-residence': generate_chemosphere,
        'chemosphere': generate_chemosphere,
        'sheats-goldstein-residence': generate_sheats_goldstein,
        'elrod-house': generate_elrod_house,
        'silvertop-reiner-residence': generate_silvertop,
        'silvertop': generate_silvertop,
        'garcia-house': generate_garcia_house,
        # E. Fay Jones iconic works
        'stoneflower': generate_stoneflower,
    }

    # Check for iconic building first
    if slug in iconic_buildings:
        return iconic_buildings[slug](slug, home_name, year)

    # Keywords to match styles
    name_lower = home_name.lower()
    desc_lower = description.lower() if description else ""

    # Match by name patterns for any missed iconic buildings
    if 'chemosphere' in name_lower:
        return generate_chemosphere(slug, home_name, year)
    elif 'sheats' in name_lower or 'goldstein' in name_lower:
        return generate_sheats_goldstein(slug, home_name, year)
    elif 'elrod' in name_lower:
        return generate_elrod_house(slug, home_name, year)
    elif 'silvertop' in name_lower:
        return generate_silvertop(slug, home_name, year)
    elif 'garcia' in name_lower and 'rainbow' in desc_lower:
        return generate_garcia_house(slug, home_name, year)
    elif 'stoneflower' in name_lower:
        return generate_stoneflower(slug, home_name, year)

    # Generic style matching
    elif 'palm springs' in desc_lower or 'desert' in desc_lower:
        return generate_desert_house(slug, home_name, year)
    elif 'hillside' in desc_lower or 'cliff' in desc_lower or 'cantilever' in desc_lower:
        return generate_hillside_house(slug, home_name, year)
    elif 'organic' in desc_lower or 'dome' in desc_lower or 'boulder' in desc_lower:
        return generate_organic_house(slug, home_name, year)
    elif year and year < 1950:
        return generate_prairie_house(slug, home_name, year)
    else:
        # Randomly select from remaining styles
        styles = [
            generate_prairie_house,
            generate_usonian_house,
            generate_organic_house,
            generate_hillside_house
        ]
        return random.choice(styles)(slug, home_name, year)

def generate_all_svgs(properties_path: str, output_dir: str) -> dict:
    """Generate SVGs for all properties and return index."""

    # Load properties
    with open(properties_path, 'r') as f:
        properties = json.load(f)

    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)

    index = {
        'generated_at': '2026-02-21',
        'total_count': len(properties),
        'properties': []
    }

    for prop in properties:
        slug = prop.get('slug', prop.get('id', 'unknown'))
        home_name = prop.get('home_name', 'Unknown House')
        year = prop.get('year_built')
        description = prop.get('description', '')

        # Generate SVG
        svg_content = select_house_style(slug, home_name, year, description)

        # Write SVG file
        svg_filename = f"{slug}.svg"
        svg_path = output_path / svg_filename

        with open(svg_path, 'w') as f:
            f.write(svg_content)

        print(f"Generated: {svg_filename}")

        # Add to index
        index['properties'].append({
            'slug': slug,
            'home_name': home_name,
            'svg_file': svg_filename,
            'year_built': year
        })

    # Write index file
    index_path = output_path / 'index.json'
    with open(index_path, 'w') as f:
        json.dump(index, f, indent=2)

    print(f"\nGenerated {len(properties)} SVG files")
    print(f"Index saved to: {index_path}")

    return index

if __name__ == '__main__':
    import os

    # Paths
    script_dir = os.path.dirname(os.path.abspath(__file__))
    properties_path = os.path.join(
        os.path.dirname(script_dir),
        '..', 'src', 'data', 'properties.json'
    )
    output_dir = script_dir

    # Normalize paths
    properties_path = os.path.normpath(properties_path)

    print("Usonian House SVG Generator")
    print("=" * 40)
    print(f"Properties file: {properties_path}")
    print(f"Output directory: {output_dir}")
    print("=" * 40)

    # Generate all SVGs
    generate_all_svgs(properties_path, output_dir)
