import React from 'react'
import Client from '@signalk/signalk-sdk'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './ui/app'
import { fetchData } from './store/ducks/signalk'

const client = new Client({
  hostname: '95.97.138.90',
  port: 3000,
  useTLS: false,
  reconnect: true
})

const store = configureStore(client)
let poller = null

const pollerFn = (firstRun) => {
  if (poller !== null) {
    clearTimeout(poller)
    poller = null
  }

  if (firstRun === true) {
    return client
      .connect()
      .then(() => {
        poller = setTimeout(() => pollerFn(), 250)
      })
      .catch(err => {
        console.log(`[App.js/pollerFn] First run error: ${err.message}`)
      })
  }

  store
    .dispatch(fetchData())
    .then(() => {
      console.log(`[App.js/pollerFn] Got data...`)
      poller = setTimeout(() => pollerFn(), 1000)
    })
    .catch(err => {
      console.log(`[App.js/pollerFn] Error: ${err.message}`)
      poller = setTimeout(() => pollerFn(), 1000)
    })
}

export default class AppContainer extends React.Component {
  componentWillMount () {
    pollerFn(true)
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
