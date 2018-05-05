/**
 * Navbar
 */

import React from 'react'
import { StyleSheet, TouchableOpacity, Image, Text } from 'react-native'

export default class SKIcon extends React.Component {
  render () {
    const onPress = typeof this.props.onPress === 'function' ? this.props.onPress : () => {}

    let activeStyle = this.props.active ? styles.active : null

    if (this.props.nightmode === true) {
      activeStyle = this.props.active ? styles.activeNightmode : null
    }

    return (
      <TouchableOpacity style={[ styles.container, activeStyle ]} onPress={() => onPress()}>
        <Image style={[ styles.icon, { height: this.props.height || 40 } ]} source={{ uri: `data:image/png;base64,${this.props.icon}` }} resizeMode='contain' />
        <Text style={[ styles.label, this.props.nightmode ? styles.labelNightmode : null ]}>{this.props.label}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    margin: 10
  },

  active: {
    backgroundColor: '#000'
  },

  activeNightmode: {
    backgroundColor: '#FFF'
  },

  icon: {
    width: 80,
    height: 40,
    position: 'absolute',
    top: 10,
    left: 0
  },

  label: {
    width: 80,
    height: 20,
    lineHeight: 20,
    fontSize: 12,
    color: 'black',
    position: 'absolute',
    textAlign: 'center',
    top: 60,
    left: 0
  },

  labelNightmode: {
    color: 'white'
  }
})
