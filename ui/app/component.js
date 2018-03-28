/**
 * SKEReader
 */

import React from 'react'
import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native'

import Navbar from '../navbar'
import GridView from '../grid-view'
import FullView from '../full-view'
// import CompoundView from '../compound-view'
import ConnectionView from '../connection-view'

export default class App extends React.Component {
  view () {
    if (this.props.connected === false) {
      return <ConnectionView />
    }

    switch (this.props.view) {
      case 1:
        return <FullView kind='position' metrics={['longitude', 'latitude']} />

      case 2:
        return <FullView kind='metric' metrics={['headingTrue', 'headingMagnetic']} />

      case 3:
        return <FullView kind='metric' metrics={['speedThroughWater', 'speedOverGround']} />

      case 4:
        return <FullView kind='metric' metrics={['courseOverGround']} />

      case 5:
        return <FullView kind='metric' metrics={['depthBelowTransducer', 'depthBelowKeel']} />

      case 6:
        return <FullView kind='metric' metrics={['waterTemperature', 'insideTemperature']} />

      // @TODO
      // case 'compound':
      //   return <CompoundView />

      case 'g4':
        return <GridView grid={4} />

      // default = g6
      default:
        return <GridView grid={6} />
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={[ styles.viewContainer, this.props.connected === false ? styles.fullHeight : null ]}>
          {this.view()}
        </View>
        {this.props.connected === true ? <Navbar /> : null}
      </View>
    )
  }
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF'
  },

  viewContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: (height - 90)
  },

  fullHeight: {
    height: '100%'
  }
})
