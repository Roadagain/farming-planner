import { makeStyles } from '@material-ui/core'
import { DataGrid, GridCellEditCommitParams, GridColDef, GridRowsProp } from '@material-ui/data-grid'
import React from 'react'
import FarmingContext from '../context/farming-context'

const useStyles = makeStyles({
  root: {
    height: 300,
  },
})

const RequiredItemsExplorer: React.FC = () => {
  const { requiredItems, setRequiredItems } = React.useContext(FarmingContext)
  const classes = useStyles()
  if (!requiredItems) {
    return null
  }

  const onEditRequiredItemCount = (params: GridCellEditCommitParams) => {
    const editedIndex: number = parseInt(params.id.toString())
    const newCount: number = parseInt(params.value?.toString() || '0')
    setRequiredItems(
      requiredItems.map((requiredItem, index) => {
        return index === editedIndex
          ? {
              ...requiredItem,
              [params.field]: newCount,
            }
          : requiredItem
      }),
    )
  }

  const rows: GridRowsProp = requiredItems.map((requiredItem, index) => ({
    id: index,
    ...requiredItem,
    lackedCount: Math.max(requiredItem.requiredCount - requiredItem.storedCount, 0),
  }))
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'アイテム名', width: 200 },
    { field: 'storedCount', headerName: '所持数', type: 'number', editable: true, width: 100 },
    { field: 'requiredCount', headerName: '必要数', type: 'number', editable: true, width: 100 },
    { field: 'lackedCount', headerName: '不足数', type: 'number', editable: false, width: 100 },
  ]

  return (
    <div className={classes.root}>
      <DataGrid rows={rows} columns={columns} onCellEditCommit={onEditRequiredItemCount} disableColumnMenu />
    </div>
  )
}

export default RequiredItemsExplorer
