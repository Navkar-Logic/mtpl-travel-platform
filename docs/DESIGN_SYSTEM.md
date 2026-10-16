# MTPL Travel Platform — Design System

## Design Direction

**Premium Travel / Modern Editorial / Human Trust**

The supplied reference image is the primary visual direction.

The implementation must be original and branded for MTPL.

## Brand Color

Primary:

```text
#07A25E
```

Recommended supporting palette:

```text
Primary Green:      #07A25E
Dark Green:        #057A47
Deep Navy:         #102A43
Body Text:         #52606D
Light Green:       #EAF7F1
Page Background:   #F7FAF9
White:             #FFFFFF
Border:            #E5ECE9
Muted:             #7B8794
```

Do not introduce unrelated strong colors without design-system justification.

## Visual Principles

- generous whitespace
- strong typography hierarchy
- high-quality destination photography
- clean cards
- subtle borders
- restrained shadows
- rounded corners
- green CTA emphasis
- deep navy headings
- minimal decorative noise
- consistent alignment
- polished mobile behavior

## Avoid

- excessive gradients
- excessive glassmorphism
- neon tech aesthetic
- excessive motion
- fake 3D effects
- visual clutter
- random color usage
- stock-photo overload
- copied layouts from competitor/reference sites

## Typography

Preferred approach:

- modern sans-serif
- highly readable body font
- strong but not oversized headings
- clear numerical/statistical typography

The final font family should be selected and loaded consistently through the application rather than mixing many fonts.

## Layout

Use a consistent centered container.

Recommended desktop max width:

`1200px–1280px`

Use responsive horizontal padding rather than hardcoded page-specific widths.

## Spacing

Use a consistent spacing scale.

Do not create arbitrary values in every component.

## Border Radius

Use a restrained rounded system:

- small: inputs/badges
- medium: cards
- large: hero/search/enquiry panels where appropriate

## Shadows

Prefer subtle elevation.

Cards should not look like floating UI everywhere.

## Buttons

Primary:

- MTPL green background
- white text
- strong contrast
- clear hover/focus state

Secondary:

- white/light background
- green border/text or neutral treatment

Buttons must have visible keyboard focus.

## Cards

Destination cards:

- image-first
- readable overlay/text treatment
- hover movement should be subtle

Package cards:

- image
- package title
- duration
- concise details
- price only when approved
- CTA

Service cards:

- icon
- title
- short description
- optional link

## Photography

Use:

- real MTPL/client photography when supplied
- licensed/approved imagery
- destination-specific images

Do not embed random copyrighted images merely to make a page look complete.

## Animation

Use Framer Motion where it adds value.

Preferred:

- fade/slide reveal
- subtle card hover
- image scale on hover
- navigation transitions
- section entrance

Respect `prefers-reduced-motion`.

Do not animate every element.

## Responsive Behavior

Design for:

- mobile
- tablet
- desktop
- wide desktop

Mobile navigation must be intentionally designed, not simply collapsed desktop navigation.

## Icons

Use one consistent icon family, preferably Lucide.

Avoid mixing unrelated icon styles.

## Accessibility

Color contrast, focus states, semantic structure, alt text, keyboard navigation, and reduced-motion behavior are mandatory.
