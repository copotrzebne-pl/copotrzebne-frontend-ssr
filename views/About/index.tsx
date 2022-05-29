import PageTitle from 'components/PageTitle'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import schibstedLogo from 'assets/schibsted-logo.png'
import { PrismicRichText } from '@prismicio/react'

export default ({page}: {page: any}) => (
  <Container>
    <PageTitle>
      <PrismicRichText field={page.title} />
    </PageTitle>
    <AboutUsText>
      <PrismicRichText field={page.description} />
    </AboutUsText>
    <SchibstedWrapper>
      <SchibstedInfo>
        Powered by <strong>Schibsted Tech Polska</strong>
      </SchibstedInfo>
      <SchibstedLogoWrapper target="_blank" href="https://schibsted.pl">
        <SchibstedLogo src={schibstedLogo.src} />
      </SchibstedLogoWrapper>
    </SchibstedWrapper>
  </Container>
)

const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - ${({ theme }) => theme.dimensions.headerHeight});
  flex-direction: column;
  ${breakpoint.sm`
    max-width: 450px;
    margin: 0 auto;
  `}
`

const AboutUsText = styled.div`
  display: inline-block;
  text-align: center;
  padding: 1.6rem 1.2rem;
  font-size: 0.89rem;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.4rem;
  text-align: justify;
  text-justify: inter-character;
  p {
    min-height: 1rem;
  }
  a {
    display: inline-block;
    width: 100%;
    margin-top: 0.6rem;
    color: #0076ff;
    text-align: center;
  }
`

const ContactDetails = styled.div`
  display: inline-block;
  text-align: center;
  padding: 1.6rem 1.2rem;
  font-size: 0.89rem;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.4rem;
  white-space: pre-line;
`

const SchibstedWrapper = styled.div`
  display: inline-block;
  text-align: center;
  padding-bottom: 3.8rem;
`

const SchibstedInfo = styled.div`
  padding: 1rem;
`

const SchibstedLogoWrapper = styled.a``

const SchibstedLogo = styled.img`
  height: 1.5rem;
`
