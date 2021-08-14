import { Card, Typography } from '@material-ui/core'
import React from 'react'
import { FarmingMap } from '../src/types'

type Props = {
  farmingMap: FarmingMap
  count: number
}

const FarmingPlanItem: React.FC<Props> = ({ farmingMap, count }) => {
  return (
    <Card>
      <Typography variant="body1" component="p">
        {farmingMap.name}
      </Typography>
      <Typography variant="body1" component="p">
        {count}回
      </Typography>
      {farmingMap.itemDrops.map(({ name, probability }) => {
        const dropCount = Math.floor(probability * count)
        return (
          <Typography variant="body2" component="p" key={name}>
            {name} × {dropCount}
          </Typography>
        )
      })}
    </Card>
  )
}

export default FarmingPlanItem
