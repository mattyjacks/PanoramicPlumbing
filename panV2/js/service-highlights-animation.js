/**
 * Service Highlights Mouse-Following Spotlight Effect
 * Creates a dynamic light-up effect that follows the cursor
 */

class ServiceHighlightsAnimation {
    constructor() {
        this.boxes = [];
        this.initialized = false;
    }

    /**
     * Initialize the animation system
     */
    init() {
        if (this.initialized) return;

        // Get all highlight boxes
        this.boxes = document.querySelectorAll('.highlight-box');
        
        if (this.boxes.length === 0) {
            console.warn('No highlight boxes found');
            return;
        }

        this.attachMouseListeners();
        this.initialized = true;
    }

    /**
     * Attach mouse movement listeners to each box
     */
    attachMouseListeners() {
        this.boxes.forEach(box => {
            // Track mouse movement within the box
            box.addEventListener('mousemove', (e) => {
                this.updateMousePosition(box, e);
            });

            // Reset on mouse leave
            box.addEventListener('mouseleave', () => {
                this.resetMousePosition(box);
            });
        });
    }

    /**
     * Update the mouse position as CSS custom properties
     */
    updateMousePosition(box, event) {
        const rect = box.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Convert to percentage
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // Update CSS custom properties for gradient positioning
        box.style.setProperty('--mouse-x', `${xPercent}%`);
        box.style.setProperty('--mouse-y', `${yPercent}%`);
    }

    /**
     * Reset mouse position to center
     */
    resetMousePosition(box) {
        box.style.setProperty('--mouse-x', '50%');
        box.style.setProperty('--mouse-y', '50%');
    }

    /**
     * Destroy the animation and remove listeners
     */
    destroy() {
        this.boxes.forEach(box => {
            box.replaceWith(box.cloneNode(true));
        });
        this.initialized = false;
    }
}

// Create and initialize on DOM ready
const serviceHighlightsAnim = new ServiceHighlightsAnimation();

document.addEventListener('DOMContentLoaded', () => {
    serviceHighlightsAnim.init();
});

// Export for external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ServiceHighlightsAnimation;
}

window.ServiceHighlightsAnimation = ServiceHighlightsAnimation;
window.serviceHighlightsAnim = serviceHighlightsAnim;
