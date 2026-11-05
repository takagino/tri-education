/**
 * SodaBubble：低・中・高音で位置や弾け方が変わるソーダの泡。
 * update(val)に、その泡の帯域に対応する0〜1の値を渡します。
 * 音楽の再生やFFT解析はこのクラスでは行いません。
 */
class SodaBubble {
    // 上から高音・中音・低音。各グループはこの範囲で浮遊します。
    static profiles = {
        bass:   { top: 0.65, bottom: 0.92, size: [40, 67], hue: 35, ink: 32, attack: 11, duration: 50, particles: 7, speed: 1.05, rise: 0.012, min: 0.11 },
        mid:    { top: 0.36, bottom: 0.62, size: [27, 46], hue: 54, ink: 48, attack: 6, duration: 35, particles: 0, speed: 1, rise: 0.007, min: 0.05 },
        treble: { top: 0.08, bottom: 0.33, size: [14, 28], hue: 188, ink: 193, attack: 2, duration: 22, particles: 15, speed: 2.1, rise: 0.010, min: 0.065 }
    };

    constructor(x, y, band = "treble") {
        this.x = x;
        this.y = y;
        this.band = Object.hasOwn(SodaBubble.profiles, band) ? band : "treble";
        this.profile = SodaBubble.profiles[this.band];
        const scale = constrain(min(width, height) / 680, 0.60, 1.2);
        this.baseSize = random(...this.profile.size) * scale;
        this.hue = this.profile.hue + random(-2, 2);
        this.ink = this.profile.ink;
        this.attackAge = 0;
        this.riseSpeed = random(0.22, 0.7);
        this.phase = random(360);
        this.drift = random(0.12, 0.35);
        this.rotation = random(-18, 18);
        this.rotationSpeed = random(-0.12, 0.12);
        this.time = random(360);
        this.energy = 0;
        this.reveal = 1; // 再生した泡だけ、ゆっくり姿を現します。
        this.previousValue = 0;
        this.average = 0.08; // 曲の音量変化に追従する基準値。
        this.sensitivity = random(0.55, 1.45); // 一度に全ての泡が弾けないよう個体差を付ける。
        this.cooldown = random(10, 70);
        this.state = "floating";
        this.burstAge = 0;
        this.burstSize = this.baseSize;
        this.fragments = [];
    }

    update(val, allowBurst = true) {
        // 無効な値は0にし、画面のフレームレートの違いを補正します。
        const value = constrain(Number.isFinite(val) ? val : 0, 0, 1);
        const step = constrain((deltaTime || 16.667) / 16.667, 0.1, 3);
        const rise = value - this.previousValue;
        this.previousValue = value;
        this.average = lerp(this.average, value, 1 - pow(0.975, step));
        this.energy = lerp(this.energy, value, 1 - pow(0.72, step));
        this.reveal = Math.min(1, this.reveal + 0.04 * step);
        this.time += 0.7 * step;
        this.rotation += this.rotationSpeed * (1 + this.energy * 2) * step;
        this.cooldown = Math.max(0, this.cooldown - step);

        if (this.state === "floating") {
            this.x += sin(this.time + this.phase) * this.drift * step;
            this.y -= this.riseSpeed * (1 + this.energy * 1.4) * step;

            // 拍が立ち上がったときだけ膨らみ始めます。
            const accent = value > this.profile.min && rise > this.profile.rise * this.sensitivity;
            const aboveAverage = value > this.average + this.profile.rise * this.sensitivity;
            if (this.y < height * this.profile.top) this.reset(true);
            if (this.x < -this.baseSize) this.x = width + this.baseSize;
            if (this.x > width + this.baseSize) this.x = -this.baseSize;

            if (allowBurst && this.cooldown === 0 && accent && aboveAverage) {
                this.state = "swelling";
                this.attackAge = 0;
                return true; // メイン側で、一度に弾ける泡の数を制限します。
            }
        } else if (this.state === "swelling") {
            this.attackAge += step;
            if (this.attackAge >= this.profile.attack) this.burst();
        } else {
            this.burstAge += step;
            for (const fragment of this.fragments) {
                fragment.trail.push({ x: fragment.x, y: fragment.y });
                if (fragment.trail.length > 5) fragment.trail.shift();
                fragment.x += fragment.vx * step;
                fragment.y += fragment.vy * step;
                fragment.vx *= pow(0.965, step);
                fragment.vy = fragment.vy * pow(0.965, step) + 0.014 * step;
            }
            if (this.burstAge >= this.profile.duration) this.reset();
        }
    }

