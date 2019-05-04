import * as express from "express";
import * as socket from "socket.io";
import * as path from "path";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use("/public", express.static(path.join(__dirname + "/public")));

app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("public/index.html"));
});

const server = app.listen(3000, function() {
    console.log("listening on *:3000");
});

const io = socket(server);
let clients: any = {};
let food: any = null;
let highScore: number = 0;

io.sockets.on("connection", (client: any) => {
    console.log("user connected - ", client.id, clients);
    client.send(clients, food);
    clients[client.id] = {};

    client.on('disconnect', () => {
        delete clients[client.id];

        io.sockets.emit('disconnect', client.id);
    });

    client.broadcast.emit('newConnection', client.id);

    client.on('move', (data: any) => {
        clients[client.id] = data;

        client.broadcast.emit('move', data, client.id);
    });

    client.on('food', (data: any) => {
        food = data;
        client.broadcast.emit('food', data);
    });

    client.on('highScore', (score: number) => {
        if (score > highScore) {
            highScore = score;
            client.broadcast.emit('highScore', highScore);
        }
    });
});
