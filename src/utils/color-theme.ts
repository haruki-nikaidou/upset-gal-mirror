export type RgbColor = {
    r: number;
    g: number;
    b: number;
}

export type HsvColor = {
    h: number;
    s: number;
    v: number;
}


export type ColorTheme = {
    textColor: string;
    glassColor: string;
    majorColor: string;
}

export function parseHexColor(hex: string): RgbColor {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return {r, g, b};
}

export function toHexColor(rgb: RgbColor): string {
    const {r, g, b} = rgb;
    return '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    }).join('');
}

export function hsvToRgb(hsv: HsvColor): RgbColor {
    const {h, s, v} = hsv;
    let r = 0, g = 0, b = 0;

    const i: number = Math.floor(h * 6);
    const f: number = h * 6 - i;
    const p: number = v * (1 - s);
    const q: number = v * (1 - f * s);
    const t: number = v * (1 - (1 - f) * s);

    switch (i % 6) {
    case 0: [r, g, b] = [v, t, p]; break;
    case 1: [r, g, b] = [q, v, p]; break;
    case 2: [r, g, b] = [p, v, t]; break;
    case 3: [r, g, b] = [p, q, v]; break;
    case 4: [r, g, b] = [t, p, v]; break;
    case 5: [r, g, b] = [v, p, q]; break;
    }

    // Convert r, g, b to 0-255 range
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);

    return {r, g, b};
}

export function rgbToHsv(rgb: RgbColor): HsvColor {
    let {r, g, b} = rgb;
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h;
    const v = max;
    const d = max - min;

    const s = max == 0 ? 0 : d / max;

    if (max == min) {
        h = 0; // achromatic
    } else {
        h = 0;
        switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return {h, s, v};
}

/** <h2>Returns a color theme based on the given hue.</h2>
 * For any given hue, the color's value and saturation are fixed.
 * <ul>
 * <li>textColor: S=0.68, V=0.24</li>
 * <li>majorColor: S=0.77, V=0.75</li>
 * <li>glassColor: S=0.17, V=1.00</li>
 * </ul>
 *
 * @param hue The hue of the color theme. Must be between 0 and 360.
 * @returns ColorTheme color theme based on the given hue.
 * */
export function getLightColorTheme(hue: number): ColorTheme {
    if (hue < 0 || hue >= 360) {
        throw new Error('Hue must be between 0 and 360');
    }
    return {
        textColor: toHexColor(hsvToRgb({h: hue, s: 0.68, v: 0.24})),
        majorColor: toHexColor(hsvToRgb({h: hue, s: 0.77, v: 0.75})),
        glassColor: toHexColor(hsvToRgb({h: hue, s: 0.17, v: 1.00}))
    };
}