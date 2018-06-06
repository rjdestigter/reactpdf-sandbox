// Types
import { Action, ActionCreators, ActionTypes, Record } from '../types'

function createAction(type: string) {
  return <P>(payload: P): Action<P> => ({
    type,
    payload,
  })
}

// Exports
export default function composeActionCreators<R extends Record>(actionTypes: ActionTypes): ActionCreators<R> {
  return {
    paginate: createAction(actionTypes.paginate),
    perPage: createAction(actionTypes.perPage),
    sort: createAction(actionTypes.sort),
    group: createAction(actionTypes.group),
    disableGroup: createAction(actionTypes.disableGroup),
    hideColumn: createAction(actionTypes.hideColumn),
    filter: createAction(actionTypes.filter),
    select: createAction(actionTypes.select),
    order: createAction(actionTypes.order),
    selectAll: createAction(actionTypes.selectAll),
  }
}
