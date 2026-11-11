/// <reference types="vitest" />
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const SOURCE_INDEX_HTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Gravity of Uci.</title>
    <meta name="description" content="A private interactive cosmic birthday film for Uci." />
    <meta name="robots" content="noindex, nofollow, noarchive" />
    <meta name="theme-color" content="#040407" />
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
    <link rel="alternate icon" type="image/x-icon" href="./favicon.ico" />

    <!-- Google Fonts Preconnect and Link -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;600;700&family=Great+Vibes&family=Caveat:wght@400..700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />

    <style>
      /* Immediate dark background to prevent any white flash */
      html, body {
        background-color: #040407;
        color: #F5EBDD;
        margin: 0;
        padding: 0;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`;

/**
 * Ensures index.html uses /src/main.tsx during Vite dev/build, and after build
 * syncs the compiled bundle (index.html, assets/, favicon, .nojekyll, media/)
 * to the repository root so GitHub Pages works out-of-the-box whether deployed
 * from the main branch root or via GitHub Actions.
 */
function githubPagesRootSyncPlugin(): Plugin {
  const rootDir = __dirname;
  const indexHtmlPath = path.resolve(rootDir, 'index.html');

  return {
    name: 'github-pages-root-sync',
    configureServer(server) {
      // During dev server (npm run dev), always serve the source HTML with /src/main.tsx
      // so Vite never parses compiled production assets
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];
        if (url === '/' || url === '/index.html') {
          try {
            const transformed = await server.transformIndexHtml(req.url || '/', SOURCE_INDEX_HTML);
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(transformed);
            return;
          } catch (err) {
            return next(err);
          }
        }
        next();
      });
    },
    config(_, { command }) {
      if (process.env.VITEST) return;
      if (command !== 'build') return;
      // Always ensure Vite sees the source entry point before build starts
      if (fs.existsSync(indexHtmlPath)) {
        const current = fs.readFileSync(indexHtmlPath, 'utf-8');
        if (!current.includes('/src/main.tsx')) {
          fs.writeFileSync(indexHtmlPath, SOURCE_INDEX_HTML, 'utf-8');
        }
      } else {
        fs.writeFileSync(indexHtmlPath, SOURCE_INDEX_HTML, 'utf-8');
      }
    },
    closeBundle() {
      const distDir = path.resolve(rootDir, 'dist');
      const distIndex = path.resolve(distDir, 'index.html');
      const distAssets = path.resolve(distDir, 'assets');
      const rootAssets = path.resolve(rootDir, 'assets');

      if (!fs.existsSync(distIndex)) return;

      // 1. Copy compiled dist/index.html to root index.html so GitHub Pages branch deploy serves compiled JS
      fs.copyFileSync(distIndex, indexHtmlPath);

      // 2. Sync dist/assets to root ./assets
      if (fs.existsSync(distAssets)) {
        if (fs.existsSync(rootAssets)) {
          fs.rmSync(rootAssets, { recursive: true, force: true });
        }
        fs.cpSync(distAssets, rootAssets, { recursive: true });
      }

      // 3. Sync static root files (favicon.ico, favicon.svg, .nojekyll, media/)
      for (const file of ['favicon.ico', 'favicon.svg', '.nojekyll']) {
        const srcFile = path.resolve(distDir, file);
        const destFile = path.resolve(rootDir, file);
        if (fs.existsSync(srcFile)) {
          fs.copyFileSync(srcFile, destFile);
        }
      }

      for (const dirName of ['media', 'audio', 'photos']) {
        const distFolder = path.resolve(distDir, dirName);
        const rootFolder = path.resolve(rootDir, dirName);
        if (fs.existsSync(distFolder)) {
          fs.cpSync(distFolder, rootFolder, { recursive: true, force: true });
        }
      }
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [githubPagesRootSyncPlugin(), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['tests/unit/**/*.{test,spec}.{ts,tsx}'],
  },
});
