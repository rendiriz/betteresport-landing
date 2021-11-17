import { Box, Container, Heading, Text } from '@chakra-ui/react'

export default function Hero() {
  return (
    <Container maxW="container.md">
      <Box py={{ base: 20, md: 28 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={700}
          fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
          textAlign={'center'}
        >
          Ayo bantu untuk membuat komunitas esport Indonesia
          <Text as={'span'} color={'teal.500'} ms={3}>
            yang lebih baik
          </Text>
        </Heading>
      </Box>
    </Container>
  )
}
