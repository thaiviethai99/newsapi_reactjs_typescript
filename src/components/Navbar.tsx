import React from "react";
import { Flex, Heading } from "@chakra-ui/core";

const Navbar: React.FC<{}> = () => {
  return (
    <Flex
      backgroundColor="white"
      height="90px"
      alignItems="center"
      paddingLeft={10}
      paddingRight={10}
      borderBottomWidth={1}
      borderBottomColor="gray.300"
    >
      <Flex width="1200px" margin="auto">
        <Heading color="black" margin="auto" size="2xl">The Online Inquirer</Heading>
      </Flex>
    </Flex>
  );
};

export default Navbar;
