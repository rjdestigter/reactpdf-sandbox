// Libs
import _ from 'lodash'
import { createSelector } from 'reselect'

// Types
import { Filters, Record, RecordSelector, Selectors, State } from '../types'

// Utils
import { emptyArrayOr } from 'fc-utils'

function makeTableStateSelector<R extends Record, K extends keyof State<R>>(
  tableState$: (state: any) => State<R>,
  path: K
) {
  return (state: any) => {
    const tableState: State<R> = tableState$(state)
    return tableState[path]
  }
}

function toCompareable(value: any) {
  if (value == null) {
    return null
  } else if (typeof value === 'string') {
    return value.toLowerCase()
  } else if (['number', 'boolean'].indexOf(typeof value) >= 0) {
    return value
  } else if (Array.isArray(value)) {
    return value[0] // value.filter(val => val != null).length
  } else if (typeof value === 'object') {
    return Object.keys(value).filter(key => value[key] != null).length
  }

  return !!value
}

function compare(a: any, b: any): number {
  const x = toCompareable(a)
  const y = toCompareable(b)

  if (x < y) {
    return -1
  } else if (x > y) {
    return 1
  }

  return 0
}

function recursiveGroupBy<T extends Record>(list: T[], groupBy: string[]): T[] {
  const [group, ...restGroupBy] = groupBy
  const grouped = _.groupBy(list, group)

  return _.flatMap(grouped, (groupedList, groupValue) => {
    const currentGroup = groupedList[0]._group || ''
    const currentGroups = currentGroup.split(';').filter(g => g)
    const nextGroup = [...currentGroups, `${group}@${groupValue}`].join(';')

    const result = groupedList.map(item => {
      return Object.assign({}, item, { _group: nextGroup })
    })

    if (restGroupBy.length) {
      return recursiveGroupBy(result, restGroupBy)
    }

    return result
  })
}

export default function composeSelectors<R extends Record>({
  records$,
  tableState$,
  sort,
}: {
  records$: RecordSelector<R>
  tableState$: (state: any) => State<R>
  sort: { [P in keyof R]?: (record: R) => any }
}): Selectors<R> {
  //
  const page$ = makeTableStateSelector(tableState$, 'page')
  const perPage$ = makeTableStateSelector(tableState$, 'perPage')
  const sortBy$ = makeTableStateSelector(tableState$, 'sortBy')
  const sortDesc$ = makeTableStateSelector(tableState$, 'sortDesc')
  const filters$ = makeTableStateSelector(tableState$, 'filters')
  const groupedBy$ = makeTableStateSelector(tableState$, 'groupedBy')
  const hiddenColumns$ = makeTableStateSelector(tableState$, 'hiddenColumns')
  const disabledGroups$ = makeTableStateSelector(tableState$, 'disabledGroups')
  const selectedRecordIds$ = makeTableStateSelector(tableState$, 'selectedRecords')

  const filteredRecords$: (state: any) => R[] = createSelector(
    [records$, filters$],
    (records: R[], filters: Filters<R>): R[] => {
      //
      if (_.some(filters)) {
        //
        const filtered = _.filter(records, (record: R): boolean => {
          //
          return _.every(filters as any, (filterBy: string, attr: string): boolean => {
            const value = `${record[attr as keyof R]}`

            if (value) {
              try {
                const [, maybeRegExp = ''] = filterBy.match(/^\/(.+)\/$/) || []
                if (maybeRegExp) {
                  return !!value.match(new RegExp(maybeRegExp, 'ig'))
                }

                return !!value.match(new RegExp(filterBy, 'ig'))
              } catch (error) {
                return false
              }
            }

            return false
          })
        })

        return emptyArrayOr(filtered)
      }

      return emptyArrayOr(records as R[]) as R[]
    }
  )

  const sortedRecords$: (state: any) => R[] = createSelector(
    [filteredRecords$, sortBy$, sortDesc$, groupedBy$],
    (records, sortBy, sortDesc, groupedBy): R[] => {
      let list: R[]
      const groups = Object.keys(groupedBy)

      if (sortBy) {
        //
        const sorted: R[] = [...records].sort((record1: R, record2: R): number => {
          const sortByFn = sort && sort[sortBy]
          const value1 = sortByFn ? sortByFn(record1) : record1[sortBy]
          const value2 = sortByFn ? sortByFn(record2) : record2[sortBy]

          return compare(value1, value2)
        })

        if (sortDesc) {
          list = emptyArrayOr(_.reverse(sorted as R[]))
        }

        list = emptyArrayOr(sorted as R[])
      } else {
        list = emptyArrayOr(records as R[])
      }

      if (groups.length && list.length) {
        return recursiveGroupBy(list, groups.filter(column => groupedBy[column]))
      }

      return list
    }
  )

  const allRecordIds$ = createSelector([filteredRecords$], records => _.map(records, 'id'))

  const finalSelectedRecordIds$ = createSelector(
    [selectedRecordIds$, allRecordIds$],
    (selectedRecordIds: ReadonlyArray<number>, allRecordIds: number[]): number[] => {
      const filtered = _.filter(selectedRecordIds, (id: number): boolean => {
        return _.indexOf(allRecordIds, id) >= 0
      })

      return emptyArrayOr(filtered)
    }
  )

  const max$: (state: any) => number = createSelector([sortedRecords$], (records: R[]): number => {
    return records.length
  })

  const pages$: (state: any) => R[][] = createSelector(
    [sortedRecords$, page$, perPage$],
    (records: R[], page: number, perPage: number): R[][] => {
      const max = records.length
      const numberOfPages = Math.ceil(max / perPage)

      const chunks = []
      for (let i = 0; i < numberOfPages; i++) {
        if (i === page) {
          const start = i * perPage
          const end = start + perPage
          chunks[i] = records.slice(start, end)
        } else {
          chunks[i] = emptyArrayOr() as R[]
        }
      }

      return emptyArrayOr(chunks)
    }
  )

  const pageRecords$: (state: any) => R[] = createSelector([pages$, page$], (pages: R[][], page: number): R[] => {
    const pageRecords: R[] = pages[page] || []

    return emptyArrayOr(pageRecords)
  })

  const allSelected$: (state: any) => boolean = createSelector(
    [pageRecords$, finalSelectedRecordIds$],
    (pageRecords, selectedRecordIds) => {
      return _.every(pageRecords, record => selectedRecordIds.indexOf(record.id) >= 0)
    }
  )

  return {
    records$: sortedRecords$,
    selectedRecordIds$: finalSelectedRecordIds$,
    page$,
    pages$,
    perPage$,
    pageRecords$,
    max$,
    sortBy$,
    sortDesc$,
    filters$,
    allSelected$,
    groupedBy$,
    hiddenColumns$,
    disabledGroups$,
  }
}
