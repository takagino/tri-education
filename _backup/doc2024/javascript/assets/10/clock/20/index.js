//玉を装填する関数
const createBullet = (elemName, className) => {
    const makeArea = document.querySelector("body");
    const newElem = document.createElement(elemName);
    newElem.classList.add(className);
    makeArea.appendChild(newElem);
    return newElem;
}

//時計
const clock = () => {
    const d = new Date();

    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();

    let dayNum = d.getDay();
    const weekday = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let day = weekday[dayNum];

    let hour = d.getHours();
    let min = d.getMinutes();
    let sec = d.getSeconds();

    // 1桁の場合は0を足して2桁に 月も日も秒も全て
    month = month < 10 ? "0" + month : month;
    date = date < 10 ? "0" + date : date;
    hour = hour < 10 ? "0" + hour : hour;
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;


    // 日付・時刻の文字列を作成
    let today = `${year}.${month}.${date} ${day}`;
    let time = `${hour}:${min}:${sec}`;

    // 文字列を出力
    document.querySelector(".clock-date").innerText = today;
    document.querySelector(".clock-time").innerText = time;

    setTimeout(clock, 1000 - d.getMilliseconds());

    //ぷるんと上下に移動
    const tremble = document.querySelector(".clock-time");
    gsap.fromTo(tremble,
        {
            yPercent: 0,
        },
        {
            yPercent: -10,
        }
    )

    //カチカチ音再生
    let audio = new Audio("./audio/tick.mp3");
    audio.play();

    // let makeBullet;
    // makeBullet = createBullet("span", "bullet");
}
clock();

// const bullet = document.querySelectorAll(".bullet");
//todo 要素のqsaを別スコープで使えるようにする


//------------------------------------------------------------------------------------------
//todo 関数

// player
const player = document.querySelector(".player");

// 移動速度
let pVel_Right = 10;
let pVel_Left = -10;
let pPosX = 0;

let pVel_Bottom = 10;
let pVel_Top = -10;
let pPosY = 0;

//キーボード操作を判定
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            console.log("上");
            pPosY += pVel_Bottom;
            gsap.to(player, {
                "--posY-bottom": pPosY,
            })
            break;
        case "ArrowDown":

            pPosY += pVel_Top;
            gsap.to(player, {
                "--posY-bottom": pPosY,
            })
            break;
        case "ArrowRight":
            console.log("右");

            //右へ移動
            pPosX += pVel_Left;
            gsap.to(player, {
                "--posX-right": pPosX,
                ease: "none",
            });
            break;

        case "ArrowLeft":
            console.log("左");
            //左へ移動
            pPosX += pVel_Right;
            gsap.to(player, {
                "--posX-right": pPosX,
                ease: "none",
            });
            break
    }
});

//座標を得られる処理
document.body.addEventListener("click", drop, false);
function drop(e) {
    //座標の取得
    let x = e.pageX;
    let y = e.pageY;

    // //しずくになるdivの生成、座標の設定
    // let click = document.createElement("div");
    // click.style.top = y + "px";
    // click.style.left = x + "px";
    // document.body.appendChild(click);

    // //アニメーションをする className を付ける
    // click.className = "click";

    // //アニメーションが終わった事を感知してしずくを remove する
    // click.addEventListener("animationend", function () {
    //     this.parentNode.removeChild(this);
    // }, false);
}

//!ファーストビューの波紋アニメーション
$(".container").ripples({
    dropRadius: 10,
    perturbance: 0,
    resolution: 300,
});