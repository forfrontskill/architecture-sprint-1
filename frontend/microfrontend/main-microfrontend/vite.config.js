import { federation } from '@module-federation/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { dependencies } from './package.json';

export default defineConfig(() => ({
	server: {
    origin: 'http://localhost:2000',
    port: 2000,
    fs: { allow: ['.', '../shared'] } },
	build: {
		target: 'chrome89',
	},
	plugins: [
		federation({
			name: 'host',
			remotes: {
				remote: {
					type: 'module',
					name: 'remote',
					entry: 'http://localhost:2001/remoteEntry.js',
					entryGlobalName: 'remote',
					shareScope: 'default',
				},
        auth: {
					type: 'module',
					name: 'auth',
					entry: 'http://localhost:2002/remoteEntry.js',
					entryGlobalName: 'auth',
					shareScope: 'default',
				},
        placeList: {
					type: 'module',
					name: 'placeList',
					entry: 'http://localhost:2003/remoteEntry.js',
					entryGlobalName: 'placeList',
					shareScope: 'default',
				},
		profile: {
					type: 'module',
					name: 'profile',
					entry: 'http://localhost:2005/remoteEntry.js',
					entryGlobalName: 'profile',
					shareScope: 'default',
				},
        sharedContext: {
          type: 'module',
					name: 'sharedContext',
					entry: 'http://localhost:2006/remoteEntry.js',
					entryGlobalName: 'sharedContext',
					shareScope: 'default',
        }
			},
			exposes: {},
			filename: 'remoteEntry.js',
			shared: ['react', 'react-dom', 'react-router-dom']
		}),
		react(),
	],
}));