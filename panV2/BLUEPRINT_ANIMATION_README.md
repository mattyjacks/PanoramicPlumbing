# Blueprint Animation Documentation

## Overview
A sophisticated blueprint-style overlay animation for the hero section featuring:
- Blue transparent overlay with technical grid pattern
- Animated horizontal lines moving upward
- Stationary vertical lines creating cross-pattern
- Pulsing corner markers
- Animated measurement lines
- Technical coordinate displays
- Scanning line effect
- Data point indicators
- Circuit line animations
- Crosshair overlay

## Files Created

### CSS File
**Location:** `css/blueprint-animation.css`
- Contains all animation styles and keyframes
- Responsive design for mobile devices
- Customizable color schemes and speeds

### JavaScript File
**Location:** `js/blueprint-animation.js`
- Handles dynamic creation of overlay elements
- Provides interactive features (pause on hover)
- Includes utility methods for customization

## Features

### 1. **Moving Grid Animation**
- Horizontal lines continuously move upward
- Creates a dynamic blueprint effect
- 20-second animation loop

### 2. **Corner Markers**
- Four pulsing corner brackets
- Sequential animation (1-second delays)
- Adds technical/blueprint aesthetic

### 3. **Scanning Line**
- Vertical line sweeps from top to bottom
- 8-second animation cycle
- Glowing effect with shadow

### 4. **Technical Coordinates**
- Display in all four corners
- Monospace font for technical look
- Format: "X: 000.00 | Y: 000.00"

### 5. **Data Points**
- Four pulsing indicators at key positions
- 2-second pulse animation
- Staggered delays for visual interest

### 6. **Measurement Lines**
- Expanding horizontal and vertical lines
- 3-second expand/contract animation
- Includes end markers

### 7. **Circuit Lines**
- Animated technical line elements
- 4-second fade in/out cycle
- Two different orientations

## Customization Options

### JavaScript Methods

#### Change Animation Speed
```javascript
blueprintAnim.setSpeed(1.5); // 1.5x faster
blueprintAnim.setSpeed(0.5); // 2x slower
```

#### Change Overlay Color
```javascript
blueprintAnim.setOverlayColor(0, 61, 130, 0.35); // R, G, B, Alpha
```

#### Toggle Animation
```javascript
blueprintAnim.toggle(false); // Hide animation
blueprintAnim.toggle(true);  // Show animation
```

#### Destroy Animation
```javascript
blueprintAnim.destroy(); // Remove completely
```

### CSS Customization

#### Grid Line Spacing
Edit in `blueprint-animation.css`:
```css
repeating-linear-gradient(
    90deg,
    transparent,
    transparent 79px,  /* Change this value */
    rgba(255, 255, 255, 0.15) 79px,
    ...
)
```

#### Animation Duration
```css
.blueprint-grid {
    animation: gridSlideUp 20s linear infinite; /* Change 20s */
}
```

#### Overlay Opacity
```css
.blueprint-base {
    background: rgba(0, 61, 130, 0.35); /* Change 0.35 */
}
```

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox support required
- requestAnimationFrame for smooth animations
- Graceful degradation on mobile devices

## Performance Notes
- Uses CSS transforms for optimal performance
- Hardware-accelerated animations
- Minimal JavaScript overhead
- Pauses on hover to reduce CPU usage (desktop only)
- Simplified animations on mobile devices

## Mobile Behavior
On screens smaller than 768px:
- Measurement lines hidden
- Crosshair hidden
- Circuit lines hidden
- Corner markers reduced in size
- Coordinates use smaller font
- Main grid animation continues

## Accessibility
- `pointer-events: none` allows interaction with hero content
- No impact on screen readers
- Can be disabled via JavaScript if needed
- Does not interfere with keyboard navigation

## Future Enhancements
Potential additions:
- Mouse-follow effects
- Click-triggered animations
- Customizable color themes
- Additional geometric patterns
- SVG-based animations for smoother lines
- WebGL version for advanced effects

## Support
For issues or customization requests, modify the files directly or consult the inline code comments.

---
**Version:** 1.0  
**Created:** 2024  
**License:** Part of Panoramic Plumbing website
