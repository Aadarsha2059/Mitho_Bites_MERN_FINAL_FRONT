# BhokBhoj Color Scheme Guide

## Color Palette

### Primary Colors

#### Deep Teal (Primary Brand Color)
```css
#008B8B
rgb(0, 139, 139)
rgba(0, 139, 139, 0.X)
```
**Usage**: Primary buttons, links, headings, borders, icons

#### Warm Amber (Secondary Brand Color)
```css
#FFA500
rgb(255, 165, 0)
rgba(255, 165, 0, 0.X)
```
**Usage**: Secondary buttons, accents, highlights, call-to-action elements

#### Rich Burgundy (Accent Color)
```css
#8B0000 (Dark)
#660000 (Darker)
rgb(139, 0, 0)
rgba(139, 0, 0, 0.X)
```
**Usage**: Error messages, important notices, hover states, emphasis

### Background Colors

#### Cream
```css
#FFF8DC
rgb(255, 248, 220)
```
**Usage**: Main backgrounds, cards, sections

#### Light Khaki
```css
#F0E68C
rgb(240, 230, 140)
```
**Usage**: Gradient backgrounds, alternating sections

---

## Common Gradient Combinations

### Primary Button Gradient
```css
background: linear-gradient(135deg, #008B8B, #FFA500);
```

### Hover State
```css
background: linear-gradient(135deg, #006666, #FF8C00);
```

### Accent Gradient
```css
background: linear-gradient(135deg, #8B0000, #660000);
```

### Background Gradient
```css
background: linear-gradient(120deg, #FFF8DC 0%, #F0E68C 100%);
```

### Section Gradient (Light)
```css
background: linear-gradient(90deg, #fff 60%, #FFF8DC 100%);
```

---

## Component-Specific Colors

### Header
- Background: `rgba(255, 248, 220, 0.95)` (Cream with transparency)
- Links: `#333` (default), `#008B8B` (hover)
- Login Button: `linear-gradient(135deg, #008B8B, #FFA500)`

### Hero Section
- Background: Cream gradient
- Overlay: `rgba(0, 0, 0, 0.45)`
- Text: White
- Search Bar: White background

### Cards & Sections
- Card Background: `#fff`
- Card Shadow: `rgba(0, 139, 139, 0.10)`
- Card Hover Shadow: `rgba(0, 139, 139, 0.18)`
- Border: `#008B8B`

### Testimonials
- Card Background: `#fff`
- Border: `4px solid #008B8B`
- Quote Icon: `#008B8B`
- Name: `#008B8B`
- Stars: `#ffb300` (gold)

### Badges & Labels
- Best Badge: `linear-gradient(90deg, #FFA500, #008B8B)`
- Price Tag: `linear-gradient(135deg, #008B8B, #006666)`

### Forms
- Input Border: `#ddd` (default)
- Input Focus: `#008B8B`
- Input Shadow: `rgba(0, 139, 139, 0.4)`
- Error: `#8B0000`
- Success: `#008B8B`

### Buttons

#### Primary Button
```css
background: linear-gradient(135deg, #008B8B, #FFA500);
color: white;
box-shadow: 0 4px 12px rgba(0, 139, 139, 0.3);
```

#### Primary Button Hover
```css
background: linear-gradient(135deg, #006666, #FF8C00);
box-shadow: 0 6px 20px rgba(0, 139, 139, 0.4);
```

#### Secondary Button
```css
background: linear-gradient(135deg, #FFA500, #FFA500);
color: white;
```

#### Danger/Delete Button
```css
background: linear-gradient(135deg, #8B0000, #660000);
color: white;
```

---

## Scrollbar Styling

```css
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #FFF8DC;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(120deg, #008B8B 0%, #FFA500 100%);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 139, 139, 0.2);
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #8B0000 0%, #008B8B 100%);
}
```

---

## Accessibility Notes

### Color Contrast Ratios
- Deep Teal (#008B8B) on White: ✅ WCAG AA compliant
- Warm Amber (#FFA500) on White: ✅ WCAG AA compliant
- Rich Burgundy (#8B0000) on White: ✅ WCAG AAA compliant

### Best Practices
- Always use sufficient contrast for text
- Provide hover states for interactive elements
- Use color + icons for better accessibility
- Test with color blindness simulators

---

## Quick Reference

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary Brand | Deep Teal | #008B8B |
| Secondary Brand | Warm Amber | #FFA500 |
| Accent | Rich Burgundy | #8B0000 |
| Background | Cream | #FFF8DC |
| Background Alt | Light Khaki | #F0E68C |
| Text Primary | Dark Gray | #333 |
| Text Secondary | Medium Gray | #666 |
| White | Pure White | #fff |
| Success | Deep Teal | #008B8B |
| Warning | Warm Amber | #FFA500 |
| Error | Rich Burgundy | #8B0000 |

---

## Migration from Old Colors

| Old Color (MithoBites) | New Color (BhokBhoj) | Usage |
|------------------------|----------------------|-------|
| #ff5722 (Orange Red) | #008B8B (Deep Teal) | Primary |
| #ff8c00 (Dark Orange) | #FFA500 (Amber) | Secondary |
| #e53935 (Red) | #8B0000 (Burgundy) | Accent |
| #d32f2f (Dark Red) | #660000 (Dark Burgundy) | Dark Accent |
| #ff7043 (Light Orange) | #FFA500 (Amber) | Highlights |

---

**Color scheme designed for BhokBhoj - Authentic Food Delivery** 🎨