    burst() {
        this.state = "bursting";
        this.burstAge = 0;
        this.burstSize = this.baseSize * (1.22 + this.energy * 0.55);
        this.fragments = [];
        const count = this.profile.particles;
        for (let i = 0; i < count; i++) {
            const angle = i * 360 / count + random(-8, 8);
            const speed = random(0.65, 1.45) * this.profile.speed * (0.8 + this.energy);
            const radius = this.burstSize * 0.42;
            this.fragments.push({
                x: cos(angle) * radius,
                y: sin(angle) * radius,
                vx: cos(angle) * speed,
                vy: sin(angle) * speed,
                size: this.band === "bass" ? random(2.8, 5.2) : random(1.6, 3.6),
                trail: []
            });
        }
    }

    reset(fromTop = false) {
        // 新しい泡を補充し、同じインスタンスを繰り返し使います。
        this.x = random(width * 0.04, width * 0.96);
        this.y = height * (fromTop
            ? this.profile.bottom
            : random(this.profile.top + 0.025, this.profile.bottom));
        this.reveal = 0; // 弾けた泡の補充は、画面内に淡く生まれるようにする。
        this.state = "floating";
        this.burstAge = 0;
        this.fragments = [];
        this.cooldown = random(20, 65);
    }

    render() {
        push();
        translate(this.x, this.y);
        rotate(this.rotation);

        if (this.state !== "bursting") {
            const swell = this.state === "swelling" ? constrain(this.attackAge / this.profile.attack, 0, 1) : 0;
            const diameter = this.baseSize * (0.85 + this.energy * 0.55 + swell * 0.37);
            const breath = 1 + sin(this.time * 1.3 + this.phase) * 0.025;
            const size = diameter * breath;
            const visible = this.reveal; // 出現直後は半透明から始める。

            // ごく薄い膜を重ね、ガラスのような透ける泡にします。
            noStroke();
            fill(180, 7, 100, (15 + this.energy * 7) * visible);
            circle(0, 0, size * 1.16);
            fill(this.hue, this.band === "treble" ? 28 : 42, 100, (33 + this.energy * 12) * visible);
            circle(0, 0, size);

            noFill();
            stroke(0, 0, 100, (65 + this.energy * 18) * visible);
            strokeWeight(3);
            circle(0, 0, size);
            stroke(this.ink, 57, 68, (64 + this.energy * 28) * visible);
            strokeWeight(0.85 + this.energy * 0.45);
            circle(0, 0, size);
            stroke(this.hue, 35, 87, 32 * visible);
            strokeWeight(0.5);
            circle(0, 0, size * 0.87);

            // 左上の白い反射と右下の色の反射が、泡の立体感になります。
            stroke(48, 8, 100, 86 * visible);
            strokeWeight(1.8);
            arc(0, 0, size * 0.82, size * 0.82, 205, 265);
            stroke(this.hue, 56, 86, 68 * visible);
            strokeWeight(1);
            arc(0, 0, size * 0.94, size * 0.94, 25, 75);
            noStroke();
            fill(48, 5, 100, 85 * visible);
            ellipse(-size * 0.20, -size * 0.23, size * 0.075, size * 0.035);
        } else {
            const progress = constrain(this.burstAge / this.profile.duration, 0, 1);
            const alpha = pow(1 - progress, 2);

            // 低音は大きな輪と丸いしずく、中音は二重の輪、高音は細かな粒。
            if (this.band !== "treble") {
                noFill();
                stroke(this.ink, 72, 70, alpha * 87);
                strokeWeight(this.band === "bass" ? 2.6 : 1.9);
                circle(0, 0, this.burstSize * (1 + progress * 1.05));
                if (this.band === "mid") {
                    stroke(this.ink, 65, 81, alpha * 66);
                    strokeWeight(1.2);
                    circle(0, 0, this.burstSize * (0.78 + progress * 0.93));
                }
            }

            for (const fragment of this.fragments) {
                for (let i = 1; i < fragment.trail.length; i++) {
                    const a = fragment.trail[i - 1];
                    const b = fragment.trail[i];
                    stroke(this.ink, 71, 66, alpha * i / fragment.trail.length * 83);
                    strokeWeight(0.7);
                    line(a.x, a.y, b.x, b.y);
                }
                noStroke();
                fill(this.hue, 35, 100, alpha * 12);
                circle(fragment.x, fragment.y, fragment.size * 3);
                fill(this.ink, 68, 73, alpha * 98);
                if (this.band === "treble") {
                    const r = fragment.size * 0.8;
                    quad(fragment.x, fragment.y - r, fragment.x + r, fragment.y,
                        fragment.x, fragment.y + r, fragment.x - r, fragment.y);
                } else {
                    circle(fragment.x, fragment.y, fragment.size);
                }
            }
        }
        pop();
    }
}
