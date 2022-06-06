import AnnouncementsView from 'views/Announcements'

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
      <AnnouncementsView />
    </div>
  )
}

export default Panel