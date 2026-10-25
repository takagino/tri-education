// 要素の取得
const enemyImg = document.getElementById('enemy-img');
const hpDisplay = document.getElementById('hp-display');
const battleMessage = document.getElementById('battle-message');
const attackBtn = document.getElementById('attack-btn');
const resetBtn = document.getElementById('reset-btn');

// 定数・変数の定義
const MAX_HP = 100;
const DAMAGE = 25;
let currentHp = MAX_HP;

// 画像URL
const NORMAL_IMG = 'https://picsum.photos/id/1025/400/250';
const DEFEATED_IMG = 'https://picsum.photos/id/1062/400/250';

// ==========================================
// 1. 「こうげき」ボタンの処理
// ==========================================
attackBtn.addEventListener('click', () => {
  // 1. HPを減らす
  currentHp -= DAMAGE;

  // 2. HPが0未満になったら0にする
  if (currentHp < 0) {
    currentHp = 0;
  }

  // 3. HP数値を画面に反映
  hpDisplay.textContent = `HP: ${currentHp} / ${MAX_HP}`;

  // 4. 残りHPに応じた3パターンの条件分岐
  if (currentHp <= 0) {
    // 討伐完了！
    battleMessage.textContent = 'モンスターをたおした！ゲームクリア！';
    hpDisplay.style.color = '#e74c3c';
    enemyImg.setAttribute('src', DEFEATED_IMG);
    enemyImg.setAttribute('alt', '倒れたモンスター');
    attackBtn.setAttribute('disabled', 'true');

  } else if (currentHp <= 50) {
    // ピンチ状態（50以下）
    battleMessage.textContent = '相手はふらふらだ！あと少し！';
    hpDisplay.style.color = '#e67e22';

  } else {
    // 通常状態
    battleMessage.textContent = '効果的なダメージを与えた！';
    hpDisplay.style.color = '#333333';
  }
});

// ==========================================
// 2. 「もう一度たたかう」ボタンの処理（リセット）
// ==========================================
resetBtn.addEventListener('click', () => {
  currentHp = MAX_HP;

  hpDisplay.textContent = `HP: ${currentHp} / ${MAX_HP}`;
  hpDisplay.style.color = '#333333';
  battleMessage.textContent = '「こうげき」ボタンを押してダメージを与えよう！';

  enemyImg.setAttribute('src', NORMAL_IMG);
  enemyImg.setAttribute('alt', '元気なモンスター');
  attackBtn.removeAttribute('disabled');
});
