import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
    ws.on("message", function message(msg) {
        console.log("received: %s", msg);
        ws.send('pong');
    });
}); 
