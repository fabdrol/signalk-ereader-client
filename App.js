import React from 'react'
import Client from '@signalk/signalk-sdk'
import { Provider } from 'react-redux'
import configureStore from './store'
import App from './ui/app'
import { applyDelta } from './store/ducks/signalk'

const client = new Client({
  hostname: 'localhost',
  port: 3000,
  useTLS: false,
  reconnect: true
})

const subscription = {
  context: 'vessels.self',
  subscribe: [{ path: '*' }]
}

const store = configureStore(client)

client.on('delta', delta => {
  store.dispatch(applyDelta(delta))
})

client
  .connect()
  .then(() => {
    client.subscribe(subscription)
  })
  .catch(err => {
    console.log('[Signal K client] error: ' + err.message)
  })

export default class AppContainer extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}
