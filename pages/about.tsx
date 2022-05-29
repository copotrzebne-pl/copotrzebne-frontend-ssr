import { MetaData, pickCmsSeoData } from 'components/MetaData';
import { createClient } from '../prismicio'
import AboutUsView from 'views/About'

export const getStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })
  const page = await client.getSingle('aboutUs')
  return {
    props: {
      page
    },
  };
};

const AboutUs = ({ page: { data } }) => {
  return (
    <div>
      <MetaData {...pickCmsSeoData(data)} />
      <AboutUsView page={data} />
    </div>
  )
}

export default AboutUs