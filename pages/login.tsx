import { MetaData, pickCmsSeoData } from 'components/MetaData';
import { createClient } from '../prismicio'
import LoginView from 'views/Login'
import { mapLangToPrismic } from 'utils/translation';

export const getStaticProps = async (context) => {
  const client = createClient({ previewData: context.previewData })
  const page = await client.getSingle('login', { lang: mapLangToPrismic(context.locale) })
  return {
    props: {
      page
    },
  };
};

const Login = ({ page: { data } }) => {
  return (
    <div>
      <MetaData {...pickCmsSeoData(data)} />
      <LoginView page={data} />
    </div>
  )
}

export default Login