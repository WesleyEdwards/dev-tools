import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const removeModuleCrossorigin = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html: string) {
      return html.replace(`type="module" crossorigin `, "");
    },
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), removeModuleCrossorigin()],
  base: "./",
});