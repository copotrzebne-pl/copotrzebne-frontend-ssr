import { createClient } from '../prismicio'
import { MetaData, pickCmsSeoData } from 'components/MetaData'

export const getStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })
  const page = await client.getSingle('home-page')

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
      <h1>{data.mainTitle}</h1>
      <img src={data.mainBanner.url} alt={data.mainBanner.alt} />
    </div>
  )
}

export default Home