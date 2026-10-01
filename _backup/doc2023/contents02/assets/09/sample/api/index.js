const fs = require('fs');
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const index = fs.readFileSync('./view/index.html', 'utf-8');
const data = JSON.parse(fs.readFileSync('./view/data.json', 'utf-8'));

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

    const buttons = new five.Buttons([2, 4, 7]);

    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);

        const io = require("socket.io")(server);

        io.on("connection", socket => {
            console.log(`Connection completed!`);

            buttons.forEach((button, index) => {
                button.on("press", function () {
                    io.emit('button_value', data[index]);
                });
            });
        });
    });
});