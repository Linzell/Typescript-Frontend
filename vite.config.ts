import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import oxlintPlugin from "vite-plugin-oxlint";
import path from 'path';

// https://vite.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    oxlintPlugin({
      configFile: ".oxlintrc.json",
    }),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
}));
