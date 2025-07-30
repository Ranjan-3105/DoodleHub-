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

## 🔧 5. Add scripts and compiler options

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

> You will need to fix the type error in Express:
> `req.userId = decoded.userId` is not recognized unless you extend the Request type.

10. gate create room endpoint
    const userId = 1;
    const token = jwt.sign({ userId }, JWT_SECRET);
    res.json({ token });

11.gate WebSocket server using token
const url = request.url; // ws://localhost:3000?token=123123
if (!url) {
return;
}
const queryParam = new URLSearchParams(url.split("?")[1]);
// => ["ws://localhost:3000", "token=123123"] => queryParam = "token=123123"
const token = queryParam.get("token") || "";
const decoded = jwt.verify(token,JWT_SECRET);
if( !decoded || !(decoded as JwtPayload).userId ) {
ws.close();
return;
}

12.create a backend common {add npm init -y , tsconfig.json,  dev dependencies update, JWT_SECRET in src/index.ts , add export in package.json}
//package.json
"exports": {
    "./config": "./src/index.ts"
  },

13. Create a common zod Schema{ npm init -y , pnpm add zod  , add tsconfig , add to devDependencies, write the zod schema in src/types.ts and add a export in packages.}
//types.ts
import { z } from "zod";

export const CreateUserSchema = z.object({
    username : z.string().min(3).max(20),
    password: z.string(),
    name: z.string
})

export const SignInSchema = z.object({
    username : z.string().min(3).max(20),
    password: z.string()
})

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20)
})

// package.json
"exports": {
    "./types": "./src/types.ts"
  }

  14. import zod schema in http backend as a gatepoint ( for all CreateUserSchema , SignInSchema , CreateRoomSchema ) eg:
  const data = CreateUserSchema.safeParse(req.body);
  if( !data ) {
    res.json({
      "message" : "incorrect credentials"
    })
    return;
  }

  15. Add DB 
  create db dir -> npm init -y -> create tsconfig.json -> complete extend and adding depemndencies -> pnpm install prisma -> npx prisma init -> this creates a schema.prisma file -> make a schema table for user chat and room for eg :

model User {
  id       String @id @default(uuid())
  email    String
  password String
  name     String
  photo    String
  rooms    Room[]
  chat     Chat[]
}

model Room {
  id        Int      @id @default(autoincrement())
  slug      String   @unique
  createdAt DateTime @default(now())
  adminId   String
  admin     User     @relation(fields: [adminId] , references: [id])
  chats     Chat[]
}

model Chat {
  id      Int    @id @default(autoincrement())
  roomId  Int
  message String
  userId  String
  room    Room      @relation(fields: [roomId] , references: [id])
  user    User      @relation(fields: [userId] , references: [id])
}

