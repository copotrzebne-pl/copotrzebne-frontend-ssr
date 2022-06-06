import RequestPlaceView from 'views/RequestPlace'

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
      <RequestPlaceView />
    </div>
  )
}

export default Panel