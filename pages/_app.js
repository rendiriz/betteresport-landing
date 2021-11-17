import { Chakra } from '../utils/chakra'

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout || (page => page)

  return (
    <Chakra cookies={pageProps.cookies}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Chakra>
  )
}

export default MyApp
export { getServerSideProps } from '../utils/chakra'
