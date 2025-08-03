import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws, request) {
  const url = request.url; // ws://localhost:3000?token=123123
  if (!url) {
    return;
  }
  const queryParam = new URLSearchParams(url.split("?")[1]);
  // => ["ws://localhost:3000", "token=123123"] => queryParam = "token=123123"
  const token = queryParam.get("token") || "";
  const decoded = jwt.verify(token,JWT_SECRET);

  if( typeof decoded === "string"){
    ws.close();
    return;
  }

  if( !decoded || !( decoded ).userId ) {
    ws.close();
    return;
  }

  ws.on("message", function message(data) {
    ws.send("pong");
  });
});
