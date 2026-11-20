let player;
let platforms;
let coins;
let enemies;
let stars;
let playerImg;
let coinImg;
let enemyImg;
let starImg;

let totalCoins = 10;
let collectedCoins = 0;
let stage2CoinStartFrame = null;
let stage2SurgeTriggered = false;
let stage2SurgePhase = null;
let stage2SurgeCycle = 0;
let stage2Switches;
let maxLives = 3;
let playerLives = maxLives;
let invincibleFrames = 0;
let jumpBuffer = 0;
let coyoteTimer = 0;
let canAirJump = false;
let iceTimer = 0;
let starTimer = 0;
let starSpawned = false;
let starParticles = [];
let bgParticles = [];
let ground;
let groundWaves = [];
let prevIsGrounded = false;
let prevPlayerVelY = 0;
let gameState = 'START'; // 'START', 'PLAY', 'GAMEOVER', 'CLEAR'
let currentStage = (typeof window !== 'undefined' && window.INITIAL_STAGE) ? window.INITIAL_STAGE : 1;
const MAX_STAGES = 2;
let mouseWasPressed = false;

function preload() {
    playerImg = loadImage('assets/player.svg');
    coinImg = loadImage('assets/coin.svg');
    enemyImg = loadImage('assets/enemy.svg');
    starImg = loadImage('assets/star.svg');
}

function setup() {
    new Canvas(800, 500);
}

function breakPlatform(p) {
    for (let i = 0; i < 28; i++) {
        let angle = random(TWO_PI);
        let spd = random(2.5, 7);
        starParticles.push({
            x: p.baseX + random(-p.w / 2, p.w / 2),
            y: p.baseY + random(-p.h / 2, p.h / 2),
            vx: cos(angle) * spd,
            vy: sin(angle) * spd + 1, // 少し下方向に勢いよく散る
            color: random(['#ff76ac', '#ff9ff3', '#ffffff', '#fd79a8']),
            life: 28,
            maxLife: 28,
            size: random(5, 12)
        });
    }
    p.remove(); // 足場が消滅
}

function createGameWorld() {
    player = new Sprite(width / 2, 380);
    player.img = playerImg;
    player.scale = 0.1;
    player.w = 36;
    player.h = 48;
    player.rotationLock = true;
    player.friction = 0; // 壁に引っ付かないように摩擦を0に
    player.bounciness = 0;

    platforms = new Group();
    platforms.color = '#9bd9b0';
    platforms.collider = 'static';
    platforms.friction = 0; // 足場の側面との摩擦を0に
    platforms.bounciness = 0;

    ground = new platforms.Sprite(400, 480, 800, 40);
    ground.isTrampoline = false;
    if (currentStage === 2) {
        ground.color = '#9edbe8'; // STAGE 2：やわらかな水色
        ground.isIce = true;      // stage1の水色の足場と同じく進みづらい機能
        ground.isPink = false;
    } else {
        ground.color = '#a9d9a5'; // STAGE 1：やわらかな緑の地面
        ground.isIce = false;
        ground.isPink = false;
    }

    let upperPlatforms = [];
    let iceIndices = [];
    let pinkIndices = [];

    if (currentStage === 1) {
        totalCoins = 10;
        upperPlatforms = [
            { x: 220, y: 380, w: 160, h: 20 },
            { x: 580, y: 380, w: 160, h: 20 },
            { x: 400, y: 300, w: 180, h: 20 },
            { x: 200, y: 180, w: 140, h: 20 },
            { x: 600, y: 180, w: 140, h: 20 }
        ];
        let indices = [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5);
        iceIndices = indices.slice(0, 1);   // 水色（進みづらい足場：1個）
        pinkIndices = indices.slice(2, 4);  // ピンク色（崩れる足場：2個）
        // 残りの2個は緑色（跳ねる足場）
    } else {
        // STAGE 2：足場が増え、高低差とアクション性がアップ！
        totalCoins = 12;
        upperPlatforms = [
            { x: 150, y: 390, w: 130, h: 20 },
            { x: 650, y: 390, w: 130, h: 20 },
            { x: 400, y: 330, w: 160, h: 20 },
            { x: 200, y: 230, w: 130, h: 20 },
            { x: 600, y: 230, w: 130, h: 20 },
            { x: 400, y: 140, w: 150, h: 20 }
        ];
        let indices = [0, 1, 2, 3, 4, 5].sort(() => Math.random() - 0.5);
        iceIndices = indices.slice(0, 2);   // 水色（進みづらい足場：2個）
        pinkIndices = indices.slice(2, 4);  // ピンク色（崩れる足場：2個）
        // 残りの2個は緑色（跳ねる足場）
    }

    for (let i = 0; i < upperPlatforms.length; i++) {
        let pData = upperPlatforms[i];
        let p = new platforms.Sprite(pData.x, pData.y, pData.w, pData.h);
        p.baseX = pData.x;
        p.baseY = pData.y;

        if (pinkIndices.includes(i)) {
            // ピンク色（3回乗るか3秒間とどまると崩れる足場）
            p.color = (currentStage === 1) ? '#f3a6b8' : '#f2a4ad'; // やわらかなピンク
            p.isIce = false;
            p.isPink = true;
            p.stayFrames = 0;
            p.graceFrames = 0;
            p.stepCount = 0;   // 乗った回数（3回で崩落）
            p.isOn = false;     // 現在乗っているかのフラグ
            p.leaveTimer = 0;  // 離脱猶予タイマー
        } else if (iceIndices.includes(i)) {
            p.color = (currentStage === 1) ? '#9edbe8' : '#a8c8ef'; // やわらかな水色
            p.isIce = true;
            p.isPink = false;
        } else {
            p.color = (currentStage === 1) ? '#a9d9a5' : '#9bd9c3'; // やわらかな緑
            p.isIce = false;
            p.isPink = false;
            p.isTrampoline = (currentStage === 2);
        }
    }

    coins = new Group();
    coins.img = coinImg;
    coins.scale = 0.08;
    coins.w = 26;
    coins.h = 34;
    coins.collider = 'kinematic';

    for (let i = 0; i < totalCoins; i++) {
        let rx = random(60, width - 60);
        let ry = random(80, 420);
        new coins.Sprite(rx, ry);
    }

    if (currentStage === 2) {
        stage2Switches = new Group();
        stage2Switches.collider = 'static';
        stage2Switches.friction = 0;
        let coinSwitch = new stage2Switches.Sprite(30, 450, 52, 18);
        coinSwitch.kind = 'coins';
        coinSwitch.activated = false;
        coinSwitch.color = '#e9a4ad';
        let enemySwitch = new stage2Switches.Sprite(770, 450, 52, 18);
        enemySwitch.kind = 'enemies';
        enemySwitch.activated = false;
        enemySwitch.color = '#f2cf91';
    }

    enemies = new Group();
    enemies.img = enemyImg;
    enemies.scale = 0.09;
    enemies.w = 40;
    enemies.h = 40;
    enemies.collider = 'kinematic';

    stars = new Group();
    stars.img = starImg;
    stars.scale = 0.08;
    stars.w = 34;
    stars.h = 34;
    stars.collider = 'kinematic';

    player.overlaps(coins, getCoin);
    player.overlaps(stars, getStar);
    player.overlaps(enemies, hitEnemy);
    if (stage2Switches) player.overlaps(stage2Switches, activateStage2Switch);
}

