/**
 * Navbar
 */

import React from 'react'
import { StyleSheet, View, Switch } from 'react-native'
import Icon from './icon'

export default class Navbar extends React.Component {
  render () {
    const active = this.props.active
    return (
      <View style={[ styles.container, this.props.nightmode === true ? styles.containerNightmode : null ]}>
        <View style={styles.iconWrapper}>
          <View style={[styles.icon, (this.props.nightmode === true ? styles.iconNightmode : null), styles.p0]} key={0}>
            <Icon iconActive={require('../../assets/icons/keypad_white.png')} iconInactive={require('../../assets/icons/keypad_black.png')} active={active === 'home'} onPress={() => this.props.setView('home')} nightmode={this.props.nightmode} />
          </View>

          <Switch
            style={styles.switchControl}
            onValueChange={value => this.props.setNightmode(value)}
            value={this.props.nightmode}
          />

          {/* <View style={[styles.icon, styles.p8, (this.props.nightmode === true ? styles.p8IconNightmode : null)]} key={8}>
            <Icon iconActive={require('../../assets/icons/moon_white.png')} iconInactive={require('../../assets/icons/moon_black.png')} active={this.props.nightmode === true} height={60} onPress={() => this.props.setNightmode(!this.props.nightmode)} nightmode={this.props.nightmode} />
          </View> */}
        </View>
      </View>
    )
  }
}

const size = 90
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: size,
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderTopWidth: 2,
    borderTopColor: 'black',
    backgroundColor: 'white'
  },

  containerNightmode: {
    backgroundColor: 'black',
    borderTopColor: 'white'
  },

  iconWrapper: {
    width: '100%',
    height: size,
    flex: 1,
    flexDirection: 'column'
  },

  icon: {
    width: size,
    height: size,
    borderRightWidth: 2,
    borderRightColor: 'black',
    position: 'absolute',
    top: 0
  },

  iconNightmode: {
    borderRightColor: 'white'
  },

  switchControl: {
    position: 'absolute',
    top: 30,
    right: 15
  },

  p0: { left: 0 },
  p1: { left: 1 * size },
  p2: { left: 2 * size },
  p3: { left: 3 * size },
  p4: { left: 4 * size },
  p5: { left: 5 * size },
  p6: { left: 6 * size },
  p7: { left: 7 * size },

  p8: {
    right: 0,
    borderRightWidth: 0,
    borderRightColor: 'white',
    borderLeftColor: 'black',
    borderLeftWidth: 2
  },

  p8IconNightmode: {
    borderRightColor: 'black',
    borderLeftColor: 'white'
  }
})
