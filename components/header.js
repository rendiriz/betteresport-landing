import { Box, Container, Heading, Text } from '@chakra-ui/react'

export default function Hero({ title }) {
  return (
    <Container maxW="container.lg">
      <Box py={10}>
        <Heading lineHeight={1.1} fontWeight={700} fontSize={'3xl'}>
          {title}
        </Heading>
      </Box>
    </Container>
  )
}
