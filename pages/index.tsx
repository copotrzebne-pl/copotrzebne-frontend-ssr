import { createClient } from '../prismicio'
import { MetaData, pickCmsSeoData } from 'components/MetaData'
import LandingView from 'views/Landing'
import { mapLangToPrismic } from 'utils/translation';

export const getStaticProps = async (context) => {
  const client = createClient({ previewData: context.previewData })
  const page = await client.getSingle('home-page', { lang: mapLangToPrismic(context.locale), fetchLinks : 'faq.title, faq.description' })

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