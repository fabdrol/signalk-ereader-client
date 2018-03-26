import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Component from './component'

function mapStateToProps (state, ownProps) {
  return {
    ...ownProps,
    nightmode: state.router.nightmode,
    metrics: ownProps.metrics.map(label => {
      return {
        label,
        value: state.signalk[label]
      }
    })
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Component)
