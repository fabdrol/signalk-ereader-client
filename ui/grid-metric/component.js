/**
 * GridMetric
 */

import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { metrics as conversions } from '../../store/ducks/signalk'
import utils from '../../lib/utils'

export default class GridMetric extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      metric: 0
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const componentActiveKeys = ['g4', 'g6']

    if (nextProps.connected === true && componentActiveKeys.includes(nextProps.active)) {
      return true
    }

    return false
  }

  swapMetric () {
    const { metrics } = this.props
    if (metrics.length === 2) {
      this.setState({ metric: this.state.metric === 0 ? 1 : 0 })
    }
  }

  render () {
    const { kind, metrics, nightmode, size } = this.props
    let select = this.state.metric

    switch (kind) {
      case 'position':
        const lng = `${metrics[0].value < 0 ? 'W' : 'E'} ${utils.coordinate(metrics[0].value)}`
        const lat = `${metrics[1].value < 0 ? 'S' : 'N'} ${utils.coordinate(metrics[1].value)}`

        return (
          <View style={styles.gridMetricWrapper}>
            <Text style={[ styles.longitude, (size === 'large' ? styles.positionLarge : null), (nightmode ? styles.nightmodeText : null) ]}>{lng}</Text>
            <Text style={[ styles.latitude, (size === 'large' ? styles.positionLarge : null), (nightmode ? styles.nightmodeText : null) ]}>{lat}</Text>
          </View>
        )

      default:
        if (select === 1 && metrics.length === 1) {
          select = 0
        }

        let value = -999
        let metric = {}

        if (typeof metrics[select] !== 'undefined') {
          metric = conversions[metrics[select].label]
          value = metrics[select].value
        }

        if (metric.input !== null && metric.output !== null) {
          value = value > 0 ? utils.nmea0183.transform(value, metric.input, metric.output) : value
        }

        if (value === -999) {
          value = '---'
        }

        return (
          <View style={styles.gridMetricWrapper}>
            <Text style={[ styles.value, (size === 'large' ? styles.valueLarge : null), (nightmode ? styles.nightmodeText : null) ]}>{(value === '---' ? value : (value || 0).toFixed(2))}{metric.unit || ''}</Text>
            <Text style={[ styles.label, (size === 'large' ? styles.labelLarge : null), (nightmode ? styles.nightmodeText : null) ]}>{metric.label || ''}</Text>
          </View>
        )
    }
  }
}

const styles = StyleSheet.create({
  gridMetricWrapper: {},
  nightmodeText: {
    color: 'white'
  },
  longitude: {
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'center',
    fontSize: 30,
    paddingTop: 70
  },
  latitude: {
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'center',
    fontSize: 30
  },
  positionLarge: {},
  value: {
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'center',
    fontSize: 60,
    paddingTop: 60
  },
  label: {
    backgroundColor: 'transparent',
    color: 'black',
    textAlign: 'center',
    fontSize: 15
  },
  valueLarge: {
    fontSize: 100,
    paddingTop: 30
  }
})
