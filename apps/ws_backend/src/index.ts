import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }
  return null;
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws,
  });

  ws.on("message", async function message(data) {
    const parsedData = JSON.parse(data as unknown as string); // { type : "join_room", roomId : 1 }

    if (parsedData.type === "join_room") {
      // { type : "join_room", roomId : 1 }
      const user = users.find((user) => user.ws === ws);
      user?.rooms.push(parsedData.roomId);
      // when an user sends a join room req we find the user and then pass the roomId on the message to his rooms array
    }
    if (parsedData.type === "leave_room") {
      // { type : "leave_room", roomId : 1 }
      const user = users.find((user) => user.ws === ws);
      if (!user) return;
      user.rooms = user.rooms.filter((roomId) => roomId !== parsedData.roomId);
      // when an user sends a leave room req we find the user and then filter the roomId on the message to his rooms array.
    }
    if (parsedData.type === "chat") {
      // { type : "chat", message : "hello!", roomId : 1 }
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      await prismaClient.chat.create({
        data: {
          userId,
          message,
          roomId,
        },
      });

      users.forEach((user) => {
        if (user.rooms.includes(roomId))
          user.ws.send(
            JSON.stringify({
              type: "chat",
              message: message,
              roomId,
            })
          );
      });
    }
  });
});
