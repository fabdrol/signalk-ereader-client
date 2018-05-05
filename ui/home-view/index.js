import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'
import { setView, setNightmode, swapLandscape } from '../../store/ducks/router'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    nightmode: state.router.nightmode,
    connected: state.router.connected,
    loading: state.router.loading,
    hostname: state.router.hostname,
    port: state.router.port,
    landscape: state.router.landscape
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setView,
    setNightmode,
    swapLandscape
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
