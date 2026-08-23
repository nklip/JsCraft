import { Heading, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";

const Card = ({ title, description, preview, imageSrc }) => {
  return (
    <VStack alignItems="start" className="card">
      <Image className="image" src={preview} alt={title}/>
      <Heading as='h4' size='md' className="title">{title}</Heading>
      <Text className="desc">{description}</Text>
      <HStack className="see">
        <Text>See more</Text>
        <a href={imageSrc}>
          <FontAwesomeIcon icon={faArrowRight} size="1x" />
        </a>
      </HStack>
    </VStack>
  );
};

export default Card;
