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

// Styles
const styles = {
  container: (props: Props): React.CSSProperties => {
    return {
      fontFamily: props.type === 'number' ? '"Roboto Mono"' : 'inherit',
      fontSize: props.type === 'number' ? '0.9em' : 'inherit',
    }
  }
}

// Exports
export default class Cell extends React.PureComponent {
  public props: Props

  public render() {
    return (
      <div data-test="fc-table/Cell" style={styles.container(this.props)}>
        {this.renderValue()}
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
      return value ? <Check size={14} color={colors.primary()} /> : ''
    } else if (Array.isArray(value)) {
      return value
    }

    return null
  }
}
