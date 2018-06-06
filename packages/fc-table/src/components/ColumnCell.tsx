// Libs
import * as React from 'react'

// Types
import { DataTableProps, Record } from 'fc-datatable'
import { Column } from '../types'

// Components
import ArrowDownward from 'fc-icons/src/ArrowDownward'
import ArrowUpward from 'fc-icons/src/ArrowUpward'

// Styles
import colors from '../colors'

// Local Types
interface Props<R extends Record> extends Column<R> {
  onSort: DataTableProps<R, Column<R>>['actions']['onSort']
  last: boolean
  sortedBy: boolean
  sortDesc: boolean
  width: number
}

// Local Styles
const styles = {
  container(props: Props<any>): React.CSSProperties {
    return {
      overflow: 'visible',
      width: props.width ? `${props.width}%` : (props.last ? 50 : 50),
      height: props.rotate ? 100 : 'initial',
      verticalAlign: 'bottom',
      fontSize: '0.9em',
      fontWeight: 500,
      color: colors.text.column,
    }
  },
  wrapper(props: Props<any>): React.CSSProperties {
    if (props.rotate) {
      return {
        borderTop: `2px dashed ${colors.borders.cell}`,
        postion: 'relative',
        transformOrigin: 'left top',
        transform: 'translateY(100%) rotate(-55deg)',
        width: props.last ? 50 : 50,
        maxWidth: props.last ? 50 : 50,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
      }
    }

    return {
      borderLeft: `1px dashed ${colors.borders.column}`,
      padding: '0 10px 10px 10px',
    }
  },
  content(props: Props<any>): React.CSSProperties {
    return {
      transform: props.rotate ? 'translateX(30px) translateY(-5px)' : '',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
    }
  },
  label: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}

// Local
const getColumnLabel = <R extends Record>(props: Props<R>) => {
  if (props.render) {
    if (React.isValidElement(props.render)) {
      return React.cloneElement(props.render as React.ReactElement<any>, {
        ...props,
        sortedBy: props.sortedBy,
        sortDesc: props.sortDesc,
      })
    } else if (typeof props.render === 'function') {
      return props.render({
        sortedBy: props.sortedBy,
        sortDesc: props.sortDesc,
      })
    }
  } else if (props.label) {
    return props.label
  }

  return props.column
}

// Exports
export default class ColumnCell<R extends Record> extends React.PureComponent<Props<R>> {
  public props: Props<R>

  constructor(props: Props<R>) {
    super(props)
    this.onSort = this.onSort.bind(this)
  }

  public render() {
    return (
      <th data-test="fc-table/ColumnCell" style={styles.container(this.props)} onClick={this.onSort}>
        <div style={styles.wrapper(this.props)}>
          <div style={styles.content(this.props)}>
            <div style={styles.label}>{getColumnLabel(this.props)}</div>
            <div>{this.renderArrow()}</div>
          </div>
        </div>
      </th>
    )
  }

  private renderArrow() {
    if (this.props.sortedBy) {
      if (this.props.sortDesc) {
        return <ArrowUpward color={colors.icons.sort} size={18} />
      }

      return <ArrowDownward color={colors.icons.sort} size={18} />
    }

    return <ArrowUpward color={colors.icons.unsorted} size={18} />
  }

  private onSort() {
    if (this.props.onSort) {
      this.props.onSort(this.props.column)
    }
  }
}
