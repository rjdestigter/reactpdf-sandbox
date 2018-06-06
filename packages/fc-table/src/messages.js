import { defineMessages } from 'react-intl'

export default defineMessages({
  'per Page': {
    id: 'fc-table.perPage',
    defaultMessage: 'Rows per page',
    description: 'Label for displaying the number of records per page in a table. e.g 34 per page.',
  },
  'Group by': {
    id: 'fc-table.groupBy',
    defaultMessage: 'Group by',
    description: 'Label referring to a selector to group table data by a available column. e.g. "Group by season"',
  },
  Column: {
    id: 'fc-table.column',
    defaultMessage: 'Column',
    description: 'Label referring to a selector to hide/show available columns in a table.',
  },
  Close: {
    id: 'fc-table.close',
    defaultMessage: 'Close',
    description: 'Label referring to a closing the search panel available on small screens.',
  },
  Filter: {
    id: 'fc-table.tabs.filter',
    defaultMessage: 'Filter',
    description:
      'Label of tab in search panel available on small screens for navigating to tab allowing users to search for data in table.',
  },
  Group: {
    id: 'fc-table.tabs.group',
    defaultMessage: 'Group',
    description:
      'Label of tab in search panel available on small screens for navigating to tab allowing users to group data in table by selected column.',
  },
  Columns: {
    id: 'fc-table.tabs.columns',
    defaultMessage: 'Columns',
    description:
      'Label of tab in search panel available on small screens for navigating to tab allowing users to show/hide columns in table.',
  },
  of: {
    id: 'fc-table.of',
    defaultMessage: 'of',
    description: 'As in "Page 2 of 10"',
  },
  'item selected': {
    id: 'fc-table.itemSelected',
    defaultMessage: 'item selected',
    description: 'Referring to 0 or 1 item selected. e.g. "1 item selected."',
  },
  'items selected': {
    id: 'fc-table.itemsSelected',
    defaultMessage: 'items selected',
    description: 'Referring to 2 or more items selected. e.g. "23 items selected."',
  },
})
