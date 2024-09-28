import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
import { fileURLToPath } from "url";
import svgr from "vite-plugin-svgr";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  plugins: [react(), svgr()],
});
