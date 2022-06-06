/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Button from 'components/Button'
import { Demand, DemandDTO, Priority, Supply } from 'contexts/types'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import TranslatedEntry from 'components/TranslatedEntry'
import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg'
import TranslatedText from '../../../components/TranslatedText'
import trashIconUrl from '../../../assets/trash-icon.svg'
import { usePanelContext } from '../../../contexts/panelContext'

const DemandComponent = ({
  className,
  supply,
  placeId,
  isSelected,
  isSaved,
  demand,
  priorities,
  buttonText,
  saveDemand,
  onSelected
}: {
  className?: string
  supply: Supply
  placeId: string
  priorities: Priority[]
  saveDemand: (demandObject: DemandDTO) => Promise<boolean | void>
  onSelected: (supplyId: string) => void
  isSelected: boolean
  isSaved: boolean
  demand?: Demand
  buttonText?: string
}) => {
  const [demandDTO, setDemandDTO] = useState<DemandDTO>({
    placeId,
    supplyId: supply.id,
    comment: '',
    priorityId: ''
  })

  const { removeDemand } = usePanelContext()

  useEffect(() => {
    setDemandDTO({ ...demandDTO, supplyId: supply.id })
  }, [supply])

  useEffect(() => {
    setDemandDTO({ ...demandDTO, priorityId: priorities[0]?.id })
  }, [priorities])

  useEffect(() => {
    if (isSelected && demand) {
      setDemandDTO(state => ({
        ...state,
        id: demand.id,
        comment: demand.comment || '',
        priorityId: demand.priority.id
      }))
    }
  }, [isSelected, demand])

  const handleDemandSave = useCallback(() => {
    if (!demandDTO.priorityId && !demandDTO.placeId) return
    saveDemand({ ...demandDTO, placeId }).then((saved: boolean | void) => {
      if (saved) onSelected('')
    })
  }, [demandDTO, placeId, priorities, demand, supply])

  return (
    <div className={className}>
      <DemandTitle
        onClick={() => onSelected(supply.id)}
        isSelected={isSelected}
      >
        <Title>
          {isSaved && (
            <CheckIcon
              onClick={e => {
                if (demand && !isSelected) {
                  e.stopPropagation()
                  removeDemand(demand.id)
                }
              }}
            />
          )}{' '}
          <span>
            <TranslatedEntry entry={supply.name} />
          </span>
        </Title>
        <AddIcon>
          <PlusIconStyled />
        </AddIcon>
      </DemandTitle>
      {demand?.comment && !isSelected && (
        <DemandComment>{demand?.comment}</DemandComment>
      )}
      {isSelected && (
        <DemandDetails>
          <PrioritiesWrapper>
            {priorities.map((priority, key) => (
              <PriorityWrapper
                key={key}
                onClick={() =>
                  setDemandDTO({ ...demandDTO, priorityId: priority.id })
                }
              >
                <input
                  type="radio"
                  name={priority.id}
                  checked={priority.id === demandDTO.priorityId}
                  readOnly
                />
                <PriorityInputLabel htmlFor={priority.id}>
                  <TranslatedEntry entry={priority.name} />
                </PriorityInputLabel>
              </PriorityWrapper>
            ))}
          </PrioritiesWrapper>
          <FormGroup>
            <Label>Komentarz</Label>
            <TextInput
              id="comment"
              type="text"
              placeholder="Komentarz, np. buty rozmiar 36 "
              value={demandDTO.comment || ''}
              onChange={e =>
                setDemandDTO({ ...demandDTO, comment: e.target.value })
              }
            />
          </FormGroup>
          <StyledButton onClick={handleDemandSave}>
            {isSaved ? (
              buttonText || <TranslatedText value="addToList" />
            ) : (
              <TranslatedText value="saveChanges" />
            )}
          </StyledButton>
        </DemandDetails>
      )}
    </div>
  )
}

export default styled(DemandComponent)`
  padding: 1rem 1.2rem;
  background-color: white;
  border-radius: 15px;
  box-shadow: ${({ theme }) => theme.boxShadows.medium};
  margin-bottom: 1rem;
  width: 100%;
`

const DemandTitle = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 1rem 1.2rem;
  margin: -1rem -1.2rem;
  transition: background-color 0.3s;
  border-radius: 15px;
  font-weight: lighter;

  &:hover {
    background: ${({ theme }) => theme.colors.grey100};
  }

  ${({ isSelected }) =>
    isSelected &&
    `
    &:hover {
      cursor: auto;
      background-color: transparent;
    } 
  `}
`

export const AddIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  border: 1px solid #333;
  border-radius: 50%;
  padding: 4px;
`

const PlusIconStyled = styled(PlusIcon)`
  width: 16px;
  height: 16px;
`

const DemandDetails = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledButton = styled(Button)`
  margin: 1.4rem 0 1rem;
`

const TextInput = styled.input`
  display: inline-block;
  width: 100%;
  border: 1px solid rgba(150, 147, 147, 0.8);
  border-radius: 10px;
  color: ${({ theme }) => theme.colors.grey900};
  height: 45px;
  padding: 0 1rem;
  margin-top: 0.8rem;
  ::placeholder {
    color: ${({ theme }) => theme.colors.grey};
    opacity: 0.7;
  }
`

const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.6rem;
  color: ${({ theme }) => theme.colors.grey900};
  font-size: 0.9rem;
  font-weight: 400;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const PrioritiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0;
`

const PriorityWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin: 0 0 8px;
`

const PriorityInputLabel = styled.label`
  padding: 2px 8px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.grey900};
  align-self: flex-start;
`

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CheckIcon = styled.div`
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 0.8rem;
  background: #00e676;
  position: relative;
  color: white;
  &:after {
    content: '\\2713';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const DemandComment = styled.div`
  margin-top: 0.2rem;
  font-size: 0.85rem;
  color: #999999;
`

const TrashIcon = styled.img`
  display: inline-block;
  padding: 0.3rem;
  height: 28px;
  width: auto;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
      rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  }
`

const IconGroup = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`
