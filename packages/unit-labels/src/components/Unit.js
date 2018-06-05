// Libs
import * as React from 'react'
import PropTypes from 'prop-types'
import convert from 'convert-units'

// Components
import Translate from './Translate'

// Additional Units
import { ADDITIONAL_UNITS } from '../constants'

// Exports
export default class Unit extends React.PureComponent {
  isPlural() {
    if (this.props.value != null) {
      return this.props.value !== 1
    } else if (this.props.singular === true) {
      return false
    }

    return true
  }

  render() {
    const { unit } = this.props
    const allUnits = convert().possibilities()
    if (allUnits.indexOf(unit) > -1 || ADDITIONAL_UNITS.hasOwnProperty(unit)) {
      const description = ADDITIONAL_UNITS.hasOwnProperty(this.props.unit)
        ? ADDITIONAL_UNITS[this.props.unit]
        : convert().describe(this.props.unit)

      return <Translate value={this.isPlural() ? description.plural : description.singular} />
    }
    return <span>{unit}</span>
  }
}

Unit.defaultProps = {
  singular: false,
  plural: true,
}

Unit.propTypes = {
  singular: PropTypes.bool,
  plural: PropTypes.bool,
  unit: PropTypes.string.isRequired,
  value: PropTypes.number,
}
