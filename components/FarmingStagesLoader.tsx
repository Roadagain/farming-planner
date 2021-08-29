import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import FarmingContext from '../context/farming-context'
import { loadFarmingDataFromJson, loadPresetFgoData } from '../src/load-farming-stages'
import { FarmingData } from '../src/types'

const FarmingStagesLoader: React.FC = () => {
  const [fileName, setFileName] = React.useState<string>('')
  const { setFarmingData, setRequiredItems, setFarmingPlan } = React.useContext(FarmingContext)

  const onLoadFarmingData = (farmingData: FarmingData) => {
    setFarmingData(farmingData)
    setRequiredItems(farmingData.items.map(({ name }) => ({
      name,
      count: 0,
    })))
    setFarmingPlan(null)
  }
  const onLoadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) {
      return
    }
    setFileName(e.target.files[0].name)
    onLoadFarmingData(loadFarmingDataFromJson(await e.target.files[0].text()))
  }
  const loadPresetFgo = () => {
    onLoadFarmingData(loadPresetFgoData())
  }

  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Button variant="contained" component="label" color="primary" onClick={loadPresetFgo}>
              Use Preset / FGO
            </Button>
          </Grid>
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
