/**
 * 第1回：JavaScriptの基礎知識・変数・データ型
 * サンプル＆課題の模範コード
 */

console.log('=== 第1回 JavaScript基礎 講義サンプル ===');

// 1. 変数と定数の宣言（const と let）
const schoolName = 'トライデントコンピュータ専門学校';
const courseName = 'Webデザイン学科';
let currentYear = 1;

console.log(`${schoolName} ${courseName} ${currentYear}年生`);


// 2. データ型と計算の実験
const priceA = 1000;
const priceB = 2500;
console.log('数値同士の足し算:', priceA + priceB); // 3500

const textNumA = '1000';
const textNumB = '2500';
console.log('文字列同士の連結:', textNumA + textNumB); // "10002500"


// 3. 確認課題の解答例（自己紹介 ＆ レシートシミュレーター）
console.log('\n========================================');
console.log('【第1回 確認課題 解答例】');

// 自己紹介データの定義
const myName = 'トライデント 花子';
const myAge = 19;
const goal = 'JavaScriptでかっこいいインタラクティブなWebサイトを作る！';

// お買い物データの定義
const item = 'Webデザインの基本書';
const itemPrice = 2400;
let quantity = 2; // 個数は後から変わる可能性があるため let
const TAX_RATE = 0.1; // 消費税率10%（定数）

// 計算処理
const subtotal = itemPrice * quantity; // 小計
const tax = subtotal * TAX_RATE;       // 消費税額
const total = subtotal + tax;          // 合計金額

// テンプレートリテラルによる出力
console.log(`========================================
【自己紹介】
名前: ${myName}
年齢: ${myAge}歳
後期の目標: ${goal}
========================================
【お買い上げ明細】
商品名: ${item}
単価: ${itemPrice}円
購入数: ${quantity}点
小計: ${subtotal}円
消費税(10%): ${tax}円
合計お支払い金額: ${total}円
========================================`);
