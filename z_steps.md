This is my first work in monorepo and websocket implemetataion. prolly this is my first major project. I have thoroughly written all the steps followed to make the project.

1. first we install pnpm which is to be used here { npm i -g pnpm } .

2. create a turborepo . { npx create-turbo@ latest }

3. choose pnpm as the package manager. and then deleted the not required docs dir. rather created two more dir for backend i.e. ( http_backend & ws_backend ).

4. made the json files in both the backend. { npm init -y }

5. made tsconfig files and instead of copying from packages base.json I used extends property. for this the you have to add dependencies to respected package.json.

//tsconfig.json
{
    "extends" : "@repo/typescript-config/base.json",
}

//package.json
"dependencies": {
    "@repo/typescript-config": "workspace:*" 
  },

<!-- make sure to pnpm i and click on the hyperlink to check. -->

6. make build start and dev scripts and include rootdir and outdir :

//package.json
{
  "build": "tsc -b",
    "start": "node dist/index.js",
    "dev": "ts-node src/index.ts"
}

//tsconfig
"compilerOptions": {
        "rootDir": "./src",
        "outDir": "./dist"
    }

7. update the turbo-config in both the projects.

//turbo.json
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