/**
 * Navbar
 */

import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import Icon from './icon'

export default class Navbar extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      grid: 6
    }
  }

  handleGridViewPress () {
    if (this.state.grid === 6) {
      this.setState({ grid: 4 })
      this.props.setView('g4')
    } else {
      this.setState({ grid: 6 })
      this.props.setView('g6')
    }
  }

  render () {
    const active = this.props.active
    return (
      <View style={[ styles.container, this.props.nightmode === true ? styles.containerNightmode : null ]}>
        <View style={styles.iconWrapper}>
          <View style={[styles.icon, (this.props.nightmode === true ? styles.iconNightmode : null), styles.p0]} key={0}>
            <Icon iconActive={require('../../assets/icons/keypad_white.png')} iconInactive={require('../../assets/icons/keypad_black.png')} active={active === 'g4' || active === 'g6'} onPress={() => this.handleGridViewPress()} nightmode={this.props.nightmode} />
          </View>

          <View style={[styles.icon, (this.props.nightmode === true ? styles.iconNightmode : null), styles.p1]} key={1}>
            <Icon iconActive={require('../../assets/icons/location_white.png')} iconInactive={require('../../assets/icons/location_black.png')} active={active === 1} onPress={() => this.props.setView(1)} nightmode={this.props.nightmode} />
          </View>

          <View style={[styles.icon, (this.props.nightmode === true ? styles.iconNightmode : null), styles.p2]} key={2}>
            <Icon iconActive={require('../../assets/icons/navigate_white.png')} iconInactive={require('../../assets/icons/navigate_black.png')} active={active === 2} onPress={() => this.props.setView(2)} nightmode={this.props.nightmode} />
          </View>

          <View style={[styles.icon, (this.props.nightmode === true ? styles.iconNightmode : null), styles.p3]} key={3}>
            <Icon iconActive={require('../../assets/icons/speedometer_white.png')} iconInactive={require('../../assets/icons/speedometer_black.png')} active={active === 3} onPress={() => this.props.setView(3)} nightmode={this.props.nightmode} />
          </View>

          <View style={[styles.icon, (this.props.nightmode === true ? styles.iconNightmode : null), styles.p4]} key={4}>
            <Icon iconActive={require('../../assets/icons/compass_white.png')} iconInactive={require('../../assets/icons/compass_black.png')} active={active === 4} onPress={() => this.props.setView(4)} nightmode={this.props.nightmode} />
          </View>

          <View style={[styles.icon, (this.props.nightmode === true ? styles.iconNightmode : null), styles.p5]} key={5}>
            <Icon iconActive={require('../../assets/icons/disc_white.png')} iconInactive={require('../../assets/icons/disc_black.png')} active={active === 5} onPress={() => this.props.setView(5)} nightmode={this.props.nightmode} />
          </View>

          <View style={[styles.icon, (this.props.nightmode === true ? styles.iconNightmode : null), styles.p6]} key={6}>
            <Icon iconActive={require('../../assets/icons/thermometer_white.png')} iconInactive={require('../../assets/icons/thermometer_black.png')} active={active === 6} onPress={() => this.props.setView(6)} nightmode={this.props.nightmode} />
          </View>

          <View style={[styles.icon, styles.p8, (this.props.nightmode === true ? styles.p8IconNightmode : null)]} key={8}>
            <Icon iconActive={require('../../assets/icons/moon_white.png')} iconInactive={require('../../assets/icons/moon_black.png')} active={this.props.nightmode === true} height={60} onPress={() => this.props.setNightmode(!this.props.nightmode)} nightmode={this.props.nightmode} />
          </View>
        </View>
      </View>
    )
  }
}

const { width } = Dimensions.get('window')
const size = 90

const styles = StyleSheet.create({
  container: {
    width,
    height: size,
    position: 'absolute',
    left: 0,
    bottom: 0,
    borderTopWidth: 2,
    borderTopColor: 'black'
  },

  containerNightmode: {
    backgroundColor: 'black',
    borderTopColor: 'white'
  },

  iconWrapper: {
    width,
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
