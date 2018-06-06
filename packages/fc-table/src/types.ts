import { Record } from 'fc-datatable'

export interface Column<R extends Record> {
  column: keyof R
  align?: 'left' | 'center' | 'right'
  type?: 'number' | 'boolean'
  sortable?: boolean
  filter?: boolean | { type?: 'boolean' }
  rotate?: number
  label?: string
  render?:
    | (({ sortedBy, sortDesc }: { sortedBy?: boolean; sortDesc?: boolean }) => React.ReactElement<any> | string)
    | React.ReactElement<any>
    | string
}

export type RendererFunc<R extends Record> = (
  { record, column }: { record: R; column: Column<R> }
) => React.ReactElement<any>

export type RendererElementRecordProps<R extends Record> = { [P in keyof R]?: R[P] }

export type RendererElementProps<R extends Record> = {
  column: Column<R>
} & RendererElementRecordProps<R>

export type Renderer<R extends Record> = { [P in keyof R]?: RendererFunc<R> | React.ReactElement<any> | string | null }

export type ActionItem = React.ReactElement<any> | React.ComponentType<any>
