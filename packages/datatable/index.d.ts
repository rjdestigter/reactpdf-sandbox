import * as React from 'react'
import { InferableComponentEnhancerWithProps } from 'react-redux'

export interface ComposerOptions {
  allowGrouping: boolean
  allowColumnOrdering: boolean
  allowSelecting: boolean
  allowSorting: boolean
  allowFiltering: boolean
  allowPagination: boolean
  allowSelectAll: boolean
  allowHidingColumns: boolean
  renderer?: any
}

export interface ComposerParams {
  name: string
  options?: any
}

export type Sort<R extends Record> = { [P in keyof R]?: (record: R) => any }

export interface ActionTypes {
  paginate: string
  sort: string
  group: string
  filter: string
  select: string
  order: string
  selectAll: string
  hideColumn: string
  perPage: string
  disableGroup: string
}

export interface Action<P> {
  type: string
  payload: P
}

export interface ActionCreators<R extends Record> {
  paginate: (payload: number) => Action<number>
  sort: (payload: keyof R) => Action<keyof R>
  group: <P>(payload: P) => Action<P>
  filter: <P>(payload: P) => Action<P>
  select: (payload: number[]) => Action<number[]>
  order: <P>(payload: P) => Action<P>
  selectAll: <P>(payload: P) => Action<P>
  perPage: <P>(payload: P) => Action<P>
  hideColumn: <P>(payload: P) => Action<P>
  disableGroup: (payload: string) => Action<string>
}

export interface State<R extends Record> {
  readonly page: number
  readonly perPage: number
  readonly sortBy: keyof R | undefined
  readonly sortDesc: boolean
  readonly filters: Filters<R>
  readonly selectedRecords: number[]
  readonly groupedBy: { [K in keyof R]?: boolean }
  readonly hiddenColumns: Array<keyof R>
  readonly disabledGroups: string[]
}

// type Reducer<P, R extends Record> = (state: State<R>, payload: P) => State<R>

export interface Record {
  id: number
  _group?: string
  [column: string]: any
}

export type Filters<R extends Record> = { readonly [P in keyof R]?: string }

export interface Selectors<R extends Record> {
  records$: (state: any) => R[]
  selectedRecordIds$: (state: any) => number[]
  pages$: (state: any) => Array<R[]>
  page$: (state: any) => number
  perPage$: (state: any) => number
  pageRecords$: (state: any) => R[]
  max$: (state: any) => number
  sortBy$: (state: any) => string | undefined
  sortDesc$: (state: any) => boolean
  filters$: (state: any) => Filters<R>
  allSelected$: (state: any) => boolean
  groupedBy$: (state: any) => State<R>['groupedBy']
  hiddenColumns$: (state: any) => State<R>['hiddenColumns']
  disabledGroups$: (state: any) => State<R>['disabledGroups']
}

export type RecordSelector<R extends Record> = (state: any) => R[]

export type MappedStateProps<R extends Record> = {
  perPage: number
  page: number
  pages: R[][]
  pageRecords: R[]
  max: number
  sortBy: string | undefined
  sortDesc: boolean
  filters: Filters<R>
  selectedRecordIds: number[]
  allSelected: boolean
  groupedBy: State<R>['groupedBy']
  hiddenColumns: State<R>['hiddenColumns']
  disabledGroups: State<R>['disabledGroups']
}

export type MappedDispatchProps<R extends Record> = {
  actions: {
    onPaginate: ActionCreators<R>['paginate']
    onPerPage: ActionCreators<R>['perPage']
    onSelect: ActionCreators<R>['select']
    onSelectAll: ActionCreators<R>['selectAll']
    onSort: ActionCreators<R>['sort']
    onFilter: ActionCreators<R>['filter']
    onGroup: ActionCreators<R>['group']
    onDisableGroup: ActionCreators<R>['disableGroup']
    onHideColumn: ActionCreators<R>['hideColumn']
  }
}

// export interface DataTableProps<R extends Record extends MappedStateProps<R {}
export type DataTableProps<R extends Record> = MappedStateProps<R> & MappedDispatchProps<R>

export type JustDispatches = (...rest: any[]) => void

export interface InjectedComponentProps<R extends Record> {
  onPaginateFirst: () => void
  onPaginateLeft: () => void
  onPaginateRight: () => void
  onPaginateLast: () => void
  onSelect: (recordId: number) => void
  onSelectAll: () => void
  onClearSelection: () => void
  asc: boolean
  start: number
  end: number
}

export type DataTableComponentProps<R extends Record> = DataTableProps<R> & InjectedComponentProps<R>

