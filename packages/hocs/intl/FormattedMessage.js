// React
import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

// Components
import { FormattedMessage as ReactIntlFormattedMessage } from 'react-intl'

function fallbackMessage({ translate }) {
  return {
    id: translate,
    defaultMessage: translate,
  }
}

function findMessage({ dictionary, translate }) {
  const messageKeys = [translate, _.camelCase(translate)]
  const rexp = new RegExp(messageKeys.join('|'))

  return _.find(dictionary, (message, messageKey) => {
    if (messageKey.match(rexp) || `${message.id}`.match(rexp)) {
      return message
    }
  })
}

export default function formattedMessage({ messages: defaultMessages } = {}) {
  function FormattedMessage({ translate, messages, values, children }) {
    const dictionary = messages || defaultMessages || {}
    const message =
      dictionary[translate] ||
      dictionary[_.toLower(translate)] ||
      dictionary[_.startCase(_.toLower(translate))] ||
      findMessage({ dictionary, translate }) ||
      fallbackMessage({ translate })

    return <ReactIntlFormattedMessage {...message} values={values} children={children} />
  }

  FormattedMessage.propTypes = {
    translate: PropTypes.string.isRequired,
    messages: defaultMessages
      ? PropTypes.any
      : PropTypes.objectOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            defaultMessage: PropTypes.string.isRequired,
          })
        ).isRequired,
    values: PropTypes.any,
    children: PropTypes.any,
  }

  return FormattedMessage
}

export const FormattedMessage = formattedMessage()
