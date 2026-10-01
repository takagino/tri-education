fetch('https://weather.tsukumijima.net/api/forecast/city/230010')
  .then((response) => response.json())
  .then((data) => {
    console.log(data.title);
    const title = document.querySelector('#title');
    title.textContent = data.title;
  });
