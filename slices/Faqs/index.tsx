import styled from 'styled-components'
import { Collapse } from 'components/collapse';
import { PrismicRichText } from '@prismicio/react';

const Faqs = ({ slice }) => (
  <FaqWrapper>
    <Collapse defaultOpen={false} header={<FaqHeader>{slice.primary.title}</FaqHeader>} outlined>
      <Wrapper>
        {slice.items?.map((item, index) => (
          <FaqContent key={index}>
            <SectionTitle>{item.faq.data.title}</SectionTitle>
            <PrismicRichText field={item.faq.data.description} />
          </FaqContent>
        ))}
      </Wrapper>
    </Collapse>
  </FaqWrapper>
  
)

export default Faqs

const FaqWrapper = styled.div`
  width: 100%;
  background-color: white;
  padding-top: 2.8rem;
  padding-bottom: 2.8rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 3.2rem;
  & > * {
    max-width: 560px;
    width: 100%;
    margin: 0 auto;
  }
`

const FaqHeader = styled.div`
  display: inline-block;
  line-height: 1.2;
  font-size: 1.37rem;
  text-align: center;
  padding: 1rem 0;
  font-weight: 600;
`;

export const SectionTitle = styled.span`
  display: inline-block;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.8;
  color: black;
  margin-bottom: 12px;
  position: relative;
  vertical-align: center;
  font-size: 1.28rem;
`;

const FaqContent = styled.div`
  margin-bottom: 1.6rem;
  text-align: center;
  p {
    line-height: 1.5;
    font-size: 1.1rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 1.2rem 0 0;
`