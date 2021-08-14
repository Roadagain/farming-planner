import { Card, CardContent, Typography, Input } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import { RequiredItem } from '../src/types'

type Props = {
  name: string
  count: number
  onChange: (newRequiredItem: RequiredItem) => void
}

const RequiredItemForm: React.FC<Props> = ({ name, count, onChange }) => {
  const onCountChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange({
      name,
      count: e.target.valueAsNumber
    })
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="body1" component="p">{name}</Typography>
        <Input type="number" value={count} onChange={onCountChange} />
      </CardContent>
    </Card>
  )
}

export default RequiredItemForm
