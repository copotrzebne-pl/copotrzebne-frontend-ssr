//import { PrismicRichText } from '@prismicio/react'

import styled from 'styled-components'
import Image, { ImageProps } from 'next/image'
import { breakpoint } from 'themes/breakpoints'
import { PrismicRichText } from '@prismicio/react'

export default ({ slice }) => {
  const imageProps = getImageProps(slice.primary.image);
  if (!imageProps) {
    return null;
  }
  return (
    <ShortStoryWrapper>
      <StyledImage {...imageProps} layout="intrinsic" />
      <TextsWrapper>
        {slice.primary.title && <Title><PrismicRichText field={slice.primary.title}/></Title>}
        {slice.primary.description && <Description><PrismicRichText field={slice.primary.description}/></Description>}
      </TextsWrapper>
    </ShortStoryWrapper>
  );
};

const TextsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.2rem;
  ${breakpoint.sm`
    margin-top: 0;
  `}
  ${breakpoint.sm`
    min-width: 420px;
    max-width: 520px;
  `}
`;

const ShortStoryWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.8rem;
  padding: 1.2rem 2.2rem;
  ${breakpoint.sm`
    padding: 3.4rem 7%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    ${TextsWrapper} {
      padding-left: 2.2rem;
    }
    &:nth-child(odd) {
      flex-direction: row-reverse;
      justify-content: flex-end;
      ${TextsWrapper} {
        padding-left: 0;
        padding-right: 2.2rem;
      }
    }
    & > div:first-child {
      display: flex;
      ${breakpoint.sm`
        flex-basis: 480px
      `}
    }
  `}
`;

export const GalleryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1.6rem;
  ${breakpoint.sm`
    max-width: 860px;
    margin: 0 auto;
    padding-bottom: 4.6rem;
    flex-grow: 0;
    flex-shrink: 0;
  `}
`;

const StyledImage = styled(Image)`
  border-radius: 18px;
  width: 100%;
  height: auto;
`;

const Title = styled.div`
  font-size: 1.8rem;
  line-height: 2.2rem;
  margin: 1.8rem 0 1rem 0;
`;

const Description = styled.div`
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  letter-spacing: 0.2px;
`;

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