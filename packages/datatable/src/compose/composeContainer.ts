// Types
import { ActionCreators, MappedDispatchProps, MappedStateProps, Record, Selectors } from '../types'

// Libs
import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

// Exports
export default function composeContainer<R extends Record>({
  selectors,
  actionCreators,
}: {
  selectors: Selectors<R>
  actionCreators: ActionCreators<R>
}) {
  function mapStateToProps(state: any): MappedStateProps<R> {
    return Object.assign({
      perPage: selectors.perPage$(state),
      page: selectors.page$(state),
      pages: selectors.pages$(state),
      pageRecords: selectors.pageRecords$(state),
      max: selectors.max$(state),
      sortBy: selectors.sortBy$(state),
      sortDesc: selectors.sortDesc$(state),
      filters: selectors.filters$(state),
      selectedRecordIds: selectors.selectedRecordIds$(state),
      allSelected: selectors.allSelected$(state),
      groupedBy: selectors.groupedBy$(state),
      hiddenColumns: selectors.hiddenColumns$(state),
      disabledGroups: selectors.disabledGroups$(state),
    })
  }

  const mapDispatchToProps = (dispatch: Dispatch<any>): MappedDispatchProps<R> => {
    return {
      actions: bindActionCreators(
        {
          onPaginate: actionCreators.paginate,
          onPerPage: actionCreators.perPage,
          onSelect: actionCreators.select,
          onSelectAll: actionCreators.selectAll,
          onSort: actionCreators.sort,
          onFilter: actionCreators.filter,
          onGroup: actionCreators.group,
          onDisableGroup: actionCreators.disableGroup,
          onHideColumn: actionCreators.hideColumn,
        },
        dispatch
      ),
    }
  }

  return <TStateProps>(mergeMapStateToProps?: (state: any) => TStateProps) => {
    if (mergeMapStateToProps) {
      const finalMapStateToProps = (state: any) => {
        return Object.assign({}, mapStateToProps(state), mergeMapStateToProps(state))
      }

      return connect(finalMapStateToProps, mapDispatchToProps)
    }

    return connect(mapStateToProps, mapDispatchToProps)
  }
}
