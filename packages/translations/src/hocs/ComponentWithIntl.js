// Libs
import React from 'react'

import withIntlContext from '../../../hocs/intl/WithIntlContext'

/**
 * HOC for providing intl context to wrapped component
 *
 * @param  {Object}        props       Component props.
 * @param  {Object}        context     Context of parent component.
 * @param  {React.Element} Component   React Component to wrap.
 * @param  {String}        data-test   "data-test" identifier.
 *
 * @return {React.Element}             Component with intl context.
 */
const ComponentWithIntl = (props, context, Component, dataTest) => {
  const { intl } = context
  const TranslatedComponent = withIntlContext({ intl })(Component)

  return <TranslatedComponent data-test={dataTest} formatMessage={intl.formatMessage} {...props} />
}

export default ComponentWithIntl
