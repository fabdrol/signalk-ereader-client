import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'
import { setView } from '../../store/ducks/router'
import { fetchData } from '../../store/ducks/signalk'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    connected: state.router.connected,
    active: state.router.view,
    nightmode: state.router.nightmode,
    fetched: state.signalk.fetched,
    fetching: state.signalk.fetching
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ setView, fetchData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
