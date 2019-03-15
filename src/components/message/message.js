import React from 'react'
import theme from 'src/styles/theme'
import styledComponent from 'styled-components/native'

class Message extends React.Component {
  renderName() {
    let item = this.props.item
    let currentUser = this.props.currentUser
    let isCurrentUser = item.userId === currentUser.id

    if (!isCurrentUser) {
      return <Bold> {item.name}: </Bold>
    }
  }

  render() {
    let item = this.props.item
    let currentUser = this.props.currentUser
    let isCurrentUser = item.userId === currentUser.id
    let isCurrentUserMessage = item.userId === currentUser.id

    if (!isCurrentUser || item.completed) {
      return (
        <SingleMessage
          style={{
            alignSelf: isCurrentUserMessage ? 'flex-end' : 'flex-start',
            backgroundColor: isCurrentUserMessage ? theme.primary : theme.singleMessageBg,
            color: isCurrentUserMessage ? theme.primaryBgTextColor : theme.textColor,
          }}
        >
          {this.renderName()} {item.text}
        </SingleMessage>
      )
    }

    return null
  }
}

export default Message

const SingleMessage = styledComponent.Text`
  align-self: flex-start
  min-width: 30px;
  max-width: ${theme.messageMaxWidth};
  margin-bottom: ${theme.defaultSpacingSm};
  padding: ${theme.defaultSpacingSm} ${theme.defaultSpacingXs};
  border-radius: ${theme.borderRadiusDefault};
  color: ${theme.textColor};
  overflow: hidden;
  background: ${theme.singleMessageBg};
`

const Bold = styledComponent.Text`
  font-weight: bold;
`
