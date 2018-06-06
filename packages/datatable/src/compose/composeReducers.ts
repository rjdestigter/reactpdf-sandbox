// Libs
import { createReducer, Reducer } from '@farmersedge/compose-reducers'
import _ from 'lodash'

// Types
import { ActionTypes, Filters, Record, State } from '../types'

// Exports
export default function composeReducers<R extends Record>({
  initialState,
  actionTypes,
}: {
  initialState: State<R>
  actionTypes: ActionTypes
}): Reducer<State<R>> {
  const reducers: any = {}

  if (actionTypes.paginate) {
    const paginate = function paginate(state: State<R>, payload: number): State<R> {
      //
      return {
        ...state,
        page: payload,
      }
    }

    reducers[actionTypes.paginate] = paginate
  }

  if (actionTypes.perPage) {
    const perPage = function perPage(state: State<R>, payload: number): State<R> {
      //
      return {
        ...state,
        perPage: Number(payload) || 20,
        page: 0,
      }
    }

    reducers[actionTypes.perPage] = perPage
  }

  if (actionTypes.group) {
    const group = function group(state: State<R>, payload: keyof R): State<R> {
      if (state.groupedBy[payload]) {
        return {
          ...state,
          groupedBy: _.omit(state.groupedBy, payload) as State<R>['groupedBy'],
        }
      }

      return {
        ...state,
        groupedBy: Object.assign({}, state.groupedBy, { [payload]: true }),
        disabledGroups: [],
      }
    }

    reducers[actionTypes.group] = group
  }

  if (actionTypes.disableGroup) {
    const disableGroup = function disableGroup(state: State<R>, payload: string): State<R> {
      if (state.disabledGroups.indexOf(payload) >= 0) {
        return {
          ...state,
          disabledGroups: _.without(state.disabledGroups, payload),
        }
      }

      return {
        ...state,
        disabledGroups: [...state.disabledGroups, payload],
      }
    }

    reducers[actionTypes.disableGroup] = disableGroup
  }

  if (actionTypes.hideColumn) {
    const hideColumn = function hideColumn(state: State<R>, payload: keyof R): State<R> {
      if (state.hiddenColumns.indexOf(payload) >= 0) {
        return {
          ...state,
          hiddenColumns: _.without(state.hiddenColumns, payload),
        }
      }

      return {
        ...state,
        hiddenColumns: [...state.hiddenColumns, payload],
      }
    }

    reducers[actionTypes.hideColumn] = hideColumn
  }

  if (actionTypes.select) {
    const select = function select(state: State<R>, payload: Array<number>): State<R> {
      // If deselecting
      const removeIds = state.selectedRecords.filter((recordId: number): boolean => {
        return _.indexOf(payload, recordId) >= 0
      })

      return {
        ...state,
        selectedRecords: [...state.selectedRecords, ...payload].filter((recordId: number): boolean => {
          return _.indexOf(removeIds, recordId) < 0
        }),
      }
    }

    reducers[actionTypes.select] = select
  }

  if (actionTypes.sort) {
    const sort = function sort(state: State<R>, payload: keyof R): State<R> {
      //
      let sortBy
      let sortDesc = state.sortDesc
      if (state.sortBy === payload) {
        if (state.sortDesc === true) {
          sortBy = undefined
          sortDesc = false
        } else {
          sortBy = payload
          sortDesc = true
        }
      } else {
        sortBy = payload
        sortDesc = false
      }

      return {
        ...state,
        sortBy,
        sortDesc,
      }
    }

    reducers[actionTypes.sort] = sort
  }

  if (actionTypes.filter) {
    const filter = function filter(state: State<R>, payload: { attr: keyof R; value: string }): State<R> {
      // If filter by value is not falsy
      if (payload.value) {
        return {
          ...state,
          page: 0,
          filters: Object.assign({}, state.filters, {
            [payload.attr]: payload.value,
          }),
        }
      }

      return {
        ...state,
        filters: _.omit(state.filters, payload.attr) as Filters<R>,
      }
    }

    reducers[actionTypes.filter] = filter
  }

  return createReducer(initialState, reducers)
}
