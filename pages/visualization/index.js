import { NextSeo } from 'next-seo'
import { Box, Container, Heading } from '@chakra-ui/react'

import ContainerHome from '../../layouts/container/home'

function Visualization() {
  return (
    <>
      <NextSeo
        title="Visualisasi"
        titleTemplate="%s | Better Esport"
        description="Better Esport merupakan portal media untuk membuat komunitas esport Indonesia lebih baik."
      />
      <Container maxW="container.md" minH={'90vh'}>
        <Box py={{ base: 20, md: 28 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={700}
            fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
            textAlign={'center'}
          >
            Comming Soon
          </Heading>
        </Box>
      </Container>
    </>
  )
}

Visualization.Layout = ContainerHome

export default Visualization
