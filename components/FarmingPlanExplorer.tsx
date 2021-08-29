import { makeStyles } from '@material-ui/core'
import { DataGrid, GridColDef, GridRowsProp } from '@material-ui/data-grid'
import React from 'react'
import FarmingContext from '../context/farming-context'

const useStyles = makeStyles({
  root: {
    height: 300,
  }
})

const FarmingPlanExplorer: React.FC = () => {
  const { farmingData, farmingPlan } = React.useContext(FarmingContext)
  const classes = useStyles()
  if (!farmingData || !farmingPlan) {
    return null
  }

  const rows: GridRowsProp = farmingPlan.map(({ farmingStage, count }, index) => {
    const totalCost = farmingStage.cost * count
    const itemDropCounts = Object.fromEntries(
      farmingStage.itemDrops.map(({ name, probability }) => {
        const dropCount = Math.floor(probability * count)
        return [name, dropCount]
      }),
    )

    return {
      id: index,
      name: farmingStage.name,
      count: count,
      totalCost,
      ...itemDropCounts,
    }
  })
  const dropItemNameSet = new Set<string>()
  farmingPlan.forEach(({ farmingStage }) => {
    farmingStage.itemDrops.forEach(({ name }) => dropItemNameSet.add(name))
  })
  const dropItemNames = farmingData.items.filter(({ name }) => dropItemNameSet.has(name)).map(({ name }) => name)
  const columns: GridColDef[] = [
    { field: 'name', headerName: '周回ステージ', width: 200 },
    { field: 'count', headerName: '回数', type: 'number', width: 100 },
    { field: 'totalCost', headerName: '総コスト', type: 'number', width: 150 },
    ...dropItemNames.map((itemName) => ({
      field: itemName,
      headerName: itemName,
      type: 'number',
      width: 150,
    })),
  ]

  return (
    <div className={classes.root}>
      <DataGrid rows={rows} columns={columns} disableColumnMenu />
    </div>
  )
}

export default FarmingPlanExplorer
