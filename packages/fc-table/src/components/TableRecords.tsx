// Libs
import _ from 'lodash'
import * as React from 'react'

// Types
import { DataTableComponentProps, Record } from 'fc-datatable'
import { Column, Renderer } from '../types'

// Components
import ArrowDropDown from 'fc-icons/src/ArrowDropDown'
import ArrowDropUp from 'fc-icons/src/ArrowDropUp'
import CheckedBox from 'fc-icons/src/CheckedBox'
import UncheckedBox from 'fc-icons/src/UncheckedBox'
import Card from './Card'
import Cell from './Cell'
import Row from './Row'

// Styles
import colors from '../colors'

// Local Styles
const styles = {
  container: ({ isSelected }: { isSelected: boolean }) => ({
    borderBottom: `1px solid ${colors.borders.row}`,
    backgroundColor: isSelected ? colors.background.selectedRow : 'transparent',
  }),
  selectCell: {
    borderRight: `1px dashed ${colors.borders.cell}`,
    textAlign: 'center',
  },
  cell: {
    borderRight: `1px dashed ${colors.borders.cell}`,
  },
  group: {
    backgroundColor: colors.background.group,
  },
  groupCell: {
    textAlign: 'left',
    padding: 15,
  },
  groupDiv: {
    display: 'flex',
    alignItems: 'center',
  },
  groupItem: {
    paddingRight: 15,
  },
  smallScreenGroup: {
    display: 'flex',
    textAlign: 'left',
    padding: 10,
  },
}

// Types
interface Props<R extends Record> {
  records: DataTableComponentProps<R, Column<R>>['pageRecords']
  columns: Column<R>[]
  renderer: Renderer<R>
  onSelect: DataTableComponentProps<R, Column<R>>['onSelect']
  selectedRecordIds: DataTableComponentProps<R, Column<R>>['selectedRecordIds']
  groupedBy: DataTableComponentProps<R, Column<R>>['groupedBy']
  disabledGroups: DataTableComponentProps<R, Column<R>>['disabledGroups']
  onDisableGroup: DataTableComponentProps<R, Column<R>>['actions']['onDisableGroup']
  isRotating: boolean
  smallScreen?: boolean
  getUniqueRecordId?: (record: R) => string
}

// Exports
export default class Table<R extends Record> extends React.PureComponent<Props<R>> {
  public props: Props<R>

  public render() {
    return this.props.smallScreen ? this.renderCards() : this.renderRows()
  }

  private renderCards() {
    const isGrouped = !!Object.keys(this.props.groupedBy).length

    return _.flatMap(this.props.records, (record, index) => {
      const isSelected = this.props.selectedRecordIds.indexOf(record.id) >= 0

      const row = React.createElement(Card, {
        record,
        columns: this.props.columns,
        renderer: this.props.renderer,
        onSelect: this.props.onSelect,
        isSelected,
      })

      const recordRow =
        this.props.disabledGroups.indexOf(record._group as string) < 0 ? (
          <tr
            key={this.props.getUniqueRecordId ? this.props.getUniqueRecordId(record) : record.id}
            onClick={this.onSelect(record.id)}
          >
            <td style={{ backgroundColor: '#fafafa' }}>
              <div>{row}</div>
            </td>
          </tr>
        ) : null

      if (
        this.props.onDisableGroup &&
        isGrouped &&
        record._group &&
        (index === 0 || record._group !== this.props.records[index - 1]._group)
      ) {
        const groups = record._group.split(';').map(groupAtValue => {
          const [group, value] = groupAtValue.split('@') as [keyof R, any]
          const column = _.find(this.props.columns, { column: group })
          if (column) {
            const renderer = this.props.renderer[column.column]

            let cellValue: any = value
            if (renderer) {
              if (React.isValidElement(renderer)) {
                const props = Object.assign({}, record, {
                  column,
                })
                cellValue = React.cloneElement(renderer as React.ReactElement<any>, props)
              } else if (typeof renderer === 'function') {
                cellValue = renderer({
                  record,
                  column,
                })
              }
            }

            return (
              <div key={groupAtValue} style={styles.groupItem}>
                <Cell {...column} value={cellValue} />
              </div>
            )
          }

          return null
        })

        const groupRow = (
          <tr key={record._group} style={styles.group}>
            <td style={styles.smallScreenGroup} onClick={() => this.props.onDisableGroup(record._group as string)}>
              {this.props.disabledGroups.indexOf(record._group) < 0 ? (
                <ArrowDropDown color={colors.icons.groupOpen} />
              ) : (
                <ArrowDropUp color={colors.icons.groupClosed} />
              )}
              <div style={styles.groupDiv as React.CSSProperties}>{groups}</div>
            </td>
          </tr>
        )

        if (this.props.disabledGroups.indexOf(record._group) < 0) {
          return [groupRow, recordRow]
        }

        return [groupRow]
      } else {
        return [recordRow]
      }
    })
  }

