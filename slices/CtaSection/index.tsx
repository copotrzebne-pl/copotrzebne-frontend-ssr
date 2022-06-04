import styled, { keyframes } from 'styled-components';
import { breakpoint } from 'themes/breakpoints';
import Link from 'next/link'

export default ({ slice }) => (
  <CtaSectionWrapper>
    <ContentWrapper>
      <SearchHeader>{slice.primary.title}</SearchHeader>
      <Link passHref href={slice.primary?.link?.url} >
        <CtaButton>{slice.primary.buttonTitle}</CtaButton>
      </Link>
    </ContentWrapper>
  </CtaSectionWrapper>
);

const CtaSectionWrapper = styled.div`
  width: 100%;
  background-color: rgb(245, 245, 235);
  padding-top: 2.8rem;
  padding-bottom: 2.8rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 2.8rem;
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 2.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SearchHeader = styled.h2`
  font-size: 2.4rem;
  padding-bottom: 1.5rem;
  line-height: 1.75rem;
  text-align: center;
`;

export const gradient = keyframes`
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

export const CtaButton = styled.button`
  border: none;
  outline: none;
  padding: 1.4rem 3rem;
  background-color: ${({ theme }) => theme.colors.blue};
  color: white;
  border-radius: 16px;
  height: 38px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 800;
  position: relative;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  animation: ${gradient} 20s ease infinite;
  background: linear-gradient(
      -45deg,
      rgb(107, 25, 216),
      rgb(7, 210, 179),
      ${({ theme }) => theme.colors.blue}
    )
    0% 0%/600% 600%;
`
