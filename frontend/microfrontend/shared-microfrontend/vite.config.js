import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(() => ({
  server: {
    origin: "http://localhost:2006",
    port: 2006,
    fs: { allow: [".", "../shared"] },
  },
  build: {
    target: "chrome89",
  },
  plugins: [
    federation({
      filename: "remoteEntry.js",
      name: "remote",
      exposes: {
        "./CurrentUserContext": "./src/contexts/CurrentUserContext",
      },
      remotes: {},
      shared: {
        react: {
          requiredVersion: dependencies.react,
          singleton: true,
        },
      },
    }),
    react(),
  ],
}));
