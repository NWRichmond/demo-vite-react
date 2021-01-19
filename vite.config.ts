import reactRefresh from "@vitejs/plugin-react-refresh";
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [reactRefresh()],
  alias: {
    "~": resolve(__dirname, "src"),
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // nested: resolve(__dirname, "nested/index.html"),
      },
    },
  },
});