function activateStage2Switch(player, switchSprite) {
    if (switchSprite.activated) return;
    let topY = switchSprite.y - switchSprite.h / 2;
    let footY = player.y + player.h / 2;
    // 横や下から触れただけではなく、上に乗った時に作動
    if (player.y >= topY || footY < topY - 8 || player.vel.y < -1) return;

    switchSprite.activated = true;
    switchSprite.color = '#b8b8b8';
    if (switchSprite.kind === 'coins') {
        totalCoins += 20;
        for (let i = 0; i < 20; i++) {
            let bonusCoin = new coins.Sprite(random(50, width - 50), random(-260, -30));
            bonusCoin.vel.x = random(-1.5, 1.5);
            bonusCoin.vel.y = random(2.5, 5);
        }
    } else {
        for (let i = 0; i < 20; i++) {
            spawnEnemy(i % 2 === 0);
        }
    }
}

function spawnStar() {
    if (starSpawned) return;
    starSpawned = true;

    let candidates = [
        { x: random(150, 250), y: 130 },
        { x: random(550, 650), y: 130 },
        { x: random(350, 450), y: 250 },
        { x: random(160, 280), y: 330 },
        { x: random(520, 640), y: 330 },
        { x: random(120, width - 120), y: random(160, 320) }
    ];
    let spot = random(candidates);

    let s = new stars.Sprite(spot.x, spot.y);
    s.baseY = spot.y;

    for (let i = 0; i < 14; i++) {
        let angle = random(TWO_PI);
        let spd = random(2, 5);
        starParticles.push({
            x: spot.x,
            y: spot.y,
            vx: cos(angle) * spd,
            vy: sin(angle) * spd,
            color: '#FFD700',
            life: 25,
            maxLife: 25,
            size: random(6, 12)
        });
    }
}

function getStar(player, star) {
    star.remove();
    starTimer = 180; // 3秒間無敵（60fps × 3）

    for (let i = 0; i < 18; i++) {
        let angle = random(TWO_PI);
        let spd = random(2, 6);
        starParticles.push({
            x: player.x,
            y: player.y,
            vx: cos(angle) * spd,
            vy: sin(angle) * spd,
            color: random(['#ff4757', '#ffa502', '#feca57', '#2ed573', '#1e90ff', '#e056fd']),
            life: 25,
            maxLife: 25,
            size: random(8, 14)
        });
    }
}

function spawnEnemy(fromLeftOverride) {
    let fromLeft = (typeof fromLeftOverride === 'boolean') ? fromLeftOverride : random() < 0.5;
    let startX = fromLeft ? -30 : width + 30;
    let speed = random(3, 6);
    let vx = fromLeft ? speed : -speed;

    let spawnY = random([150, 250, 350, 435]);

    let e = new enemies.Sprite(startX, spawnY);
    e.vel.x = vx;

    if (fromLeft) {
        e.mirror.x = true;
    }
    return e;
}

