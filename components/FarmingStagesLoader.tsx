import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import FarmingContext from '../context/farming-context'
import { loadDropItemNames, loadFarmingStagesFromJson } from '../src/load-farming-stages'

const FarmingStagesLoader: React.FC = () => {
  const [fileName, setFileName] = React.useState<string>('')
  const { setFarmingStages, setRequiredItems, setFarmingPlan } = React.useContext(FarmingContext)
  const onLoadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) {
      return
    }
    setFileName(e.target.files[0].name)
    const farmingStages = loadFarmingStagesFromJson(await e.target.files[0].text())
    setFarmingStages(farmingStages)
    const dropItemNames = loadDropItemNames(farmingStages)
    setRequiredItems(
      dropItemNames.map((itemName) => {
        return {
          name: itemName,
          count: 0,
        }
      }),
    )
    setFarmingPlan(null)
  }
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button variant="contained" component="label">
              Select JSON
              <input type="file" accept="application/json" hidden onChange={onLoadFile} />
            </Button>
          </Grid>
          <Grid item>
            <Typography variant="body1">{fileName}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default FarmingStagesLoader
