import ManageDemandsView from 'views/ManageDemands'

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
      <ManageDemandsView />
    </div>
  )
}

export default Panel