const btn = document.getElementById('btn');
const menu = document.getElementById('menu');

btn.addEventListener('click', function () {
  if (menu.classList.contains('open')) {
    menu.classList.remove('open');
    btn.innerHTML = 'メニュー';
  } else {
    menu.classList.add('open');
    btn.innerHTML = '閉じる';
  }
});
