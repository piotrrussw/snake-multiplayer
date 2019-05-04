import * as express from "express";
import * as socketIo from "socket.io";
import * as path from "path";
import * as Http from "http";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use("/public", express.static(path.join(__dirname + "/public")));

const http = new Http.Server(app);
const io = socketIo(http);

app.get("/", (req: any, res: any) => {
    res.sendFile(path.resolve("public/index.html"));
});

io.on("connection", (socket: any) => {
    console.log("a user connected", socket);
});

app.listen(3000, function() {
    console.log("listening on *:3000");
});