function spawnFallingSurgeEnemy() {
    let e = new enemies.Sprite(random(35, width - 35), -30);
    e.vel.x = 0;
    e.vel.y = random(3, 5);
    e.isStage2FallingSurge = true;
    return e;
}

function getCoin(player, coin) {
    coin.remove();
    collectedCoins++;
    if (currentStage === 2 && stage2CoinStartFrame === null) {
        stage2CoinStartFrame = frameCount;
    }

    if (collectedCoins === 5) {
        for (let c of coins) {
            let speed = random(1.2, 2.0);
            let angle = random(TWO_PI);
            c.vel.x = cos(angle) * speed;
            c.vel.y = sin(angle) * speed;
            if (abs(c.vel.x) < 0.6) c.vel.x = (c.vel.x >= 0 ? 1 : -1) * 0.8;
            if (abs(c.vel.y) < 0.6) c.vel.y = (c.vel.y >= 0 ? 1 : -1) * 0.8;
        }
        spawnStar(); // 5枚集まったら星が出現！
    } else if (coins.length === 2) {
        // 残り2枚からスピードアップ！
        for (let c of coins) {
            let speed = 3.5;
            let angle = random(TWO_PI);
            c.vel.x = cos(angle) * speed;
            c.vel.y = sin(angle) * speed;
            if (abs(c.vel.x) < 1.5) c.vel.x = (c.vel.x >= 0 ? 1 : -1) * 2.0;
            if (abs(c.vel.y) < 1.2) c.vel.y = (c.vel.y >= 0 ? 1 : -1) * 1.8;
        }
    } else if (coins.length === 1) {
        // 最後の1枚はさらにスピードアップ！
        let lastCoin = coins[0];
        let fastSpeed = 4.8;
        let angle = random(TWO_PI);
        lastCoin.vel.x = cos(angle) * fastSpeed;
        lastCoin.vel.y = sin(angle) * fastSpeed;
        if (abs(lastCoin.vel.x) < 2) lastCoin.vel.x = (lastCoin.vel.x >= 0 ? 1 : -1) * 3;
        if (abs(lastCoin.vel.y) < 1.5) lastCoin.vel.y = (lastCoin.vel.y >= 0 ? 1 : -1) * 2.5;
    }

    if (coins.length === 0) {
        gameState = 'CLEAR';
    }
}

function hitEnemy(player, enemy) {
    if (enemy.isDying) return;

    if (starTimer > 0) {
        // 無敵スター中：敵を撃破！
        enemy.isDying = true;
        enemy.mirror.y = true; // 上下反転して「やられ」状態に
        enemy.vel.x = (enemy.x < player.x ? -2.5 : 2.5); // 弾き飛ばされる
        enemy.vel.y = -6; // 上に少しポンと跳ねてから落下

        // 撃破エフェクト（星のキラキラが飛び散る）
        for (let i = 0; i < 8; i++) {
            let angle = random(TWO_PI);
            let spd = random(2, 5);
            starParticles.push({
                x: enemy.x,
                y: enemy.y,
                vx: cos(angle) * spd,
                vy: sin(angle) * spd,
                color: random(['#ff4757', '#ffa502', '#feca57', '#ffffff']),
                life: 20,
                maxLife: 20,
                size: random(6, 12)
            });
        }
        return;
    }

    if (invincibleFrames > 0) return;

    enemy.remove();
    playerLives--;
    invincibleFrames = 60; // 約1秒間の無敵時間

    if (playerLives <= 0) {
        gameState = 'GAMEOVER';
        player.visible = false;
    }
}

