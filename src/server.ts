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

io.sockets.on("connection", (client: any) => {
    console.log("user connected - ", client.id);
    clients[client.id] = {};

    client.send(clients);

    client.on('disconnect', () => {
        delete clients[client.id];

        io.sockets.emit('disconnect', client.id);
    });

    client.broadcast.emit('newConnection', client.id);

    client.on('draw', (data: any) => {
        clients[client.id] = data;
        client.broadcast.emit('draw', clients);
    });
});
