import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowsProp } from '@material-ui/data-grid'
import React from 'react'
import FarmingContext from '../context/farming-context'

const RequiredItemsExplorer: React.FC = () => {
  const { requiredItems, setRequiredItems } = React.useContext(FarmingContext)
  if (!requiredItems) {
    return null
  }

  const onEditRequiredItemCount = (params: GridCellEditCommitParams) => {
    const editedIndex: number = parseInt(params.id.toString())
    const newCount: number = parseInt(params.value?.toString() || '0')
    setRequiredItems(requiredItems.map((requiredItem, index) => {
      return index === editedIndex ? {
        ...requiredItem,
        count: newCount
      } : requiredItem
    }))
  }

  const rows: GridRowsProp = requiredItems.map((requiredItem, index) => ({
    id: index,
    ...requiredItem,
  }))
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'アイテム名', width: 150 },
    { field: 'count', headerName: '必要数', align: 'right', editable: true, width: 150 },
  ]

  return (
    <div style={{ height: 300 }}>
      <DataGrid rows={rows} columns={columns} onCellEditCommit={onEditRequiredItemCount} />
    </div>
  )
}

export default RequiredItemsExplorer