function draw() {
    clear();

    // ステージごとの可愛い自然の背景色（森：深緑 / 海：ディープオーシャンブルー）
    if (currentStage === 1) {
        background('#dff1df'); // ミルキーな若葉色
        if (typeof document !== 'undefined') document.body.style.backgroundColor = '#dff1df';
    } else {
        background('#dceef4'); // ミルキーな水色
        if (typeof document !== 'undefined') document.body.style.backgroundColor = '#dceef4';
    }

    // 環境パーティクル（森：舞い落ちる木の葉・花びら / 海：水底から浮かぶ泡）
    drawEnvironment();

    if (gameState === 'PLAY') {
        let moveSpeed = 5;
        let footY = player.y + player.h / 2;

        // 水色（氷）の足場の上面に乗っているか判定（判定抜け防止のため猶予フレームを持たせる）
        let touchingIce = false;
        for (let p of platforms) {
            let topY = p.y - p.h / 2;
            if (p.isIce && player.colliding(p) && footY >= topY - 6 && player.y < topY) {
                touchingIce = true;
                break;
            }
        }

        if (touchingIce) {
            iceTimer = 8;
        } else if (iceTimer > 0) {
            iceTimer--;
        }
        let onIce = (iceTimer > 0);

        if (onIce) {
            let iceSpeed = 1.8; // 水色の足場では進みづらくなる（速度低下＆重めの加速）
            if (kb.pressing('left')) {
                player.vel.x = lerp(player.vel.x, -iceSpeed, 0.08);
                player.mirror.x = true;
            } else if (kb.pressing('right')) {
                player.vel.x = lerp(player.vel.x, iceSpeed, 0.08);
                player.mirror.x = false;
            } else {
                player.vel.x = lerp(player.vel.x, 0, 0.2);
                if (abs(player.vel.x) < 0.1) {
                    player.vel.x = 0;
                }
            }
        } else {
            if (kb.pressing('left')) {
                player.vel.x = -moveSpeed;
                player.mirror.x = true;
            } else if (kb.pressing('right')) {
                player.vel.x = moveSpeed;
                player.mirror.x = false;
            } else {
                player.vel.x = 0;
            }
        }

        // ピンク色（消える足場）の処理：3回乗るか、3秒間立ち止まると崩れ落ちる
        let platformList = [...platforms];
        let maxStayFrames = 180; // 崩れ落ちるまでの立ち止まり時間：3.0秒（60fps × 3.0秒）
        for (let p of platformList) {
            if (p.isPink) {
                let topY = p.y - p.h / 2;
                // 足場の上面に乗っているか（側面や下面ではなく上面に着地中）
                let isTouching = (player.colliding(p) && footY >= topY - 6 && player.y < topY && player.vel.y >= -1);

                if (isTouching) {
                    p.graceFrames = 8;
                    p.leaveTimer = 10; // チャタリング防止の離脱猶予

                    if (!p.isOn) {
                        // 新たに乗った（着地した）瞬間！
                        p.isOn = true;
                        p.stepCount++;

                        if (p.stepCount >= 3) {
                            // 同じ足場に3回乗ったら即座に崩落！
                            breakPlatform(p);
                            continue;
                        } else {
                            // 1回目、2回目に乗った時の着地エフェクト
                            for (let k = 0; k < 12; k++) {
                                starParticles.push({
                                    x: player.x + random(-15, 15),
                                    y: topY,
                                    vx: random(-1.5, 1.5),
                                    vy: random(-2.2, -0.3),
                                    color: random(['#ff76ac', '#ff9ff3', '#ffffff']),
                                    life: 16,
                                    maxLife: 16,
                                    size: random(3, 8)
                                });
                            }
                        }
                    }
                } else {
                    if (p.graceFrames > 0) p.graceFrames--;
                    if (p.leaveTimer > 0) {
                        p.leaveTimer--;
                    } else {
                        p.isOn = false; // 足場から完全に離れた
                    }
                }

                let isStanding = (p.graceFrames > 0);
                let pinkBase = (currentStage === 1) ? '#ff76ac' : '#ff6b81';
                let baseColor = p.stepCount === 2 ? '#ff2d75' : (p.stepCount === 1 ? '#ff5390' : pinkBase);

                if (isStanding) {
                    p.stayFrames++;

                    // 立ち止まり時間に応じた激しい振動＋沈み込み演出
                    let progress = p.stayFrames / maxStayFrames;
                    let shake = map(progress, 0, 1, 0.8, 5.0);
                    let sinkY = map(progress, 0.4, 1, 0, 7, true);

                    p.x = p.baseX + random(-shake, shake);
                    p.y = p.baseY + sinkY + random(-shake, shake);

                    // 1秒（60フレーム）経過後から足場が崩れ始める粉塵パーティクル
                    if (p.stayFrames > 60 && frameCount % 2 === 0) {
                        starParticles.push({
                            x: p.x + random(-p.w / 2, p.w / 2),
                            y: p.y - 6,
                            vx: random(-0.8, 0.8),
                            vy: random(-1.5, -0.2),
                            color: random(['#ff76ac', '#ff9ff3', '#ffffff']),
                            life: 15,
                            maxLife: 15,
                            size: random(3, 7)
                        });
                    }

                    // 残り約1秒（120フレーム経過）から白とピンクで高速点滅警告
                    if (p.stayFrames > 120) {
                        p.color = (Math.floor(frameCount / 3) % 2 === 0) ? '#ffffff' : baseColor;
                    } else {
                        p.color = baseColor;
                    }

                    // 3秒間（180フレーム）で完全に崩壊・消滅！
                    if (p.stayFrames >= maxStayFrames) {
                        breakPlatform(p);
                    }
                } else {
                    p.x = p.baseX;
                    p.y = p.baseY;
                    p.color = baseColor;
                    if (p.stayFrames > 0) {
                        p.stayFrames = max(0, p.stayFrames - 2);
                    }
                }
            }
        }

        // 足場の上面に着地しているかどうかの厳密な判定（側面や下面に触れただけでは着地とみなさない）
        let isGrounded = false;
        let landedPlatform = null;
        for (let p of platforms) {
            if (player.colliding(p)) {
                let topY = p.y - p.h / 2;
                if (footY >= topY - 6 && player.y < topY && player.vel.y >= -1) {
                    isGrounded = true;
                    landedPlatform = p;
                    break;
                }
            }
        }

        // 下の地面に着地したときの波打ちエフェクト発動！
        if (isGrounded && !prevIsGrounded && landedPlatform === ground && prevPlayerVelY > 1.5) {
            triggerGroundWave(player.x, prevPlayerVelY);
        }
        // 緑の足場に着地した瞬間、トランポリンのように跳ね返す
        if (isGrounded && !prevIsGrounded && landedPlatform && landedPlatform.isTrampoline) {
            player.vel.y = -15;
        }
        prevIsGrounded = isGrounded;
        prevPlayerVelY = player.vel.y;

        if (isGrounded) {
            coyoteTimer = 6;
            canAirJump = true; // 着地したら空中ジャンプを回復
        } else if (coyoteTimer > 0) {
            coyoteTimer--;
        }

        if (kb.presses('space')) {
            if (coyoteTimer > 0) {
                // 地上（足場）からの通常ジャンプ
                player.vel.y = -11;
                coyoteTimer = 0;
                jumpBuffer = 0;
            } else if (canAirJump) {
                // 空中ジャンプ（2段ジャンプ：1回のみ可能）
                player.vel.y = -10.5;
                canAirJump = false;
                jumpBuffer = 0;
            } else {
                // 空中ジャンプを消費済みの場合は着地用の先行入力を保持
                jumpBuffer = 8;
            }
        } else if (jumpBuffer > 0) {
            jumpBuffer--;
            if (coyoteTimer > 0) {
                player.vel.y = -11;
                coyoteTimer = 0;
                jumpBuffer = 0;
            }
        }

        player.x = constrain(player.x, 25, width - 25);

        if (starTimer > 0) {
            starTimer--;
            player.visible = true; // 無敵スター中は常時表示

            // 移動中のキラキラ星トレイル
            if (frameCount % 3 === 0) {
                let rainbowColors = ['#ff4757', '#ffa502', '#feca57', '#2ed573', '#1e90ff', '#e056fd'];
                starParticles.push({
                    x: player.x + random(-15, 15),
                    y: player.y + random(-15, 15),
                    vx: random(-0.8, 0.8),
                    vy: random(-0.8, 0.8),
                    color: random(rainbowColors),
                    life: 20,
                    maxLife: 20,
                    size: random(6, 12)
                });
            }
        } else if (invincibleFrames > 0) {
            invincibleFrames--;
            player.visible = Math.floor(invincibleFrames / 5) % 2 === 0;
        } else {
            player.visible = true;
        }

        let enemySpawnInterval = (currentStage === 1) ? 75 : 55;
        if (currentStage === 2 && stage2CoinStartFrame !== null &&
            frameCount - stage2CoinStartFrame >= 20 * 60 && !stage2SurgeTriggered) {
            stage2SurgeTriggered = true;
            stage2SurgePhase = 'horizontal';
            stage2SurgeCycle = 1;
            for (let i = 0; i < 20; i++) {
                let surgeEnemy = spawnEnemy(i % 2 === 0);
                surgeEnemy.isStage2HorizontalSurge = true;
            }
        }
        if (frameCount % enemySpawnInterval === 0) {
            spawnEnemy();
        }

        if (stage2SurgePhase === 'horizontal') {
            let horizontalEnemiesRemain = false;
            for (let e of enemies) {
                if (e.isStage2HorizontalSurge) {
                    horizontalEnemiesRemain = true;
                    break;
                }
            }
            if (!horizontalEnemiesRemain) {
                stage2SurgePhase = 'falling';
                for (let i = 0; i < 20; i++) {
                    spawnFallingSurgeEnemy();
                }
            }
        } else if (stage2SurgePhase === 'falling') {
            let fallingEnemiesRemain = false;
            for (let e of enemies) {
                if (e.isStage2FallingSurge) {
                    fallingEnemiesRemain = true;
                    break;
                }
            }
            if (!fallingEnemiesRemain) {
                if (stage2SurgeCycle < 2) {
                    stage2SurgeCycle++;
                    stage2SurgePhase = 'horizontal';
                    for (let i = 0; i < 20; i++) {
                        let surgeEnemy = spawnEnemy(i % 2 === 0);
                        surgeEnemy.isStage2HorizontalSurge = true;
                    }
                } else {
                    stage2SurgePhase = 'done';
                }
            }
        }

        for (let e of enemies) {
            if (e.isDying) {
                e.vel.y += 0.5; // 重力で下に落ちる
                e.rotation += 12; // くるくる回転しながら落下
                if (e.y > height + 60 || e.x < -60 || e.x > width + 60) {
                    e.remove();
                }
            } else {
                if (e.x < -60 || e.x > width + 60 ||
                    (e.isStage2FallingSurge && e.y > height + 60)) {
                    e.remove();
                }
            }
        }

        // 星のふわふわ浮遊＆きらめき演出
        for (let s of stars) {
            s.y = s.baseY + sin(frameCount * 0.1) * 6;
            s.rotation = sin(frameCount * 0.05) * 15;

            if (frameCount % 8 === 0) {
                starParticles.push({
                    x: s.x + random(-15, 15),
                    y: s.y + random(-15, 15),
                    vx: random(-0.5, 0.5),
                    vy: random(-1, 0),
                    color: '#FFD700',
                    life: 16,
                    maxLife: 16,
                    size: random(4, 8)
                });
            }
        }

        if (collectedCoins >= 5) {
            for (let c of coins) {
                if (c.x < 30) {
                    c.x = 30;
                    c.vel.x = abs(c.vel.x);
                } else if (c.x > width - 30) {
                    c.x = width - 30;
                    c.vel.x = -abs(c.vel.x);
                }

                if (c.y < 30) {
                    c.y = 30;
                    c.vel.y = abs(c.vel.y);
                } else if (c.y > 440) {
                    c.y = 440;
                    c.vel.y = -abs(c.vel.y);
                }
            }
        }
    }

    allSprites.draw();

    // 地面の着地波打ちエフェクト描画
    drawGroundWaves();

    // 無敵オーラ＆パーティクル描画
    drawEffects();

    if (gameState === 'START') {
        let title = (currentStage === 1) ? 'STAGE 1' : 'STAGE 2';
        let titleColor = (currentStage === 1) ? '#719d78' : '#6c9eae';
        let sub = (currentStage === 1) ? 'SPACEキーで STAGE 1 をスタート！' : 'SPACEキーで STAGE 2 をスタート！';
        drawOverlay(title, titleColor, sub);
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'PLAY') {
        drawUI();

    } else if (gameState === 'GAMEOVER') {
        let stageName = (currentStage === 1) ? 'STAGE 1' : 'STAGE 2';
        drawOverlay('GAME OVER...', '#c96878', `SPACEキーで ${stageName} をリトライ`);
        if (kb.presses('space')) {
            startGame();
        }

    } else if (gameState === 'CLEAR') {
        drawClearScreen();
    }

    mouseWasPressed = mouseIsPressed;
}

