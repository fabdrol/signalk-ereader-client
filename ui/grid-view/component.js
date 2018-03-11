/**
 * GridView
 */

import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'

export default class GridView extends React.Component {
  render () {
    let content = (
      <View style={styles.flexWrapper}>
        <View style={styles.flexRow}>
          <View style={[ styles.metricSix, styles.borderBottomRight, this.props.nightmode ? { borderColor: 'white' } : null ]} />
          <View style={[ styles.metricSix, styles.borderBottomRight, this.props.nightmode ? { borderColor: 'white' } : null ]} />
          <View style={[ styles.metricSix, styles.borderBottom, this.props.nightmode ? { borderColor: 'white' } : null ]} />
        </View>
        <View style={styles.flexRow}>
          <View style={[ styles.metricSix, styles.borderRight, this.props.nightmode ? { borderColor: 'white' } : null ]} />
          <View style={[ styles.metricSix, styles.borderRight, this.props.nightmode ? { borderColor: 'white' } : null ]} />
          <View style={[ styles.metricSix, this.props.nightmode ? { borderColor: 'white' } : null ]} />
        </View>
      </View>
    )

    if (this.props.grid === 4) {
      content = (
        <View style={styles.flexWrapper}>
          <View style={styles.flexRow}>
            <View style={[ styles.metricFour, styles.borderBottomRight ]} />
            <View style={[ styles.metricFour, styles.borderBottom ]} />
          </View>
          <View style={styles.flexRow}>
            <View style={[ styles.metricFour, { borderRightWidth: 2, borderRightColor: 'black' } ]} />
            <View style={[ styles.metricFour ]} />
          </View>
        </View>
      )
    }

    return (
      <View style={[ styles.container, (this.props.nightmode ? styles.nightmode : null) ]}>
        {content}
      </View>
    )
  }
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: (height - 90)
  },

  nightmode: {
    backgroundColor: 'black'
  },

  flexWrapper: {
    width: '100%',
    height: '100%'
  },

  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '50%',
    borderColor: 'black'
  },

  metricSix: {
    flex: 1,
    width: '33.33%',
    height: '100%',
    borderColor: 'black'
  },

  borderBottom: {
    borderBottomWidth: 2
  },

  borderRight: {
    borderRightWidth: 2
  },

  borderBottomRight: {
    borderRightWidth: 2,
    borderBottomWidth: 2
  },

  metricFour: {
    flex: 1,
    width: '25%',
    height: '100%'
  }
})
