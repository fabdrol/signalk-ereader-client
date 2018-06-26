import React from 'react'
import { AsyncStorage } from 'react-native'
import Client from '@signalk/signalk-sdk'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './ui/app'
import config from './config'
import { fetchData } from './store/ducks/signalk'
import { setConnected, setLoading, setLandscape } from './store/ducks/router'

const client = new Client({
  hostname: '192.168.0.100',
  port: 3000,
  useTLS: false,
  reconnect: true
})

const timeout = 500
const store = configureStore(client)
let poller = null

const pollerFn = (firstRun) => {
  if (poller !== null) {
    clearTimeout(poller)
    poller = null
  }

  Promise
    .all([
      AsyncStorage.getItem(`${config.storageKey}/hostname`),
      AsyncStorage.getItem(`${config.storageKey}/port`)
    ])
    .then(results => {
      const hostname = results[0] || ''
      const port = results[1] || ''
      store.dispatch(setLoading(false))

      if (store.getState().router.connected === false && hostname !== '' && port !== '') {
        store.dispatch(setConnected(hostname, port))
        poller = setTimeout(() => pollerFn(true), 100)
        return
      }

      if (store.getState().router.connected === false) {
        poller = setTimeout(() => pollerFn(true), 100)
        return
      }

      if (firstRun === true) {
        return client
          .set('hostname', store.getState().router.hostname)
          .set('port', store.getState().router.port)
          .connect()
          .then(() => {
            // console.warn(`Connected to: ${store.getState().router.hostname}:${store.getState().router.port}`)
            poller = setTimeout(() => pollerFn(), 100)
          })
          .catch(err => {
            console.log(`[App.js/pollerFn] First run error: ${err.message}`)
          })
      }

      store
        .dispatch(fetchData())
        .then(() => {
          console.log(`[App.js/pollerFn] Got data...`)
          poller = setTimeout(() => pollerFn(), timeout)
        })
        .catch(err => {
          console.log(`[App.js/pollerFn] Error: ${err.message}`)
          poller = setTimeout(() => pollerFn(), timeout)
        })
    })
    .catch(err => {
      console.warn(`[AsyncStorage] error: ${err.message}`)
    })
}

export default class AppContainer extends React.Component {
  componentWillMount () {
    pollerFn(true)
  }

  componentDidMount () {
    AsyncStorage
      .getItem(`${config.storageKey}/landscape`)
      .then(direction => {
        if (direction !== 'LEFT' && direction !== 'RIGHT') {
          throw new Error('No valid direction set...')
        }

        store.dispatch(setLandscape(direction))
      })
      .catch(() => store.dispatch(setLandscape('LEFT')))
  }

  componentWillUnmount () {
    if (poller !== null) {
      clearTimeout(poller)
      poller = null
    }
  }

  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
