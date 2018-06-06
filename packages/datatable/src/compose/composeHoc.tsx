// Libs
import _ from 'lodash'
import * as React from 'react'

// Types
import { DataTableComponentProps, DataTableProps, InjectedComponentProps, Record } from '../types'

// Exports

export default <R extends Record, TOriginalProps extends {}>(
  WrappedComponent: React.ComponentType<TOriginalProps & DataTableComponentProps<R>>
): React.ComponentClass<TOriginalProps & DataTableProps<R>> => {
  return class DataTable extends React.PureComponent<TOriginalProps & DataTableProps<R>> {
    public render() {
      const start = this.props.page * this.props.perPage + 1
      const calculatedEnd = start + this.props.perPage - 1
      const end = calculatedEnd > this.props.max ? this.props.max : calculatedEnd

      const injectedProps: InjectedComponentProps<R> = {
        onPaginateFirst: this.onPaginateFirst,
        onPaginateLeft: this.onPaginateLeft,
        onPaginateRight: this.onPaginateRight,
        onPaginateLast: this.onPaginateLast,
        onSelect: this.onSelect,
        onSelectAll: this.onSelectAll,
        onClearSelection: this.onClearSelection,
        asc: !this.props.sortDesc,
        start,
        end,
      }

      return <WrappedComponent {...this.props} {...injectedProps} />
    }

    private onPaginateFirst = () => {
      this.props.actions.onPaginate(0)
    }

    private onPaginateLeft = () => {
      if (this.props.page > 0) {
        this.props.actions.onPaginate(this.props.page - 1)
      }
    }

    private onPaginateRight = () => {
      if (this.props.page < _.size(this.props.pages) - 1) {
        this.props.actions.onPaginate(this.props.page + 1)
      }
    }

    private onPaginateLast = () => {
      if (this.props.page < _.size(this.props.pages) - 1) {
        this.props.actions.onPaginate(_.size(this.props.pages) - 1)
      }
    }

    private onSelect = (recordId: number) => {
      this.props.actions.onSelect([recordId])
    }

    private onSelectAll = () => {
      const unselectedRecords: R[] = _.filter(this.props.pageRecords as R[], (record: R): boolean => {
        return _.indexOf(this.props.selectedRecordIds, record.id) < 0
      })

      if (!_.size(unselectedRecords)) {
        this.props.actions.onSelect(this.props.selectedRecordIds)
      } else {
        const unselectedRecordIds = _.map(unselectedRecords, 'id')
        this.props.actions.onSelect(unselectedRecordIds)
      }
    }

    private onClearSelection = () => {
      this.props.actions.onSelect(this.props.selectedRecordIds)
    }
  }
}
