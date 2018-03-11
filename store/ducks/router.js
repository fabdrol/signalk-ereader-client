export const SET_VIEW = 'essense/router/SET_VIEW'
export const SET_NIGHTMODE = 'essense/router/SET_NIGHTMODE'

export const defaultState = {
  view: 'g6',
  nightmode: false
}

export default function reducer (state = defaultState, action = {}) {
  const newState = {...state}

  switch (action.type) {
    case SET_VIEW:
      newState.view = action.payload
      return newState

    case SET_NIGHTMODE:
      newState.nightmode = action.payload
      return newState

    default:
      return newState
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
