// Libs
import * as React from 'react'
import PropTypes from 'prop-types'

// Components
import { FormattedMessage } from 'react-intl'

// Higher Order Function accepting a dictionary of messages and returns
// a Component accepting "value" to be translated
export default function composeTranslate({ messages }) {
  class Translate extends React.PureComponent {
    render() {
      if (!this.props.value) {
        return <span style={{ color: 'red' }}>Error: No translateable value passd to fc-translations/Translate</span>
      }

      const message = messages[this.props.value] || {
        id: this.props.value,
        defaultMessage: this.props.value,
      }

      // If no custom tag or children were provided return the default behaviour for
      // FormattedMessage
      if (!this.props.tag && !this.props.children) {
        return <FormattedMessage {...message} />
      }

      // Other wise render FormattedMessage with a Stateless Function Component
      // nested inside to customize the rendering
      return (
        <FormattedMessage {...message}>
          {translated => {
            // If additional children are provided to Translated they
            // are rendered after the translated string
            if (this.props.children) {
              return React.createElement(this.props.tag || 'span', {
                children: [translated, this.props.children],
              })
            }

            // Other wise create an element of the provided tag
            return React.createElement(this.props.tag || 'span', {
              children: translated,
            })
          }}
        </FormattedMessage>
      )
    }
  }

  Translate.propTypes = {
    children: PropTypes.node,
    value: PropTypes.string.isRequired,
    tag: PropTypes.string,
  }

  return Translate
}
