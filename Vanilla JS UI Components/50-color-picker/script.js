class ColorPicker {
    constructor() {
        this.canvas = document.getElementById('colorCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.hue = 0;
        this.saturation = 100;
        this.lightness = 50;
        
        this.init();
    }
    
    init() {
        this.drawColorPicker();
        this.bindEvents();
        this.updateColor();
    }
    
    bindEvents() {
        document.getElementById('hueSlider').addEventListener('input', (e) => {
            this.hue = parseInt(e.target.value);
            this.drawColorPicker();
            this.updateColor();
        });
        
        document.getElementById('satSlider').addEventListener('input', (e) => {
            this.saturation = parseInt(e.target.value);
            this.updateColor();
        });
        
        document.getElementById('lightSlider').addEventListener('input', (e) => {
            this.lightness = parseInt(e.target.value);
            this.updateColor();
        });
        
        this.canvas.addEventListener('click', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.saturation = (x / this.canvas.width) * 100;
            this.lightness = 100 - (y / this.canvas.height) * 100;
            
            document.getElementById('satSlider').value = this.saturation;
            document.getElementById('lightSlider').value = this.lightness;
            
            this.updateColor();
        });
    }
    
    drawColorPicker() {
        const gradient1 = this.ctx.createLinearGradient(0, 0, this.canvas.width, 0);
        gradient1.addColorStop(0, `hsl(${this.hue}, 0%, 50%)`);
        gradient1.addColorStop(1, `hsl(${this.hue}, 100%, 50%)`);
        
        this.ctx.fillStyle = gradient1;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        const gradient2 = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient2.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient2.addColorStop(0.5, 'rgba(255, 255, 255, 0)');
        gradient2.addColorStop(0.5, 'rgba(0, 0, 0, 0)');
        gradient2.addColorStop(1, 'rgba(0, 0, 0, 1)');
        
        this.ctx.fillStyle = gradient2;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    
    updateColor() {
        const hsl = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
        const rgb = this.hslToRgb(this.hue, this.saturation, this.lightness);
        const hex = this.rgbToHex(rgb.r, rgb.g, rgb.b);
        
        document.getElementById('colorDisplay').style.backgroundColor = hsl;
        document.getElementById('hexInput').value = hex;
        document.getElementById('rgbInput').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
        document.getElementById('hslInput').value = hsl;
    }
    
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;
        
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        let r, g, b;
        
        if (s === 0) {
            r = g = b = l;
        } else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        
        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }
    
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ColorPicker();
});