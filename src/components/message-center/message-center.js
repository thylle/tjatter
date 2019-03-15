import React, { Component } from 'react'
import Intro from '../intro'
import Message from '../message'
import Firebase from 'src/firebase-config'
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import { Text, View, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native'
import theme from 'src/styles/theme'

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

class MessageCenter extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      inputWidth: 200,
      currentMessageKey: '',
      messages: [],
    }

    this.firstLoad = true
    this.latestMessageKey = null
    this.messageLimit = 20
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.messageRef = Firebase.database()
      .ref()
      .child('messages')

    this.listenMessages()
  }

  listenMessages() {
    this.messageRef.limitToLast(this.messageLimit).on('value', snapshot => {
      let val = snapshot.val()
      if (val) {
        this.setState({
          messages: Object.values(val),
        })

        let lastItem = this.state.messages[this.state.messages.length - 1]
        if (lastItem) {
          //If the key is different it means a new message is in and that means we should scroll.
          if (
            this.firstLoad ||
            (lastItem && lastItem.userId !== this.props.currentUser.id && this.latestMessageKey !== lastItem.key)
          ) {
            this.firstLoad = false
            this.latestMessageKey = lastItem.key
          }
        }
      }
    })
  }

  handleChange(text) {
    if (this.state.currentMessageKey) {
      this.updateData(text)
    } else {
      this.sendData(text)
    }
  }

  handleSubmit(e) {
    e.preventDefault()

    if (!this.state.inputValue) return

    let ref = Firebase.database()
      .ref()
      .child('messages/' + this.state.currentMessageKey)

    let newMessage = {
      completed: true,
    }

    ref.update(newMessage)

    this.setState({
      inputValue: '',
      currentMessageKey: '',
    })

    setTimeout(() => {
      this.scrollToBottom()
    }, 100)
  }

  updateData(value) {
    let ref = Firebase.database()
      .ref()
      .child('messages/' + this.state.currentMessageKey)
    let newMessage = {
      text: value,
    }

    ref.update(newMessage)

    this.setState({ inputValue: value })
  }

  sendData(value) {
    let newRef = this.messageRef.push()
    let newMessage = {
      key: newRef.key,
      completed: false,
      userId: this.props.currentUser.id,
      name: this.props.currentUser.name,
      text: value,
    }

    newRef.set(newMessage)

    this.setState({
      inputValue: value,
      currentMessageKey: newRef.key,
    })
  }

  onEnterPress = e => {
    this.handleSubmit(e)
  }

  scrollToBottom = () => {
    // this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
  }

  render() {
    return (
      <MessagesContainer behavior="padding" enabled>
        <Intro currentUser={this.props.currentUser} />

        <ScrollView
          ref={ref => (this.scrollView = ref)}
          onContentSizeChange={() => {
            this.scrollView.scrollToEnd({ animated: true })
          }}
          onLayout={() => this.scrollView.scrollToEnd({ animated: true })}
        >
          <MessageList>
            {this.state.messages.map(item => (
              <Message item={item} currentUser={this.props.currentUser} key={item.key} />
            ))}
          </MessageList>
        </ScrollView>

        <MessageInputContainer>
          <Input
            value={this.state.inputValue}
            blurOnSubmit={false}
            onChangeText={text => this.handleChange(text)}
            onSubmitEditing={this.onEnterPress}
            placeholder="Start typing here..."
            placeholderTextColor={theme.textColor}
          />
        </MessageInputContainer>
      </MessagesContainer>

      // <div className="app-container">
      //   <div className="messages-container">
      //     <Intro currentUser={this.props.currentUser} />

      //     <div className="messages-list">
      //       {this.state.messages.map(item => (
      //         <Message item={item} currentUser={this.props.currentUser} key={item.key} />
      //       ))}
      //     </div>
      //   </div>

      //   <form className="message-input-container" onSubmit={this.handleSubmit}>
      //     <div className="input-container">
      //       <textarea
      //         className="textarea"
      //         placeholder="start typing here..."
      //         value={this.state.inputValue}
      //         onChange={this.handleChange.bind(this)}
      //         onKeyDown={this.onEnterPress.bind(this)}
      //       />
      //     </div>

      //     <div className="button-container">
      //       <span className="byline">Everything you type will be visible.</span>
      //       <button type="submit">Send</button>
      //     </div>
      //   </form>
    )
  }
}

export default connect(mapStateToProps)(MessageCenter)

const MessagesContainer = styled.KeyboardAvoidingView`
  flex: 1;
  min-height: 100%;
  width: 100%;
`

const MessageList = styled.View`
  padding: ${theme.defaultSpacing};
  padding-bottom: 0;
`

const MessageInputContainer = styled.View`
  height: ${theme.inputAreaHeight};
  padding: ${theme.defaultSpacingXs} ${theme.defaultSpacing} ${theme.defaultSpacing};
  background: ${theme.messagesBg};
`

const Input = styled.TextInput`
  width: 250px;
  height: 38px;
  padding: ${theme.defaultSpacingSm};
  align-self: flex-end;
  border: 0;
  font-weight: bold;
  border-radius: ${theme.borderRadiusDefault};
  color: ${theme.textColor};
  background: ${theme.white};
`
