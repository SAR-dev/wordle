import React, { useState } from "react";
import { PinInput, PinInputField, HStack, useToast } from "@chakra-ui/react";

const Word = ({ val, completed, setCompleted }) => {
  const toast = useToast()
  const [word, setWord] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  function check(word) {
    setLoading(true);
    fetch(`http://127.0.0.1:8000/check/${word}`)
      .then((res) => res.json())
      .then(
        (res) => {
          setLoading(false);
          setResult(res.result);
          if(countOccurrences(res.result, 'c') === val){
            setCompleted(true)
            toast({
              title: 'Congratulations !!!',
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          }
        },
        (error) => {
          setLoading(false);
          console.log(error);
        }
      );
  }

  const getBG = (i) => {
    if (result[i] === "c") {
      return "green.500";
    } else if (result[i] === "w") {
      return "yellow.500";
    } else if (result[i] === "o") {
      return "gray.600";
    } else {
      return "gray.800";
    }
  };

  return (
    <HStack spacing={5}>
      <PinInput
        placeholder=""
        type="alphanumeric"
        onChange={(e) => setWord(e.toUpperCase())}
        onComplete={(word) => check(word)}
        value={word}
        isDisabled={loading || result.length !== 0 || completed}
      >
        {[...Array(val)].map((el, i) => (
          <PinInputField
            _disabled={{ color: "white" }}
            bg={getBG(i)}
            borderWidth="2px"
            key={i}
          />
        ))}
      </PinInput>
    </HStack>
  );
};

export default Word;
