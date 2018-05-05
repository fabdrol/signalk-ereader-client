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
import HomeView from '../home-view'
import ConnectionView from '../connection-view'
import AppsView from '../apps-view'

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
        return <FullView kind='double' metrics={['waterTemperature', 'insideTemperature']} />

      case 7:
        return <FullView kind='double' metrics={['windAngleApparent', 'windSpeedApparent']} />

      case 8:
        return <FullView kind='double' metrics={['speedThroughWater', 'speedOverGround']} />

      case 9:
        return <FullView kind='double' metrics={['headingTrue', 'courseOverGround']} />

      case 'g4':
        return <GridView grid={4} />

      case 'g6':
        return <GridView grid={6} />

      case 'connection':
        return <ConnectionView forced />

      case 'apps':
        return <AppsView />

      // default = home
      case 'home':
        return <HomeView />
    }
  }

  render () {
    return (
      <View style={[ styles.container, this.props.nightmode ? styles.containerNightmode : null ]}>
        <View style={[ styles.viewContainer, (this.props.connected === false || this.props.view === 'home' || this.props.view === 'connection' || this.props.view === 'apps') ? styles.fullHeight : null ]}>
          {this.view()}
        </View>
        {(this.props.connected === true && this.props.view !== 'home' && this.props.view !== 'connection' && this.props.view !== 'apps') ? <Navbar /> : null}
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

  containerNightmode: {
    backgroundColor: '#000'
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
