class NoteCircle {
    constructor(hue, speed, size) {
        // メインの図形は画面中央から出します。
        this.x = width / 2;
        this.y = height / 2;

        // 音ごとの色、移動速度、基本サイズを保存します。
        this.hue = hue;
        this.speed = speed;
        this.size = size;
        this.baseSize = size;

        // 低い音はハート、高い音は星。その間の音は段階的に形が変わります。
        this.morph = constrain(hue / 330, 0, 1);
        // 幾何学模様は、ハートなどのメイン図形とは逆順の色にします。
        this.rippleHue = 330 - constrain(hue, 0, 330);

        // メインの図形が中央からランダムな方向へ飛び出します。
        const angle = random(360);
        this.vx = cos(angle) * speed;
        this.vy = sin(angle) * speed;
        this.rotation = random(360);
        this.rotationSpeed = random(-3, 3);

        // 幾何学模様の波紋を音の高さに合わせて準備します。
        // 低音は広くゆっくり、高音は速く細かく広がります。
        this.rippleRadius = 0;
        this.rippleSpeed = lerp(1.2, 4.2, this.morph);
        this.rippleRotation = random(30);

        // 波紋の発生位置を、画面の四辺からランダムに選びます。
        const edge = floor(random(4));
        if (edge === 0) {
            this.rippleX = random(width);
            this.rippleY = 0;
        } else if (edge === 1) {
            this.rippleX = width;
            this.rippleY = random(height);
        } else if (edge === 2) {
            this.rippleX = random(width);
            this.rippleY = height;
        } else {
            this.rippleX = 0;
            this.rippleY = random(height);
        }

        // 寿命は100から始まり、更新のたびに減っていきます。
        this.lifespan = 100;

        // 音が鳴った場所の背景に、小さな花火を上げます。
        // このクラスはキー1回につき3個作られるため、各図形に花火を1つずつ持たせます。
        this.fireworkX = random(width * 0.15, width * 0.85);
        this.fireworkY = random(height * 0.12, height * 0.58);
        this.fireworkParticles = [];

        // 花火の粒を放射状に配置します。
        const particleCount = 24;
        for (let i = 0; i < particleCount; i++) {
            const particleAngle = (360 / particleCount) * i + random(-5, 5);
            const particleSpeed = random(1.5, 4.5) + speed * 0.15;
            this.fireworkParticles.push({
                x: this.fireworkX,
                y: this.fireworkY,
                vx: cos(particleAngle) * particleSpeed,
                vy: sin(particleAngle) * particleSpeed,
                alpha: 100,
                size: random(2, 5)
            });
        }
    }

    update() {
        // 中央の図形を動かし、回転させながら少しずつ大きくします。
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        this.size += this.speed * 0.18;
        this.rippleRadius += this.rippleSpeed;

        // 花火の粒は上昇しながら広がり、少しずつ透明になります。
        for (const particle of this.fireworkParticles) {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.035; // 重力でゆるやかに落ちます。
            particle.vx *= 0.985;
            particle.vy *= 0.985;
            particle.alpha -= 2.2;
        }

        // メインの図形と花火を同時にフェードアウトさせます。
        this.lifespan -= 1.5;
    }

    render() {
        // 中央から六角形や三角形の輪が広がる幾何学模様を描きます。
        push();
        translate(this.rippleX, this.rippleY);
        rotate(this.rippleRotation + this.rotation * 0.25);
        noFill();

        const rippleAlpha = constrain(this.lifespan * 0.65, 0, 65);
        const ringCount = 3;
        for (let ring = 0; ring < ringCount; ring++) {
            const radius = this.rippleRadius - ring * (18 + this.morph * 8);
            if (radius <= 0) continue;

            // 六角形の輪郭を描きます。
            stroke(this.rippleHue, 55, 100, rippleAlpha * (1 - ring * 0.2));
            strokeWeight(ring === 0 ? 1.8 : 1);
            beginShape();
            for (let vertexIndex = 0; vertexIndex < 6; vertexIndex++) {
                const angle = vertexIndex * 60;
                vertex(cos(angle) * radius, sin(angle) * radius);
            }
            endShape(CLOSE);

            // 六角形の頂点を結び、内側に星のような線を作ります。
            stroke(this.rippleHue, 35, 100, rippleAlpha * 0.7);
            for (let vertexIndex = 0; vertexIndex < 6; vertexIndex++) {
                const nextIndex = (vertexIndex + 2) % 6;
                const angleA = vertexIndex * 60;
                const angleB = nextIndex * 60;
                line(
                    cos(angleA) * radius, sin(angleA) * radius,
                    cos(angleB) * radius, sin(angleB) * radius
                );
            }
        }
        pop();

        // 先に背景側の花火を描くので、中央の図形より後ろに見えます。
        push();
        noStroke();
        for (const particle of this.fireworkParticles) {
            const alpha = constrain(min(particle.alpha, this.lifespan), 0, 100);
            if (alpha <= 0) continue;

            fill((this.hue + 35) % 360, 65, 100, alpha);
            circle(particle.x, particle.y, particle.size);

            // 粒の後ろに短い光の尾を付けます。
            stroke((this.hue + 35) % 360, 45, 100, alpha * 0.55);
            strokeWeight(1);
            line(particle.x, particle.y, particle.x - particle.vx * 2, particle.y - particle.vy * 2);
            noStroke();
        }
        pop();

        // ハートから星へ変形するメインの図形を描きます。
        push();
        translate(this.x, this.y);
        rotate(this.rotation);
        noStroke();
        fill(this.hue, 80, 100, this.lifespan);

        const pointCount = 120;
        const heartScale = this.size / 32;
        const starScale = this.size * 0.48;

        beginShape();
        for (let i = 0; i < pointCount; i++) {
            const angle = map(i, 0, pointCount, 0, 360);
            const radians = angle * PI / 180;

            // ハート型の輪郭を計算します。
            const heartX = 16 * Math.pow(Math.sin(radians), 3) * heartScale;
            const heartY = -(13 * Math.cos(radians)
                - 5 * Math.cos(2 * radians)
                - 2 * Math.cos(3 * radians)
                - Math.cos(4 * radians)) * heartScale;

            // 星の外側と内側の頂点を交互に作ります。
            const starAngle = radians - HALF_PI;
            const starRadius = (i % 2 === 0) ? starScale : starScale * 0.45;
            const starX = Math.cos(starAngle) * starRadius;
            const starY = Math.sin(starAngle) * starRadius;

            // 音の高さに合わせて、ハートと星の輪郭を混ぜます。
            vertex(
                lerp(heartX, starX, this.morph),
                lerp(heartY, starY, this.morph)
            );
        }
        endShape(CLOSE);
        pop();
    }

    isDead() {
        return this.lifespan <= 0;
    }
}
