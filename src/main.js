import React from 'react'
import { connect } from 'react-redux'
import Login from 'src/components/login'

import MessageCenter from './components/message-center'

const mapStateToProps = state => {
  const { user } = state
  return { user }
}

class Main extends React.Component {
  render() {
    console.disableYellowBox = true
    const { currentUser } = this.props.user

    if (!currentUser) {
      return <Login />
    } else {
      return <MessageCenter currentUser={currentUser} />
    }
  }
}

export default connect(mapStateToProps)(Main)
