/**
 * SKEReader
 */

import React from 'react'
import config from '../../config'

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Switch,
  AsyncStorage,
  Button
} from 'react-native'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      mode: '',
      hostname: '',
      port: '',
      defaultServer: false,
      common: [
        { key: 'l0', kind: 'server', label: 'X-Miles', hostname: '192.168.1.1', port: 3000 },
        { key: 'l1', kind: 'server', label: 'Signalk.org', hostname: 'demo.signalk.org', port: 80 },
        { key: 'l3', kind: 'server', label: 'Decipher HQ', hostname: '95.97.138.90', port: 3000 },
        { key: 'l4', kind: 'add', label: '+ Add new server' }
      ]
    }
  }

  handleSetConnection (server) {
    if (server.kind === 'add') {
      this.setState({ mode: 'add' })
      return
    }

    this.setState({
      mode: 'connect',
      hostname: server.hostname,
      port: String(server.port),
      defaultServer: false
    })
  }

  connect () {
    if (typeof this.state.hostname !== 'string' || this.state.hostname.trim() === '') {
      return
    }

    if (typeof this.state.port !== 'string' || this.state.port.trim() === '') {
      return
    }

    const state = { ...this.state }

    if (this.state.defaultServer === true) {
      Promise
        .all([
          AsyncStorage.setItem(`${config.storageKey}/hostname`, state.hostname),
          AsyncStorage.setItem(`${config.storageKey}/port`, state.port)
        ])
        .then(() => {
          this.props.setConnected(state.hostname, parseInt(state.port, 10))
        })
        .catch(err => {
          console.warn(`[AsyncStorage] error: ${err.message}`)
        })
    } else {
      this.props.setConnected(state.hostname, parseInt(state.port, 10))
    }
  }

  render () {
    let content = null

    if (this.props.loading === false && this.state.mode !== '') {
      content = (
        <View>
          <Text style={styles.h1}>{this.state.mode === 'add' ? '+ Add new server' : 'Connect to server'}</Text>

          <TextInput
            style={styles.formControl}
            onChangeText={(text) => this.setState({ hostname: String(text).toLowerCase() })}
            value={this.state.hostname}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='email-address'
            placeholder='Server hostname/IP'
          />

          <TextInput
            style={[ styles.formControl, { marginTop: 30 } ]}
            onChangeText={(text) => this.setState({ port: String(text).toLowerCase() })}
            value={this.state.port}
            autoCorrect={false}
            autoCapitalize='none'
            keyboardType='numeric'
            placeholder='Server port'
          />

          <View style={styles.switchWrapper}>
            <Text style={styles.switchLabel}>Connect automatically: {this.state.defaultServer ? 'yes' : 'no'}</Text>
            <Switch
              style={styles.switchControl}
              onValueChange={value => this.setState({ defaultServer: value })}
              value={this.state.defaultServer}
            />
          </View>

          <Button title='Connect' color='#841584' onPress={() => this.connect()} />
        </View>
      )
    }

    if (this.props.loading === true) {
      return (
        <View style={styles.container}>
          <Text style={styles.loading}>Loading...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <FlatList
            data={this.state.common}
            renderItem={item => {
              return (
                <TouchableOpacity style={styles.listItemWrapper} onPress={() => this.handleSetConnection(item.item)}>
                  <Text style={styles.listItem}>{item.item.label}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
        <View style={styles.viewContainer}>
          {content}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'black',
    fontSize: 24,
    marginTop: 150
  },

  pre: {
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'left',
    fontSize: 12,
    lineHeight: 18,
    paddingHorizontal: 30,
    paddingVertical: 30,
    fontFamily: 'monospace'
  },

  switchWrapper: {
    width: '100%',
    height: 30,
    marginTop: 30,
    marginBottom: 50
  },

  switchLabel: {
    width: '50%',
    color: '#000',
    backgroundColor: 'transparent',
    height: 30,
    lineHeight: 30,
    position: 'absolute',
    top: 0,
    left: 0
  },

  switchControl: {
    position: 'absolute',
    top: 5,
    right: 0
  },

  formControl: {
    fontSize: 18,
    fontFamily: 'monospace'
  },

  h1: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 40
  },

  listItemWrapper: {
    width: '100%',
    height: 70
  },

  listItem: {
    width: '100%',
    height: 70,
    lineHeight: 70,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    color: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF'
  },

  listContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '35%',
    height: '100%',
    borderRightWidth: 2,
    borderRightColor: '#000'
  },

  viewContainer: {
    position: 'absolute',
    left: '35%',
    top: 0,
    width: '65%',
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 30
  }
})
