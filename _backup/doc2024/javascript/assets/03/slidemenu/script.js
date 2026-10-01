const btn = document.getElementById('btn');
const menu = document.getElementById('menu');

btn.addEventListener('click', function () {
  menu.classList.toggle('open');
});
