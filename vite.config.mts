import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";
import Terminal from "vite-plugin-terminal";

import bodyParser from "body-parser";
import mockServer from "vite-plugin-mock-server";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
    Terminal({
      output: ["terminal", "console"],
    }),
    mockServer({
      logLevel: "off",
      middlewares: [
        bodyParser.json(),
        bodyParser.urlencoded(),
        bodyParser.text(),
        bodyParser.raw(),
        // optional trailing slash
        (req, res, next) => {
          const split = req.url?.split("?");
          const path = split?.at(0) || "";
          req.url = req.url?.replace(path, path.replace(/\/$/, ""));
          next();
        },
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
