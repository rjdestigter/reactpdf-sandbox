// Libs
import _ from 'lodash'
import * as React from 'react'

// Styles
import './styles.scss'

// Components
import Swipeable from 'react-swipeable'
import ActionItems from './ActionItems'
import Controls from './Controls'
import Filters from './Filters'
import Header from './Header'
import Info from './Info'
import Paginator from './Paginator'
import TableRecords from './TableRecords'

// Types
import { DataTableComponentProps, Record } from 'fc-datatable'
import { ActionItem, Column, Renderer } from '../types'

// Styles
import colors from '../colors'

interface Props<R extends Record> extends DataTableComponentProps<R, Column<R>> {
  columns: Column<R>[]
  renderer: Renderer<R>
  smallScreen?: boolean
  actionItems?: ActionItem[]
  getUniqueRecordId?: (record: R) => string
  containerStyle?: Styles
  tableDivStyle?: Styles
}

interface State {
  showControls: boolean
}

// Styles
const styles: { [style: string]: React.CSSProperties } = {
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    width: '100%',
    overflow: 'auto',
  },
  container: {
    fontSize: 14,
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: colors.background.table,
    overflow: 'auto',
    paddingTop: 10,
  },
  infoDiv: {
    paddingTop: 7,
    paddingBottom: 7,
  },
  tableDiv: {
    flex: '1 1 auto',
    width: '100%',
  },
  table: {
    width: '100%',
    overflow: 'auto',
    backgroundColor: colors.background.table,
    color: colors.text.table,
  },
}

// Exports
export default class Table<R extends Record> extends React.PureComponent<Props<R>, State> {
  public props: Props<R>
  private onToggleControls: () => void

  constructor(props: Props<R>) {
    super(props)

    this.state = {
      showControls: false,
    }

    this.onToggleControls = () => {
      this.setState({ showControls: !this.state.showControls })
    }
  }

  public render() {
    const columns = this.props.hiddenColumns.length
      ? this.props.columns.filter(column => this.props.hiddenColumns.indexOf(column.column) < 0)
      : this.props.columns

    const isRotating = _.some(columns, column => column.rotate)
    const rows = React.createElement(TableRecords, {
      records: this.props.pageRecords,
      columns,
      renderer: this.props.renderer,
      onSelect: this.props.onSelect,
      selectedRecordIds: this.props.selectedRecordIds,
      groupedBy: this.props.groupedBy,
      disabledGroups: this.props.disabledGroups,
      onDisableGroup: this.props.actions.onDisableGroup,
      isRotating,
      smallScreen: this.props.smallScreen,
      getUniqueRecordId: this.props.getUniqueRecordId
    })

    const header = !this.props.smallScreen
      ? React.createElement(Header, {
          columns,
          onSort: this.props.actions.onSort,
          onSelectAll: this.props.onSelectAll,
          allSelected: this.props.allSelected,
          sortBy: this.props.sortBy,
          sortDesc: this.props.sortDesc,
          isRotating,
        })
      : null

    const filters = !this.props.smallScreen
      ? React.createElement(Filters, {
          columns,
          filters: this.props.filters,
          onFilter: this.props.actions.onFilter,
          isRotating,
        })
      : null

    const info = !this.props.smallScreen
      ? React.createElement(Info, {
          selectedRecordIds: this.props.selectedRecordIds,
          columns,
          filters: this.props.filters,
          onFilter: this.props.actions.onFilter,
          actionItems: this.props.actionItems,
          isRotating,
        })
      : null

    const paginator = React.createElement(Paginator, {
      page: this.props.page,
      start: this.props.start,
      end: this.props.end,
      max: this.props.max,
      onPaginateFirst: this.props.onPaginateFirst,
      onPaginateLeft: this.props.onPaginateLeft,
      onPaginateRight: this.props.onPaginateRight,
      onPaginateLast: this.props.onPaginateLast,
      onPaginate: this.props.actions.onPaginate,
      onGroup: this.props.actions.onGroup,
      onPerPage: this.props.actions.onPerPage,
      onHideColumn: this.props.actions.onHideColumn,
      perPage: this.props.perPage,
      pages: this.props.pages.length,
      columns: this.props.columns,
      hiddenColumns: this.props.hiddenColumns,
      groupedBy: this.props.groupedBy,
      smallScreen: this.props.smallScreen,
      onToggleControls: this.onToggleControls,
    })

    const table = (
      <table style={styles.table}>
        {/* {filters} */}
        <thead>
          {header}
          {filters}
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )

    const tableDivStyle = this.props.tableDivStyle
      ? { ...styles.tableDiv, ...this.props.tableDivStyle }
      : styles.tableDiv

    const tableWrapped = this.props.smallScreen
      ? React.createElement(Swipeable, {
          style: tableDivStyle,
          onSwipedLeft: this.props.onPaginateRight,
          onSwipedRight: this.props.onPaginateLeft,
          children: table,
        })
      : React.createElement('div', {
          style: tableDivStyle,
          children: table,
        })

    const controls = this.props.smallScreen
      ? React.createElement(Controls, {
          onGroup: this.props.actions.onGroup,
          onHideColumn: this.props.actions.onHideColumn,
          columns: this.props.columns,
          hiddenColumns: this.props.hiddenColumns,
          groupedBy: this.props.groupedBy,
          onSort: this.props.actions.onSort,
          sortBy: this.props.sortBy,
          sortDesc: this.props.sortDesc,
          filters: this.props.filters,
          onFilter: this.props.actions.onFilter,
          onClose: this.onToggleControls,
        })
      : null

    const actionItems = this.props.smallScreen
      ? React.createElement(ActionItems, {
          actionItems: this.props.actionItems,
          selectedRecordIds: this.props.selectedRecordIds,
        })
      : null

    const containerStyle = this.props.containerStyle
      ? { ...styles.container, ...this.props.containerStyle }
      : styles.container

    return (
      <div style={styles.mainDiv}>
        <div style={styles.infoDiv}>{info}</div>
        <div data-test="fc-table/Table" className={'fc-table-light'} style={containerStyle}>
          {tableWrapped}
          {this.state.showControls ? controls : null}
        </div>
        <div>
          {paginator}
          {actionItems}
        </div>
      </div>
    )
  }
}