function drawUI() {
    // 左上：ライフ（ハート）表示
    textAlign(LEFT, TOP);
    textSize(22);
    let hearts = '';
    for (let i = 0; i < maxLives; i++) {
        hearts += (i < playerLives ? '❤️ ' : '🖤 ');
    }
    text(hearts.trim(), 25, 20);

    // 中央上：無敵スタータイマー または 可愛いステージ番号表示
    if (starTimer > 0) {
        push();
        textAlign(CENTER, TOP);
        let rainbowColors = ['#ff4757', '#ffa502', '#feca57', '#2ed573', '#1e90ff', '#e056fd'];
        let c = rainbowColors[Math.floor(frameCount / 4) % rainbowColors.length];
        fill(c);
        textSize(20);
        textStyle(BOLD);
        let sec = (starTimer / 60).toFixed(1);
        text(`★ STAR POWER! ${sec}s ★`, width / 2, 20);
        pop();
    } else {
        push();
        textAlign(CENTER, TOP);
        fill('#52636b');
        textSize(19);
        textStyle(BOLD);
        let stageLabel = (currentStage === 1) ? 'STAGE 1' : 'STAGE 2';
        text(stageLabel, width / 2, 20);
        pop();
    }

    // 右上：コイン獲得数表示
    textAlign(RIGHT, TOP);
    fill('#bd8c48');
    textSize(20);
    textStyle(BOLD);
    text(`🪙 コイン: ${collectedCoins} / ${totalCoins}`, width - 25, 20);

    fill('#65777d');
    textSize(13);
    textStyle(NORMAL);
    text('← → : いどう  /  SPACE : 2だんジャンプ', width - 25, 48);

    // STAGE 2：最初のコイン取得から15秒後に、敵襲撃までの5秒を表示
    if (currentStage === 2 && stage2CoinStartFrame !== null) {
        let elapsedFrames = frameCount - stage2CoinStartFrame;
        if (elapsedFrames >= 15 * 60 && elapsedFrames < 20 * 60) {
            let secondsLeft = Math.ceil((20 * 60 - elapsedFrames) / 60);
            push();
            textAlign(CENTER, TOP);
            fill('#c96878');
            textSize(24);
            textStyle(BOLD);
            text(`敵の襲撃まで ${secondsLeft}`, width / 2, 52);
            pop();
        }
    }
}

