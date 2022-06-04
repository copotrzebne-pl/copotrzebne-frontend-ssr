import { ReactNode, useEffect, useState } from 'react';
import RcCollapse from 'rc-collapse';
import styled, { css } from 'styled-components';
import { collapseMotion } from './collapseMotion';

const StyledCollapse = styled(RcCollapse)<{ outlined?: boolean }>`
  & {
    .rc-collapse-motion {
      transition: height 0.3s, opacity 0.3s;
    }

    .rc-collapse-content-hidden {
      display: none;
    }

    .rc-collapse-item {
      ${({ outlined }) =>
        outlined &&
        css`
          border: 3px solid black;
          border-radius: 32px;
        `}
    }

    .rc-collapse-item > .rc-collapse-header {
      display: flex;
      align-items: center;
      cursor: pointer;
      flex-direction: row-reverse;
      ${({ outlined }) =>
        outlined &&
        css`
          justify-content: center;
          & > span {
            margin-right: 0.85rem;
          }
        `}
    }

    .rc-collapse-item > .rc-collapse-header > * {
      flex: 1 0 auto;
      ${({ outlined }) =>
        outlined &&
        css`
          flex: 0 0 auto;
        `}
    }

    .rc-collapse-item > .rc-collapse-header > i {
      flex-grow: 0;
    }

    .rc-collapse-item .rc-collapse-header-collapsible-only {
      cursor: default;
    }

    .rc-collapse-item .rc-collapse-header-collapsible-only .rc-collapse-header-text {
      cursor: pointer;
    }

    .rc-collapse-content {
      overflow: hidden;
    }

    .rc-collapse-content > .rc-collapse-content-box {
      margin-top: 1rem;
      ${({ outlined }) =>
        outlined &&
        css`
          margin-top: 0;
          padding: 1.4rem;
          padding-top: 0;
        `}
    }
  }
`;

const CollapsePanelKey = 'collapsePanelKey';
export function Collapse({
  children,
  header,
  defaultOpen = false,
  outlined = false,
}: {
  header: ReactNode | ((isOpen: boolean) => void);
  children: ReactNode;
  defaultOpen?: boolean;
  outlined?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  useEffect(() => {
    setIsOpen(defaultOpen);
  }, [defaultOpen]);

  return (
    <StyledCollapse
      activeKey={isOpen ? CollapsePanelKey : undefined}
      onChange={(key) => setIsOpen(!!key)}
      openMotion={collapseMotion}
      accordion={true}
      expandIcon={(props) => <ExpandIcon {...props} />}
      outlined={outlined}
    >
      <RcCollapse.Panel key={CollapsePanelKey} header={typeof header === 'function' ? header(isOpen) : header}>
        {children}
      </RcCollapse.Panel>
    </StyledCollapse>
  );
}

function ExpandIcon({ isActive = false }: { isActive?: boolean }) {
  return (
    <i>
      <svg
        viewBox="0 0 16 10"
        width="16"
        height="10"
        fill="currentColor"
        style={{
          transition: 'transform .2s',
          transform: `rotate(${isActive ? 0 : 180}deg)`,
        }}
      >
        <path d="M1.88 10L8 3.81916L14.12 10L16 8.09717L8 0L0 8.09717L1.88 10Z" />
      </svg>
    </i>
  );
}
