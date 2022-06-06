import PanelView from 'views/Panel'

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
      <PanelView />
    </div>
  )
}

export default Panel