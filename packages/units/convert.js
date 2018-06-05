import { default as convertUnit } from 'convert-units'

export function convertSingle({ from, to, value: maybeValue, lbsPerBu: maybeLbsPerBu }) {
  let value = Number(maybeValue) || 0
  let result = NaN

  const lbsPerBu = Number(maybeLbsPerBu) || 1
  const usgToImp = 0.832674

  if (from === 'bu') {
    if (to === 'bu') {
      result = value
    } else {
      value = value * lbsPerBu
      result = convertUnit(value)
        .from('lb')
        .to(to)
    }
  } else if (to === 'bu') {
    result = convertUnit(value)
      .from(from)
      .to('lb')
    result = result / lbsPerBu
  } else if (from === 'usg') {
    result = value * usgToImp
    result = convertUnit(value)
      .from('gal')
      .to(to)
  } else if (to === 'usg') {
    result = convertUnit(value)
      .from(from)
      .to('gal')
    result = result * (1.0 / usgToImp)
  } else {
    result = convertUnit(value)
      .from(from)
      .to(to)
  }

  return result
}

export default function convert({ from: maybeFrom, to: maybeTo, value, lbsPerBu }) {
  const from = Array.isArray(maybeFrom) ? maybeFrom : [maybeFrom]

  const to = Array.isArray(maybeTo) ? maybeTo : [maybeTo]

  if (from.length > 1) {
    const result1 = convertSingle({ from: from[0], to: to[0], value, lbsPerBu })
    return convertSingle({ from: to[1], to: from[1], value: result1, lbsPerBu })
  }

  return convertSingle({ from: from[0], to: to[0], value, lbsPerBu })
}
