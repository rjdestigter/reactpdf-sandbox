// Libs
import * as React from 'react'

// Types
import { DataTableProps, Filters, Record } from 'fc-datatable'
import { Column } from '../types'

// Styles
import colors from '../colors'

// Local Types
interface Props<R extends Record> {
  columns: Column<R>[]
  filters: Filters<R>
  onFilter: DataTableProps<R, Column<R>>['actions']['onFilter']
  isRotating: boolean
}

// Components
import svg from 'material-design-icons/action/svg/production/ic_search_24px.svg'

// Local Images
const imgSearch =
  'data:image/svg+xml;base64,' +
  btoa(svg.replace('<svg', '<svg fill="#ccc"'))

// Styles
const styles = {
  container: {
    color: colors.text.filter,
    borderTop: `1px solid ${colors.borders.filter}`,
    borderBottom: `1px solid ${colors.borders.filter}`,
    backgroundColor: colors.background.filter,
  },
  columns: {
    backgroundImage: `url(${imgSearch})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 20,
    backgroundPosition: '10px center',
  },
  wrapper: {
    position: 'relative',
    zIndex: 100
  },
  input: {
    borderLeft: `1px solid ${colors.borders.filterInput}`,
    padding: '7px 5px',
    width: '100%',
    fontSize: '0.9em',
    outline: 'none',
  },
}

// Exports
export default class FiltersComponent<
  R extends Record
> extends React.PureComponent<Props<R>> {
  public props: Props<R>

  public render() {
    return (
      <tr style={styles.container}>
        <th />
        {this.renderFilters()}
        {this.props.isRotating ? <th /> : null}
      </tr>
    )
  }

  private onInput(attr: keyof R) {
    if (this.props.onFilter) {
      return (e: React.FormEvent<any>) => {
        if (this.props.onFilter) {
          this.props.onFilter({
            attr,
            value: e.currentTarget.value,
          })
        }
      }
    }
  }

  private renderFilters() {
    return this.props.columns.map(column => {
      const value = this.props.filters[column.column] || ''
      return (
        <th style={styles.columns} key={column.column}>
          <div style={styles.wrapper}>
            <input
              style={styles.input}
              value={value}
              onInput={this.onInput(column.column)}
              data-dirty={value ? '1' : '0'}
            />
          </div>
        </th>
      )
    })
  }
}
