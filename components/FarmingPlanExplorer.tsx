import { DataGrid, GridColDef, GridRowsProp } from '@material-ui/data-grid'
import React from 'react'
import FarmingContext from '../context/farming-context'

const FarmingPlanExplorer: React.FC = () => {
  const { farmingPlan } = React.useContext(FarmingContext)
  if (!farmingPlan) {
    return null
  }

  const rows: GridRowsProp = farmingPlan.map(({ farmingMap, count }, index) => {
    const totalCost = farmingMap.cost * count
    const itemDropCounts = Object.fromEntries(farmingMap.itemDrops.map(({ name, probability }) => {
      const dropCount = Math.floor(probability * count)
      return [name, dropCount]
    }))

    return {
      id: index,
      name: farmingMap.name,
      count: count,
      totalCost,
      ...itemDropCounts,
    }
  })
  const dropItemNameSet = new Set<string>();
  farmingPlan.forEach(({ farmingMap }) => {
    farmingMap.itemDrops.forEach(({ name }) => dropItemNameSet.add(name))
  })
  const columns: GridColDef[] = [
    { field: 'name', headerName: '周回場所', width: 150 },
    { field: 'count', headerName: '回数', align: 'right', width: 150 },
    { field: 'totalCost', headerName: '総コスト', align: 'right', width: 150 },
    ...Array.from(dropItemNameSet).map(itemName => ({
      field: itemName,
      headerName: itemName,
      align: 'right' as const,
      width: 150,
    }))
  ]

  return (
    <div style={{ height: 300 }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  )
}

export default FarmingPlanExplorer
