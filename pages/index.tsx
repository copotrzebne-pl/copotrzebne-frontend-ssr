import { createClient } from '../prismicio'
import { MetaData, pickCmsSeoData } from 'components/MetaData'
import LandingView from 'views/Landing'

export const getStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })
  const page = await client.getSingle('home-page', { fetchLinks : 'faq.title, faq.description' })

  return {
    props: {
      page
    },
  };
};

const Home = ({ page: { data } }) => {
  return (
    <div>
      <MetaData {...pickCmsSeoData(data)} />
      <LandingView page={data} />
    </div>
  )
}

export default Home