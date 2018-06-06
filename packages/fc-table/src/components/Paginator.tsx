// Libs
import * as React from 'react'
import { createSelector } from 'reselect'

// Components
import ArrowDropDown from 'fc-icons/src/ArrowDropDown'
import CheckedBox from 'fc-icons/src/CheckedBox'
import NavAfterIcon from 'fc-icons/src/NavigateAfter'
import NavBeforeIcon from 'fc-icons/src/NavigateBefore'
import NavFirstIcon from 'fc-icons/src/NavigateFirst'
import NavLastIcon from 'fc-icons/src/NavigateLast'
import SearchIcon from 'fc-icons/src/Search'
import UncheckedBox from 'fc-icons/src/UncheckedBox'
import { Menu, MenuAnchor, MenuItem } from 'rmwc/Menu'
import Translate from './Translate'

// Utils
import nAf from 'utils/nAf'

// Types
import { DataTableComponentProps, Record } from 'fc-datatable'
import { Column } from '../types'

// Styles
import colors from '../colors'

// Local Selectors
const pageOptions$ = createSelector(
  (props: any): number => props.pages,
  pages => {
    const options = []
    for (let i = 0; i < pages; i += 1) {
      options.push({ label: i + 1, value: i })
    }
    return options
  }
)

// Local Styles
const styles: Styles = {
  container: (props: Props<any>) => ({
    flex: '0 0 auto',
    backgroundColor: colors.background.table,
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    justifyContent: props.smallScreen ? 'space-between' : 'flex-end',
    minHeight: 50,
    padding: '0 15px',
    color: colors.text.table,
    fontSize: 12,
    boxShadow: '0 -1px 1px rgba(0,0,0,0.2)',
  }),
  label: {
    whiteSpace: 'nowrap',
    paddingRight: 10,
  },
  section: {
    padding: '0 7px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
  },
  menu: {
    maxHeight: '90vh',
  },
}

// Types
interface Props<R extends Record> {
  page: number
  start: number
  end: number
  max: number
  onPaginateLeft: DataTableComponentProps<R, Column<R>>['onPaginateLeft']
  onPaginateRight: DataTableComponentProps<R, Column<R>>['onPaginateRight']
  onPaginateFirst: DataTableComponentProps<R, Column<R>>['onPaginateFirst']
  onPaginateLast: DataTableComponentProps<R, Column<R>>['onPaginateLast']
  onPaginate: DataTableComponentProps<R, Column<R>>['actions']['onPaginate']
  onGroup: DataTableComponentProps<R, Column<R>>['actions']['onGroup']
  onPerPage: DataTableComponentProps<R, Column<R>>['actions']['onPerPage']
  onHideColumn: DataTableComponentProps<R, Column<R>>['actions']['onHideColumn']
  columns: Column<R>[]
  perPage: number
  pages: number
  groupedBy: DataTableComponentProps<R, Column<R>>['groupedBy']
  hiddenColumns: DataTableComponentProps<R, Column<R>>['hiddenColumns']
  smallScreen?: boolean
  onToggleControls: () => void
}

interface State {
  page: boolean
  perPage: boolean
  groupBy: boolean
  hideColumn: boolean
}

// Exports
export default class Paginator<R extends Record> extends React.PureComponent<Props<R>, State> {
  constructor(props: Props<R>) {
    super(props)
    this.state = {
      page: false,
      perPage: false,
      groupBy: false,
      hideColumn: false,
    }
  }

  public render() {
    return (
      <div style={styles.container(this.props)} data-test="fc-table/Paginator">
        {this.props.smallScreen ? null : this.renderPageSelector()}
        {this.props.smallScreen ? null : this.renderPerPageSelector()}
        {this.props.smallScreen ? null : this.renderGroupBySelector()}
        {this.props.smallScreen ? null : this.renderToggleColumnSelector()}
        <div style={styles.section} onClick={this.props.onPaginateFirst}>
          <NavFirstIcon size={20} color={colors.icons.paginator} />
        </div>
        <div style={styles.section} onClick={this.props.onPaginateLeft}>
          <NavBeforeIcon size={20} color={colors.icons.paginator} />
        </div>
        <div style={styles.section}>
          <span style={styles.label}>
            <span>{this.props.start}</span>
            <span>{' - '}</span>
            <span>{this.props.end}</span>
            <span> </span>
            <Translate translate={'of'} />
            <span> </span>
            <span>{this.props.max}</span>
          </span>
        </div>
        <div style={styles.section} onClick={this.props.onPaginateRight}>
          <NavAfterIcon size={20} color={colors.icons.paginator} />
        </div>
        <div style={styles.section} onClick={this.props.onPaginateLast}>
          <NavLastIcon size={20} color={colors.icons.paginator} />
        </div>
        {this.props.smallScreen ? (
          <div onClick={this.props.onToggleControls}>
            <SearchIcon color={colors.icons.paginator} size={20} />
          </div>
        ) : null}
      </div>
    )
  }

