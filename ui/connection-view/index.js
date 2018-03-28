import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'
import { setConnected } from '../../store/ducks/router'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    connected: state.router.connected,
    loading: state.router.loading
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    setConnected
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
