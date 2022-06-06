import { PrismicRichText } from '@prismicio/react'
import styled from 'styled-components'
import { breakpoint } from 'themes/breakpoints'
import Image, { ImageProps } from 'next/image'


const Partners = ({ slice }) => (
  <PartnersWrapper>
    {slice.primary.title && <Title><PrismicRichText field={slice.primary.title}/></Title>}
    {slice.primary.description && <Description><PrismicRichText field={slice.primary.description}/></Description>}
    <LogosWrapper>
      {slice.items?.map((item, index) => {
        const imageProps = getImageProps(item.partnerLogo);
        if (!imageProps) return null
        return (
          <StyledImage key={index} {...imageProps} layout="intrinsic" alt={item.partnerLogoAlt} />
        )
      })}
    </LogosWrapper>
  </PartnersWrapper>
)

export default Partners

const PartnersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  padding: 1.2rem 2.2rem;
`;

const Title = styled.div`
  font-size: 1.8rem;
  line-height: 2.2rem;
  margin: 1.8rem 0 1rem 0;
`;

const Description  = styled.div`
  font-size: 1.1rem;
  line-height: 2.2rem;
  margin: 1.8rem 0 1rem;
  max-width: 750px;
  text-align: center;
`;

const LogosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding: 1rem 1.8rem;
  ${breakpoint.sm`
    flex-direction: row;
    justify-content: center;
  `}
`

const StyledImage = styled(Image)`
  border-radius: 18px;
  width: 200px;
  height: auto;
`

function getImageProps(
  image: any
): null | Pick<ImageProps, 'src' | 'height' | 'width' | 'alt'> {
  if (!image) {
    return null;
  }

  return {
    src: image.url,
    height: image.dimensions.height,
    width: image.dimensions.width,
    alt: image.alt,
  };
}