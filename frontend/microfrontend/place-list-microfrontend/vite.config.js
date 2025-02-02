import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { dependencies } from './package.json';

export default defineConfig(() => ({
  server: {
    origin: "http://localhost:2003",
    port: 2003,
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
        "./Card": "./src/components/Card/Card",
        "./Main": "./src/components/Main/Main",
        "./ImagePopup": "./src/components/ImagePopup/ImagePopup",
        "./PopupWithForm": "./src/components/PopupWithForm/PopupWithForm",
        "./AddPlacePopup": "./src/components/AddPlacePopup/AddPlacePopup",
      },
      remotes: {
        sharedContext: {
          type: 'module',
					name: 'sharedContext',
					entry: 'http://localhost:2006/remoteEntry.js',
					entryGlobalName: 'sharedContext',
					shareScope: 'default',
        }
      },
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
