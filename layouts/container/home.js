import { Box } from '@chakra-ui/react'

import Navbar from '../navbar/navbar'
import Footer from '../footer/footer'

function ContainerHome({ children }) {
  return (
    <>
      <Navbar />
      <Box as={'main'}>{children}</Box>
      <Footer />
    </>
  )
}

export default ContainerHome
