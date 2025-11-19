/**
 * Blueprint Animation Controller
 * Creates a technical blueprint overlay effect on the hero section
 */

class BlueprintAnimation {
    constructor() {
        this.hero = null;
        this.overlay = null;
        this.initialized = false;
    }

    /**
     * Initialize the blueprint animation
     */
    init() {
        if (this.initialized) return;
        
        this.hero = document.querySelector('.hero');
        if (!this.hero) {
            console.warn('Hero section not found');
            return;
        }

        this.createOverlay();
        this.addEventListeners();
        this.initialized = true;
    }

    /**
     * Create the blueprint overlay structure
     */
    createOverlay() {
        // Create main overlay container
        this.overlay = document.createElement('div');
        this.overlay.className = 'hero-blueprint-overlay';

        // Blue base layer
        const blueBase = document.createElement('div');
        blueBase.className = 'blueprint-base';

        // Grid container for animation
        const gridContainer = document.createElement('div');
        gridContainer.className = 'blueprint-grid';

        // Vertical lines (stationary)
        const verticalLines = document.createElement('div');
        verticalLines.className = 'blueprint-vertical-lines';

        // Horizontal lines (animated)
        const horizontalLines = document.createElement('div');
        horizontalLines.className = 'blueprint-horizontal-lines';

        // Technical dots pattern
        const dots = document.createElement('div');
        dots.className = 'blueprint-dots';

        // Add lines to grid
        gridContainer.appendChild(verticalLines);
        gridContainer.appendChild(horizontalLines);

        // Corner markers
        const corners = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
        corners.forEach(position => {
            const corner = document.createElement('div');
            corner.className = `blueprint-corner ${position}`;
            this.overlay.appendChild(corner);
        });

        // Measurement lines
        const measureHorizontal = document.createElement('div');
        measureHorizontal.className = 'blueprint-measure measure-horizontal';
        const measureLineH = document.createElement('div');
        measureLineH.className = 'blueprint-measure-line';
        measureHorizontal.appendChild(measureLineH);

        const measureVertical = document.createElement('div');
        measureVertical.className = 'blueprint-measure measure-vertical';
        const measureLineV = document.createElement('div');
        measureLineV.className = 'blueprint-measure-line';
        measureVertical.appendChild(measureLineV);

        // Scanning line
        const scanLine = document.createElement('div');
        scanLine.className = 'blueprint-scan';

        // Technical coordinates
        const coordinates = [
            { position: 'coord-tl', text: 'X: 000.00 | Y: 000.00' },
            { position: 'coord-tr', text: 'X: 100.00 | Y: 000.00' },
            { position: 'coord-bl', text: 'X: 000.00 | Y: 100.00' },
            { position: 'coord-br', text: 'X: 100.00 | Y: 100.00' }
        ];

        coordinates.forEach(coord => {
            const coordElement = document.createElement('div');
            coordElement.className = `blueprint-coordinates ${coord.position}`;
            coordElement.textContent = coord.text;
            this.overlay.appendChild(coordElement);
        });

        // Crosshair
        const crosshair = document.createElement('div');
        crosshair.className = 'blueprint-crosshair';

        // Data points (random positions)
        const dataPoints = [
            { top: '20%', left: '15%', delay: '0s' },
            { top: '40%', right: '20%', delay: '0.5s' },
            { top: '60%', left: '25%', delay: '1s' },
            { bottom: '25%', right: '15%', delay: '1.5s' }
        ];

        dataPoints.forEach(point => {
            const dp = document.createElement('div');
            dp.className = 'blueprint-datapoint';
            dp.style.top = point.top || 'auto';
            dp.style.bottom = point.bottom || 'auto';
            dp.style.left = point.left || 'auto';
            dp.style.right = point.right || 'auto';
            dp.style.animationDelay = point.delay;
            this.overlay.appendChild(dp);
        });

        // Circuit lines
        const circuit1 = document.createElement('div');
        circuit1.className = 'blueprint-circuit circuit-1';

        const circuit2 = document.createElement('div');
        circuit2.className = 'blueprint-circuit circuit-2';

        // Assemble overlay
        this.overlay.appendChild(blueBase);
        this.overlay.appendChild(dots);
        this.overlay.appendChild(gridContainer);
        this.overlay.appendChild(crosshair);
        this.overlay.appendChild(measureHorizontal);
        this.overlay.appendChild(measureVertical);
        this.overlay.appendChild(circuit1);
        this.overlay.appendChild(circuit2);
        this.overlay.appendChild(scanLine);

        // Insert overlay into hero section
        this.hero.insertBefore(this.overlay, this.hero.firstChild);
    }

    /**
     * Add event listeners for interactive effects
     */
    addEventListeners() {
        // Pause animation on mouse enter (optional)
        let animationPaused = false;

        this.hero.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                const grid = this.overlay.querySelector('.blueprint-grid');
                if (grid && !animationPaused) {
                    grid.style.animationPlayState = 'paused';
                }
            }
        });

        this.hero.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                const grid = this.overlay.querySelector('.blueprint-grid');
                if (grid) {
                    grid.style.animationPlayState = 'running';
                }
            }
        });

        // Adjust on window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.adjustForViewport();
            }, 250);
        });

        // Initial viewport adjustment
        this.adjustForViewport();
    }

    /**
     * Adjust animation based on viewport size
     */
    adjustForViewport() {
        if (window.innerWidth <= 768) {
            // Simplify animation on mobile
            const measures = this.overlay.querySelectorAll('.blueprint-measure');
            measures.forEach(measure => {
                measure.style.display = 'none';
            });
        } else {
            const measures = this.overlay.querySelectorAll('.blueprint-measure');
            measures.forEach(measure => {
                measure.style.display = 'block';
            });
        }
    }

    /**
     * Destroy the animation and clean up
     */
    destroy() {
        if (this.overlay && this.overlay.parentNode) {
            this.overlay.parentNode.removeChild(this.overlay);
        }
        this.initialized = false;
    }

    /**
     * Toggle animation on/off
     */
    toggle(enabled) {
        if (this.overlay) {
            this.overlay.style.display = enabled ? 'block' : 'none';
        }
    }

    /**
     * Update animation speed
     */
    setSpeed(speed = 1) {
        const grid = this.overlay?.querySelector('.blueprint-grid');
        if (grid) {
            const baseDuration = 20; // seconds
            grid.style.animationDuration = `${baseDuration / speed}s`;
        }

        const scan = this.overlay?.querySelector('.blueprint-scan');
        if (scan) {
            const baseDuration = 8; // seconds
            scan.style.animationDuration = `${baseDuration / speed}s`;
        }
    }

    /**
     * Change overlay color
     */
    setOverlayColor(r, g, b, alpha = 0.35) {
        const base = this.overlay?.querySelector('.blueprint-base');
        if (base) {
            base.style.background = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }
    }
}

// Initialize when DOM is ready
const blueprintAnim = new BlueprintAnimation();

document.addEventListener('DOMContentLoaded', () => {
    blueprintAnim.init();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BlueprintAnimation;
}

// Make available globally
window.BlueprintAnimation = BlueprintAnimation;
window.blueprintAnim = blueprintAnim;
