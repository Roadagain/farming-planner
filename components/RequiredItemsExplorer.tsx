import { Grid } from '@material-ui/core'
import React from 'react'
import FarmingContext from '../context/farming-context'
import { RequiredItem } from '../src/types'
import RequiredItemForm from './RequiredItemForm'

const RequiredItemsExplorer: React.FC = () => {
  const { requiredItems, setRequiredItems } = React.useContext(FarmingContext)
  const onChange = (newRequiredItem: RequiredItem, changedIndex: number) => {
    if (!requiredItems) {
      return
    }
    setRequiredItems(
      requiredItems.map((requiredItem, index) => {
        if (index === changedIndex) {
          return newRequiredItem
        }
        return requiredItem
      }),
    )
  }

  return (
    <Grid container>
      {requiredItems?.map((requiredItem, index) => {
        const onChangeForm = (newRequiredItem: RequiredItem) => onChange(newRequiredItem, index)
        return (
          <Grid item md={3} key={requiredItem.name}>
            <RequiredItemForm {...requiredItem} onChange={onChangeForm} />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default RequiredItemsExplorer
