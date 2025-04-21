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
} from '@chakra-ui/react';

function App() {
  const [userInput, setUserInput] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    
    const mockMovies = [
      {
        title: 'Inception',
        year: '2010',
        image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
        trailer: 'https://www.youtube.com/watch?v=YoHD9XEInc0',
      },
      {
        title: 'The Shawshank Redemption',
        year: '1994',
        image: 'https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
        trailer: 'https://www.youtube.com/watch?v=6NL1G4H3U8A',
      },
      {
        title: 'The Dark Knight',
        year: '2008',
        image: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
        trailer: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
      },
    ];
    setMovies(mockMovies);
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
              <Button type="submit" colorScheme="blue">
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
