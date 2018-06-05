import convert from 'convert-units'

import { ADDITIONAL_UNITS } from '../constants'
import messages from '../messages'

export default function unitText(unit, formatMessage) {
  const allUnits = convert().possibilities()
  if (allUnits.indexOf(unit) > -1 || ADDITIONAL_UNITS.hasOwnProperty(unit)) {
    const description = ADDITIONAL_UNITS.hasOwnProperty(unit) ? ADDITIONAL_UNITS[unit] : convert().describe(unit)
    return formatMessage(messages[description.plural])
  }
  return unit
}
