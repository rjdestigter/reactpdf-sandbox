// Libs
import _ from 'lodash'
import * as React from 'react'

// Components
import ArrowDownward from 'fc-icons/src/ArrowDownward'
import ArrowUpward from 'fc-icons/src/ArrowUpward'
import CheckIcon from 'fc-icons/src/Check'
import CloseIcon from 'fc-icons/src/Close'
import SearchIcon from 'fc-icons/src/Search'
import SortIcon from 'fc-icons/src/Sort'
import ViewColumnIcon from 'fc-icons/src/ViewColumn'
import ViewListIcon from 'fc-icons/src/ViewList'
import Translate from './Translate'

// Styles
import colors from '../colors'

// Types
import { DataTableComponentProps, Filters, Record } from 'fc-datatable'
import { Column } from '../types'

// Local Styles
const styles: Styles = {
  container: {
    boxShadow: '0 -2px 2px rgba(0,0,0,0.2)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fafafa',
    minHeight: 150,
    fontSize: 12,
  },
  tabs: {
    display: 'flex',
    borderBottom: `1px solid ${colors.borders.smallScreen}`,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  tab: {
    flex: '0 0 20%',
    height: 45,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRight: `1px solid ${colors.borders.smallScreen}`,
  },
  lastTab: {
    flex: '0 0 20%',
    flexDirection: 'column',
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columns: {
    maxHeight: 200,
    overflow: 'auto',
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  column: {
    flex: '1 1 auto',
    height: 45,
    display: 'flex',
    alignItems: 'center',
    borderRight: `1px solid ${colors.borders.smallScreen}`,
    borderBottom: `1px solid ${colors.borders.smallScreen}`,
    padding: '0 10px',
  },
  check: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: (state: State<any>): React.CSSProperties => ({
    display: state.tab === 'search' ? 'block' : 'none',
  }),
  searchInput: {
    border: 0,
    width: '100%',
    padding: '15px 7px',
    outline: 'none',
    backgroundColor: '#171717',
    color: '#fafafa',
  },
  filterValue: {
    fontSize: '0.8em',
    color: '#707070',
    fontStyle: 'italic',
  },
  tabLabel: {
    fontSize: '0.9em',
    color: '#707070',
    marginTop: 2,
  }
}

interface Props<R extends Record> {
  columns: Column<R>[]
  sortBy: DataTableComponentProps<R, Column<R>>['sortBy']
  sortDesc: DataTableComponentProps<R, Column<R>>['sortDesc']
  groupedBy: DataTableComponentProps<R, Column<R>>['groupedBy']
  hiddenColumns: DataTableComponentProps<R, Column<R>>['hiddenColumns']
  onGroup: DataTableComponentProps<R, Column<R>>['actions']['onGroup']
  onHideColumn: DataTableComponentProps<R, Column<R>>['actions']['onHideColumn']
  onSort: DataTableComponentProps<R, Column<R>>['actions']['onSort']
  filters: Filters<R>
  onFilter: DataTableComponentProps<R, Column<R>>['actions']['onFilter']
  onClose: () => void
}

type Tab = 'search' | 'sort' | 'hideColumn' | 'groupBy'

interface State<R extends Record> {
  tab: Tab
  filterBy: keyof R
}

// Exports
export default class Control<R extends Record> extends React.PureComponent<Props<R>, State<R>> {
  constructor(props: Props<R>) {
    super(props)

    this.state = {
      tab: 'search',
      filterBy: props.columns[0].column,
    }

    this.onFilter = this.onFilter.bind(this)
    this.onClearFilter = this.onClearFilter.bind(this)
  }

  public render() {
    const filterByColumn = _.find(this.props.columns, { column: this.state.filterBy })
    return (
      <div style={styles.container}>
        <div style={styles.search(this.state)}>
          <input
            type="text"
            style={styles.searchInput}
            value={this.props.filters[this.state.filterBy] || ''}
            placeholder={(filterByColumn && filterByColumn.label) || '...'}
            onInput={this.onFilter}
          />
        </div>
        <div style={styles.tabs}>
          <div style={styles.tab} onClick={this.props.onClose}>
            <CloseIcon color={colors.icons.tabs} size={20} />
            <div style={styles.tabLabel}><Translate translate={'Close'} /></div>
          </div>
          <div style={styles.tab} onClick={this.onTab('search')}>
            <SearchIcon color={this.state.tab === 'search' ? colors.icons.selected : colors.icons.tabs} size={24} />
            <div style={styles.tabLabel}><Translate translate={'Filter'} /></div>
          </div>
          <div style={styles.tab} onClick={this.onTab('sort')}>
            <SortIcon color={this.state.tab === 'sort' ? colors.icons.selected : colors.icons.tabs} size={24} />
            <div style={styles.tabLabel}><Translate translate={'Sort'} /></div>
          </div>
          <div style={styles.tab} onClick={this.onTab('groupBy')}>
            <ViewListIcon color={this.state.tab === 'groupBy' ? colors.icons.selected : colors.icons.tabs} size={24} />
            <div style={styles.tabLabel}><Translate translate={'Group'} /></div>
          </div>
          <div style={styles.lastTab} onClick={this.onTab('hideColumn')}>
            <ViewColumnIcon
              color={this.state.tab === 'hideColumn' ? colors.icons.selected : colors.icons.tabs}
              size={24}
            />
            <div style={styles.tabLabel}>{'Columns'}</div>
          </div>
        </div>
        <div style={styles.columns}>
          {this.props.columns.map(column => {
            return (
              <div key={column.column} style={styles.column} onClick={this.onClickColumn(column)}>
                <div style={styles.check}>{this.renderColumnStatus(column)}</div>
                <div>
                  <div>{column.label}</div>
                  <div style={styles.filterValue}>{this.props.filters[column.column] || ''}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  private renderColumnStatus(column: Column<R>) {
    switch (this.state.tab) {
      case 'sort':
        if (this.props.sortBy === column.column) {
          if (this.props.sortDesc) {
            return <ArrowUpward size={16} color={colors.icons.smallScreen} />
          }

          return <ArrowDownward size={16} color={colors.icons.smallScreen} />
        }

        return <ArrowDownward size={16} color={'#ccc'} />
      case 'hideColumn':
        if (this.props.hiddenColumns.indexOf(column.column) <= 0) {
          return <CheckIcon size={16} color={colors.icons.smallScreen} />
        }

        return null
      case 'groupBy':
        if (this.props.groupedBy[column.column]) {
          return <CheckIcon size={16} color={colors.icons.smallScreen} />
        }

        return null
      default:
        if (this.props.filters[column.column]) {
          return (
            <div onClick={this.onClearFilter(column)}>
              <CloseIcon size={16} color={colors.icons.smallScreen} />
            </div>
          )
        } else if (this.state.filterBy === column.column) {
          return <CheckIcon size={16} color={colors.icons.smallScreen} />
        }

        return null
    }
  }

  private onClickColumn(column: Column<R>) {
    return () => {
      switch (this.state.tab) {
        case 'sort':
          this.props.onSort(column.column)
          break
        case 'hideColumn':
          this.props.onHideColumn(column.column)
          break
        case 'groupBy':
          this.props.onGroup(column.column)
          break
        default:
          this.setState({ filterBy: column.column })
      }
    }
  }

  private onClearFilter(column: Column<R>) {
    return (e: React.MouseEvent<any>) => {
      e.stopPropagation()
      this.props.onFilter({ attr: column.column, value: '' })
    }
  }

  private onFilter(e: React.FormEvent<any>) {
    this.props.onFilter({
      attr: this.state.filterBy,
      value: e.currentTarget.value,
    })
  }

  private onTab(tab: Tab) {
    return () => this.setState({ tab })
  }
}