function drawEnvironment() {
    // 環境パーティクルの生成
    if (gameState === 'PLAY' && frameCount % 18 === 0) {
        if (currentStage === 1) {
            // 森：舞い落ちる木の葉や桜の花びら
            bgParticles.push({
                x: random(width),
                y: -15,
                vx: random(-0.6, 0.6),
                vy: random(0.8, 1.8),
                rot: random(TWO_PI),
                vRot: random(-0.03, 0.03),
                size: random(7, 13),
                color: random(['#a8e6cf', '#dcedc1', '#ffd3b6', '#ff8b94']),
                life: 340
            });
        } else {
            // 海：下から浮かび上がる泡（あぶく）
            bgParticles.push({
                x: random(width),
                y: height + 15,
                vx: random(-0.4, 0.4),
                vy: random(-1.8, -0.8),
                size: random(5, 14),
                color: random(['rgba(255, 255, 255, 0.35)', 'rgba(72, 219, 251, 0.45)', 'rgba(0, 210, 211, 0.35)']),
                life: 340
            });
        }
    }

    // 環境パーティクルの更新と描画（背景レイヤー）
    for (let i = bgParticles.length - 1; i >= 0; i--) {
        let bp = bgParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.life--;

        push();
        noStroke();
        if (currentStage === 1) {
            fill(bp.color);
            translate(bp.x, bp.y);
            bp.rot += bp.vRot;
            rotate(bp.rot);
            ellipse(0, 0, bp.size, bp.size * 0.55);
        } else {
            fill(bp.color);
            circle(bp.x, bp.y, bp.size);
            fill('rgba(255, 255, 255, 0.7)');
            circle(bp.x - bp.size * 0.2, bp.y - bp.size * 0.2, bp.size * 0.25);
        }
        pop();

        if (bp.life <= 0 || bp.y < -30 || bp.y > height + 30) {
            bgParticles.splice(i, 1);
        }
    }
}

