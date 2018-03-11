import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    view: state.router.view,
    nightmode: state.router.nightmode
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
