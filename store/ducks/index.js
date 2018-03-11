import { combineReducers } from 'redux'
import router, { initialState as routerInitialState } from './router'
import signalk, { initialState as signalkInitialState } from './signalk'

export const initialState = {
  router: routerInitialState,
  signalk: signalkInitialState
}

export default combineReducers({
  router,
  signalk
})
