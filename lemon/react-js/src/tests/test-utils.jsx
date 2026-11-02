import { render as rtlRender } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { system } from "../lib/theme";

// Chakra 3 components read the theme from ChakraProvider and fail without one;
// Chakra 2 fell back to its default theme. App provides it in the real page,
// so a test that renders a Chakra component on its own wraps it here.
export function render(ui, options) {
  return rtlRender(ui, {
    wrapper: ({ children }) => <ChakraProvider value={system}>{children}</ChakraProvider>,
    ...options,
  });
}
