/**
 * SKEReader
 */

import React from 'react'
import sendIntent from 'react-native-send-intent'
import exitApp from 'react-native-exit-app'

export const POWER_MENU_BUNDLE_ID = 'com.nkming.powermenu'

import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Switch,
  Button,
  Alert
} from 'react-native'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      nav: [
        { key: '01', label: 'Overzicht (6x)', view: 'g6', disabled: false },
        { key: '02', label: 'Overzicht (4x)', view: 'g4', disabled: false },
        { key: '03', label: 'Kompas', view: 2 },
        { key: '04', label: 'Koers', view: 4 },
        { key: '05', label: 'Koers, gecombineerd', view: 9, disabled: false },
        { key: '05', label: 'Snelheid', view: 3 },
        { key: '07', label: 'Snelheid, gecombineerd', view: 8, disabled: false },
        { key: '08', label: 'Wind', view: 7, disabled: false },
        { key: '09', label: 'Diepgang', view: 5, disabled: false },
        { key: '10', label: 'Positie', view: 1, disabled: false },
        { key: '11', label: 'Temperatuur', view: 6, disabled: false }
      ]
    }
  }

  openPowerMenu () {
    sendIntent
      .isAppInstalled(POWER_MENU_BUNDLE_ID)
      .then(isInstalled => {
        if (!isInstalled) {
          return null
        }

        return sendIntent.openApp(POWER_MENU_BUNDLE_ID)
      })
      .then(result => {
        if (result === null) {
          // App is not installed.
          Alert.alert(
            'App niet beschikbaar',
            'De app "Power Menu (root)" is niet geïnstalleerd.',
            [{ text: 'OK', onPress: () => true }],
            { cancelable: false }
          )
        }
      })
      .catch(err => {
        console.warn(`Error running intent: ${err.message}`)
      })
  }

  killDevice () {
    Alert.alert(
      'Weet je het zeker?',
      'Als je doorgaat kun je het apparaat helemaal afsluiten.',
      [
        { text: 'Annuleer', onPress: () => true, style: 'cancel' },
        { text: 'OK', onPress: () => this.openPowerMenu() }
      ],
      { cancelable: false }
    )
  }

  render () {
    const length = Math.ceil(this.state.nav.length / 2)
    const listA = this.state.nav.slice(0, length)
    const listB = this.state.nav.slice(length)
    const nightmode = this.props.nightmode

    return (
      <View style={[ styles.container, nightmode ? styles.containerNightmode : null ]}>
        <View style={styles.viewContainer}>
          <View>
            <Text style={styles.h1}>X-Miles</Text>
            {(this.props.loading) ? <Text style={[ styles.pre, nightmode ? styles.preNightmode : null ]}>Verbonden.</Text> : <Text style={[ styles.pre, nightmode ? styles.preNightmode : null ]}>Momentje, verbinding maken...</Text>}
            {(!this.props.connected && !this.props.loading) ? null : <Text style={[ styles.pre, nightmode ? styles.preNightmode : null ]}>Server: {this.props.hostname}:{this.props.port}</Text>}
            <View style={styles.spacer} />
            <View style={styles.switchWrapper}>
              <Text style={[ styles.switchLabel, nightmode ? styles.switchLabelNightmode : null ]}>Omdraaien</Text>
              <Switch
                style={styles.switchControl}
                onValueChange={value => this.props.swapLandscape()}
                value={this.props.landscape === 'RIGHT'}
              />
            </View>
            <View style={styles.switchWrapper}>
              <Text style={[ styles.switchLabel, nightmode ? styles.switchLabelNightmode : null ]}>Nachtmodus</Text>
              <Switch
                style={styles.switchControl}
                onValueChange={value => this.props.setNightmode(value)}
                value={this.props.nightmode}
              />
            </View>
            <View style={{ width: '100%', height: 10 }} />
            <Button title='Verbinding' color={nightmode ? '#999' : '#000'} onPress={() => this.props.setView('connection')} />
            <View style={{ width: '100%', height: 10 }} />
            <Button title='Apps' color={'#999'} onPress={() => this.props.setView('apps')} />
            <View style={{ width: '100%', height: 10 }} />
            <Button title='Power off' color={'#999'} onPress={() => this.killDevice()} />
          </View>
        </View>

        <View style={[ styles.listContainerA, nightmode ? styles.listContainerNightmode : null ]}>
          <FlatList
            data={listA}
            renderItem={item => {
              if (item.item.disabled === true) {
                return (
                  <View style={styles.listItemWrapper}>
                    <Text style={[ styles.listItemDisabled, nightmode ? styles.listItemDisabledNightmode : null ]}>{item.item.label}</Text>
                  </View>
                )
              }

              return (
                <TouchableOpacity style={styles.listItemWrapper} onPress={() => this.props.setView(item.item.view)}>
                  <Text style={[ styles.listItem, nightmode ? styles.listItemNightmode : null ]}>{item.item.label}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>

        <View style={[ styles.listContainerB, nightmode ? styles.listContainerNightmode : null ]}>
          <FlatList
            data={listB}
            renderItem={item => {
              if (item.item.disabled === true) {
                return (
                  <View style={styles.listItemWrapper}>
                    <Text style={[ styles.listItemDisabled, nightmode ? styles.listItemDisabledNightmode : null ]}>{item.item.label}</Text>
                  </View>
                )
              }

              return (
                <TouchableOpacity style={styles.listItemWrapper} onPress={() => this.props.setView(item.item.view)}>
                  <Text style={[ styles.listItem, nightmode ? styles.listItemNightmode : null ]}>{item.item.label}</Text>
                </TouchableOpacity>
              )
            }}
          />
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
    paddingBottom: 10,
    fontFamily: 'monospace'
  },

  preNightmode: {
    color: '#fff'
  },

  switchWrapper: {
    width: '100%',
    height: 30,
    marginBottom: 10
  },

  switchLabel: {
    width: '60%',
    color: '#000',
    backgroundColor: 'transparent',
    height: 30,
    lineHeight: 35,
    position: 'absolute',
    top: 0,
    left: 0
  },

  switchLabelNightmode: {
    color: '#fff'
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
    marginBottom: 40,
    color: '#999'
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

  listItemNightmode: {
    color: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  listItemDisabled: {
    width: '100%',
    height: 70,
    lineHeight: 70,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    color: '#cccccc',
    borderBottomWidth: 1,
    borderBottomColor: '#000'
  },

  listItemDisabledNightmode: {
    color: '#666',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },

  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF'
  },

  containerNightmode: {
    backgroundColor: '#000000'
  },

  listContainerA: {
    position: 'absolute',
    left: '30%',
    top: 0,
    width: '35%',
    height: '100%',
    borderLeftWidth: 2,
    borderLeftColor: '#000'
  },

  listContainerB: {
    position: 'absolute',
    left: '65%',
    top: 0,
    width: '35%',
    height: '100%',
    borderLeftWidth: 2,
    borderLeftColor: '#000'
  },

  listContainerNightmode: {
    borderLeftWidth: 2,
    borderLeftColor: '#eee'
  },

  viewContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '30%',
    height: '100%',
    paddingHorizontal: 30,
    paddingVertical: 30
  },

  spacer: {
    width: '100%',
    height: '20%'
  }
})
