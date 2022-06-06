import { MetaData, pickCmsSeoData } from 'components/MetaData';
import { createClient } from '../prismicio'
import SearchView from 'views/Search'
import { mapLangToPrismic } from 'utils/translation';

export const getStaticProps = async (context) => {
  const client = createClient({ previewData: context.previewData })
  const page = await client.getSingle('search', { lang: mapLangToPrismic(context.locale) })
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