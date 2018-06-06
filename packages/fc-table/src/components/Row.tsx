// Libs
import * as React from 'react'

// Components
import Cell from './Cell'

// Types
import { DataTableComponentProps, Record } from 'fc-datatable'
import { Column, Renderer } from '../types'

// Styles
import colors from '../colors'

// Local Types
interface Props<R extends Record> {
  record: R
  columns: Column<R>[]
  renderer: Renderer<R>
  onSelect: DataTableComponentProps<R, Column<R>>['onSelect']
}

// Local Styles
const styles = {
  container: (column: Column<any>): React.CSSProperties => ({
    maxWidth: column.rotate ? 100 : 'none',
    borderLeft: `1px dashed ${colors.borders.cell}`,
    padding: '3px 7px',
    overflow: column.rotate ? 'auto' : 'initial',
  }),
}

// Exports
export default class Row<R extends Record> extends React.PureComponent<
  Props<R>
> {
  public props: Props<R>

  public render() {
    return this.props.columns.map(column => {
      const renderer = this.props.renderer[column.column]
      let value = this.props.record[column.column]

      if (renderer) {
        if (React.isValidElement(renderer)) {
          const props = Object.assign({}, this.props.record, { column })
          value = React.cloneElement(renderer as React.ReactElement<any>, props)
        } else if (typeof renderer === 'function') {
          value = renderer({ record: this.props.record, column })
        }
      }

      return (
        <td
          key={column.column}
          data-test="fc-table/Row"
          style={styles.container(column)}
          className={column.rotate ? 'rotate' : ''}

        >
          <Cell value={value} {...column} />
        </td>
      )
    })
  }
}
