import React from "react";
import FullScreenSection from "./FullScreenSection";
import { Box, Heading } from "@chakra-ui/react";
import Card from "./Card";

// Vite resolves these to URLs at build time. They were require() calls
// wrapped in getters, which only webpack supported.
import photo1Preview from "../images/photo1_preview.jpg";
import photo1 from "../images/photo1.jpg";
import photo2Preview from "../images/photo2_preview.jpg";
import photo2 from "../images/photo2.jpg";
import photo3Preview from "../images/photo3_preview.jpg";
import photo3 from "../images/photo3.jpg";
import photo4Preview from "../images/photo4_preview.jpg";
import photo4 from "../images/photo4.jpg";

const projects = [
  {
    key: 1,
    title: "React Space",
    description:
      "Handy tool belt to create amazing AR components in a React app, with redux integration via middleware️",
    preview: photo1Preview,
    imageSrc: photo1,
  },
  {
    key: 2,
    title: "React Infinite Scroll",
    description:
      "A scrollable bottom sheet with virtualisation support, native animations at 60 FPS and fully implemented in JS land 🔥️",
    preview: photo2Preview,
    imageSrc: photo2,
  },
  {
    key: 3,
    title: "Photo Gallery",
    description:
      "A One-stop shop for photographers to share and monetize their photos, allowing them to have a second source of income",
    preview: photo3Preview,
    imageSrc: photo3,
  },
  {
    key: 4,
    title: "Event planner",
    description:
      "A mobile application for leisure seekers to discover unique events and activities in their city with a few taps",
    preview: photo4Preview,
    imageSrc: photo4,
  },
];

const ProjectsSection = () => {
  return (
    <FullScreenSection
      backgroundColor="#14532d"
      isDarkBackground
      p={24}
      alignItems="flex-start"
      spacing={8}
    >
      <Heading as="h1" >
        Featured Projects
      </Heading>
      <Box
        display="grid"
        gridTemplateColumns="repeat(2,minmax(0,1fr))"
        gridGap={8}
      >
        {projects.map((project) => (
          <Card
            key={project.key}
            title={project.title}
            description={project.description}
            preview={project.preview}
            imageSrc={project.imageSrc}
          />
        ))}
      </Box>
    </FullScreenSection>
  );
};

export default ProjectsSection;
