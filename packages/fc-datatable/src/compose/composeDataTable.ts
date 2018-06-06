// Composers
import compose, { RecordSelector, State, Record, Sort } from '../../../datatable'
import { Selector } from 'reselect'
// Components

// Record is a sortable, filterable, and renderable representation of a Model
// M = Model e.g. { id: 4, parent: 10, date: 1432554 } (raw model)
// R = Record e.g. { id: 4, parent: 'Chinook', date: 'Monday', other: 'Hello World' } (sortable, filterable record)

// Types
import { ComposerOptions } from '../types'

// Exports
export default function composeDataTable<R extends Record, C>({
  name,
  options: maybeOptions = {},
  initialState: preloadedState,
}: {
  name: string
  options: any
  initialState: { [P in keyof State<R>]?: State<R>[P] }
}) {
  return ({
    tableState$,
    records$,
    columns$,
    sort,
  }: {
    records$: RecordSelector<R>
    tableState$: (state: any) => State<R>
    columns$?: (state: any) => C[]
    sort?: Sort<R>
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

    const datatable = compose({ name, options })<R>({
      records$: records$ as Selector<any, R[]>,
      tableState$: tableState$ as Selector<any, State<R>>,
      sort: sort as { [P in keyof R]?: (record: R) => string },
      initialState: preloadedState as { [P in keyof State<R>]?: State<R>[P] },
    })

    const hoc = datatable.withColumns(columns$)

    return {
      ...datatable,
      hoc,
    }
  }
}
