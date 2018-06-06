// Types
import { Record, State } from '../types'

// Exports
export default function initialState<R extends Record>(preloadedState?: Partial<State<R>>): State<R> {
  return Object.assign(
    {},
    {
      page: 0,
      perPage: 25,
      sortBy: undefined,
      sortDesc: false,
      filters: {},
      selectedRecords: [],
      groupedBy: {},
      hiddenColumns: [],
      disabledGroups: [],
    },
    preloadedState
  )
}