  private renderRows() {
    const isGrouped = !!Object.keys(this.props.groupedBy).length
    const colSpan = this.props.columns.length + (this.props.isRotating ? 1 : 0)

    return _.flatMap(this.props.records, (record, index) => {
      const row = React.createElement(Row, {
        record,
        columns: this.props.columns,
        renderer: this.props.renderer,
        onSelect: this.props.onSelect,
      })

      const isSelected = this.props.selectedRecordIds.indexOf(record.id) >= 0

      const recordRow =
        this.props.disabledGroups.indexOf(record._group as string) < 0 ? (
          <tr
            key={this.props.getUniqueRecordId ? this.props.getUniqueRecordId(record) : record.id}
            style={styles.container({ isSelected })}
            onClick={this.onSelect(record.id)}
          >
            {this.props.onSelect ? (
              <td style={styles.selectCell}>
                {isSelected ? (
                  <CheckedBox color={colors.icons.selected} />
                ) : (
                  <UncheckedBox color={colors.icons.unselected} />
                )}
              </td>
            ) : (
              <td style={styles.selectCell} />
            )}

            {row}
            {this.props.isRotating ? <td /> : null}
          </tr>
        ) : null

      if (
        this.props.onDisableGroup &&
        isGrouped &&
        record._group &&
        (index === 0 || record._group !== this.props.records[index - 1]._group)
      ) {
        const groups = record._group.split(';').map(groupAtValue => {
          const [group, value] = groupAtValue.split('@') as [keyof R, any]
          const column = _.find(this.props.columns, { column: group })
          if (column) {
            const renderer = this.props.renderer[column.column]

            let cellValue: any = value
            if (renderer) {
              if (React.isValidElement(renderer)) {
                const props = Object.assign({}, record, {
                  column,
                })
                cellValue = React.cloneElement(renderer as React.ReactElement<any>, props)
              } else if (typeof renderer === 'function') {
                cellValue = renderer({
                  record,
                  column,
                })
              }
            }

            return (
              <div key={groupAtValue} style={styles.groupItem}>
                <Cell {...column} value={cellValue} />
              </div>
            )
          }

          return null
        })

        const groupRow = (
          <tr key={record._group} style={styles.group}>
            <td style={styles.selectCell} onClick={() => this.props.onDisableGroup(record._group as string)}>
              {this.props.disabledGroups.indexOf(record._group) < 0 ? (
                <ArrowDropDown color={colors.icons.groupOpen} />
              ) : (
                <ArrowDropUp color={colors.icons.groupClosed} />
              )}
            </td>
            <td style={styles.groupCell} colSpan={colSpan}>
              <div style={styles.groupDiv as React.CSSProperties}>{groups}</div>
            </td>
          </tr>
        )

        if (this.props.disabledGroups.indexOf(record._group) < 0) {
          return [groupRow, recordRow]
        }

        return [groupRow]
      } else {
        return [recordRow]
      }
    })
  }

  private onSelect(recordId: number) {
    if (this.props.onSelect) {
      return () => {
        if (this.props.onSelect) {
          this.props.onSelect(recordId)
        }
      }
    }
  }
}
