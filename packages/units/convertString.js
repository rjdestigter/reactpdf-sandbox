import convert from './convert'

export default function convertString({ from, to, value, lbsPerBu, toFixed = 2 }) {
  if (value != null) {
    return `${value}`.replace(/[0-9.]+/g, val => {
      if (val) {
        const converted = convert({ from, to, value: val, lbsPerBu })

        if (converted != null) {
          return converted.toFixed(2)
        }
      }

      return 0
    })
  }

  return ''
}
