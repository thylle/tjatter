// import firebase from 'react-native-firebase'
import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyClojKrtuYAZuQya3HRfbeR7qPf9Hy6mN0',
  authDomain: 'chat-app-2b0ca.firebaseapp.com',
  databaseURL: 'https://chat-app-2b0ca.firebaseio.com',
  projectId: 'chat-app-2b0ca',
  storageBucket: 'chat-app-2b0ca.appspot.com',
  messagingSenderId: '449120559827',
}

var init = firebase.initializeApp(config)

export default init
