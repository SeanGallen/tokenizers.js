import "dotenv/config";
import { build } from "esbuild";
import { watch, createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { join, extname } from "node:path";
import { execSync } from "child_process";

const PORT = process.env.PORT || 8081;
const DIST_DIR = "dist";

const baseConfig = {
  bundle: true,
  minify: false,
  minifySyntax: true,
  treeShaking: true,
  logLevel: "info",
  entryPoints: ["src/index.ts"],
};

async function buildAll() {
  console.log("Building...");
  try {
    // Generate TypeScript declarations
    execSync("tsc -p tsconfig.build.json", { stdio: "inherit" });

    await build({
      ...baseConfig,
      platform: "neutral",
      format: "esm",
      outfile: "dist/tokenizers.mjs",
    });

    console.log("✓ Build complete");
  } catch (error) {
    console.error("✗ Build failed:", error);
  }
}

// Initial build
await buildAll();

// Watch for changes
let timeout;
watch("src", { recursive: true }, (eventType, filename) => {
  if (filename) {
    console.log(`File changed: ${filename}`);
    clearTimeout(timeout);
    timeout = setTimeout(buildAll, 100);
  }
});

// Static file server
const mimeTypes = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".mjs": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".wasm": "application/wasm",
};

const server = createServer((req, res) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
  };

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  let filePath = join(DIST_DIR, req.url === "/" ? "index.html" : req.url);

  try {
    const stat = statSync(filePath);
    if (stat.isDirectory()) {
      filePath = join(filePath, "index.html");
    }

    const ext = extname(filePath);
    const contentType = mimeTypes[ext] || "application/octet-stream";

    res.writeHead(200, { ...corsHeaders, "Content-Type": contentType });
    createReadStream(filePath).pipe(res);
  } catch (error) {
    if (error.code === "ENOENT") {
      res.writeHead(404, { ...corsHeaders, "Content-Type": "text/plain" });
      res.end("404 Not Found");
    } else {
      res.writeHead(500, { ...corsHeaders, "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(
    `import tokenizers.js from http://localhost:${PORT}/tokenizers.mjs`,
  );
  console.log(`Watching src/ for changes...`);
});
