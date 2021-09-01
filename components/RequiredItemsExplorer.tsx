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
              count: newCount,
            }
          : requiredItem
      }),
    )
  }

  const rows: GridRowsProp = requiredItems.map((requiredItem, index) => ({
    id: index,
    ...requiredItem,
  }))
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'アイテム名', width: 200 },
    { field: 'count', headerName: '必要数', type: 'number', editable: true, width: 100 },
  ]

  return (
    <div className={classes.root}>
      <DataGrid rows={rows} columns={columns} onCellEditCommit={onEditRequiredItemCount} disableColumnMenu />
    </div>
  )
}

export default RequiredItemsExplorer
