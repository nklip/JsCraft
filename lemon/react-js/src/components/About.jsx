// About (the component that describes the Little Lemon Chicago restaurant and gives a short backstory for it)
import '../assets/css/About.css';

import about1 from '../assets/img/about/about_1.jpg';
import about2 from '../assets/img/about/about_2.jpg';

import { Center, SimpleGrid, Box, HStack, VStack, Image } from "@chakra-ui/react";

function About() {
    return (
        <Center>
            <SimpleGrid columns={2} spacing={10}>
                <Box>
                    <div id="about">
                        <div>
                            <h1>Little Lemon</h1>
                        </div>
                        <div>
                            <p>Based in Chicago, Illinois, Little Lemon is a family-owned Mediterranean restaurant, focused on traditional recipes served with a modern twist. The chefs draw inspiration from Italian, Greek, and Turkish culture and have a menu of 12–15 items that they rotate seasonally. The restaurant has a rustic and relaxed atmosphere with moderate prices, making it a popular place for a meal any time of the day.</p>
                            <br/>
                            <p>Little Lemon is owned by two Italian sisters, Mirka and Isabella, who moved to the United States to pursue their shared dream of owning a restaurant. To craft the menu, Mirka relies on family recipes and his experience as a chef in Italy. Isabella does all the marketing for the restaurant and led the effort to expand the menu beyond classic Italian to incorporate additional cuisines from the Mediterranean region.</p>
                        </div>
                    </div>
                </Box>
                <Box>
                    <Center>
                        <Image id="image1" htmlHeight='450px' htmlWidth='450px' src={about1} alt='Mirka'/>
                        {/* <Image id="image2" htmlHeight='450px' htmlWidth='450px' src={about2} alt='Isabella'/> */}
                    </Center>
                </Box>
            </SimpleGrid>
        </Center>
    );
}

export default About;