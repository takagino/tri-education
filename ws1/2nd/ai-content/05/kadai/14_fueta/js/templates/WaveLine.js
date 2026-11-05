class WaveLine {
    constructor(y) {
        this.baseX = map(y, 0, height, width * 0.15, width * 0.85);
        this.offset = random(1000);
        this.seed = random(1000);
    }

    update(sensor) {
        this.sensor = sensor;
        this.offset += 0.006 + sensor * 0.025;
        this.sway = 20 + sensor * 55;
        this.shadowWidth = 45 + sensor * 100;
        this.alpha = 20 + sensor * 35;
    }

    render() {
        blendMode(BLEND);
        noStroke();

        // 広く薄い影から、狭く濃い影へ重ねる
        for (let layer = 7; layer >= 0; layer--) {
            let widthScale = 1 + layer * 0.18;
            let layerAlpha = this.alpha * (0.035 + (7 - layer) * 0.025);

            fill(215, 75, 5, layerAlpha);
            this.drawShadow(widthScale);
        }

        blendMode(ADD);
    }

    drawShadow(widthScale) {
        beginShape();

        // 影の左端
        for (let y = -30; y <= height + 30; y += 24) {
            let n = noise(this.seed, this.offset + y * 0.004);
            let wave = sin(y * 0.35 + this.offset * 40) * this.sway;
            let centerX = this.baseX + wave + (n - 0.5) * this.sway;
            let edgeX = centerX - (this.shadowWidth * widthScale) / 2;

            curveVertex(edgeX, y);
        }

        // 影の右端
        for (let y = height + 30; y >= -30; y -= 24) {
            let n = noise(this.seed, this.offset + y * 0.004);
            let wave = sin(y * 0.35 + this.offset * 40) * this.sway;
            let centerX = this.baseX + wave + (n - 0.5) * this.sway;
            let edgeX = centerX + (this.shadowWidth * widthScale) / 2;

            curveVertex(edgeX, y);
        }

        endShape(CLOSE);
    }
}