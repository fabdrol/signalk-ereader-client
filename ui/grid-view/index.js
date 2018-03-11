import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'
import { setView } from '../../store/ducks/router'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    active: state.router.view,
    nightmode: state.router.nightmode
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ setView }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
