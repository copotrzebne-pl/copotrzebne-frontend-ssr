import { MetaData, pickCmsSeoData } from 'components/MetaData';
import { createClient } from '../prismicio'
import PanelView from 'views/Panel'

export const getStaticProps = async ({ previewData }) => {
  // const client = createClient({ previewData })
  // const page = await client.getSingle('aboutUs')
  return {
    props: {
      page: { data: {} }
    },
  };
};

const Panel = ({ page: { data } }) => {
  return (
    <div>
      <PanelView />
    </div>
  )
}

export default Panel