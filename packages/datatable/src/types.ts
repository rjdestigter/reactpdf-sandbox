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
