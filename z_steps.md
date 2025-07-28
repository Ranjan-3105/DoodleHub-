---

````markdown
# 🧩 DoodleHub

This is my first work using a **monorepo** and implementing **WebSockets**.  
It is also my **first major project**, and I’ve thoroughly documented all the steps I followed to build it.

---

## 📦 1. Install `pnpm` globally

```bash
npm i -g pnpm
```

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

## 🔌 7. Initialize the http and WebSocket Servers

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

wss.on("connection", function connection(ws, request) {
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

```

---

10. Then to extract a queryParameter we use the following chunk of code:
// ws/index.ts
 const url = request.url; // ws://localhost:3000?token=123123
  if (!url) {
    return;
  }
  const queryParam = new URLSearchParams(url.split("?")[1]);
  // => ["ws://localhost:3000", "token=123123"] => queryParam = "token=123123"
  const token = queryParam.get("token");

11.  gate the HTTP servers
12.  gate the ws servers
13.Create a DB package
14. use the DB package in the HTTP layer.
```