export default function composeDataTable({
  name,
  options: maybeOptions,
}: ComposerParams): <R extends Record>(
  {
    tableState$,
    records$,
    sort,
    initialState: preloadedState,
  }: {
    records$: RecordSelector<R>
    tableState$: (state: any) => State<R>
    sort?: Sort<R> | undefined
    initialState?:
      | {
          readonly page?: number | undefined
          readonly perPage?: number | undefined
          readonly sortBy?: keyof R | undefined
          readonly sortDesc?: boolean | undefined
          readonly filters?: Filters<R> | undefined
          readonly selectedRecords?: number[] | undefined
          readonly groupedBy?: { [K in keyof R]?: boolean | undefined } | undefined
          readonly hiddenColumns?: (keyof R)[] | undefined
          readonly disabledGroups?: string[] | undefined
        }
      | undefined
  }
) => {
  initialState: State<R>
  actionCreators: ActionCreators<R>
  selectors: Selectors<R>
  reducer: Reducer<State<R>>
  container: <TStateProps>(
    mergeMapStateToProps?: ((state: any) => TStateProps) | undefined
  ) => InferableComponentEnhancerWithProps<MappedStateProps<R> & TStateProps & MappedDispatchProps<R>, {}>
  hoc: <TOriginalProps>(
    Component: React.ComponentType<
      TOriginalProps & MappedStateProps<R> & MappedDispatchProps<R> & InjectedComponentProps<R>
    >
  ) => React.ComponentClass<
    Pick<
      TOriginalProps & MappedStateProps<R> & MappedDispatchProps<R>,
      ({
        [P in
          | 'page'
          | 'perPage'
          | 'sortBy'
          | 'sortDesc'
          | 'filters'
          | 'groupedBy'
          | 'hiddenColumns'
          | 'disabledGroups'
          | keyof TOriginalProps
          | 'pages'
          | 'pageRecords'
          | 'max'
          | 'selectedRecordIds'
          | 'allSelected'
          | 'actions']: P
      } & {
        page: never
        perPage: never
        sortBy: never
        sortDesc: never
        filters: never
        groupedBy: never
        hiddenColumns: never
        disabledGroups: never
        pages: never
        pageRecords: never
        max: never
        selectedRecordIds: never
        allSelected: never
        actions: never
      } & {
          [x: string]: never
        })[
        | 'page'
        | 'perPage'
        | 'sortBy'
        | 'sortDesc'
        | 'filters'
        | 'groupedBy'
        | 'hiddenColumns'
        | 'disabledGroups'
        | keyof TOriginalProps
        | 'pages'
        | 'pageRecords'
        | 'max'
        | 'selectedRecordIds'
        | 'allSelected'
        | 'actions']
    >
  > & {
    WrappedComponent: React.ComponentType<TOriginalProps & MappedStateProps<R> & MappedDispatchProps<R>>
  }
  mergeMapStateToProps: <MergedStateToProps>(
    mergeMapStateToProps: (state: any) => MergedStateToProps
  ) => <TOriginalProps>(
    Component: React.ComponentType<
      TOriginalProps & MappedStateProps<R> & MappedDispatchProps<R> & InjectedComponentProps<R> & MergedStateToProps
    >
  ) => React.ComponentClass<
    Pick<
      TOriginalProps & MappedStateProps<R> & MappedDispatchProps<R> & MergedStateToProps,
      ({
        [P in
          | 'page'
          | 'perPage'
          | 'sortBy'
          | 'sortDesc'
          | 'filters'
          | 'groupedBy'
          | 'hiddenColumns'
          | 'disabledGroups'
          | 'pages'
          | 'pageRecords'
          | 'max'
          | 'selectedRecordIds'
          | 'allSelected'
          | 'actions'
          | keyof TOriginalProps
          | keyof MergedStateToProps]: P
      } &
        {
          [P in
            | 'page'
            | 'perPage'
            | 'sortBy'
            | 'sortDesc'
            | 'filters'
            | 'groupedBy'
            | 'hiddenColumns'
            | 'disabledGroups'
            | 'pages'
            | 'pageRecords'
            | 'max'
            | 'selectedRecordIds'
            | 'allSelected'
            | 'actions'
            | keyof MergedStateToProps]: never
        } & {
          [x: string]: never
        })[
        | 'page'
        | 'perPage'
        | 'sortBy'
        | 'sortDesc'
        | 'filters'
        | 'groupedBy'
        | 'hiddenColumns'
        | 'disabledGroups'
        | 'pages'
        | 'pageRecords'
        | 'max'
        | 'selectedRecordIds'
        | 'allSelected'
        | 'actions'
        | keyof TOriginalProps
        | keyof MergedStateToProps]
    >
  > & {
    WrappedComponent: React.ComponentType<
      TOriginalProps & MappedStateProps<R> & MappedDispatchProps<R> & MergedStateToProps
    >
  }
  withColumns: <C>(
    columns$: Selector<any, C[]>
  ) => <TOriginalProps>(
    Component: React.ComponentType<
      TOriginalProps &
        MappedStateProps<R> &
        MappedDispatchProps<R> &
        InjectedComponentProps<R> & {
          columns: C[]
        }
    >
  ) => React.ComponentClass<
    Pick<
      TOriginalProps &
        MappedStateProps<R> &
        MappedDispatchProps<R> & {
          columns: C[]
        },
      ({
        [P in
          | 'page'
          | 'perPage'
          | 'sortBy'
          | 'sortDesc'
          | 'filters'
          | 'groupedBy'
          | 'hiddenColumns'
          | 'disabledGroups'
          | 'pages'
          | 'pageRecords'
          | 'max'
          | 'selectedRecordIds'
          | 'allSelected'
          | 'actions'
          | keyof TOriginalProps
          | 'columns']: P
      } & {
        page: never
        perPage: never
        sortBy: never
        sortDesc: never
        filters: never
        groupedBy: never
        hiddenColumns: never
        disabledGroups: never
        pages: never
        pageRecords: never
        max: never
        selectedRecordIds: never
        allSelected: never
        actions: never
        columns: never
      } & {
          [x: string]: never
        })[
        | 'page'
        | 'perPage'
        | 'sortBy'
        | 'sortDesc'
        | 'filters'
        | 'groupedBy'
        | 'hiddenColumns'
        | 'disabledGroups'
        | 'pages'
        | 'pageRecords'
        | 'max'
        | 'selectedRecordIds'
        | 'allSelected'
        | 'actions'
        | keyof TOriginalProps
        | 'columns']
    >
  > & {
    WrappedComponent: React.ComponentType<
      TOriginalProps &
        MappedStateProps<R> &
        MappedDispatchProps<R> & {
          columns: C[]
        }
    >
  }
}