function triggerGroundWave(landingX, impactSpeed) {
    let impact = constrain(impactSpeed, 2, 14);

    // 地面を波打たせるウェーブデータ
    groundWaves.push({
        x: landingX,
        radius: 0,
        maxRadius: map(impact, 2, 14, 200, 360),
        speed: 7.0,
        width: 52,
        amplitude: map(impact, 2, 14, 7, 16),
        life: 45,
        maxLife: 45
    });

    // 着地しぶきパーティクル（森：草露・若葉 / 海：水しぶき・泡）
    let splashColors = (currentStage === 1)
        ? ['#2ed573', '#a8e6cf', '#ffffff', '#ffd3b6']
        : ['#48dbfb', '#54a0ff', '#ffffff', '#00d2d3'];
    let splashCount = Math.floor(map(impact, 2, 14, 10, 20));

    for (let i = 0; i < splashCount; i++) {
        let angle = random(PI * 1.15, PI * 1.85); // 上方向左右にパシャッと跳ねる
        let spd = random(2.5, 6.5) * (impact / 8);
        starParticles.push({
            x: landingX + random(-14, 14),
            y: 458,
            vx: cos(angle) * spd,
            vy: sin(angle) * spd,
            color: random(splashColors),
            life: 24,
            maxLife: 24,
            size: random(4, 9)
        });
    }
}

function drawGroundWaves() {
    if (groundWaves.length === 0) return;

    push();
    let groundColor = (currentStage === 1) ? '#2ed573' : '#48dbfb';
    let waveLineColor = (currentStage === 1) ? '#a8e6cf' : '#ffffff';

    // 1. 各波の更新と左右に広がる波紋リング描画
    for (let i = groundWaves.length - 1; i >= 0; i--) {
        let w = groundWaves[i];
        w.radius += w.speed;
        w.life--;

        // 波紋（横長の楕円リング）
        let alpha = map(w.life, 0, w.maxLife, 0, 220);
        noFill();
        stroke(currentStage === 1 ? `rgba(168, 230, 207, ${alpha / 255})` : `rgba(255, 255, 255, ${alpha / 255})`);
        strokeWeight(2.5);
        ellipse(w.x, 460, w.radius * 2, w.radius * 0.28);

        if (w.life <= 0 || w.radius > w.maxRadius) {
            groundWaves.splice(i, 1);
        }
    }

    // 2. 地面上面の波打ち変形描画（地面の上に波を合成）
    if (groundWaves.length > 0) {
        fill(groundColor);
        noStroke();
        beginShape();
        vertex(0, height);
        for (let x = 0; x <= width; x += 6) {
            let totalOffsetY = 0;
            for (let w of groundWaves) {
                let d = abs(x - w.x);
                let distFromFront = abs(d - w.radius);
                if (distFromFront < w.width) {
                    let factor = 1 - distFromFront / w.width;
                    let decay = (1 - w.radius / w.maxRadius);
                    // サイン波で上下にぷるんと波打つ
                    let wave = sin(factor * PI) * cos((d - w.radius) * 0.15);
                    totalOffsetY -= wave * w.amplitude * decay;
                }
            }
            vertex(x, 460 + totalOffsetY);
        }
        vertex(width, height);
        endShape(CLOSE);

        // 3. 水面・草地のきらめく光沢波ライン
        noFill();
        stroke(waveLineColor);
        strokeWeight(3);
        beginShape();
        for (let x = 0; x <= width; x += 6) {
            let totalOffsetY = 0;
            for (let w of groundWaves) {
                let d = abs(x - w.x);
                let distFromFront = abs(d - w.radius);
                if (distFromFront < w.width) {
                    let factor = 1 - distFromFront / w.width;
                    let decay = (1 - w.radius / w.maxRadius);
                    let wave = sin(factor * PI) * cos((d - w.radius) * 0.15);
                    totalOffsetY -= wave * w.amplitude * decay;
                }
            }
            vertex(x, 460 + totalOffsetY);
        }
        endShape();
    }
    pop();
}

function drawEffects() {
    if (gameState !== 'PLAY') return;

    // 無敵スター中のプレイヤー周囲の虹色オーラ
    if (starTimer > 0) {
        push();
        noFill();
        let rainbowColors = ['#ff4757', '#ffa502', '#feca57', '#2ed573', '#1e90ff', '#e056fd'];
        let colorIndex = Math.floor(frameCount / 4) % rainbowColors.length;
        stroke(rainbowColors[colorIndex]);
        strokeWeight(3);
        let ringSize = 52 + sin(frameCount * 0.25) * 8;
        circle(player.x, player.y, ringSize);

        strokeWeight(1.5);
        stroke(rainbowColors[(colorIndex + 2) % rainbowColors.length]);
        circle(player.x, player.y, ringSize + 12);
        pop();
    }

    // パーティクルの更新と描画
    for (let i = starParticles.length - 1; i >= 0; i--) {
        let p = starParticles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) {
            starParticles.splice(i, 1);
        } else {
            push();
            noStroke();
            fill(p.color);
            rectMode(CENTER);
            translate(p.x, p.y);
            rotate(frameCount * 0.15);
            let s = p.size * (p.life / p.maxLife);
            rect(0, 0, s, s);
            pop();
        }
    }
}


