import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Chakra 3 needs the semantic tokens as well as the colour itself before
// colorPalette="lemon" works. Chakra 2 read only lemon.500, so every key points
// at that one shade except contrast, the text on a solid lemon button.
const config = defineConfig({
  // Chakra 3 paints <html> white, which stops the browser carrying the body
  // background in App.css out to the edges of the window and leaves a white
  // band in the body's margins. Chakra 2 left <html> transparent.
  globalCss: {
    html: { bg: "transparent" },
  },
  theme: {
    tokens: {
      colors: {
        lemon: { 500: { value: "#b2c3af" } },
      },
    },
    semanticTokens: {
      colors: {
        lemon: {
          solid: { value: "{colors.lemon.500}" },
          contrast: { value: "white" },
          fg: { value: "{colors.lemon.500}" },
          muted: { value: "{colors.lemon.500}" },
          subtle: { value: "{colors.lemon.500}" },
          emphasized: { value: "{colors.lemon.500}" },
          focusRing: { value: "{colors.lemon.500}" },
        },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
