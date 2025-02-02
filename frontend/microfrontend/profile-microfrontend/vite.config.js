import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { dependencies } from './package.json';

export default defineConfig(() => ({
  server: {
    origin: "http://localhost:2005",
    port: 2005,
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
        "./EditAvatarPopup": "./src/components/EditAvatarPopup/EditAvatarPopup",
        "./EditProfilePopup": "./src/components/EditProfilePopup/EditProfilePopup",
        "./ProfileHeaderMenu": "./src/components/ProfileHeaderMenu/ProfileHeaderMenu",
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