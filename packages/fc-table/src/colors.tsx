import { colors } from 'styles'

const transparent = 'transparent'

export const dark = {
  text: {
    columns: transparent,
    cell: transparent,
    paginator: transparent,
    filter: '#fff',
    table: '#fafafa',
    column: '#ccc'
  },
  borders: {
    row: '#5a5a5a',
    cell: '#5a5a5a',
    header: '#5a5a5a',
    column: '#5a5a5a',
    filterInput: '#333',
    filter: '#4a4a4a',
    smallScreen: '#ccc',
    smallScreenCell: '#3e3e3e',
  },
  background: {
    group: '#292929',
    table: 'rgb(31,31,31)',
    selected: transparent,
    hover: transparent,
    input: '#565656',
    selectedRow: 'rgb(90, 90, 90)',
    filter: '#565656',
  },
  fill: {
    search: transparent,
    unselected: transparent,
    selected: transparent,
  },
  icons: {
      paginator: '#fafafa',
      tabs: colors.black(0.54),
      smallScreen: colors.grey(),
      sort: colors.white(),
      unsorted: colors.white(0.2),
      groupOpen: colors.primary(),
      groupClosed: '#e5e5e5',
      selected: colors.primary(),
      unselected: '#e5e5e5'
  }
}
const light = {
  text: {
    columns: transparent,
    cell: transparent,
    paginator: transparent,
    filter: '#333',
    table: '#333',
    column: '#333'
  },
  borders: {
    row: '#ccc',
    cell: '#ccc',
    header: '#ccc',
    column: '#ccc',
    filterInput: '#ccc',
    filter: '#ccc',
    smallScreen: '#ccc',
    smallScreenCell: '#ccc'
  },
  background: {
    group: colors.primary(0.2),
    table: 'rgb(255,255,255)',
    selected: transparent,
    hover: transparent,
    input: '#fafafa',
    selectedRow: colors.primary(0.3),
    filter: '#fafafa',
  },
  fill: {
    search: transparent,
    unselected: transparent,
    selected: transparent,
  },
  icons: {
      paginator: colors.grey(),
      tabs: colors.black(0.54),
      smallScreen: colors.grey(),
      sort: colors.grey(),
      unsorted: colors.grey(0.5),
      groupOpen: colors.primary(),
      groupClosed: colors.grey(0.5),
      selected: colors.primary(),
      unselected: colors.grey(0.5)
  }
}

export default light
