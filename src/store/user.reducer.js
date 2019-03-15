import { combineReducers } from 'redux'

const initialState = {
  // currentUser: { id: 1212313, name: 'thylle' },
  currentUser: null,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, currentUser: action.currentUser }

    default:
      return state
  }
}

export default combineReducers({
  user: userReducer,
})
