import CreateUserView from 'views/CreateUser'

export const getStaticProps = async ({ previewData }) => {
  return {
    props: {
      page: { data: {} }
    },
  };
};

const Panel = ({ page: { data } }) => {
  return (
    <div>
      <CreateUserView />
    </div>
  )
}

export default Panel