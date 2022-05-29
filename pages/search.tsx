import { MetaData, pickCmsSeoData } from 'components/MetaData';
import { createClient } from '../prismicio'
import SearchView from 'views/Search'

export const getStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })
  const page = await client.getSingle('search')
  return {
    props: {
      page
    },
  };
};

const Search = ({ page: { data } }) => {
  return (
    <div>
      <MetaData {...pickCmsSeoData(data)} />
      <SearchView page={data} />
    </div>
  )
}

export default Search