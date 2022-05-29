import styled from 'styled-components'
import { SyntheticEvent, useState } from 'react'
import sanitize from 'sanitize-html'

import { FormGroup, Label, TextArea } from '../../components/forms'
import TranslatedText from '../../components/TranslatedText'
import { AnnouncementComment } from '../../types/types'
import { formatDateWithTime } from '../../utils/date'
import Button from '../../components/Button'
import { ChatIcon } from './ChatIcon'
import { useAnnouncementsContext } from '../../contexts/announcementsContext'

const Comments = ({
  comments,
  announcementId
}: {
  comments: AnnouncementComment[]
  announcementId: string
}) => {
  const { submitComment, fetchAnnouncements } = useAnnouncementsContext()

  const [comment, setComment] = useState('')
  const [commentsVisible, setCommentsVisible] = useState(false)

  const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!comment) {
      return
    }

    const commentDto = {
      internalAnnouncementId: announcementId,
      message: comment
    }

    await submitComment(commentDto)
    await fetchAnnouncements()
    setComment('')
  }

  const toggleComments = () => {
    setCommentsVisible(!commentsVisible)
  }

  return (
    <Wrapper>
      <Toggle role="button" onClick={toggleComments}>
        <TranslatedText
          value={commentsVisible ? 'hideComments' : 'showComments'}
        />{' '}
        ({comments.length})
      </Toggle>
      {commentsVisible && (
        <>
          {comments.map(c => (
            <CommentWrapper>
              <Icon>
                <ChatIcon />
              </Icon>
              <div>
                <TextCreated>
                  <TranslatedText value="addedAt" />{' '}
                  {formatDateWithTime(c.updatedAt)}
                </TextCreated>
                <Text>{sanitize(c.message)}</Text>
              </div>
            </CommentWrapper>
          ))}
          <Form onSubmit={onSubmit}>
            <StyledFormGroup>
              <Label>
                <TranslatedText value="addComment" />
              </Label>
              <TextArea
                id="commentMessage"
                placeholder="Comment"
                required
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </StyledFormGroup>
            <StyledButton
              type="submit"
              disabled={!comment || comment.length < 5}
            >
              <TranslatedText value="save" />
            </StyledButton>
          </Form>
        </>
      )}
    </Wrapper>
  )
}

export default Comments

const StyledFormGroup = styled(FormGroup)`
  padding: 0;
`

const Wrapper = styled.div`
  margin-top: 0.2rem;
`

const Toggle = styled.div`
  display: inline-flex;
  align-items: center;
  min-height: 42px;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`

const StyledButton = styled(Button)`
  max-width: 120px;
  height: 2.5rem;
  margin-bottom: 2rem;
`

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(0, 118, 255, 0.2);
  &:last-of-type {
    border: none;
  }
`

const Icon = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;

  svg {
    margin: 0 aut;
    width: auto;
    height: 30px;
    margin-right: 0.6rem;
    fill: ${({ theme }) => theme.colors.blue};
    opacity: 0.6;
  }
`

const Text = styled.div`
  white-space: pre-line;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.grey600};
`

const TextCreated = styled(Text)`
  font-size: 0.78rem;
  margin-bottom: 0.5rem;
`

const Form = styled.form`
  margin-top: 2rem;
  label {
    font-size: 0.9rem;
  }
`
