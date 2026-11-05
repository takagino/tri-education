class FlowFabric {
  constructor() {
    this.lines = 65;
    this.points = 90;
    this.time = 0;

    this.bass = 0;
    this.mid = 0;
    this.treble = 0;

    this.energy = 0;
    this.chaos = 0;
  }

  update(bass, mid, treble) {
    // 0〜1の音域データを受け取る
    this.bass = constrain(bass, 0, 1);
    this.mid = constrain(mid, 0, 1);
    this.treble = constrain(treble, 0, 1);

    // 音楽全体のエネルギー
    const targetEnergy = this.bass * 0.45 + this.mid * 0.35 + this.treble * 0.2;

    // 急激に変化しすぎないように補間
    this.energy = lerp(this.energy, targetEnergy, 0.08);

    // 盛り上がりに応じて幾何学的な形に変化
    const targetChaos = fabricSmoothstep(0.3, 0.8, this.energy);

    this.chaos = lerp(this.chaos, targetChaos, 0.05);

    // 時間の進行
    this.time += 0.3 + this.mid * 1.5;
  }

  render() {
    push();

    translate(width / 2, height / 2);

    noFill();
    strokeWeight(0.8);

    const fabricWidth = min(width * 0.75, 850);
    const fabricHeight = min(height * 0.55, 450);

    for (let i = 0; i < this.lines; i++) {
      const v = i / (this.lines - 1);

      // 奥行きを感じさせる透明度
      stroke(0, 0, 100, 35 + v * 65);

      beginShape();

      for (let j = 0; j < this.points; j++) {
        const u = j / (this.points - 1);

        const x = (u - 0.5) * fabricWidth;
        const baseY = (v - 0.5) * fabricHeight;

        // ① 低音：大きなうねり
        const bassWave =
          sin(u * 540 + this.time + v * 120) * (25 + this.bass * 110);

        // ② 中音：布のねじれ
        const twist = sin(u * 720 + v * 360 - this.time * 1.4) * this.mid * 85;

        // ③ 高音：細かな振動
        const vibration =
          sin(u * 4320 + this.time * 5 + v * 720) * this.treble * 18;

        // ④ 盛り上がり：幾何学的な変形
        const fracture =
          sin(u * 2160 + v * 1080 + this.time * 2) * this.chaos * 65;

        // ⑤ 奥行き：立体的な布の表現
        const depth = sin(u * 180) * sin(v * 360 + this.time) * 45;

        const y = baseY + bassWave + twist + vibration + fracture + depth;

        const offsetX =
          sin(v * 360 + this.time + u * 180) * (15 + this.mid * 40);

        curveVertex(x + offsetX, y);
      }

      endShape();
    }

    pop();
  }
}

function fabricSmoothstep(edge0, edge1, x) {
  const t = constrain((x - edge0) / (edge1 - edge0), 0, 1);

  return t * t * (3 - 2 * t);
}
