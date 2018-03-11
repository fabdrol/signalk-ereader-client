/**
 * Navbar
 */

import React from 'react'
import { StyleSheet, TouchableOpacity, Image } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'

export default class SKIcon extends React.Component {
  render () {
    const onPress = typeof this.props.onPress === 'function' ? this.props.onPress : () => {}

    let activeStyle = this.props.active ? styles.active : null
    let icon = this.props.active ? this.props.iconActive : this.props.iconInactive

    if (this.props.nightmode === true) {
      icon = this.props.active ? this.props.iconInactive : this.props.iconActive
      activeStyle = this.props.active ? styles.activeNightmode : null
    }

    return (
      <TouchableOpacity style={[ styles.container, activeStyle ]} onPress={() => onPress()}>
        <Image style={[ styles.icon, { height: this.props.height || 40 } ]} source={icon} resizeMode='contain' />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  active: {
    backgroundColor: '#000'
  },

  activeNightmode: {
    backgroundColor: '#FFF'
  },

  icon: {
    flex: 1,
    width: 40,
    height: 40
  }
})
