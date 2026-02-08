// ===================================
// ARTSY HAND-DRAWN SPRITES
// SVG-based sprite system
// ===================================

const Sprites = {
    // Create canvas for drawing sprites
    canvas: document.createElement('canvas'),

    // Princess Scarlett - Hand-drawn style with purple dress
    drawPrincess(ctx, x, y, width, height) {
        // Body (purple dress)
        ctx.fillStyle = '#9B59B6';
        ctx.strokeStyle = '#2C3E50';
        ctx.lineWidth = 2;

        // Dress (slightly wobbly hand-drawn style)
        ctx.beginPath();
        ctx.moveTo(x + width * 0.3, y + height * 0.4);
        ctx.quadraticCurveTo(x + width * 0.5, y + height * 0.35, x + width * 0.7, y + height * 0.4);
        ctx.lineTo(x + width * 0.85, y + height);
        ctx.lineTo(x + width * 0.15, y + height);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Head (peach skin tone)
        ctx.fillStyle = '#FFDAB9';
        ctx.beginPath();
        ctx.arc(x + width * 0.5, y + height * 0.25, width * 0.18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Brown hair
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.arc(x + width * 0.5, y + height * 0.2, width * 0.2, Math.PI, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Hair strands (hand-drawn)
        ctx.beginPath();
        ctx.moveTo(x + width * 0.35, y + height * 0.25);
        ctx.quadraticCurveTo(x + width * 0.3, y + height * 0.35, x + width * 0.25, y + height * 0.4);
        ctx.stroke();

        // Eyes (bright green)
        ctx.fillStyle = '#00FF00';
        ctx.beginPath();
        ctx.arc(x + width * 0.43, y + height * 0.25, width * 0.05, 0, Math.PI * 2);
        ctx.arc(x + width * 0.57, y + height * 0.25, width * 0.05, 0, Math.PI * 2);
        ctx.fill();

        // Eye pupils
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + width * 0.43, y + height * 0.25, width * 0.025, 0, Math.PI * 2);
        ctx.arc(x + width * 0.57, y + height * 0.25, width * 0.025, 0, Math.PI * 2);
        ctx.fill();

        // Smile
        ctx.beginPath();
        ctx.arc(x + width * 0.5, y + height * 0.28, width * 0.08, 0.2, Math.PI - 0.2);
        ctx.stroke();

        // Crown (golden)
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#DAA520';
        ctx.beginPath();
        ctx.moveTo(x + width * 0.35, y + height * 0.12);
        ctx.lineTo(x + width * 0.4, y + height * 0.05);
        ctx.lineTo(x + width * 0.45, y + height * 0.12);
        ctx.lineTo(x + width * 0.5, y + height * 0.02);
        ctx.lineTo(x + width * 0.55, y + height * 0.12);
        ctx.lineTo(x + width * 0.6, y + height * 0.05);
        ctx.lineTo(x + width * 0.65, y + height * 0.12);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    },

    // Blue Bell - Cute orange kitten
    drawKitten(ctx, x, y, width, height, happy = false) {
        // Body (orange)
        ctx.fillStyle = '#FF8C00';
        ctx.strokeStyle = '#2C3E50';
        ctx.lineWidth = 2;

        // Round body
        ctx.beginPath();
        ctx.ellipse(x + width * 0.5, y + height * 0.6, width * 0.35, height * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.arc(x + width * 0.5, y + height * 0.3, width * 0.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Ears (triangular)
        ctx.beginPath();
        ctx.moveTo(x + width * 0.3, y + height * 0.2);
        ctx.lineTo(x + width * 0.25, y + height * 0.05);
        ctx.lineTo(x + width * 0.35, y + height * 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + width * 0.7, y + height * 0.2);
        ctx.lineTo(x + width * 0.75, y + height * 0.05);
        ctx.lineTo(x + width * 0.65, y + height * 0.15);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Eyes (big and cute)
        ctx.fillStyle = happy ? '#00FF00' : '#4169E1';
        ctx.beginPath();
        ctx.ellipse(x + width * 0.4, y + height * 0.28, width * 0.08, height * 0.1, 0, 0, Math.PI * 2);
        ctx.ellipse(x + width * 0.6, y + height * 0.28, width * 0.08, height * 0.1, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Pupils
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + width * 0.4, y + height * 0.3, width * 0.04, 0, Math.PI * 2);
        ctx.arc(x + width * 0.6, y + height * 0.3, width * 0.04, 0, Math.PI * 2);
        ctx.fill();

        // Nose (pink triangle)
        ctx.fillStyle = '#FFB6C1';
        ctx.beginPath();
        ctx.moveTo(x + width * 0.5, y + height * 0.35);
        ctx.lineTo(x + width * 0.45, y + height * 0.4);
        ctx.lineTo(x + width * 0.55, y + height * 0.4);
        ctx.closePath();
        ctx.fill();

        // Whiskers
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        // Left whiskers
        ctx.moveTo(x + width * 0.3, y + height * 0.35);
        ctx.lineTo(x + width * 0.1, y + height * 0.3);
        ctx.moveTo(x + width * 0.3, y + height * 0.38);
        ctx.lineTo(x + width * 0.1, y + height * 0.4);
        // Right whiskers
        ctx.moveTo(x + width * 0.7, y + height * 0.35);
        ctx.lineTo(x + width * 0.9, y + height * 0.3);
        ctx.moveTo(x + width * 0.7, y + height * 0.38);
        ctx.lineTo(x + width * 0.9, y + height * 0.4);
        ctx.stroke();

        // Tail
        ctx.strokeStyle = '#FF8C00';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x + width * 0.8, y + height * 0.7);
        ctx.quadraticCurveTo(x + width * 1.1, y + height * 0.5, x + width * 0.95, y + height * 0.2);
        ctx.stroke();
    },

    // Giant Fox - Menacing but cartoonish
    drawFox(ctx, x, y, width, height, lookingAway = false) {
        // Body (orange-red)
        ctx.fillStyle = '#FF4500';
        ctx.strokeStyle = '#2C3E50';
        ctx.lineWidth = 2;

        // Large body
        ctx.beginPath();
        ctx.ellipse(x + width * 0.5, y + height * 0.65, width * 0.4, height * 0.3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Head (large)
        ctx.beginPath();
        ctx.ellipse(x + width * 0.5, y + height * 0.35, width * 0.35, height * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Snout (lighter)
        ctx.fillStyle = '#FFE4B5';
        ctx.beginPath();
        ctx.ellipse(x + width * 0.6, y + height * 0.4, width * 0.15, height * 0.12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Ears (pointed)
        ctx.fillStyle = '#FF4500';
        ctx.beginPath();
        ctx.moveTo(x + width * 0.3, y + height * 0.25);
        ctx.lineTo(x + width * 0.25, y + height * 0.05);
        ctx.lineTo(x + width * 0.35, y + height * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x + width * 0.7, y + height * 0.25);
        ctx.lineTo(x + width * 0.75, y + height * 0.05);
        ctx.lineTo(x + width * 0.65, y + height * 0.2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Eyes (menacing or looking away)
        if (lookingAway) {
            // Eyes closed or looking away
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(x + width * 0.35, y + height * 0.3);
            ctx.lineTo(x + width * 0.45, y + height * 0.3);
            ctx.moveTo(x + width * 0.55, y + height * 0.3);
            ctx.lineTo(x + width * 0.65, y + height * 0.3);
            ctx.stroke();
        } else {
            // Sharp menacing eyes
            ctx.fillStyle = '#FFD700';
            ctx.beginPath();
            ctx.ellipse(x + width * 0.4, y + height * 0.3, width * 0.08, height * 0.1, -0.3, 0, Math.PI * 2);
            ctx.ellipse(x + width * 0.6, y + height * 0.3, width * 0.08, height * 0.1, 0.3, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            // Pupils (vertical slits)
            ctx.fillStyle = '#000';
            ctx.fillRect(x + width * 0.39, y + height * 0.27, width * 0.02, height * 0.06);
            ctx.fillRect(x + width * 0.59, y + height * 0.27, width * 0.02, height * 0.06);
        }

        // Nose (black)
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(x + width * 0.65, y + height * 0.42, width * 0.03, 0, Math.PI * 2);
        ctx.fill();

        // Teeth (showing)
        ctx.fillStyle = '#FFF';
        ctx.strokeStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(x + width * 0.55, y + height * 0.48);
        ctx.lineTo(x + width * 0.58, y + height * 0.53);
        ctx.lineTo(x + width * 0.61, y + height * 0.48);
        ctx.lineTo(x + width * 0.64, y + height * 0.53);
        ctx.lineTo(x + width * 0.67, y + height * 0.48);
        ctx.stroke();

        // Bushy tail
        ctx.fillStyle = '#FF4500';
        ctx.strokeStyle = '#2C3E50';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + width * 0.85, y + height * 0.7);
        ctx.quadraticCurveTo(x + width * 1.2, y + height * 0.6, x + width * 1.1, y + height * 0.3);
        ctx.quadraticCurveTo(x + width * 1.15, y + height * 0.5, x + width * 0.9, y + height * 0.75);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    },

    // Guard Dog - Aggressive looking
    drawDog(ctx, x, y, width, height) {
        // Body (brown/black)
        ctx.fillStyle = '#654321';
        ctx.strokeStyle = '#2C3E50';
        ctx.lineWidth = 2;

        // Body
        ctx.beginPath();
        ctx.ellipse(x + width * 0.6, y + height * 0.6, width * 0.3, height * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Head
        ctx.beginPath();
        ctx.ellipse(x + width * 0.3, y + height * 0.4, width * 0.22, height * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Snout
        ctx.fillStyle = '#8B7355';
        ctx.beginPath();
        ctx.ellipse(x + width * 0.15, y + height * 0.45, width * 0.12, height * 0.15, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Ears (floppy)
        ctx.fillStyle = '#654321';
        ctx.beginPath();
        ctx.ellipse(x + width * 0.25, y + height * 0.25, width * 0.1, height * 0.15, -0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Eye (angry)
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(x + width * 0.3, y + height * 0.35, width * 0.05, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Teeth
        ctx.fillStyle = '#FFF';
        ctx.fillRect(x + width * 0.08, y + height * 0.48, width * 0.04, height * 0.08);
        ctx.fillRect(x + width * 0.13, y + height * 0.48, width * 0.04, height * 0.08);
        ctx.strokeRect(x + width * 0.08, y + height * 0.48, width * 0.04, height * 0.08);
        ctx.strokeRect(x + width * 0.13, y + height * 0.48, width * 0.04, height * 0.08);

        // Legs
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(x + width * 0.5, y + height * 0.75);
        ctx.lineTo(x + width * 0.5, y + height);
        ctx.moveTo(x + width * 0.7, y + height * 0.75);
        ctx.lineTo(x + width * 0.7, y + height);
        ctx.stroke();

        // Tail (up and aggressive)
        ctx.beginPath();
        ctx.moveTo(x + width * 0.85, y + height * 0.65);
        ctx.quadraticCurveTo(x + width * 0.95, y + height * 0.4, x + width * 0.9, y + height * 0.2);
        ctx.stroke();
    },

    // Golden Key
    drawKey(ctx, x, y, width, height) {
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;

        // Key head (circular)
        ctx.beginPath();
        ctx.arc(x + width * 0.3, y + height * 0.5, width * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Inner circle
        ctx.fillStyle = '#FFF';
        ctx.beginPath();
        ctx.arc(x + width * 0.3, y + height * 0.5, width * 0.12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Key shaft
        ctx.fillStyle = '#FFD700';
        ctx.fillRect(x + width * 0.45, y + height * 0.45, width * 0.35, height * 0.1);
        ctx.strokeRect(x + width * 0.45, y + height * 0.45, width * 0.35, height * 0.1);

        // Key teeth
        ctx.fillRect(x + width * 0.7, y + height * 0.55, width * 0.1, height * 0.15);
        ctx.fillRect(x + width * 0.82, y + height * 0.55, width * 0.08, height * 0.2);
        ctx.strokeRect(x + width * 0.7, y + height * 0.55, width * 0.1, height * 0.15);
        ctx.strokeRect(x + width * 0.82, y + height * 0.55, width * 0.08, height * 0.2);

        // Sparkles
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(x + width * 0.2, y + height * 0.3, width * 0.05, 0, Math.PI * 2);
        ctx.arc(x + width * 0.85, y + height * 0.35, width * 0.04, 0, Math.PI * 2);
        ctx.fill();
    },

    // Cage
    drawCage(ctx, x, y, width, height) {
        ctx.strokeStyle = '#808080';
        ctx.lineWidth = 3;

        // Vertical bars
        for (let i = 0; i < 6; i++) {
            ctx.beginPath();
            ctx.moveTo(x + (width / 5) * i, y);
            ctx.lineTo(x + (width / 5) * i, y + height);
            ctx.stroke();
        }

        // Horizontal bars
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.moveTo(x, y + height);
        ctx.lineTo(x + width, y + height);
        ctx.moveTo(x, y + height * 0.5);
        ctx.lineTo(x + width, y + height * 0.5);
        ctx.stroke();

        // Lock
        ctx.fillStyle = '#DAA520';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + width * 0.5, y + height * 0.5, width * 0.1, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    },

    // Falling Rock
    drawRock(ctx, x, y, width, height) {
        ctx.fillStyle = '#696969';
        ctx.strokeStyle = '#2C3E50';
        ctx.lineWidth = 2;

        // Irregular rock shape
        ctx.beginPath();
        ctx.moveTo(x + width * 0.2, y);
        ctx.lineTo(x + width * 0.7, y + height * 0.1);
        ctx.lineTo(x + width, y + height * 0.4);
        ctx.lineTo(x + width * 0.8, y + height);
        ctx.lineTo(x + width * 0.3, y + height * 0.9);
        ctx.lineTo(x, y + height * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Cracks
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + width * 0.3, y + height * 0.3);
        ctx.lineTo(x + width * 0.6, y + height * 0.5);
        ctx.moveTo(x + width * 0.5, y + height * 0.2);
        ctx.lineTo(x + width * 0.7, y + height * 0.7);
        ctx.stroke();
    },

    // Projectile
    drawProjectile(ctx, x, y, width, height) {
        // Fiery projectile
        ctx.fillStyle = '#FFA500';
        ctx.beginPath();
        ctx.ellipse(x + width * 0.5, y + height * 0.5, width * 0.5, height * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.ellipse(x + width * 0.5, y + height * 0.5, width * 0.3, height * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();

        // Outer ring
        ctx.strokeStyle = '#FF4500';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x + width * 0.5, y + height * 0.5, width * 0.5, 0, Math.PI * 2);
        ctx.stroke();
    },

    // Goal Flag
    drawGoalFlag(ctx, x, y, width, height) {
        // Pole
        ctx.strokeStyle = '#8B4513';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(x + width * 0.2, y);
        ctx.lineTo(x + width * 0.2, y + height);
        ctx.stroke();

        // Flag (golden with checkered pattern)
        ctx.fillStyle = '#FFD700';
        ctx.strokeStyle = '#DAA520';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x + width * 0.2, y + height * 0.2);
        ctx.lineTo(x + width * 0.9, y + height * 0.35);
        ctx.lineTo(x + width * 0.2, y + height * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Checkered squares
        ctx.fillStyle = '#FFF';
        ctx.fillRect(x + width * 0.35, y + height * 0.27, width * 0.1, height * 0.08);
        ctx.fillRect(x + width * 0.55, y + height * 0.32, width * 0.1, height * 0.08);

        // "GOAL" text
        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('GOAL', x + width * 0.55, y + height * 0.37);
    }
};

// Export for use in game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Sprites;
}
