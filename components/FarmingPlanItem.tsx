import { Card, Typography } from '@material-ui/core'
import React from 'react'

type Props = {
  name: string
  count: number
}

const FarmingPlanItem: React.FC<Props> = ({ name, count }) => {
  return (
    <Card>
      <Typography variant="body1" component="p">
        {name}
      </Typography>
      <Typography variant="body1" component="p">
        {count}回
      </Typography>
    </Card>
  )
}

export default FarmingPlanItem
