// Types
import { ActionTypes } from '../types'

// Constants
import {
  DISABLE_GROUP,
  FILTER,
  GROUP,
  HIDE_COLUMN,
  ORDER,
  PAGINATE,
  PER_PAGE,
  prefix,
  SELECT,
  SELECT_ALL,
  SORT,
} from './constants'

// Exports
export default function composeActionTypes(name: string): ActionTypes {
  return {
    paginate: `${prefix}${name.toLowerCase()}/${PAGINATE}`,
    perPage: `${prefix}${name.toLowerCase()}/${PER_PAGE}`,
    hideColumn: `${prefix}${name.toLowerCase()}/${HIDE_COLUMN}`,
    sort: `${prefix}${name.toLowerCase()}/${SORT}`,
    group: `${prefix}${name.toLowerCase()}/${GROUP}`,
    disableGroup: `${prefix}${name.toLowerCase()}/${DISABLE_GROUP}`,
    filter: `${prefix}${name.toLowerCase()}/${FILTER}`,
    select: `${prefix}${name.toLowerCase()}/${SELECT}`,
    order: `${prefix}${name.toLowerCase()}/${ORDER}`,
    selectAll: `${prefix}${name.toLowerCase()}/${SELECT_ALL}`,
  }
}