  private renderPageSelector() {
    return (
      <div style={styles.section}>
        <MenuAnchor>
          <Menu open={this.state.page} onClose={() => this.setState({ page: false })} onSelected={nAf}>
            {pageOptions$(this.props).map(option => (
              <MenuItem onClick={() => this.props.onPaginate(option.value)}>{option.label}</MenuItem>
            ))}
          </Menu>

          <div style={styles.menuItem} onClick={() => this.setState({ page: !this.state.page })}>
            <div style={styles.label}>Page</div>
            <div>{this.props.page + 1}</div>
            <div>
              <ArrowDropDown size={16} color={colors.icons.paginator} />
            </div>
          </div>
        </MenuAnchor>
      </div>
    )
  }

  private renderPerPageSelector() {
    return (
      <div style={styles.section}>
        <MenuAnchor>
          <Menu
            open={this.state.perPage}
            onClose={() => this.setState({ perPage: false })}
            onSelected={nAf}
            style={styles.menu}
          >
            <MenuItem onClick={() => this.props.onPerPage(10)}>10</MenuItem>
            <MenuItem onClick={() => this.props.onPerPage(15)}>15</MenuItem>
            <MenuItem onClick={() => this.props.onPerPage(20)}>20</MenuItem>
            <MenuItem onClick={() => this.props.onPerPage(25)}>25</MenuItem>
            <MenuItem onClick={() => this.props.onPerPage(50)}>50</MenuItem>
            <MenuItem onClick={() => this.props.onPerPage(100)}>100</MenuItem>
          </Menu>

          <div style={styles.menuItem} onClick={() => this.setState({ perPage: !this.state.perPage })}>
            <div style={styles.label}>
              <Translate translate={'per Page'} />
            </div>
            <div>{this.props.perPage}</div>
            <div>
              <ArrowDropDown size={16} color={colors.icons.paginator} />
            </div>
          </div>
        </MenuAnchor>
      </div>
    )
  }

  private renderGroupBySelector() {
    return (
      <div style={styles.section}>
        <MenuAnchor>
          <Menu
            open={this.state.groupBy}
            onClose={() => this.setState({ groupBy: false })}
            onSelected={nAf}
            style={styles.menu}
          >
            {this.props.columns.map(column => {
              const isGroupedBy = Object.keys(this.props.groupedBy).indexOf(column.column) >= 0
              return (
                <MenuItem key={column.column} onClick={() => this.props.onGroup(column.column)}>
                  <div>{isGroupedBy ? <CheckedBox color={'#333'} /> : <UncheckedBox color={'#333'} />}</div>
                  {column.label || column.column}
                </MenuItem>
              )
            })}
          </Menu>

          <div style={styles.menuItem} onClick={() => this.setState({ groupBy: !this.state.groupBy })}>
            <div style={styles.label}>
              <Translate translate={'Group by'} />
            </div>
            <div>
              <ArrowDropDown size={16} color={colors.icons.paginator} />
            </div>
          </div>
        </MenuAnchor>
      </div>
    )
  }

  private renderToggleColumnSelector() {
    return (
      <div style={styles.section}>
        <MenuAnchor>
          <Menu
            open={this.state.hideColumn}
            onClose={() => this.setState({ hideColumn: false })}
            onSelected={nAf}
            style={styles.menu}
          >
            {this.props.columns.map(column => {
              const isHidden = this.props.hiddenColumns.indexOf(column.column) >= 0
              return (
                <MenuItem key={column.column} onClick={() => this.props.onHideColumn(column.column)}>
                  <div>{isHidden ? <UncheckedBox color={'#333'} /> : <CheckedBox color={'#333'} />}</div>
                  {column.label || column.column}
                </MenuItem>
              )
            })}
          </Menu>

          <div style={styles.menuItem} onClick={() => this.setState({ hideColumn: !this.state.hideColumn })}>
            <div style={styles.label}>
              <Translate translate={'Columns'} />
            </div>
            <div>
              <ArrowDropDown size={16} color={colors.icons.paginator} />
            </div>
          </div>
        </MenuAnchor>
      </div>
    )
  }
}
