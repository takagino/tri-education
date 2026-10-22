const area = document.querySelector('#area');
const btn = document.querySelector('#btn');
const result = document.querySelector('#result');
let num = 10;
let currentNum = 0;
let startTime;
let isPlaying = false;

result.textContent = `${currentNum} / ${num}`;

function setTarget() {
    for (let i = 0; i < num; i++) {
        const div = document.createElement('div');
        div.classList.add("target");
        div.style.top = `${Math.floor(Math.random() * 400) + 50}px`;
        div.style.left = `${Math.floor(Math.random() * 400) + 50}px`;
        div.addEventListener('click', (e) => {
            clickTarget(div);
        })
        area.appendChild(div);
    }
}

function clickTarget(target) {
    target.remove();
    currentNum++;
    result.textContent = `${currentNum} / ${num}`;

    if (currentNum === num) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        result.textContent = `Finished! ${elapsedTime} seconds!`;
    }
}

document.addEventListener('click', () => {
    if (isPlaying === true) {
        return;
    }

    isPlaying = true;
    startTime = Date.now();
    setTarget();
});