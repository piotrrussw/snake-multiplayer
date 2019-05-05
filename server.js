"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const socket = require("socket.io");
const path = require("path");
const app = express();
app.set("port", process.env.PORT || 3000);
app.use("/public", express.static(path.join(__dirname + "/public")));
app.get("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
});
const server = app.listen(process.env.PORT || 3000, function () {
    console.log(`listening on *:${process.env.PORT || 3000}`);
});
const io = socket(server);
let clients = {};
let food = null;
let highScore = 0;
io.sockets.on("connection", (client) => {
    console.log("user connected - ", client.id, clients);
    client.send(clients, food, highScore);
    clients[client.id] = {};
    client.on('disconnect', () => {
        delete clients[client.id];
        io.sockets.emit('disconnect', client.id);
    });
    client.broadcast.emit('newConnection', client.id);
    client.on('move', (data) => {
        clients[client.id] = data;
        client.broadcast.emit('move', data, client.id);
    });
    client.on('food', (data) => {
        food = data;
        client.broadcast.emit('food', data);
    });
    client.on('highScore', (score) => {
        if (score > highScore) {
            highScore = score;
            client.broadcast.emit('highScore', highScore);
        }
    });
});
