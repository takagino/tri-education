const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const index = fs.readFileSync('./view/index.html', 'utf-8');

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'text/html'
    });
    res.end(index);
});

const five = require('johnny-five');
const board = new five.Board();

board.on("ready", () => {
    console.log("Arduino ready!");

    const sensor1 = {
        pin: "A0",
        freq: 50
    };
    const sensor2 = {
        pin: "A1",
        freq: 50
    };
    const sensor = new five.Sensors([sensor1, sensor2]);
    // const sensor = new five.Sensors(["A0", "A1"]);

    let val = [0, 0];
    const filter = 0.1;

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);

        const io = require("socket.io")(server);

        io.on("connection", socket => {
            console.log(`Connection completed!`);

            sensor[0].on("data", () => {
                val[0] = (1 - filter) * val[0] + sensor[0].value * filter;
                val[1] = (1 - filter) * val[1] + sensor[1].value * filter;

                io.emit('sensor_value', {
                    "A0": Math.floor(val[0]),
                    "A1": Math.floor(val[1])
                });
            });
        });
    });
});