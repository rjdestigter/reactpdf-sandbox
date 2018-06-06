// Libs
import moment from 'moment'
import * as React from 'react'

// Components
import Table, { Column } from '../../fc-table'

// Types
import { DataTableProps } from '../../fc-datatable'
import { SampleJobRecord } from '../types'

// Constants
import {
  PROP_ASSIGNED_TO,
  PROP_COMPLETED_DATE,
  PROP_CREATED_DATE,
  PROP_FARM,
  PROP_GROWER,
} from '@farmersedge/model-sample-jobs'

// Styles
import colors from '../../styles/colors'

// Styles
const styles: any = {
  head: {
    whiteSpace: 'nowrap' as 'nowrap',
    color: colors.grey(),
    fontWeight: 500,
    marginBottom: 0,
  },
}

// Local Types
interface DateCellType {
  cellType: string
}

const DateCell = (props: Partial<SampleJobRecord> & DateCellType) => {
  let date = null

  if (props.cellType === 'created') {
    date = props[PROP_CREATED_DATE]
  } else if (props.cellType === 'completed') {
    date = props[PROP_COMPLETED_DATE]
  }

  return date ? (
    <div style={{ display: 'block' }}>
      <div style={{ whiteSpace: 'nowrap', marginBottom: 5 }}>{moment(date).format('DD MMM YYYY')}</div>
      <div style={{ fontSize: '0.8em' }}>{moment(date).format('h:mm a')}</div>
    </div>
  ) : (
    <div {...{}} />
  )
}

const GrowerCell = (props: Partial<SampleJobRecord>) => <div style={styles.head}>{props[PROP_GROWER]}</div>
const FarmCell = (props: Partial<SampleJobRecord>) => <div style={styles.head}>{props[PROP_FARM]}</div>

// Renderer
const renderer = {
  [PROP_GROWER]: <GrowerCell />,
  [PROP_FARM]: <FarmCell />,
  [PROP_CREATED_DATE]: <DateCell cellType={'created'} />,
  [PROP_COMPLETED_DATE]: <DateCell cellType={'completed'} />,
}

// Table
interface Props extends DataTableProps<SampleJobRecord, Column<SampleJobRecord>> {}

export default class SampleJobsTable extends React.PureComponent<Props> {
  public render() {
    console.log('this.props: ', this.props)
    return <Table {...this.props} renderer={renderer} />
  }
}
