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

export default class App extends React.Component {
  view () {
    switch (this.props.view) {
      case 1:
        return <FullView kind='position' metrics={['longitude', 'latitude']} />

      case 2:
        return <FullView kind='metric' metrics={['headingTrue']} />

      case 3:
        return <FullView kind='metric' metrics={['speedThroughWater', 'speedOverGround']} />

      case 4:
        return <FullView kind='metric' metrics={['courseOverGround']} />

      case 5:
        return <FullView kind='metric' metrics={['depthBelowKeel', 'depthBelowTransducer']} />

      case 6:
        return <FullView kind='metric' metrics={['insideTemperature', 'waterTemperature']} />

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
        <View style={styles.viewContainer}>
          {this.view()}
        </View>
        <Navbar />
      </View>
    )
  }
}

const { height } = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FAFAFA'
  },

  viewContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: (height - 90)
  }
})
