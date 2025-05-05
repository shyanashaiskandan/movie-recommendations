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
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8}>
          <Heading>Movie Recommendations</Heading>
          <Text>Tell us what you're in the mood for!</Text>

          <Box as="form" onSubmit={handleSubmit} w="100%" maxW="600px">
            <VStack spacing={4}>
              <Input
                placeholder="Enter your movie preferences..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
              <Button 
                type="submit" 
                colorScheme="blue" 
                isLoading={isLoading}
                loadingText="Getting recommendations..."
              >
                Get Recommendations
              </Button>
            </VStack>
          </Box>

          {movies.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="100%">
              {movies.map((movie, index) => (
                <Box key={index} borderWidth="1px" borderRadius="lg" overflow="hidden">
                  <Image src={movie.image} alt={movie.title} />
                  <Box p={6}>
                    <Heading size="md">{movie.title}</Heading>
                    <Text>Released: {movie.year}</Text>
                    <Link href={movie.trailer} isExternal color="blue.500">
                      Watch Trailer
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
