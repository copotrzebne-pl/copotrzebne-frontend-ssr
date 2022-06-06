import styled from 'styled-components'
import { PrismicRichText } from '@prismicio/react'

const Story = ({ slice }) => (
  <StoryWrapper>
    {slice.primary.title && <Title><PrismicRichText field={slice.primary.title}/></Title>}
    {slice.primary.description && <Description><PrismicRichText field={slice.primary.description}/></Description>}
  </StoryWrapper>
)

export default Story

const StoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1.2rem 2.2rem;
`

const Title = styled.div`
  font-size: 1.8rem;
  line-height: 2.2rem;
  margin: 1.8rem 0 1rem 0;
`

const Description  = styled.div`
  font-size: 1.1rem;
  line-height: 2.2rem;
  margin: 1.8rem 0 1rem;
  max-width: 750px;
  text-align: center;
  p {
    min-height: 1rem;
  }
`