# Design Exploration Skill

## Overview

The `/design-exploration` skill enables rigorous, parallel design exploration with reference sourcing, visual adaptation, and documented learnings. It's designed for scenarios where you need to rapidly explore a design space by studying existing references and creating original adaptations.

## Usage

```
/design-exploration --theme "FLW stained glass" --count 10 --rounds 2 --output ./mockups/exploration.html
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `--theme` | Yes | - | Design theme or style to explore (e.g., "FLW stained glass", "Art Deco posters", "Bauhaus typography") |
| `--count` | No | 10 | Number of designs per round |
| `--rounds` | No | 2 | Number of iteration rounds |
| `--output` | No | `./mockups/design-exploration.html` | Output HTML file path |
| `--format` | No | `svg` | Output format: `svg`, `css`, `html` |

## How It Works

### Phase 1: Reference Sourcing

1. **Web Search**: Search for high-quality reference images matching the theme
2. **URL Collection**: Gather direct image URLs from reputable sources
3. **Context Research**: Brief history/context for each reference

### Phase 2: Parallel Agent Execution

For each reference image, launch an independent agent that:

1. **Analyzes** the reference image
2. **Extracts** key design principles, patterns, and colors
3. **Creates** an original adaptation (not a copy)
4. **Documents** learnings in three categories:
   - Pattern Analysis
   - Color Extraction (with hex values)
   - Design Principles

### Phase 3: Report Compilation

Generate an HTML report with:

- Side-by-side comparison (reference | adaptation)
- Full learnings documentation
- Color swatches with hex codes
- Cumulative design principles summary

### Phase 4: Iteration (if multiple rounds)

Repeat phases 1-3 with new references, building on cumulative learnings.

## Output Structure

```
mockups/
  exploration.html          # Main report with all designs
    - Round 1 (designs 1-N)
    - Round 2 (designs N+1-2N)
    - Cumulative Principles
```

## Example Output

The skill generates a comprehensive HTML report:

```html
<div class="design-row">
  <div class="design-column">
    <!-- Reference Image -->
    <h3>Reference: [Name]</h3>
    <img src="[reference-url]" />
    <p class="context">[Historical context]</p>
  </div>
  <div class="design-column">
    <!-- Original Adaptation -->
    <h3>Adaptation: [Name]</h3>
    <svg>...</svg>
  </div>
</div>
<div class="full-learnings">
  <div class="learnings-grid">
    <div class="learning-section">Pattern Analysis</div>
    <div class="learning-section">Color Extraction</div>
    <div class="learning-section">Design Principles</div>
  </div>
</div>
```

## Best Practices

### Reference Selection

- Choose iconic, well-documented examples
- Include variety within the theme
- Prioritize high-resolution images
- Include historical context when available

### Agent Coordination

- Run agents in true parallel (same message, multiple tool calls)
- Each agent works independently on one reference
- Agents should create adaptations, not copies
- Require documented learnings from each agent

### Quality Criteria

- **Fidelity**: Captures essence of the style
- **Originality**: Creates something new, not derivative
- **Documentation**: Clear, actionable learnings
- **Technical**: Clean code, proper structure

## Integration

### With the Design System

After exploration, the best designs can be:

1. Refined into production components
2. Used to establish design tokens
3. Documented as pattern examples

### With Other Skills

- `/implement-design` - Turn selected designs into components
- `/create-tokens` - Extract colors/patterns into design tokens

## Verification Checklist

- [ ] All N designs render correctly
- [ ] Reference images load properly
- [ ] Learnings are documented for each design
- [ ] Color swatches display accurately
- [ ] Cumulative principles are actionable
- [ ] HTML validates without errors
