// Libs
import * as React from 'react'
import * as PropTypes from 'prop-types'
import convert from './convert'
import convertUnits from 'convert-units'
import { Text, Font } from "@react-pdf/core";

const possibilities = ['bu', ...convertUnits().possibilities()]
const propType = PropTypes.oneOfType([
  PropTypes.oneOf(possibilities),
  PropTypes.arrayOf(PropTypes.oneOf(possibilities)),
]).isRequired

// Font.register('../fonts/RobotoMono-Regular.ttf', {
//   family: "Roboto Mono"
// })

// Exports
class Value extends React.Component {
  constructor() {
    super()

    this.toFixed = this.toFixed.bind(this)
  }  

  render() {
    const { value: raw, from, to, lbsPerBu = 1, toFixed = 2, style = {} } = this.props

    let value = Number(`${raw}`.replace(/[^0-9.-]/g, ''))
    try {
      const result = convert({ from, to, value, lbsPerBu })
      if (!isNaN(result)) {
        return (
          <Text
            style={{
              fontFamily: 'Roboto Mono',
              ...style,
            }}
            // title={`${value} (${from})`}
          >
            {this.toFixed(result, toFixed)}
          </Text>
        )
      }

      return (
        <Text
          style={{
            fontSize: '0.8em',
            color: 'red',
          }}
        >{`Invalid conversion of ${value} from ${from} to ${to}`}</Text>
      )
    } catch (error) {
      console.log('error: ', error)
      return (
        <Text
          style={{
            fontSize: '0.8em',
            color: 'red',
          }}
        >{`${error}`}</Text>
      )
    }
  }

  toFixed(value, precision) {
    if (value) {
      const result = Number(value.toFixed(precision))

      if (!result && precision < 3) {
        return this.toFixed(value, precision + 1)
      }

      return result
    }

    return null
  }
}

Value.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  from: propType,
  to: propType,
  lbsPerBu: PropTypes.number,
  toFixed: PropTypes.number,
  style: PropTypes.object,
}

export default Value
