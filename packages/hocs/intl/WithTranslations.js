import { injectIntl } from 'react-intl'
import _ from 'lodash'
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export const withTranslations = messages => WrappedComponent => {
  class WithTranslations extends Component {
    constructor() {
      super()
      this.getTranslations = this.getTranslations.bind(this)
    }
    getTranslations() {
      const translations = _.reduce(messages, (result, msg, key) => {
        result[key] = this.props.intl.formatMessage(msg)
        return result
      })
      return translations
    }

    render() {
      return <WrappedComponent {...this.props} translations={this.getTranslations()} />
    }
  }
  WithTranslations.propTypes = {
    formatMessage: PropTypes.func,
    intl: PropTypes.any.isRequired,
  }
  return injectIntl(WithTranslations)
}

export default withTranslations
