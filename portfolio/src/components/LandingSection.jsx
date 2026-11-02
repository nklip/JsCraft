import React from "react";
import { Avatar, Heading, VStack } from "@chakra-ui/react";
import FullScreenSection from "./FullScreenSection";

const greeting = "Hello, I am Nick Milano!";
const bio1 = "A frontend developer";
const bio2 = "specialised in React";

// Implement the UI for the LandingSection component according to the instructions.
// Use a combination of Avatar, Heading and VStack components.
const LandingSection = () => (
  <FullScreenSection
    justifyContent="center"
    alignItems="center"
    isDarkBackground
    backgroundColor="#2A4365"
  >
    {/* 2xl is the largest avatar size. The previous size="3xl" exists in no
        Chakra release, so it always rendered as a tiny fallback box. */}
    <Avatar.Root size="2xl">
      <Avatar.Fallback name="Nick Milano" />
      <Avatar.Image src="https://i.pravatar.cc/450?img=12" />
    </Avatar.Root>
    <Heading size={{ base: "3xl", lg: "4xl" }}>{greeting}</Heading>
    <VStack>
      <Heading size={{ base: "3xl", lg: "4xl" }}>{bio1}</Heading>
      <Heading size={{ base: "3xl", lg: "4xl" }}>{bio2}</Heading>
    </VStack>

  </FullScreenSection>
);

export default LandingSection;
