import React from 'react'
import styled from 'styled-components/native'
import { setUser } from 'src/store/user.actions'
import { Text, View, TextInput, Button, StatusBar } from 'react-native'
import theme from 'src/styles/theme'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = state => {
  const { user } = state
  return { user }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser,
    },
    dispatch,
  )

class Intro extends React.Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogout() {
    this.props.setUser(null)
  }

  render() {
    let startDate = '4. december kl. 22:41'

    return (
      <Wrapper className="messages-intro">
        <StatusBar barStyle="light-content" />

        <Paragraph className="messages-intro-title">{this.props.currentUser.name}</Paragraph>
        {/* <Paragraph>Samtale startet d. {startDate}</Paragraph> */}

        <Logout onPress={this.handleLogout}>
          <Paragraph>log out</Paragraph>
        </Logout>
      </Wrapper>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Intro)

const Wrapper = styled.View`
  position: relative;
  width: 100%;
  padding: ${theme.safeAreaSpacing} ${theme.defaultSpacing} ${theme.defaultSpacing};
  background: ${theme.primary};
`

const Logout = styled.TouchableOpacity`
  position: absolute;
  top: ${theme.safeAreaSpacing};
  right: ${theme.defaultSpacing};
  border: 0;
  color: ${theme.primaryBgTextColor};
`

const Paragraph = styled.Text`
  color: ${theme.primaryBgTextColor};
  font-weight: bold;
`
