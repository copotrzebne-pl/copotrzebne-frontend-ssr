import Calendar from 'react-calendar'
import { SyntheticEvent, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { addDays } from 'date-fns'

import PanelButton from 'components/PanelButton'
import {
  FormGroup,
  Label,
  RequiredDecorator,
  TextArea,
  TextInput
} from 'components/forms'
import TranslatedText from 'components/TranslatedText'
import { formatDate } from 'utils/date'
import Button from 'components/Button'
import { useClickOutside } from 'hooks/useClickOutside'
import { useUserContext } from 'contexts/userContext'
import { useAnnouncementsContext } from 'contexts/announcementsContext'
import { breakpoint } from 'themes/breakpoints'
import { Select } from 'components/Select'
import { Language } from 'contexts/types'

const AnnouncementForm = ({ type }: { type: 'internal' | 'public' }) => {
  const {
    isFormVisible,
    setFormVisible,
    setFormValue,
    formData,
    error,
    saveAnnouncement,
    fetchAnnouncements
  } = useAnnouncementsContext()

  const { language, fetchOwnedPlaces, ownedPlaces } = useUserContext()

  useEffect(() => {
    fetchOwnedPlaces()
  }, [])

  useEffect(() => {
    if (ownedPlaces && ownedPlaces.length > 0) {
      setFormValue('placeId', ownedPlaces[0].id)
    }
  }, [ownedPlaces])

  const calendarStartDateRef = useRef(null)
  const calendarEndDateRef = useRef(null)

  useClickOutside(calendarStartDateRef, e => {
    setCurrentCalendar(null)
  })

  useClickOutside(calendarEndDateRef, e => {
    setCurrentCalendar(null)
  })

  const [currentCalendar, setCurrentCalendar] = useState<
    null | 'start' | 'end'
  >(null)

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      await saveAnnouncement()
      await fetchAnnouncements()
      setFormVisible(false)
    } catch (_e) {
      // don't close the form
    }
  }

  if (!isFormVisible) {
    return (
      <StyledPanelButton onClick={() => setFormVisible(true)}>
        <TranslatedText
          value={
            type === 'internal'
              ? 'addInternalAnnouncement'
              : 'addPublicAnnouncement'
          }
        />
      </StyledPanelButton>
    )
  }

  return (
    <Form onSubmit={onSubmit}>
      <Select
        required
        label={<TranslatedText value="announcementPlace" />}
        value={formData.placeId}
        options={ownedPlaces.map(p => ({
          name: p.name[language] || p.name[Language.PL],
          value: p.id
        }))}
        onChange={(value: string) => setFormValue('placeId', value)}
        disabled={ownedPlaces.length <= 1}
      />

      {type === 'internal' && (
        <FormGroup>
          <Label>
            <TranslatedText value="announcementTitle" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextInput
            id="title"
            type="text"
            placeholder="Title"
            required
            value={formData.title}
            onChange={e => setFormValue('title', e.target.value)}
          />
        </FormGroup>
      )}
      <FormGroup>
        <Label>
          <TranslatedText value="announcementMessage" />
          <RequiredDecorator>*</RequiredDecorator>
        </Label>
        <TextArea
          id="message"
          placeholder="Message"
          required
          value={formData.message}
          onChange={e => setFormValue('message', e.target.value)}
        />
      </FormGroup>
      {type === 'internal' && (
        <FormGroup>
          <Label>
            <TranslatedText value="announcementContact" />
            <RequiredDecorator>*</RequiredDecorator>
          </Label>
          <TextArea
            id="contactInfo"
            placeholder="Contact info"
            required
            value={formData.contactInfo}
            onChange={e => setFormValue('contactInfo', e.target.value)}
          />
        </FormGroup>
      )}

      {type === 'internal' && (
        <>
          <FormGroup isRelative>
            <Label>
              <TranslatedText value="announcementStartDate" />
              <RequiredDecorator>*</RequiredDecorator>
            </Label>
            <TextInput
              id="announcementStartDate"
              type="text"
              placeholder="Start date"
              autoComplete="off"
              required
              value={formData.startDate ? formatDate(formData.startDate) : ''}
              onClick={() => setCurrentCalendar('start')}
              onChange={e => {
                if (e.target.value === '') {
                  setFormValue('startDate', '')
                }
              }}
            />
            {currentCalendar === 'start' && (
              <CalendarWrapper>
                <CalendarBox ref={calendarStartDateRef}>
                  <Calendar
                    minDate={new Date()}
                    maxDate={
                      formData.endDate ? new Date(formData.endDate) : undefined
                    }
                    onChange={(date: Date) => {
                      setCurrentCalendar(null)
                      setFormValue('startDate', date.toISOString())
                    }}
                  />
                </CalendarBox>
              </CalendarWrapper>
            )}
          </FormGroup>
          <FormGroup isRelative>
            <Label>
              <TranslatedText value="announcementEndDate" />
              <RequiredDecorator>*</RequiredDecorator>
            </Label>
            <TextInput
              id="announcementEndDate"
              type="text"
              placeholder="End date"
              required
              autoComplete="off"
              value={formData.endDate ? formatDate(formData.endDate) : ''}
              onClick={() => setCurrentCalendar('end')}
              onChange={e => {
                if (e.target.value === '') {
                  setFormValue('endDate', '')
                }
              }}
            />

            {currentCalendar === 'end' && (
              <CalendarWrapper>
                <CalendarBox ref={calendarEndDateRef}>
                  <Calendar
                    minDate={
                      formData.startDate
                        ? addDays(new Date(formData.startDate), 1)
                        : addDays(new Date(), 1)
                    }
                    onChange={(date: Date) => {
                      setCurrentCalendar(null)
                      setFormValue('endDate', date.toISOString())
                    }}
                  />
                </CalendarBox>
              </CalendarWrapper>
            )}
          </FormGroup>
        </>
      )}

      <ButtonWrapper>
        <Button type="submit">
          <TranslatedText value="save" />
        </Button>
        <br />
        <Button type="submit" onClick={() => setFormVisible(false)}>
          <TranslatedText value="cancel" />
        </Button>
        <br />
        {error && (
          <ErrorText>
            <TranslatedText value={error} />
          </ErrorText>
        )}
      </ButtonWrapper>
    </Form>
  )
}

export default AnnouncementForm

const Form = styled.form`
  width: 100%;
  ${breakpoint.sm`
  margin: 0 auto;
    max-width: 700px;
  `}
`

const StyledPanelButton = styled(PanelButton)`
  width: calc(100% - 4rem);
  margin: 2rem auto;
  max-width: 500px;

  ${breakpoint.sm`
    margin: 2rem auto;
  `}
`

const ButtonWrapper = styled.div`
  width: 100%;
  padding: 2.2rem 2rem 2rem;
`

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.red};
  text-align: center;
`

const CalendarBox = styled.div`
  border-radius: 10px;
  padding: 4px;
  background: rgb(241, 247, 255);
  box-shadow: 0 0 0 10000vmax rgba(0, 0, 0, 0.3);
`

const CalendarWrapper = styled.div`
  position: fixed;
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 900;

  .react-calendar {
    border: 1px solid rgba(241, 247, 255, 0.2);
    border-radius: 10px;
    z-index: 10000;
  }
`
