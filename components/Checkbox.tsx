import styled from 'styled-components'
import { Ref, forwardRef, HTMLProps } from 'react'
import { ReactComponent as CheckIcon } from 'assets/check-icon.svg'

export type CheckboxProps = {
  value: string
  label?: string
  name?: string
  onChange: (val: string) => void
}

export default forwardRef(
  (
    {
      id,
      value,
      label,
      onChange,
      name,
      checked
    }: CheckboxProps & HTMLProps<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
  ) => (
    <Label role="checkbox" aria-checked={checked}>
      <Input
        id={id}
        type="checkbox"
        name={name}
        value={value}
        onChange={() => onChange(value)}
        ref={ref}
        checked={checked}
      />
      {label}
      <CheckboxButton>
        <CheckIcon />
      </CheckboxButton>
    </Label>
  )
)

const CheckboxButton = styled.span`
  position: absolute;
  left: 0;
  height: 24px;
  width: 24px;
  border: 2px solid ${({ theme }) => theme.colors.blue};
  border-radius: 6px;
  transition: 0.15s border-width ease-out;
  display: inline-block;
  & > svg {
    display: none;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translateX(-50%);
  }
`

const Label = styled.label`
  display: block;
  padding-left: 1.9rem;
  font-size: 1.7rem;
  line-height: 2rem;
  font-weight: 500;
  position: relative;
  cursor: pointer;
  user-select: none;
  height: 24px;
  color: ${({ theme }) => theme.colors.black};

  &:hover {
    ${CheckboxButton} {
      background-color: ${({ theme }) => theme.colors.grey100};
    }
  }
`

export const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked ~ ${CheckboxButton} {
    background-color: ${({ theme }) => theme.colors.blue};
    & > svg {
      display: inline-block;
    }
  }

  &:focus {
    outline: none;

    & ~ ${CheckboxButton} {
      box-shadow: 0 0 0 0.4rem rgba(21, 20, 26, 0.2);
    }
  }
`
