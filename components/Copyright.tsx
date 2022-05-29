import styled from 'styled-components'
import schibstedLogo from 'assets/schibsted-logo.png'

const Copyright = ({ className }: { className?: string }) => (
  <div className={className}>
    <span>
      copotrzebne © Copyright 2022. Powered by
      <a target="_blank" href="https://schibsted.pl" rel="noreferrer">
        <img
          src={schibstedLogo.src}
          alt="Schibsted Tech Polska"
          height={8}
          width="auto"
        />
      </a>
    </span>
  </div>
)

export default styled(Copyright)`
  width: 100%;
  height: 24px;
  background-color: #dedede;
  color: #999999;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
  position: fixed;
  bottom: 0;
  left: 0;
  & > span {
    display: flex;
    align-items: center;
  }
  img {
    margin-left: 4px;
    display: flex;
    align-items: center;
  }
`
