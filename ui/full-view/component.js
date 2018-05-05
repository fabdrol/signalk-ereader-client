/**
 * FullView
 */

import React from 'react'
import utils from '../../lib/utils'
import { metrics as conversions } from '../../store/ducks/signalk'
import { StyleSheet, View, Dimensions, Text, TouchableOpacity } from 'react-native'

export default class FullView extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      metric: 0
    }
  }

  swapMetric () {
    const { metrics } = this.props
    if (metrics.length === 2) {
      this.setState({ metric: this.state.metric === 0 ? 1 : 0 })
    }
  }

  componentWillMount () {
    const { fetched, fetching, fetchData } = this.props

    if (!fetched && !fetching) {
      fetchData()
    }
  }

  shouldComponentUpdate (nextProps, nextState) {
    const componentActiveKeys = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14 ]

    if (nextProps.connected === true && componentActiveKeys.includes(nextProps.active)) {
      return true
    }

    return false
  }

  render () {
    const { kind, metrics, nightmode } = this.props
    let select = this.state.metric
    let content = null

    if (kind === 'position') {
      const lng = `${metrics[0].value < 0 ? 'W' : 'E'} ${utils.coordinate(metrics[0].value)}`
      const lat = `${metrics[1].value < 0 ? 'S' : 'N'} ${utils.coordinate(metrics[1].value)}`

      content = (
        <View style={styles.metricWrapper}>
          <Text style={[ styles.longitude, (nightmode ? styles.nightmodeText : null) ]}>{lng}</Text>
          <Text style={[ styles.latitude, (nightmode ? styles.nightmodeText : null) ]}>{lat}</Text>
        </View>
      )
    }

    if (kind === 'double') {
      const metric0 = conversions[metrics[0].label]
      const metric1 = conversions[metrics[1].label]

      let value0 = metrics[0].value
      let value1 = metrics[1].value

      if (metric0.input !== null && metric0.output !== null) {
        value0 = value0 > 0 ? utils.nmea0183.transform(value0, metric0.input, metric0.output) : value0
      }

      if (metric1.input !== null && metric1.output !== null) {
        value1 = value1 > 0 ? utils.nmea0183.transform(value1, metric1.input, metric1.output) : value1
      }

      content = (
        <View style={styles.metricWrapper}>
          <Text style={[ styles.label0, (nightmode ? styles.nightmodeText : null) ]}>{metric0.label}</Text>
          <Text style={[ styles.double0, (nightmode ? styles.nightmodeText : null) ]}>{(value0 || 0).toFixed(2)}{metric0.unit}</Text>

          <Text style={[ styles.label1, (nightmode ? styles.nightmodeText : null) ]}>{metric1.label}</Text>
          <Text style={[ styles.double1, (nightmode ? styles.nightmodeText : null) ]}>{(value1 || 0).toFixed(2)}{metric1.unit}</Text>
        </View>
      )
    }

    if (kind === 'metric') {
      if (select === 1 && metrics.length === 1) {
        select = 0
      }

      const metric = conversions[metrics[select].label]
      let value = metrics[select].value

      if (metric.input !== null && metric.output !== null) {
        value = value > 0 ? utils.nmea0183.transform(value, metric.input, metric.output) : value
      }

      content = (
        <TouchableOpacity style={styles.metricWrapper} onPress={() => this.swapMetric()}>
          <Text style={[ styles.metricValue, (nightmode ? styles.nightmodeText : null) ]}>{(value || 0).toFixed(2)}{metric.unit}</Text>
          <Text style={[ styles.metricLabel, (nightmode ? styles.nightmodeText : null) ]}>{metric.label}</Text>
        </TouchableOpacity>
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

  pre: {
    width: '100%',
    height: '100%',
    fontFamily: 'Menlo',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'left',
    color: 'black'
  },

  nightmode: {
    backgroundColor: 'black'
  },

  metricWrapper: {
    width: '100%',
    height: '100%'
  },

  longitude: {
    position: 'absolute',
    top: (height - 90) * 0.1,
    left: 0,
    width: '100%',
    height: (height - 90) * 0.3,
    textAlign: 'center',
    fontSize: 70,
    lineHeight: (height - 90) * 0.3,
    color: 'black'
  },

  latitude: {
    position: 'absolute',
    top: (height - 90) * 0.4,
    left: 0,
    width: '100%',
    height: (height - 90) * 0.3,
    textAlign: 'center',
    fontSize: 70,
    lineHeight: (height - 90) * 0.3,
    color: 'black'
  },

  double0: {
    position: 'absolute',
    top: (height - 90) * 0.1,
    left: '40%',
    width: '60%',
    height: (height - 90) * 0.3,
    textAlign: 'left',
    fontSize: 100,
    lineHeight: (height - 90) * 0.3,
    color: 'black'
  },

  double1: {
    position: 'absolute',
    top: (height - 90) * 0.5,
    left: '40%',
    width: '60%',
    height: (height - 90) * 0.3,
    textAlign: 'left',
    fontSize: 100,
    lineHeight: (height - 90) * 0.3,
    color: 'black'
  },

  label0: {
    position: 'absolute',
    top: (height - 90) * 0.1,
    left: 0,
    width: '30%',
    height: (height - 90) * 0.3,
    lineHeight: 100,
    textAlign: 'right',
    fontSize: 16,
    color: '#999'
  },

  label1: {
    position: 'absolute',
    top: (height - 90) * 0.5,
    left: 0,
    width: '30%',
    height: (height - 90) * 0.3,
    lineHeight: 100,
    textAlign: 'right',
    fontSize: 16,
    color: '#999'
  },

  metricValue: {
    position: 'absolute',
    top: (height - 90) * 0.25,
    left: 0,
    width: '100%',
    height: (height - 90) * 0.4,
    textAlign: 'center',
    fontSize: 170,
    lineHeight: (height - 90) * 0.4,
    color: 'black'
  },

  metricLabel: {
    position: 'absolute',
    top: (height - 90) * 0.65,
    left: 0,
    width: '100%',
    height: (height - 90) * 0.1,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: (height - 90) * 0.1,
    color: '#666'
  },

  nightmodeText: {
    color: 'white'
  }
})
