/**
 * SKEReader
 */

import React from 'react'
import sendIntent from 'react-native-send-intent'

import {
  StyleSheet,
  View,
  NativeModules,
  Text,
  Switch,
  Button,
  Alert,
  ScrollView
} from 'react-native'

import SKIcon from './icon'

export const POWER_MENU_LABEL = 'Power Menu (root)'
export const POWER_MENU_NAME = 'com.nkming.powermenu'

export default class App extends React.Component {
  state = {
    packages: []
  }

  componentWillMount () {
    let packages = []

    try {
      packages = JSON.parse(NativeModules.InstalledApps.getApps)
    } catch (e) {
      console.warn(`Error parsing packages: ${e.message}`)
    }

    this.setState({ packages })
  }

  startApp (label, name) {
    sendIntent
      .isAppInstalled(name)
      .then(isInstalled => {
        if (!isInstalled) {
          return null
        }

        return sendIntent.openApp(name)
      })
      .then(result => {
        if (result === null) {
          // App is not installed.
          Alert.alert(
            'App niet beschikbaar',
            `De app "${label}" is niet geïnstalleerd.`,
            [{ text: 'OK', onPress: () => true }],
            { cancelable: false }
          )
        }
      })
      .catch(err => {
        console.warn(`Error running intent: ${err.message}`)
      })
  }

  openPowerMenu () {
    this.startApp(POWER_MENU_LABEL, POWER_MENU_NAME)
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
    const nightmode = this.props.nightmode
    const apps = this.state.packages
      .filter(app => {
        const name = String(app.name).toLowerCase().trim()
        if (name.includes('settings') || name.includes('play') || name.includes('signalk') || name.includes('power') || name.includes('nova') || name.includes('lightning')) {
          return true
        }

        return false
      })
      .map(app => {
        return <SKIcon nightmode={this.props.nightmode} key={app.name} icon={app.icon} label={app.label} onPress={() => this.startApp(app.label, app.name)} />
      })

    return (
      <View style={[ styles.container, nightmode ? styles.containerNightmode : null ]}>
        <View style={styles.viewContainer}>
          <View>
            <Text style={styles.h1}>X-Miles</Text>
            <View style={styles.spacer} />
            <View style={styles.switchWrapper}>
              <Text style={[ styles.switchLabel, nightmode ? styles.switchLabelNightmode : null ]}>Nachtmodus:</Text>
              <Switch
                style={styles.switchControl}
                onValueChange={value => this.props.setNightmode(value)}
                value={this.props.nightmode}
              />
            </View>
            <Button title='Verbinding' color={nightmode ? '#999' : '#000'} onPress={() => this.props.setView('connection')} />
            <View style={{ width: '100%', height: 10 }} />
            <Button title='Home' color={'#999'} onPress={() => this.props.setView('home')} />
            <View style={{ width: '100%', height: 10 }} />
            <Button title='Power off' color={'#999'} onPress={() => this.killDevice()} />
          </View>
        </View>

        <View style={[ styles.listContainer, nightmode ? styles.listContainerNightmode : null ]}>
          {apps}
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
    marginBottom: 30
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

  listContainer: {
    position: 'absolute',
    left: '30%',
    top: 0,
    width: '70%',
    height: '100%',
    borderLeftWidth: 2,
    borderLeftColor: '#000',
    flexDirection: 'row',
    flexWrap: 'wrap'
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
    height: '40%'
  }
})
