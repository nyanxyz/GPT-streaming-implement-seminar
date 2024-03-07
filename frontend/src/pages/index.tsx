import { useState } from "react";
import {
  Box,
  Button,
  Container,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);

  const fetchData = async () => {
    setData([]);
    setLoading(true);

    const response = await fetch(`http://localhost:8000/stream?query=${query}`); // FastAPI 서버의 스트리밍 URL
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const text = decoder.decode(value, { stream: true });
      setData((currentData) => [...currentData, text]);
    }

    setLoading(false);
  };

  return (
    <Box bg={"var(--chakra-colors-gray-100)"}>
      <Container p={"36px"} h={"100vh"} bg={"white"}>
        <VStack gap={"24px"} align={"stretch"} h={"100%"}>
          <HStack gap={"16px"}>
            <Input
              w={"100%"}
              placeholder={"Message ChatGPT..."}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button colorScheme={"blue"} onClick={fetchData}>
              Send
            </Button>
          </HStack>

          <Box
            rounded={"8px"}
            border={"2px solid var(--chakra-colors-blue-300)"}
            flex={1}
            p={"16px"}
          >
            {data.map((item, index) => (
              <span key={index}>{item}</span>
            ))}
            {loading && <span>😀</span>}
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
