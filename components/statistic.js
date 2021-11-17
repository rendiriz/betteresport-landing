import { Box, Container, Heading, Text, SimpleGrid } from '@chakra-ui/react'

function Statistic({ statistic }) {
  return (
    <Container maxW="container.md">
      <Box py={{ base: 20, md: 28 }}>
        <Heading
          lineHeight={1.1}
          fontWeight={700}
          fontSize={{ base: '2xl', sm: '3xl', lg: '5xl' }}
          textAlign={'center'}
          mb={8}
        >
          Statistik
        </Heading>
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <Box textAlign={'center'}>
            <Text
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              {statistic.reportTotal}
            </Text>
            <Text fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}>
              Laporan Provokasi
            </Text>
          </Box>
          <Box textAlign={'center'}>
            <Text
              fontWeight={600}
              fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            >
              {statistic.reportProvocationTotal}
            </Text>
            <Text fontSize={{ base: 'lg', sm: 'xl', lg: '2xl' }}>
              Laporan Akun Provokasi
            </Text>
          </Box>
        </SimpleGrid>
      </Box>
    </Container>
  )
}

export default Statistic
