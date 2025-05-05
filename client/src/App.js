import React, { useState } from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  SimpleGrid,
  Image,
  Link,
  Container,
  useToast,
} from '@chakra-ui/react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });

      if (!response.ok) {
        throw new Error('Failed to get recommendations');
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to get movie recommendations. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box 
      minH="100vh" 
      bgGradient="linear(to-b, blue.50, purple.50)"
    >
      <Container maxW="container.xl" py={12}>
        <VStack spacing={10}>
          <VStack spacing={3}>
            <Heading 
              size="2xl" 
              bgGradient="linear(to-r, blue.500, purple.500)"
              bgClip="text"
              fontWeight="extrabold"
            >
              Movie Recommendations
            </Heading>
            <Text fontSize="xl" color="gray.600">
              What are you in the mood for? 
              Type in a mood, vibe, or idea — and get movie recommendations that match.
            </Text>
          </VStack>

          <Box 
            as="form" 
            onSubmit={handleSubmit} 
            w="100%" 
            maxW="600px"
            bg="white"
            p={8}
            borderRadius="xl"
            boxShadow="xl"
          >
            <VStack spacing={6}>
              <Input
                placeholder="Enter your movie preferences..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                size="lg"
                borderRadius="lg"
                borderColor="gray.200"
                _hover={{ borderColor: 'blue.300' }}
                _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px #3182ce' }}
              />
              <Button 
                type="submit" 
                colorScheme="blue" 
                isLoading={isLoading}
                loadingText="Getting recommendations..."
                size="lg"
                w="full"
                bgGradient="linear(to-r, blue.500, purple.500)"
                _hover={{
                  bgGradient: "linear(to-r, blue.600, purple.600)",
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                transition="all 0.2s"
              >
                Get Recommendations
              </Button>
            </VStack>
          </Box>

          {movies.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%">
              {movies.map((movie, index) => (
                <Box 
                  key={index} 
                  borderWidth="1px" 
                  borderRadius="xl" 
                  overflow="hidden"
                  bg="white"
                  boxShadow="lg"
                  transition="all 0.3s"
                  _hover={{
                    transform: "translateY(-5px)",
                    boxShadow: "xl",
                  }}
                >
                  <Image 
                    src={movie.image} 
                    alt={movie.title}
                    w="full"
                    h="400px"
                    objectFit="cover"
                  />
                  <Box p={6}>
                    <Heading size="md" mb={2}>{movie.title}</Heading>
                    <Text color="gray.600" mb={4}>Released: {movie.year}</Text>
                    <Link 
                      href={movie.trailer} 
                      isExternal 
                      color="blue.500"
                      fontWeight="semibold"
                      _hover={{
                        color: "purple.500",
                        textDecoration: "none",
                      }}
                    >
                      Watch Trailer →
                    </Link>
                  </Box>
                </Box>
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
}

export default App;
