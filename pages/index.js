import { supabase } from '../utils/initSupabase'
import { NextSeo } from 'next-seo'

import ContainerHome from '../layouts/container/home'
import Hero from '../components/hero'
import Statistic from '../components/statistic'
import Discord from '../components/discord'

function Home({ statistic }) {
  return (
    <>
      <NextSeo
        title="Komunitas Esport Indonesia"
        titleTemplate="%s | Better Esport"
        description="Better Esport merupakan portal media untuk membuat komunitas esport Indonesia lebih baik."
      />
      <Hero />
      <Statistic statistic={statistic} />
      <Discord />
    </>
  )
}

export async function getServerSideProps() {
  const { data: report } = await supabase
    .from('statistic_report_provocation_completed')
    .select('count')

  const { data: reportProvocation } = await supabase
    .from('statistic_report_account_provocation_completed')
    .select('count')

  return {
    props: {
      statistic: {
        reportTotal: report[0].count,
        reportProvocationTotal: reportProvocation[0].count,
      },
    },
  }
}

Home.Layout = ContainerHome

export default Home
