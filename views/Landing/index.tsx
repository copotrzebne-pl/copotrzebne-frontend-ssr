import styled from 'styled-components'
import { Hero } from './Hero'
import { components } from 'slices'

export default ({page}: {page: any}) => {
  const slices = page.slices || []
  return (
    <>
      <Container>
        <Hero backgroundUrl={page.mainBanner.url}>
          {page.mainTitle}
        </Hero>
        {slices.map((slice, index) => {
          const Component = components[slice.slice_type] || <div />
          return <Component slice={slice} key={index} />
        })}
      </Container>
    </>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 6.8rem;
`
