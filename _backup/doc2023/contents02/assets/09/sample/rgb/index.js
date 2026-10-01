const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const index = fs.readFileSync('./view/index.html', 'utf-8');

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
});

const five = require('johnny-five');
const board = new five.Board();

board.on("ready", () => {
  console.log("Arduino ready!");

  const joystick = new five.Joystick({
    pins: ["A0", "A1"],
    freq: 2000
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);

    const io = require("socket.io")(server);

    io.on("connection", socket => {
      console.log(`Connection completed!`);

      joystick.on("data", value => {
        io.emit('sensor_value', value);
      });
    });
  });
});