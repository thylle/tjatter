import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { setUser } from 'src/store/user.actions'
import AppConstants from 'src/constants/app-constants'
import styled from 'styled-components/native'
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native'
import theme from 'src/styles/theme'
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

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(e) {
    e.preventDefault()
    //add currentuser to state and local storage
    let newUser = { id: this.generateId(), name: this.state.userName }
    // this.saveUserInLS(newUser)
    this.props.setUser(newUser)
  }

  generateId() {
    var text = ''
    var possible = '012345678901234567891'

    for (var i = 0; i < 10; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

    return parseInt(text)
  }

  saveUserInLS(user) {
    localStorage.setItem(AppConstants.localStorage.user, JSON.stringify(user))
  }

  render() {
    return (
      <LoginContainer behavior="padding" enabled>
        <Input
          value={this.state.userName}
          onChangeText={text => this.setState({ userName: text })}
          onSubmitEditing={this.handleLogin}
          placeholder="Choose username"
          placeholderTextColor={theme.textColor}
          // autoFocus={true}
        />

        <Button
          style={{ opacity: !this.state.userName ? 0.5 : 1 }}
          disabled={!this.state.userName}
          onPress={this.handleLogin}
        >
          <ButtonText>Start chatting</ButtonText>
        </Button>
      </LoginContainer>
    )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login)

const LoginContainer = styled.KeyboardAvoidingView`
  display: flex;
  width: 100%;
  min-height: 100%;
  justify-content: center;
`

const Input = styled.TextInput`
  width: 190px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding: 5px;
  text-align: center;
  font-size: 20px;
`
const Button = styled.TouchableOpacity`
  margin: 0 auto;
  padding: 15px 30px;
  border-radius: 8px;
  background: ${theme.primary};
`

const ButtonText = styled.Text`
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
  color: ${theme.primaryBgTextColor};
`
