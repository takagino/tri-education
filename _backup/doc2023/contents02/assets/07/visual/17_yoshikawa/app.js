/* app.js */
const fs = require("fs");
const http = require("http");

const hostname = "127.0.0.1";
const port = 3000;

const index = fs.readFileSync("./index.html", "utf-8");
const audio = fs.readFileSync("./Wind_of_Wilderness.mp3"); //ファイルの読み込み設定

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(index);
  } else if (pathName === "/Wind_of_Wilderness.mp3") {
    //MP3のパスを追加
    res.writeHead(200, {
      "Content-type": "audio/mpeg",
    });
    res.end(audio);
  } else {
    res.writeHead(404);
    res.end("Not Found...");
  }
});
const five = require("johnny-five");
const board = new five.Board();

/* 以下、変更 */
board.on("ready", () => {
  console.log("Arduino ready!");

  const sensor = new five.Sensor({
    pin: "A0",
    freq: 30,
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    const io = require("socket.io")(server);

    io.on("connection", (socket) => {
      console.log(`Connection completed!`);

      sensor.on("change", () => {
        io.emit("sensor_value", sensor.value);
      });
    });
  });
});
