import React from 'react'
import { Provider } from 'react-redux'
import Main from './src/main'
import store from './src/store'
import styled from 'styled-components/native'
import theme from 'src/styles/theme'
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Wrapper>
          <Main />
        </Wrapper>
      </Provider>
    )
  }
}

const Wrapper = styled.View`
  width: 100%;
  min-height: 100%;
  background: ${theme.bodyBg};
`
