import React, { useState, useEffect } from "react";
import { Box, Flex, VStack, Text, IconButton, Icon } from "@chakra-ui/react";
import Word from "./Word";
import * as htmlToImage from "html-to-image";
import { AiOutlineReload } from "react-icons/ai";
import { FaCamera } from "react-icons/fa";
import download from "downloadjs";

const App = () => {
  const [val, setVal] = useState(5);
  const [completed, setCompleted] = useState(false);
  const [reload, setReload] = useState(0);

  const saveImage = () => {
    htmlToImage.toPng(document.body).then(function (dataUrl) {
      download(dataUrl, "wordle.png");
    });
  };

  return (
    <Flex
      w={"100%"}
      h={"100vh"}
      alignItems={"center"}
      bgGradient="linear(to-l, #44a08d, #093637)"
    >
      <Box
        mx={"auto"}
        bg={"gray.900"}
        rounded={"md"}
        p={10}
        shadow={"md"}
        id="cap"
      >
        <Flex justifyContent={"space-between"} mb={5}>
          <IconButton
            icon={<Icon as={AiOutlineReload} />}
            onClick={() => setReload((reload) => reload + 1)}
          />
          <Text
            fontWeight={"semibold"}
            color={"white"}
            fontSize={"2xl"}
            letterSpacing={"wider"}
          >
            WORDLE
          </Text>
          <IconButton
            icon={<Icon as={FaCamera} />}
            onClick={() => saveImage()}
          />
        </Flex>
        <VStack spacing={5} key={reload}>
          {[...Array(val)].map((el, i) => (
            <Word
              key={i}
              val={val}
              completed={completed}
              setCompleted={setCompleted}
            />
          ))}
        </VStack>
      </Box>
    </Flex>
  );
};

export default App;
