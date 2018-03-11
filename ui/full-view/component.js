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
    top: '10%',
    left: 0,
    width: '100%',
    height: '40%',
    textAlign: 'center',
    fontSize: 100,
    lineHeight: (height - 90) * 0.4
  },

  latitude: {
    position: 'absolute',
    top: '50%',
    left: 0,
    width: '100%',
    height: '40%',
    textAlign: 'center',
    fontSize: 100,
    lineHeight: (height - 90) * 0.4
  },

  metricValue: {
    position: 'absolute',
    top: '25%',
    left: 0,
    width: '100%',
    height: '40%',
    textAlign: 'center',
    fontSize: 230,
    lineHeight: (height - 90) * 0.4
  },

  metricLabel: {
    position: 'absolute',
    top: '65%',
    left: 0,
    width: '100%',
    height: '10%',
    textAlign: 'center',
    fontSize: 20,
    lineHeight: (height - 90) * 0.1
  },

  nightmodeText: {
    color: 'white'
  }
})
