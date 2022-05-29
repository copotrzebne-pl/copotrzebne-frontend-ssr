import { ReactNode, useState } from 'react'
import styled from 'styled-components'

import { FormGroup, Label, RequiredDecorator } from './forms'

export const Select = ({
  options = [],
  onChange,
  value,
  required,
  label,
  disabled
}: {
  options: { name: string; value: string }[]
  onChange: (optionValue: string) => void
  value: string
  required: boolean
  disabled: boolean
  label: ReactNode
}) => {
  const [isOpen, setOpen] = useState(false)

  const toggle = () => {
    if (disabled) {
      return
    }
    setOpen(!isOpen)
  }

  const Input = disabled ? DisabledInput : InputLike

  return (
    <FormGroup>
      <Label>
        {label}
        {required && <RequiredDecorator>*</RequiredDecorator>}
      </Label>

      <Input onClick={toggle} role="input">
        {options.find(option => option.value === value)?.name || ''}
      </Input>

      {isOpen && (
        <ListWrapper>
          <OptionsList>
            {options.map(option => (
              <Option
                key={`option_${option.value}`}
                onClick={() => {
                  onChange(option.value)
                  toggle()
                }}
              >
                {option.name}
              </Option>
            ))}
          </OptionsList>
        </ListWrapper>
      )}
    </FormGroup>
  )
}

const InputLike = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: #15141a;
  height: 45px;
  padding: 0 1rem;
  cursor: pointer;
`

const DisabledInput = styled(InputLike)`
  color: ${({ theme }) => theme.colors.grey600};
  cursor: default;
`

const ListWrapper = styled.div`
  position: relative;
`

const OptionsList = styled.div`
  background: #ffffff;
  position: absolute;
  border: 1px solid rgba(150, 147, 147, 0.8);
  width: 100%;
  border-radius: 10px;
  padding: 1rem 0;
  z-index: 500;
`

const Option = styled.div`
  padding: 0.5rem 1rem;
  :hover {
    background: ${({ theme }) => theme.colors.blueLight};
  }
`
