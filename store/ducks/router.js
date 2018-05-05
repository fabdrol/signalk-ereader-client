export const SET_VIEW = 'essense/router/SET_VIEW'
export const SET_NIGHTMODE = 'essense/router/SET_NIGHTMODE'
export const SET_CONNECTED = 'essense/router/SET_CONNECTED'
export const SET_DISCONNECTED = 'essense/router/SET_DISCONNECTED'
export const SET_LOADING = 'essense/router/SET_LOADING'

export const defaultState = {
  view: 'home',
  nightmode: false,
  connected: false,
  loading: true,
  hostname: '95.97.138.90',
  port: 3000
}

export default function reducer (state = defaultState, action = {}) {
  const newState = {...state}

  switch (action.type) {
    case SET_VIEW:
      newState.view = action.payload
      return newState

    case SET_LOADING:
      newState.loading = !!action.payload
      return newState

    case SET_CONNECTED:
      newState.connected = true
      newState.hostname = action.payload.hostname
      newState.port = action.payload.port
      return newState

    case SET_DISCONNECTED:
      newState.connected = true
      return newState

    case SET_NIGHTMODE:
      newState.nightmode = action.payload
      return newState

    default:
      return newState
  }
}

export function setConnected (hostname, port) {
  return (dispatch, getState) => {
    dispatch(setView('home'))
    dispatch({
      type: SET_CONNECTED,
      payload: {
        hostname,
        port
      }
    })
  }
}

export function setLoading (payload) {
  return { type: SET_DISCONNECTED, payload }
}

export function setDisconnected () {
  return (dispatch, getState) => {
    dispatch({ type: SET_DISCONNECTED })
  }
}

export function setView (payload) {
  return (dispatch, getState) => {
    dispatch({ type: SET_VIEW, payload })
  }
}

export function setNightmode (payload) {
  return (dispatch, getState) => {
    dispatch({ type: SET_NIGHTMODE, payload })
  }
}
