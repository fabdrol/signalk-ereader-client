/**
 * GridView
 */

import React from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import GridMetric from '../grid-metric'

export default class GridView extends React.Component {
  componentWillMount () {
    const { fetched, fetching, fetchData } = this.props

    if (!fetched && !fetching) {
      fetchData()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const componentActiveKeys = ['g4', 'g6']

    if (nextProps.connected === true && componentActiveKeys.includes(nextProps.active)) {
      return true
    }

    return false
  }

  render () {
    let content = null
    const nightmode = this.props.nightmode

    if (this.props.grid === 4) {
      content = (
        <View style={styles.flexWrapper}>
          <View style={styles.flexRow}>
            <View style={[ styles.metricFour, styles.borderBottomRight, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='large' kind='metric' label='Heading' metrics={['headingTrue']} />
            </View>
            <View style={[ styles.metricFour, styles.borderBottom, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='large' kind='metric' label='Depth' metrics={['depthBelowTransducer', 'depthBelowKeel']} />
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={[ styles.metricFour, styles.borderRight, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='large' kind='metric' label='Speed (through water)' metrics={['speedThroughWater']} />
            </View>
            <View style={[ styles.metricFour ]}>
              <GridMetric size='large' kind='metric' label='Speed (over ground)' metrics={['speedOverGround']} />
            </View>
          </View>
        </View>
      )
    } else {
      content = (
        <View style={styles.flexWrapper}>
          <View style={styles.flexRow}>
            <View style={[ styles.metricSix, styles.borderBottomRight, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='small' kind='metric' label='Heading' metrics={['headingTrue']} />
            </View>
            <View style={[ styles.metricSix, styles.borderBottomRight, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='small' kind='metric' label='Course (over ground)' metrics={['courseOverGround']} value={0} />
            </View>
            <View style={[ styles.metricSix, styles.borderBottom, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='small' kind='metric' label='Depth' metrics={['depthBelowTransducer', 'depthBelowKeel']} />
            </View>
          </View>
          <View style={styles.flexRow}>
            <View style={[ styles.metricSix, styles.borderRight, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='small' kind='metric' label='Speed (over ground)' metrics={['speedOverGround']} />
            </View>
            <View style={[ styles.metricSix, styles.borderRight, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='small' kind='metric' label='Speed (through water)' metrics={['speedThroughWater']} />
            </View>
            <View style={[ styles.metricSix, nightmode ? { borderColor: 'white' } : null ]}>
              <GridMetric size='small' kind='position' metrics={['longitude', 'latitude']} />
            </View>
          </View>
        </View>
      )
    }

    return (
      <View style={[ styles.container, (nightmode ? styles.nightmode : null) ]}>
        {content}
      </View>
    )
  }
}

const navbarSize = 135
const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: (height - navbarSize)
  },

  nightmode: {
    backgroundColor: 'black'
  },

  flexWrapper: {
    width: '100%',
    height: (height - navbarSize)
  },

  flexRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: ((height - navbarSize) / 2),
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
