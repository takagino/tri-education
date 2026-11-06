class ResonanceGarden {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bassEnergy = 0;
        this.melodyEnergy = 0;
        this.highEnergy = 0;
        this.previousHighEnergy = 0;
        this.phase = 0;
        this.rotation = 0;
        this.melodyBins = new Array(64).fill(0);
        this.sparks = [];
        this.shapes = [];
        this.sparkCooldown = 0;
    }

    update(spectrum) {
        // ライブラリの版によるFFT値の表現（0〜1 / 0〜255）の違いを吸収します。
        const amplitudeScale = spectrum.some(value => value > 1.5) ? 255 : 1;

        // FFTの低い帯域を平均して、重低音の強さを取り出します。
        let bassTotal = 0;
        for (let i = 0; i < 6; i++) bassTotal += (spectrum[i] || 0) / amplitudeScale;
        const bassAverage = bassTotal / 6;
        const bassTarget = constrain(map(Math.sqrt(bassAverage), 0.08, 0.62, 0, 1), 0, 1);
        this.bassEnergy = lerp(this.bassEnergy, bassTarget, 0.24);

        // 中低音から中高音の各FFT帯域をなめらかにし、旋律の輪郭に使います。
        let melodyTotal = 0;
        for (let i = 4; i < 40; i++) {
            const target = Math.sqrt((spectrum[i] || 0) / amplitudeScale);
            this.melodyBins[i] = lerp(this.melodyBins[i], target, 0.28);
            melodyTotal += this.melodyBins[i];
        }
        this.melodyEnergy = constrain(melodyTotal / 36, 0, 1);
        // シンバルのような高音は高い周波数帯全体のエネルギーで捉えます。
        let highTotal = 0;
        let highPeak = 0;
        const highStart = Math.floor(spectrum.length * 0.12);
        const highEnd = Math.floor(spectrum.length * 0.9);
        const highCount = Math.max(1, highEnd - highStart);
        for (let i = highStart; i < highEnd; i++) {
            const energy = (spectrum[i] || 0) / amplitudeScale;
            highTotal += energy;
            highPeak = Math.max(highPeak, energy);
        }
        const highAverage = highTotal / highCount;
        // 平均値だけでなく帯域内のピークも拾い、小さなシンバル音を見逃さないようにします。
        const highTarget = constrain(Math.max(
            Math.sqrt(highAverage) * 5,
            Math.sqrt(highPeak) * 1.6
        ), 0, 1);
        this.highEnergy = lerp(this.highEnergy, highTarget, 0.42);

        // 高音が急に立ち上がった瞬間にだけ、火花と幾何学模様を放ちます。
        this.sparkCooldown = Math.max(0, this.sparkCooldown - 1);
        const highRise = this.highEnergy - this.previousHighEnergy;
        if (this.highEnergy > 0.06 && highRise > 0.008 && this.sparkCooldown === 0) {
            this.createCymbalBurst(constrain(map(this.highEnergy, 0.06, 0.75, 0.2, 1), 0.2, 1));
            this.sparkCooldown = 9;
        }
        this.previousHighEnergy = this.highEnergy;

        for (const spark of this.sparks) {
            spark.x += spark.vx;
            spark.y += spark.vy;
            spark.vy += spark.gravity;
            spark.rotation += spark.rotationSpeed;
            spark.life -= 1;
        }
        this.sparks = this.sparks.filter(spark => spark.life > 0);

        for (const shape of this.shapes) {
            shape.radius += shape.speed;
            shape.rotation += shape.rotationSpeed;
            shape.life -= 1;
        }
        this.shapes = this.shapes.filter(shape => shape.life > 0);

        // 重低音が強いほど脈動を速め、旋律が強いと全体が少し回ります。
        const bassMotion = Math.pow(this.bassEnergy, 0.65);
        this.phase += 2 + bassMotion * 22;
        this.rotation += 0.18 + this.melodyEnergy * 1.8 + bassMotion * 0.8;
    }

    createCymbalBurst(strength) {
        // 音が強いほど火花の数と幾何学模様の数を増やします。
        const sparkCount = Math.round(map(strength, 0.14, 0.8, 9, 34));
        const centerRadius = Math.min(width, height) * (0.38 + this.bassEnergy * 0.1);
        for (let i = 0; i < sparkCount && this.sparks.length < 180; i++) {
            const angle = random(360);
            const radians = angle * Math.PI / 180;
            const speed = random(2, 5) + strength * 7;
            const originRadius = centerRadius + random(-12, 30);
            this.sparks.push({
                x: this.x + Math.cos(radians) * originRadius,
                y: this.y + Math.sin(radians) * originRadius,
                vx: Math.cos(radians) * speed + random(-1.5, 1.5),
                vy: Math.sin(radians) * speed + random(-1.5, 1.5),
                gravity: random(-0.015, 0.04),
                size: random(4, 10) + strength * 5,
                hue: random([165, 185, 205, 230, 275]),
                rotation: random(360),
                rotationSpeed: random(-12, 12),
                life: random(28, 52),
                maxLife: 52
            });
        }

        const shapeCount = strength > 0.55 ? 3 : 2;
        for (let i = 0; i < shapeCount && this.shapes.length < 18; i++) {
            const angle = random(360) * Math.PI / 180;
            const distance = Math.min(width, height) * random(0.38, 0.55);
            this.shapes.push({
                x: this.x + Math.cos(angle) * distance,
                y: this.y + Math.sin(angle) * distance,
                sides: random([3, 4, 6]),
                radius: random(8, 18),
                speed: random(1.8, 3.4) + strength * 3,
                rotation: random(360),
                rotationSpeed: random(-4, 4),
                hue: random([165, 190, 215, 255, 285]),
                life: random(32, 52),
                maxLife: 52
            });
        }
    }

    render() {
        push();
        const minSide = Math.min(width, height);
        const bassPulse = Math.sin(this.phase * Math.PI / 180);
        const bassMotion = Math.pow(this.bassEnergy, 0.65);
        const baseRadius = minSide * 0.17;
        const coreRadius = baseRadius + bassMotion * minSide * 0.15
            + bassPulse * bassMotion * minSide * 0.085;
        const melodyRadius = coreRadius + minSide * 0.075;

        // 重低音を放射状の光線にして、キックの強さを大きく見せます。
        noFill();
        const rayCount = 64;
        for (let i = 0; i < rayCount; i++) {
            const angle = i * 360 / rayCount + this.rotation * 0.35;
            const bin = 4 + (i % 36);
            const melody = this.melodyBins[bin];
            const kickLength = 12 + bassMotion * (minSide * 0.11 + bassPulse * minSide * 0.08);
            const noteLength = melody * minSide * 0.24;
            const inner = coreRadius * 0.78;
            const outer = coreRadius + kickLength + noteLength;

            stroke(25 + melody * 210, 75, 100, 30 + this.bassEnergy * 65);
            strokeWeight(1.5 + bassMotion * 3.5 + melody * 2.5);
            line(
                this.x + Math.cos(angle * Math.PI / 180) * inner,
                this.y + Math.sin(angle * Math.PI / 180) * inner,
                this.x + Math.cos(angle * Math.PI / 180) * outer,
                this.y + Math.sin(angle * Math.PI / 180) * outer
            );
        }

        // FFTの帯域ごとの強さを輪郭に変換し、メロディを光の輪として描きます。
        for (let layer = 0; layer < 3; layer++) {
            beginShape();
            const layerOffset = layer * 5;
            for (let i = 0; i <= 36; i++) {
                const bin = 4 + (i % 36);
                const value = this.melodyBins[bin];
                const angle = i * 10 + this.rotation * (layer % 2 === 0 ? 1 : -0.65);
                const radius = melodyRadius + value * minSide * (0.25 + layer * 0.075)
                    + layerOffset;
                vertex(
                    this.x + Math.cos(angle * Math.PI / 180) * radius,
                    this.y + Math.sin(angle * Math.PI / 180) * radius
                );
            }
            noFill();
            stroke((175 + layer * 38 + this.highEnergy * 45) % 360, 70, 100, 58 - layer * 12);
            strokeWeight(3.2 - layer * 0.55);
            endShape(CLOSE);
        }

        // 中央の核は重低音で膨らみ、色も深い青から明るいシアンへ変わります。
        noStroke();
        fill(218, 85, 28 + this.bassEnergy * 45, 88);
        circle(this.x, this.y, coreRadius * 1.12);
        fill(190, 75, 55 + this.bassEnergy * 45, 92);
        circle(this.x, this.y, coreRadius * 0.78);
        fill(180 + this.melodyEnergy * 55, 35, 100, 45 + this.bassEnergy * 35);
        circle(this.x, this.y, coreRadius * 0.42);

        // 低音の一発ごとに外側のリングが大きく呼吸するように見せます。
        noFill();
        stroke(188, 65, 100, 25 + this.bassEnergy * 70);
        strokeWeight(3 + bassMotion * 6);
        circle(this.x, this.y, coreRadius * (1.3 + bassPulse * bassMotion * 0.28));

        // シンバルの余韻として、短い光の筋を外側へ飛ばします。
        for (const spark of this.sparks) {
            const alpha = constrain(map(spark.life, 0, spark.maxLife, 0, 100), 0, 100);
            push();
            translate(spark.x, spark.y);
            rotate(spark.rotation);
            stroke(spark.hue, 45, 100, alpha);
            strokeWeight(1.2 + alpha * 0.025);
            line(-spark.size * 0.25, 0, spark.size, 0);
            noStroke();
            fill(spark.hue, 35, 100, alpha * 0.8);
            circle(0, 0, 2 + spark.size * 0.25);
            pop();
        }

        // 三角形・四角形・六角形が広がりながら回転して消えます。
        for (const shape of this.shapes) {
            const alpha = constrain(map(shape.life, 0, shape.maxLife, 0, 90), 0, 90);
            push();
            translate(shape.x, shape.y);
            rotate(shape.rotation);
            noFill();
            stroke(shape.hue, 55, 100, alpha);
            strokeWeight(1.5 + this.highEnergy * 2);
            beginShape();
            for (let i = 0; i < shape.sides; i++) {
                const angle = i * 360 / shape.sides;
                vertex(cos(angle) * shape.radius, sin(angle) * shape.radius);
            }
            endShape(CLOSE);
            pop();
        }
        pop();
    }
}
