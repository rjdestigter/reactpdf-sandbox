// Libs
import * as React from 'react'

// Components
import Check from 'fc-icons/src/Check'
import { colors } from 'styles'

// Types
type Value = number | string | boolean | React.ReactElement<any> | null

interface Props {
  value: Value | Value[]
  align?: 'left' | 'center' | 'right'
  type?: 'number' | 'string' | 'boolean'
  rotate?: number
}

const getColumnAlignment = (props: Props) => {
  if (props.align === 'right' || (!props.align && props.type === 'number')) {
    return 'right'
  } else if (props.align === 'center') {
    return 'center'
  }

  return 'left'
}

// Styles
const styles = {
  container: (props: Props): React.CSSProperties => {
    const align = getColumnAlignment(props)

    return {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: 'center',
      justifyContent: 'center',
      minHeight: 35,
      fontFamily: props.type === 'number' ? '"Roboto Mono"' : 'inherit',
      fontSize: props.type === 'number' ? '0.9em' : 'inherit',
      textAlign: align
    }
  }
}

// Exports
export default class Cell extends React.PureComponent {
  public props: Props

  public render() {
    return (
      <div data-test="fc-table/Cell" style={styles.container(this.props)}>
        <div>
          {this.renderValue()}
        </div>
      </div>
    )
  }

  private renderValue() {
    const value = this.props.value

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      React.isValidElement(this.props.value)
    ) {
      return value
    } else if (typeof value === 'boolean') {
      return value ? <Check size={16} color={colors.primary()} /> : ''
    } else if (Array.isArray(value)) {
      const list = value.map((v, i) => {
        return (
          <span key={i}>{v}{i < value.length - 1 ? ', ' : null}</span>
        )
      })

      return list
    }

    return null
  }
}
