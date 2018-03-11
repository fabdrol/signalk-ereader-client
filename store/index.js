import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import reducers, { initialState } from './ducks'

export default function configureStore (API) {
  return createStore(
    reducers,
    initialState,
    applyMiddleware(thunk.withExtraArgument(API))
  )
}
