const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const index = fs.readFileSync('./view/index.html', 'utf-8');
const images = [
    fs.readFileSync("./view/images/neko00.jpg", "binary"),
    fs.readFileSync("./view/images/neko01.jpg", "binary"),
    fs.readFileSync("./view/images/neko02.jpg", "binary")
];

const server = http.createServer((req, res) => {
    switch (req.url) {
        case '/':
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(index);
            break;
        case '/images/neko00.jpg':
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(images[0], "binary");
            break;
        case '/images/neko01.jpg':
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(images[1], "binary");
            break;
        case '/images/neko02.jpg':
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(images[2], "binary");
            break;
    }
});

const five = require('johnny-five');
const board = new five.Board();

board.on("ready", () => {
    console.log("Arduino ready!");

    const sensor = new five.Sensor("A0");
    let val = 0;
    const filter = 0.1;

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);

        const io = require("socket.io")(server);

        io.on("connection", socket => {
            console.log(`Connection completed!`);

            sensor.on("change", () => {
                val = (1 - filter) * val + sensor.value * filter;
                io.emit('sensor_value', Math.floor(val));
            });
        });
    });
});