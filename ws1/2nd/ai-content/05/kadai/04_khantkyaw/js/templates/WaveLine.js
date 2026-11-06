/** Angular, beat-pulsed waveform inspired by trap equalizer graphics. */
class WaveLine {
    constructor(y) {
        this.y = y;
        this.baseHue = random(275, 315);
        this.timeOffset = random(1000);
        this.step = 8;
        this.phase = random(1000);
        this.amplitude = 18;
        this.currentHue = this.baseHue;
        this.strokeW = 2;
        this.alpha = 75;
    }

    update(bass) {
        this.timeOffset += 0.025 + bass * 0.12;
        this.phase += 0.035 + bass * 0.16;
        this.amplitude = 12 + bass * 155;
        this.currentHue = (this.baseHue + bass * 38) % 360;
        this.strokeW = 1.5 + bass * 3.5;
        this.alpha = 48 + bass * 47;
    }

    render() {
        push();
        noFill();

        // A faint offset echo gives the waveform a neon, doubled edge.
        this.drawWave(-5, this.currentHue, this.alpha * 0.25, 1);
        this.drawWave(0, this.currentHue, this.alpha, this.strokeW);
        this.drawWave(5, (this.currentHue + 42) % 360, this.alpha * 0.3, 1);

        // Small beat markers make the line feel more rhythmic and percussive.
        noStroke();
        fill(this.currentHue, 40, 100, this.alpha);
        let spacing = max(48, width / 14);
        let offset = (frameCount * 2.5) % spacing;
        for (let x = offset; x < width; x += spacing) {
            let y = this.waveY(x);
            circle(x, y, 2.5 + this.strokeW * 1.4);
        }
        pop();
    }

    waveY(x) {
        // Quantized noise plus a narrow pulse makes sharp, uneven trap-style peaks.
        let cell = floor(x / 24);
        let n = noise(cell * 0.19, this.timeOffset);
        let stepped = (n - 0.5) * 2;
        let kick = pow(max(0, sin((x * 0.012) - this.phase)), 12);
        let snare = pow(max(0, sin((x * 0.006) - this.phase * 0.55 + 1.2)), 20);
        return this.y + stepped * this.amplitude * 0.45
            + (kick - snare * 0.65) * this.amplitude * 0.75;
    }

    drawWave(offsetY, hue, alpha, weight) {
        stroke(hue, 85, 100, alpha);
        strokeWeight(weight);
        strokeJoin(ROUND);
        beginShape();
        for (let x = 0; x <= width; x += this.step) {
            vertex(x, this.waveY(x) + offsetY);
        }
        endShape();
    }
}
