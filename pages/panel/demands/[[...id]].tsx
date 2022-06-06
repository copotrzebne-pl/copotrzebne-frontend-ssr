import DemandsView from 'views/Demands'

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
      <DemandsView />
    </div>
  )
}

export default Panel