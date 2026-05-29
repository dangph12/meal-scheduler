---
name: EatDee
description: Vietnamese meal planning app with adaptive weight tracking
colors:
  primary: "#1b5e20"
  primary-foreground: "#fafafa"
  accent: "#FF7043"
  accent-foreground: "#fafafa"
  background: "#fafafa"
  foreground: "#212121"
  card: "#ffffff"
  card-foreground: "#212121"
  secondary: "#f5f5f5"
  secondary-foreground: "#212121"
  muted: "#f5f5f5"
  muted-foreground: "#737373"
  border: "#ebebeb"
  input: "#ebebeb"
  destructive: "#dc2626"
typography:
  display:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: "clamp(2.5rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Geist, Inter, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 500
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "10px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
  card:
    backgroundColor: "{colors.card}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: "16px"
---

# Design System: EatDee

## 1. Overview

**Creative North Star: "The Digital Wellness Journal"**

A Vietnamese meal planning and weight tracking application that prioritizes practicality over flash. The interface should feel like a helpful digital companion—a wellness journal that's warm, readable, and grounded. The green primary color anchors the experience in natural, healthy associations while the coral accent brings warmth and approachability.

The design explicitly rejects AI-generated aesthetics (gradient text, glassmorphism, numbered section eyebrows), generic SaaS cream color schemes, and corporate fitness vibes. Everything serves utility first.

### Key Characteristics:
- **Utility-first**: Every element serves a function; no decorative fluff
- **Warm clarity**: Soft, readable, no shouting or harsh contrasts
- **Vietnamese identity through content**: The cuisine is the feature, not decoration
- **Progressive simplicity**: Features unfold as user engages

## 2. Colors

The palette uses a forest green as primary and warm coral as accent. This combination feels natural (green = healthy/natural) while the coral adds warmth and energy—appetizing without being aggressive.

### Primary
- **Forest Green** (#1b5e20): The main brand color. Used for primary buttons, header logo, footer branding. Anchors trust and health.
- **Forest Green Light** (#fafafa): Text on dark backgrounds using primary color.

### Accent
- **Warm Coral** (#FF7043): The action color for CTAs and interactive highlights. Warm, inviting, draws attention without aggression.
- **Warm Coral Light** (#fafafa): Text on dark backgrounds using accent color.

### Neutral
- **Background** (#fafafa): The base background—off-white with zero chroma, easy on eyes.
- **Surface** (#ffffff): Cards and elevated surfaces.
- **Text Primary** (#212121): High-contrast text for readability (4.5:1+ contrast).
- **Text Secondary** (#737373): Muted text for secondary information.
- **Border** (#ebebeb): Subtle dividers and input borders.

### Named Rules

**The One-Two Rule.** The primary green and coral accent are the only saturated colors. All other colors are neutrals at chroma 0 or near-zero. Don't introduce a third saturated color.

**The Contrast Rule.** All body text must meet 4.5:1 contrast against its background. Never use muted gray text on tinted backgrounds.

## 3. Typography

**Display/Body Font:** Geist (with Inter fallback). A clean, modern sans-serif that balances personality with readability.

**Character:** Practical and clean. No decorative display fonts. The type hierarchy communicates importance through size and weight contrast, not through ornament.

### Hierarchy
- **Display** (700, clamp 2.5–4rem, -0.02em): Hero headlines only. Used on homepage maintitle.
- **Headline** (600, 1.875–2.25rem, -0.01em): Section titles. Used in value proposition cards.
- **Title** (600, 1.25rem): Card titles, navigation items.
- **Body** (400, 1rem, 1.6 line-height): Primary content. Max line length 65–75ch.
- **Label** (500, 0.875rem): Buttons, labels, metadata.

### Named Rules

**The Scale Rule.** Maintain at least 1.25 ratio between type steps. Don't flatten the hierarchy.

## 4. Elevation

The system is predominantly flat. Depth is conveyed through:
- **Borders**: Subtle borders (#ebebeb) for separation
- **Backgrounds**: Tonal differences (white card on off-white background)
- **Shadows**: Minimal usage. Only for interactive states or modals.

### Shadow Vocabulary
- **Subtle** (0 1px 2px rgba(0,0,0,0.05)): Rarely used—only for elevated cards on hover.
- **Modal** (0 4px 24px rgba(0,0,0,0.15)): Reserved for modals and overlays.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to interaction or elevation requirement.

## 5. Components

### Buttons
- **Shape:** Rounded corners (10px radius)
- **Primary**: Background #1b5e20, text white, padding 8px 16px
- **Accent**: Background #FF7043, text white, padding 8px 16px. Used for main CTAs.
- **Ghost**: Transparent background, text #212121. Used for secondary actions.
- **Hover**: Subtle brightness shift; no radical color changes

### Cards / Containers
- **Shape:** 10px radius
- **Background:** White (#ffffff)
- **Border:** 1px solid #ebebeb
- **Padding:** 16px
- **Shadow:** None by default; subtle shadow on hover

### Inputs
- **Style:** 1px solid border, transparent background
- **Border:** #ebebeb default, #1b5e20 on focus
- **Radius:** 10px

### Navigation
- **Header**: Logo left, theme toggle, auth buttons right. No nav links yet (deferred).
- **Footer**: Logo, social links, copyright. Minimal.

## 6. Do's and Don'ts

### Do:
- **Do** use the forest green (#1b5e20) as primary action color
- **Do** use warm coral (#FF7043) for primary CTAs and highlights
- **Do** keep text contrast high (4.5:1 for body, 3:1 for large text)
- **Do** use white cards on off-white backgrounds for visual hierarchy
- **Do** use the flat aesthetic—shadows only on interaction

### Don't:
- **Don't** use gradient text—use solid colors
- **Don't** add glassmorphism effects—keep surfaces solid
- **Don't** use numbered section markers as scaffolding (01, 02, 03)
- **Don't** add eyebrow text above every section
- **Don't** use navy-and-gold (corporate fitness trope)
- **Don't** use border-left/right as colored accent stripes
- **Don't** round cards beyond 16px—keep it refined