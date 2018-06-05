// Libs
import * as React from 'react'
import PropTypes from 'prop-types'

// Exports
export default function withIntlContext({ intl }) {
  return WrappedComponent => {
    class WithIntlContext extends React.Component {
      getChildContext() {
        return { intl }
      }

      render() {
        return <WrappedComponent {...this.props} />
      }
    }

    WithIntlContext.childContextTypes = {
      intl: PropTypes.any,
    }

    return WithIntlContext
  }
}
