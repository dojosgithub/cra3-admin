import CellTimestamp from 'src/ui/core/components/cells/CellTimestamp/CellTimestamp'
import { observer } from 'mobx-react'
import { Column } from 'react-table'
const withColumns = (WrappedComponent: any) =>
  observer(({ ...rest }) => {
    const columns: Array<Column> = [
      {
        Header: '_id',
        accessor: '_id',
      },
      {
        Header: 'Kind',
        accessor: 'kind',
      },
      {
        Header: 'Content',
        accessor: 'content',
      },
      {
        Header: 'timestamp',
        accessor: 'timestamp',
        Cell: CellTimestamp,
      },
    ]

    const meta = {
      columns,
    }

    return <WrappedComponent {...rest} {...meta} />
  })

export default withColumns
