import { MetaData, pickCmsSeoData } from 'components/MetaData'
import { createClient } from '../../prismicio'
import PlaceView from 'views/Place'
import { GetServerSideProps } from 'next/types'
import { API } from 'utils/endpoints'
import { getRestClient } from 'utils/restClient'
import { Place } from 'contexts/types'
import { getTranslation } from 'utils/translation'


type SearchPagePropsType = {
  page: any
}

export const getServerSideProps: GetServerSideProps<SearchPagePropsType> = async ({
  params,
  previewData
}) => {
  const slug = params?.slug?.[0] || ""
  try {
    /* TODO: fetch data for place page from prismic */
    const prismicClient = createClient({ previewData })
    const pageData = await prismicClient.getSingle('home-page')
  
    const client = await getRestClient(process.env.NEXT_PUBLIC_API_URL)
    const fetchedPlace = await client.get<null, Place>(
      API.panel.getPlace.replace(':id', slug)
    )

    return {
      props: {
          page: {
            ...pageData,
            data: {
              ...pageData.data, 
              metaTitle: getTranslation('pl', fetchedPlace.name),
              ogTitle: getTranslation('pl', fetchedPlace.name),
              /* TODO: replace ogDescription with place data */
            }
          }
      },
    };
  } catch {
    throw Error("cannot fetch place")
  }
};

const PlacePage = ({ page: { data } }) => {
  return (
    <div>
      <MetaData {...pickCmsSeoData(data)} />
      <PlaceView />
    </div>
  )
}

export default PlacePage