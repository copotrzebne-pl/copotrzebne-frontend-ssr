import styled, { DefaultTheme } from 'styled-components';
import { breakpoint } from 'themes/breakpoints'
import { ReactNode } from 'react';

const HeroBackground = styled.div<{ backgroundUrl?: string;}>`
  background-size: cover;
  background-position: center;
  min-height: 72vh;
  max-width: 100%;
  position: relative;
  background-image: url(${(props) => props.backgroundUrl});
  ${breakpoint.sm`
    min-height: 80vh;
  `}
`;

const CenterBottomWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 1.2rem;
  padding-bottom: 0.4rem;
  ${breakpoint.sm`
    padding: 2.2rem;
    padding-bottom: 1rem;
  `}
`;

const Title = styled.h1`
  padding-left: 0;
  padding-right: 0;
  color: white;
  font-size: 2.1rem;
  line-height: 1.34;
  margin-bottom: 0.85rem;
  ${breakpoint.sm`
    font-size: 3rem;
    line-height: 1.2;
    max-width: 940px;
  `}
`;

export const Hero = ({
  backgroundUrl,
  children,
}: {
  children: ReactNode;
  backgroundUrl?: string;
}) => (
  <HeroBackground backgroundUrl={backgroundUrl}>
    <CenterBottomWrapper>
      <Title>{children}</Title>
    </CenterBottomWrapper>
  </HeroBackground>
);