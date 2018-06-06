// Libs
import _ from 'lodash'
import * as React from 'react'

// Styles
import colors from '../colors'

// Types
import { DataTableComponentProps, DataTableProps, Record } from 'fc-datatable'
import { Column } from '../types'

// Components
import CheckedBox from 'fc-icons/src/CheckedBox'
import UncheckedBox from 'fc-icons/src/UncheckedBox'
import ColumnCell from './ColumnCell'

// Local Styles
const styles = {
  container: {
    borderBottom: `1px solid ${colors.borders.header}`,
  },
  columns: {
    flex: '1 1 auto',
    display: 'flex',
  },
  selectCell: {
    width: '2%',
    textAlign: 'center',
    verticalAlign: 'bottom',
  },
}

// Local Types
interface Props<R extends Record> {
  columns: Column<R>[]
  onSort: DataTableProps<R, Column<R>>['actions']['onSort']
  onSelectAll: any
  allSelected: DataTableComponentProps<R, Column<R>>['allSelected']
  sortBy: DataTableComponentProps<R, Column<R>>['sortBy']
  sortDesc: DataTableComponentProps<R, Column<R>>['sortDesc']
  isRotating: boolean
}

// Exports
export default class Header<R extends Record> extends React.PureComponent<Props<R>> {
  public props: Props<R>

  public render() {
    return (
      <tr style={styles.container}>
        {this.props.onSelectAll ? (
          <th style={styles.selectCell} onClick={this.props.onSelectAll}>
            {this.props.allSelected ? (
              <CheckedBox color={colors.icons.selected} />
            ) : (
              <UncheckedBox color={colors.icons.unselected} />
            )}
          </th>
        ) : (
          <th style={styles.selectCell} />
        )}

        {this.renderColumns()}
        {this.props.isRotating ? <th /> : null}
      </tr>
    )
  }

  public renderColumns() {
    const lastIndex = this.props.columns.length - 1

    return this.props.columns.map((column, index) => {
      return React.createElement(
        ColumnCell,
        Object.assign({ key: column.column }, column, {
          onSort: this.props.onSort,
          last: index === lastIndex,
          sortedBy: this.props.sortBy === column.column,
          sortDesc: this.props.sortDesc,
        })
      )
    })
  }
}
