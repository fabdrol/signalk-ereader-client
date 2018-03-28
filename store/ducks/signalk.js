import { get } from 'lodash'

export const SET_DATA = 'essense/signalk/SET_DATA'
export const CLEAR_DATA = 'essense/signalk/CLEAR_DATA'
export const FETCH_DATA = 'essense/signalk/FETCH_DATA'
export const SET_FETCHING = 'essense/signalk/SET_FETCHING'
export const SET_FETCHED = 'essense/signalk/SET_FETCHED'
export const APPLY_DELTA = 'essense/signalk/APPLY_DELTA'

export const metrics = {
  speedThroughWater: {
    input: 'ms',
    output: 'knots',
    label: 'Speed (through water)',
    unit: ''
  },

  speedOverGround: {
    input: 'ms',
    output: 'knots',
    label: 'Speed (over ground)',
    unit: ''
  },

  windSpeedTrue: {
    input: 'ms',
    output: 'knots',
    label: 'Wind speed (true)',
    unit: ''
  },

  windSpeedApparent: {
    input: 'ms',
    output: 'knots',
    label: 'Wind speed (apparent)',
    unit: ''
  },

  courseOverGround: {
    input: 'rad',
    output: 'deg',
    label: 'Course (over ground)',
    unit: '°'
  },

  headingTrue: {
    input: 'rad',
    output: 'deg',
    label: 'Heading (true)',
    unit: '°'
  },

  headingMagnetic: {
    input: 'rad',
    output: 'deg',
    label: 'Heading (magnetic)',
    unit: '°'
  },

  windAngleApparent: {
    input: 'rad',
    output: 'deg',
    label: 'Wind angle (apparent)',
    unit: '°'
  },

  windAngleTrue: {
    input: 'rad',
    output: 'deg',
    label: 'Wind angle (true)',
    unit: '°'
  },

  depthBelowTransducer: {
    input: null,
    output: null,
    label: 'Depth (below transducer)',
    unit: ''
  },

  depthBelowKeel: {
    input: null,
    output: null,
    label: 'Depth (below keel)',
    unit: ''
  },

  waterTemperature: {
    input: 'k',
    output: 'c',
    label: 'Water temperature',
    unit: ''
  },

  insideTemperature: {
    input: 'k',
    output: 'c',
    label: 'Inside temperature',
    unit: ''
  },

  batteryVoltage: {
    input: null,
    output: null,
    label: 'Battery (voltage)',
    unit: ''
  },

  batteryCurrent: {
    input: null,
    output: null,
    label: 'Battery (current)',
    unit: ''
  },

  batteryTemperature: {
    input: null,
    output: null,
    label: 'Battery (temperature)',
    unit: ''
  },

  batteryStateOfCharge: {
    input: null,
    output: null,
    label: 'Battery (state-of-charge)',
    unit: '%'
  }
}

export const MAPPING = {
  longitude: 'navigation.position.value.longitude',
  latitude: 'navigation.position.value.latitude',
  speedThroughWater: 'navigation.speedThroughWater.value',
  speedOverGround: 'navigation.speedOverGround.value',
  courseOverGround: 'navigation.courseOverGroundTrue.value',
  headingTrue: 'navigation.headingTrue.value',
  depthBelowTransducer: 'environment.depth.belowTransducer.value',
  depthBelowKeel: 'environment.depth.belowKeel.value',
  waterTemperature: 'environment.water.temperature.value',
  insideTemperature: 'environment.inside.temperature.value',
  time: 'environment.time',
  batteryVoltage: 'electrical.batteries.0.voltage.value',
  batteryTimeRemaining: 'electrical.batteries.0.capacity.remaining.value',
  batteryCurrent: 'electrical.batteries.0.current.value',
  batteryTemperature: 'electrical.batteries.0.temperature.value',
  batteryStateOfCharge: 'electrical.batteries.0.capacity.stateOfCharge.value',
  windSpeedApparent: 'environment.wind.speedApparent.value',
  windAngleApparent: 'environment.wind.angleApparent.value',
  windSpeedTrue: 'environment.wind.speedTrue.value',
  windAngleTrue: 'environment.wind.angleTrue.value'
}

export const defaultState = {
  longitude: 0,
  latitude: 0,
  time: new Date().toISOString(),
  speedThroughWater: -999,
  speedOverGround: -999,
  courseOverGround: -999,
  headingTrue: -999,
  depthBelowTransducer: -999,
  depthBelowKeel: -999,
  batteryVoltage: -999,
  batteryTimeRemaining: -999,
  batteryCurrent: -999,
  batteryTemperature: -999,
  batteryStateOfCharge: -999,
  windSpeedApparent: -999,
  windAngleApparent: -999,
  windSpeedTrue: -999,
  windAngleTrue: -999,
  fetched: false,
  fetching: false,
  error: null
}

export default function reducer (state = defaultState, action = {}) {
  const newState = {...state}

  switch (action.type) {
    case CLEAR_DATA:
      return {...defaultState}

    case SET_FETCHING:
      newState.fetched = false
      newState.fetching = true
      newState.error = null
      return newState

    case SET_FETCHED:
      newState.fetched = true
      newState.fetching = false

      if (action.error && typeof action.error === 'string') {
        newState.error = action.error
      }
      return newState

    case SET_DATA:
      newState[action.key] = action.value
      return newState

    case APPLY_DELTA:
      const key = findKey(action.path)
      if (key !== null) {
        newState[key] = action.value
      }
      return newState

    default:
      return newState
  }
}

export function setData (key, value) {
  return {
    type: SET_DATA,
    key,
    value
  }
}

export function clearData (key, value) {
  return {
    type: CLEAR_DATA
  }
}

export function setFetching () {
  return { type: SET_FETCHING }
}

export function setFetched (error) {
  return { type: SET_FETCHED, error }
}

export function applyDelta (payload) {
  return dispatch => {
    if (isObject(payload) && Array.isArray(payload.updates)) {
      payload.updates.forEach(update => {
        if (isObject(update) && Array.isArray(update.values)) {
          update.values.forEach(value => {
            dispatch({
              type: APPLY_DELTA,
              path: value.path,
              value: value.value
            })
          })
        }
      })
    }
  }
}

export function fetchData () {
  return (dispatch, getState, Client) => {
    dispatch(setFetching())

    return Client
      .API()
      .then(api => api.self())
      .then(data => {
        console.log('GOT DATA', data)
        Object
          .keys(MAPPING)
          .forEach(key => {
            const value = get(data, MAPPING[key], 0)
            dispatch(setData(key, value))
          })

        dispatch(setFetched())
      })
      .catch(err => {
        console.log(`[store/ducks/signalk.fetchData] error: ${err.message}`)
        dispatch(setFetched(err.message))
      })
  }
}

function isObject (mixed) {
  return (mixed && typeof mixed === 'object')
}

function findKey (path) {
  if (path.indexOf('position') !== -1) {
    console.log('PATH', path)
  }

  return Object.keys(MAPPING).reduce((found, key) => {
    const mpath = MAPPING[key].replace('.value', '')
    if (mpath === path) {
      found = key
    }
    return found
  }, null)
}
