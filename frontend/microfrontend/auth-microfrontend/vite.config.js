import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { dependencies } from "./package.json";

export default defineConfig(() => ({
  server: {
    origin: "http://localhost:2002",
    port: 2002,
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
        "./Login": "./src/components/Login/Login",
        "./Register": "./src/components/Register/Register",
      },
      remotes: {
        // sharedContext: {
        //   type: 'module',
				// 	name: 'sharedContext',
				// 	entry: 'http://localhost:2006/remoteEntry.js',
				// 	entryGlobalName: 'sharedContext',
				// 	shareScope: 'default',
        // }
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    }),
    react(),
  ],
}));