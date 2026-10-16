# MTPL Travel Platform — Accessibility Specification

## Standard

Target WCAG 2.2 AA principles where practical.

## Keyboard

All interactive controls must be keyboard accessible.

Required:

- visible focus
- logical tab order
- keyboard-operable menus
- dialogs with correct focus behavior

## Images

Every meaningful image needs appropriate alt text.

Decorative images should have empty alt text or be hidden from assistive technology as appropriate.

## Color

Do not rely on color alone to communicate status.

Text and controls must have sufficient contrast.

## Forms

Every field needs:

- accessible label
- clear required/optional indication
- associated error message
- usable focus state

## Navigation

Mobile menu must:

- be keyboard accessible
- be closable
- have appropriate ARIA semantics
- not trap focus incorrectly

## Motion

Respect:

`prefers-reduced-motion`

Animations must not be required to understand or operate the website.

## Semantic HTML

Prefer:

- header
- nav
- main
- section
- article
- footer
- button
- form

over generic divs.

## Screen Readers

Avoid ambiguous links such as:

- Click here
- Read more

Prefer context-specific labels such as:

- View Dubai holiday package
- Explore Maldives destination

## Testing

Accessibility should be checked during implementation, not only before launch.
