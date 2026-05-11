import type { Config } from "tailwindcss";
import preset from "@agentdynamics/ui/tailwind-preset";

const config: Config = {
  presets: [preset as never],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
};

export default config;
