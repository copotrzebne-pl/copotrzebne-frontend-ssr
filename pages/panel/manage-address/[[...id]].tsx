import ManageAddressView from 'views/ManageAddress'

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
      <ManageAddressView />
    </div>
  )
}

export default Panel