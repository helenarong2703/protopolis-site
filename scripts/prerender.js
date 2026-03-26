/**
 * Post-build pre-rendering script.
 * Launches a local server, visits each route with Puppeteer,
 * and saves the fully rendered HTML to dist/.
 */
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, extname } from "path";
import puppeteer from "puppeteer";

const DIST = join(import.meta.dirname, "..", "dist");
const PORT = 4173;

// All routes to pre-render
const ROUTES = ["/", "/dao-of-the-dao"];

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".pdf": "application/pdf",
};

// Simple static file server for dist/
function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === "/" ? "index.html" : req.url);

      // SPA fallback: if file doesn't exist and no extension, serve index.html
      if (!existsSync(filePath) && !extname(filePath)) {
        filePath = join(DIST, "index.html");
      }

      try {
        const data = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, {
          "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
        });
        res.end(data);
      } catch {
        res.writeHead(404);
        res.end("Not found");
      }
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function prerender() {
  console.log("Starting pre-render...");
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true });

  for (const route of ROUTES) {
    console.log(`  Rendering ${route}...`);
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, {
      waitUntil: "networkidle0",
    });

    // Wait for the loading screen to finish (the app sets loaded=true)
    await page.waitForSelector(".app", { timeout: 10000 });

    // Small extra wait for animations to settle
    await new Promise((r) => setTimeout(r, 500));

    const html = await page.content();

    // Determine output path
    const outDir =
      route === "/"
        ? DIST
        : join(DIST, route);
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }
    writeFileSync(join(outDir, "index.html"), html);
    console.log(`  Saved ${join(outDir, "index.html")}`);
    await page.close();
  }

  await browser.close();
  server.close();
  console.log("Pre-render complete!");
}

prerender().catch((err) => {
  console.error("Pre-render failed:", err);
  process.exit(1);
});
