import ManagePlaceView from 'views/ManagePlace'

export const getServerSideProps = async () => {
  return {
    props: {
      page: { data: {} }
    },
  };
}

const Panel = ({ page: { data } }) => {
  return (
    <div>
      <ManagePlaceView />
    </div>
  )
}

export default Panel