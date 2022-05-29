import { MetaData, pickCmsSeoData } from 'components/MetaData';
import { createClient } from '../prismicio'
import LoginView from 'views/Login'

export const getStaticProps = async ({ previewData }) => {
  const client = createClient({ previewData })
  const page = await client.getSingle('login')
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