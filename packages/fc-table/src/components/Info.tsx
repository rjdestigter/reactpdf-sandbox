// Libs
import * as React from 'react'

// Types
import { DataTableProps, Filters, Record } from 'fc-datatable'
import { ActionItem, Column } from '../types'

// Components
import Translate from './Translate'

// Styles
import colors from '../colors'

// Local Types
interface Props<R extends Record> {
  selectedRecordIds: number[]
  columns: Column<R>[]
  filters: Filters<R>
  onFilter: DataTableProps<R, Column<R>>['actions']['onFilter']
  isRotating: boolean
  actionItems?: ActionItem[]
}

// Local Styles
const styles: Styles = {
  container: {
    textAlign: 'left',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  input: {
    border: 0,
    padding: '7px 5px',
    color: 'inherit',
    backgroundColor: colors.background.input,
    width: '100%',
    fontSize: '0.9em',
    outline: 'none',
  },
  bar: {
    display: 'flex',
  },
  leftBar: {},
  rightBar: {
    flex: '1 1 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  itemsSelected: {
    color: '#333',
    fontSize: '1.2em',
    padding: '0 10px',
  },
  actionItem: {
    marginRight: 25,
  },
}

// Exports
export default class Info<R extends Record> extends React.PureComponent<Props<R>> {
  public props: Props<R>

  public render() {
    return (
      <div style={styles.bar}>
        <div style={styles.leftBar}>{this.renderItemsSelected()}</div>
        <div style={styles.rightBar}>{this.renderActionItems()}</div>
      </div>
    )
  }

  private renderActionItems() {
    if (this.props.actionItems) {
      return this.props.actionItems.map((actionItem, index) => {
        let cmp: React.ReactElement<any>

        const props = {
          selectedRecordIds: this.props.selectedRecordIds,
        }

        if (React.isValidElement(actionItem)) {
          cmp = React.cloneElement(actionItem as React.ReactElement<any>, props)
        } else {
          cmp = React.createElement(actionItem as React.ComponentType<any>, props)
        }

        return (
          <div key={index} style={styles.actionItem}>
            {cmp}
          </div>
        )
      })
    }

    return null
  }

  private renderItemsSelected() {
    const countOfSelectedIds = this.props.selectedRecordIds.length

    if (countOfSelectedIds > 0) {
      return (
        <div style={styles.itemsSelected}>
          <span>{countOfSelectedIds} </span>
          <Translate translate={countOfSelectedIds > 1 ? 'items selected' : 'item selected'} />
        </div>
      )
    }

    return null
  }
}