function drawOverlay(titleText, titleColor, subText) {
    cursor('default');
    noStroke();
    fill(93, 117, 119, 105);
    rectMode(CORNER);
    rect(0, 0, width, height);
    rectMode(CENTER);
    fill(255, 250, 241, 238);
    noStroke();
    rect(width / 2, height / 2, 590, 250, 30);

    textAlign(CENTER, CENTER);
    fill(titleColor);
    textSize(46);
    textStyle(BOLD);
    text(titleText, width / 2, height / 2 - 35);

    fill('#65777d');
    textSize(20);
    textStyle(NORMAL);
    text(subText, width / 2, height / 2 + 40);
}

function goToStage2() {
    cursor('default');
    if (typeof window !== 'undefined' && window.location.pathname.endsWith('stage2.html')) {
        currentStage = 2;
        startGame();
    } else {
        try {
            window.location.href = 'stage2.html';
        } catch (e) {
            currentStage = 2;
            startGame();
        }
    }
}

function goToStage1() {
    cursor('default');
    if (typeof window !== 'undefined' && window.location.pathname.endsWith('stage2.html')) {
        try {
            window.location.href = 'index.html';
        } catch (e) {
            currentStage = 1;
            startGame();
        }
    } else {
        currentStage = 1;
        startGame();
    }
}

function drawClearScreen() {
    noStroke();
    fill(0, 0, 0, 195);
    rectMode(CORNER);
    rect(0, 0, width, height);

    textAlign(CENTER, CENTER);

    if (currentStage < MAX_STAGES) {
        // ステージ1（もり）クリア時
        fill('#719d78');
        textSize(44);
        textStyle(BOLD);
        text('★ STAGE 1 CLEAR! ★', width / 2, height / 2 - 60);

        fill('#dfe6e9');
        textSize(18);
        textStyle(NORMAL);
        text('つぎは STAGE 2 へ進もう！', width / 2, height / 2 - 15);

        // 「SPACEキーで遊ぶ」の場所に「うみのステージへ行く」ボタンを配置！
        let btnX = width / 2;
        let btnY = height / 2 + 45;
        let btnW = 310;
        let btnH = 56;
        let isHover = (mouseX >= btnX - btnW / 2 && mouseX <= btnX + btnW / 2 &&
                       mouseY >= btnY - btnH / 2 && mouseY <= btnY + btnH / 2);

        push();
        rectMode(CENTER);
        if (isHover) {
            cursor('pointer');
            fill('#83c6d2');
            stroke('#ffffff');
            strokeWeight(3);
            rect(btnX, btnY, btnW + 6, btnH + 4, 16);
        } else {
            cursor('default');
            fill('#a8dce2');
            noStroke();
            rect(btnX, btnY, btnW, btnH, 14);
        }

        // ボタンのテキスト
        noStroke();
        fill('#35535a');
        textSize(22);
        textStyle(BOLD);
        text('STAGE 2 へ進む ▶', btnX, btnY);
        pop();

        // 補助案内テキスト
        fill('#a4b0be');
        textSize(14);
        textStyle(NORMAL);
        text('（ クリック または SPACEキー ）', width / 2, height / 2 + 105);

        // Rキーでもう一度遊ぶ案内
        fill('#747d8c');
        textSize(13);
        text('Rキー : STAGE 1 をもう一度あそぶ', width / 2, height / 2 + 130);

        let clicked = isHover && (mouse.presses() || mouse.presses('left') || (mouseIsPressed && !mouseWasPressed));
        if (clicked || kb.presses('space')) {
            goToStage2();
        } else if (kb.presses('r')) {
            cursor('default');
            currentStage = 1;
            startGame();
        }
    } else {
        // 全ステージ（海）クリア時
        fill('#feca57');
        textSize(44);
        textStyle(BOLD);
        text('★ ALL STAGES CLEAR! ★', width / 2, height / 2 - 60);

        fill('#ffffff');
        textSize(18);
        textStyle(NORMAL);
        text('STAGE 1 と STAGE 2 をクリア！ 🎉', width / 2, height / 2 - 15);
        cursor('default');
        if (kb.presses('space')) {
            goToStage1();
        }
    }
}

function startGame() {
    cursor('default');
    gameState = 'PLAY';
    collectedCoins = 0;
    stage2CoinStartFrame = null;
    stage2SurgeTriggered = false;
    stage2SurgePhase = null;
    stage2SurgeCycle = 0;
    stage2Switches = null;
    playerLives = maxLives;
    invincibleFrames = 0;
    jumpBuffer = 0;
    coyoteTimer = 0;
    canAirJump = true;
    iceTimer = 0;
    starTimer = 0;
    starSpawned = false;
    starParticles = [];
    bgParticles = [];
    groundWaves = [];
    prevIsGrounded = false;
    prevPlayerVelY = 0;

    allSprites.remove();
    world.gravity.y = 20;
    createGameWorld();
}
