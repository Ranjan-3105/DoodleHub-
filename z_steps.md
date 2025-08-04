````markdown
# 🧩 DoodleHub

This is my first work using a **monorepo** and implementing **WebSockets**.  
It is also my **first major project**, and I’ve thoroughly documented all the steps I followed to build it.

---

## 📦 1. Install `pnpm` globally

```bash
npm i -g pnpm
```
````

---

## 🧱 2. Create a Turborepo

```bash
npx create-turbo@latest
```

- Choose `pnpm` as the package manager.
- Delete the unneeded `docs` directory.
- Create two directories for the backend:

```bash
mkdir http_backend ws_backend
```

---

## 📂 3. Initialize both backends

```bash
npm init -y
```

Do this inside both `http_backend/` and `ws_backend/`.

---

## ⚙️ 4. Create `tsconfig.json` and use `extends` from shared config

**tsconfig.json**

```json
{
  "extends": "@repo/typescript-config/base.json"
}
```

**package.json**

```json
{
  "dependencies": {
    "@repo/typescript-config": "workspace:*"
  }
}
```

> Make sure to run `pnpm install` and click the hyperlink in VS Code to verify the import.

---

## 🔧 5. Add scripts and compiler options in both (build, dev , start)

**package.json**

```json
{
  "scripts": {
    "build": "tsc -b",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
  }
}
```

**tsconfig.json**

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist"
  }
}
```

---

## 🌀 6. Update `turbo.json` config

```json
{
  "pipeline": {
    "dev": {
      "cache": false,
      "persistent": true,
      "dependsOn": ["^dev"]
    },
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": ["dist/**", "build/**"]
    },
    "start": {
      "dependsOn": ["^build"],
      "cache": false
    }
  }
}
```

---

## 🔌 7. Boilerplate code for servers

**http_backend/src/index.ts**

```ts
import express from "express";

const app = express();

app.listen(3001); // make sure to use a different port for each
```

**ws_backend/src/index.ts**

```ts
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(msg) {
    console.log("received: %s", msg);
    ws.send("pong");
  });
});
```

---

## 🔐 8. Add Signup, Signin, and Room routes

```ts
app.post("/signup", (req, res) => {
  res.json({
    userId: "123",
  });
});

app.post("/signin", (req, res) => {
  const userId = 1;
  const token = jwt.sign({ userId }, JWT_SECRET);
  res.json({ token });
});

app.post("/room", middleware, (req, res) => {
  // db call
  res.json({
    roonId: 123123,
  });
});
```

---

## 🛡️ 9. Create `middleware.ts`

```ts
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

export default function middleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"] ?? "";

  const decoded = jwt.verify(token, JWT_SECRET);

  if (decoded) {
    req.userId = decoded.userId;
    next();
  } else {
    res.status(403).json({
      message: "unauthorised",
    });
  }
}
```
```md
> You will need to fix the type error in Express:
> `req.userId = decoded.userId` is not recognized unless you extend the Request type.
```

### 10. Gate Create Room Endpoint

```ts
const userId = 1;
const token = jwt.sign({ userId }, JWT_SECRET);
res.json({ token });
```

### 11. Gate WebSocket Server Using Token

```ts
const url = request.url; // ws://localhost:3000?token=123123
if (!url) {
  return;
}
const queryParam = new URLSearchParams(url.split("?")[1]);
const token = queryParam.get("token") || "";
const decoded = jwt.verify(token, JWT_SECRET);
if (!decoded || !(decoded as JwtPayload).userId) {
  ws.close();
  return;
}
```

### 12. Create a Backend Common (JWT)

* `npm init -y`
* Add `tsconfig.json`
* Add dev dependencies
* Add `JWT_SECRET` in `src/index.ts`

```ts
// package.json
"exports": {
  "./config": "./src/index.ts"
}
```

### 13. Create a Common Zod Schema (for both HTTP and WS backend)

* `npm init -y`
* `pnpm add zod`
* Add `tsconfig.json`
* Add to `devDependencies`

```ts
// types.ts
import { z } from "zod";

export const CreateUserSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string(),
  name: z.string
});

export const SignInSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string()
});

export const CreateRoomSchema = z.object({
  name: z.string().min(3).max(20)
});
```

```ts
// package.json
"exports": {
  "./types": "./src/types.ts"
}
```

### 14. Import Zod Schema in HTTP Backend as a Gatepoint

```ts
const data = CreateUserSchema.safeParse(req.body);
if (!data) {
  res.json({
    "message": "incorrect credentials"
  });
  return;
}
```

### 15. Add DB

* Create `db` dir
* `npm init -y`
* Create `tsconfig.json`
* Add dependencies
* `pnpm install prisma`
* `npx prisma init`

```prisma
// schema.prisma
model User {
  id      String @id @default(uuid())
  email   String
  password String
  name     String
  photo    String
  rooms    Room[]
  chat     Chat[]
}

model Room {
  id        Int @id @default(autoincrement())
  slug      String @unique
  createdAt DateTime @default(now())
  adminId   String
  admin     User @relation(fields: [adminId], references: [id])
  chats     Chat[]
}

model Chat {
  id      Int @id @default(autoincrement())
  roomId  Int
  message String
  userId  String
  room    Room @relation(fields: [roomId], references: [id])
  user    User @relation(fields: [userId], references: [id])
}
```

### 16. Setup Neon DB or Local

```sh
npx prisma migrate dev --name init_schema
npx prisma generate
```

### 17. Using the DB Package

```ts
// package.json in db
"exports": {
  "./client": "./src/index.ts"
}
```

* Add db dependency in http package

### 18. Complete HTTP Backend

* Add DB calls to endpoints
* Regularly generate schema

### 19. Fix Prisma Module Error

```sh
# Remove migrated/generated directories
npx prisma migrate dev --name init_schema
pnpm i .
```

### 20. TypeScript Error

```ts
// @ts-ignore: TODO: Fix this
```

---

### 21. **Most Important Part: The WS Server**

* Clean the code
* Make a stateful backend using:

  * Brute-force array/object
  * Redux toolkit (complex but optimal)
  * Singleton (better alternative)

```ts
interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}

const users: User[] = [];
```

#### Sample `users` Array

```ts
[
  { userId: "123123", room: ["room1", "room2"], ws: socket },
  { userId: "234234", room: ["room1"], ws: socket }
]
```

#### On Message Handling

```ts
// Sample message
{ type: "join_room", roomId: 2 }
```

##### Join Room

```ts
if (parsedData.type === "join_room") {
  const user = users.find((user) => user.ws === ws);
  user?.rooms.push(parsedData.roomId);
}
```

##### Leave Room

```ts
if (parsedData.type === "leave_room") {
  const user = users.find((user) => user.ws === ws);
  if (!user) return;
  user.rooms = user.rooms.filter((roomId) => roomId !== parsedData.roomId);
}
```

##### Chat

```ts
if (parsedData.type === "chat") {
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
    if (user.rooms.includes(roomId)) {
      user.ws.send(
        JSON.stringify({
          type: "chat",
          message: message,
          roomId,
        })
      );
    }
  });
}
```
## Backend Completes here !


  
