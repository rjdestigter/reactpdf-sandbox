// Libs
import * as React from 'react'

// Components
import CardCell from './CardCell'

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
  isSelected: boolean
}

// Local Styles
const styles = {
  container: ({ isSelected }: { isSelected: boolean }): React.CSSProperties => ({
    margin: '5px 0px 7px 0px',
    borderTop: '1px solid #ccc',
    // padding: 5,
    backgroundColor: colors.background.table,
    display: 'flex',
    flexWrap: 'wrap',
    borderLeft: `5px solid ${isSelected ? colors.icons.selected : '#ccc'}`,
    boxShadow: '0 0 2px rgba(0,0,0,0.2)',
  }),
  cell: {
    flex: '1 1 auto',
    padding: 7,
    minHeight: 65,
    borderLeft: `1px solid ${colors.borders.smallScreenCell}`,
    borderBottom: `1px solid ${colors.borders.smallScreenCell}`,
  },
  label: {
    marginBottom: 5,
    color: '#888888',
    fontSize: '0.85em',
  },
}

// Exports
export default class Card<R extends Record> extends React.PureComponent<Props<R>> {
  public props: Props<R>

  public render() {
    return (
      <div data-test="fc-table/Card" style={styles.container(this.props)}>
        {this.renderCells()}
      </div>
    )
  }
  private renderCells() {
    return this.props.columns.map(column => {
      const renderer = this.props.renderer[column.column]
      let value = this.props.record[column.column]

      if (value != null && value !== '') {
        if (renderer) {
          if (React.isValidElement(renderer)) {
            const props = Object.assign({}, this.props.record, { column })
            value = React.cloneElement(renderer as React.ReactElement<any>, props)
          } else if (typeof renderer === 'function') {
            value = renderer({ record: this.props.record, column })
          }
        }

        return (
          <div key={column.column} style={styles.cell}>
            <div style={styles.label}>{column.label}</div>
            <CardCell value={value} {...column} />
          </div>
        )
      }

      return null
    })
  }
}
