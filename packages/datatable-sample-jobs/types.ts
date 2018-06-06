// Imports
import { State } from 'fc-datatable'
import { Selector } from 'reselect'

// Types
import { SampleJob } from '@farmersedge/model-sample-jobs'

// Interfaces
export interface Collection<M extends Model> {
  [id: string]: M
}

export interface MapOf<T> {
  [id: string]: T
}

export interface SampleJobRecord {
  id: number
  created_by: string | undefined
  assigned_to: string | undefined
  subfield: string
  created_date: string | undefined
  complete: boolean
  completed_date: string | undefined
  samplingType: string
  status: string
  field: string
  farm: string
  grower: string
}

// Types
export type SampleJob$ = Selector<any, Collection<SampleJob>>
export type TableState$ = (state: any) => State<SampleJobRecord>

// Params
export interface Params {
  data$: SampleJob$
  tableState$: TableState$
  initialState?: Partial<State<SampleJob>>
}
