import { Selector } from 'reselect'

// Composers
import composeActions from './composeActions'
import composeActionTypes from './composeActionTypes'
import composeContainer from './composeContainer'
import composeHoc from './composeHoc'
import composeInitialState from './composeInitialState'
import composeReducers from './composeReducers'
import composeSelectors from './composeSelectors'

// Components

// Record is a sortable, filterable, and renderable representation of a Model
// M = Model e.g. { id: 4, parent: 10, date: 1432554 } (raw model)
// R = Record e.g. { id: 4, parent: 'Chinook', date: 'Monday', other: 'Hello World' } (sortable, filterable record)

// Types
import { ComposerOptions, ComposerParams, DataTableComponentProps, Record, RecordSelector, Sort, State } from '../types'

// Exports
export default function composeDataTable({ name, options: maybeOptions = {} }: ComposerParams) {
  return <R extends Record>({
    tableState$,
    records$,
    sort,
    initialState: preloadedState,
  }: {
    records$: RecordSelector<R>
    tableState$: (state: any) => State<R>
    sort?: Sort<R>
    initialState?: { [P in keyof State<R>]?: State<R>[P] }
  }) => {
    const options: ComposerOptions = {
      allowGrouping: true,
      allowHidingColumns: true,
      allowColumnOrdering: false,
      allowSelecting: true,
      allowSorting: true,
      allowFiltering: true,
      allowPagination: true,
      allowSelectAll: true,
      ...maybeOptions,
    }

    options.allowSelectAll = options.allowSelecting ? true : false

    const actionTypes = composeActionTypes(name)
    const actionCreators = composeActions<R>(actionTypes)

    const initialState = composeInitialState<R>(preloadedState)

    const selectors = composeSelectors<R>({
      records$,
      tableState$,
      sort: sort || {},
    })

    const reducer = composeReducers({ initialState, actionTypes })

    const container = composeContainer<R>({
      selectors,
      actionCreators,
    })

    const mergeMapStateToProps = <MergedStateToProps>(mergeMapStateToProps: (state: any) => MergedStateToProps) => <
      TOriginalProps
    >(
      Component: React.ComponentType<TOriginalProps & DataTableComponentProps<R> & MergedStateToProps>
    ) => container(mergeMapStateToProps)(composeHoc(Component))

    const hoc = <TOriginalProps>(Component: React.ComponentType<TOriginalProps & DataTableComponentProps<R>>) =>
      container()(composeHoc(Component))

    const withColumns = <C>(columns$: Selector<any, C[]>) => {
      const mapStateToProps = (state: any) => {
        return {
          columns: columns$(state),
        }
      }

      return <TOriginalProps>(
        Component: React.ComponentType<TOriginalProps & DataTableComponentProps<R> & ReturnType<typeof mapStateToProps>>
      ) => container(mapStateToProps)(composeHoc(Component))
    }
    return {
      initialState,
      actionCreators,
      selectors,
      reducer,
      container,
      hoc,
      mergeMapStateToProps,
      withColumns,
    }
  }
}
