import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import FarmingContext from '../context/farming-context'
import { loadFarmingDataFromJson, loadPresetFgoData } from '../lib/load-farming-data'
import { saveFarmingDataToLocalStorage, saveRequiredItemsToLocalStorage } from '../lib/local-storage'
import { FarmingData } from '../lib/types'

const FarmingStagesLoader: React.FC = () => {
  const [fileName, setFileName] = React.useState<string>('')
  const { setFarmingData, setRequiredItems, setFarmingPlan } = React.useContext(FarmingContext)

  const onLoadFarmingData = (farmingData: FarmingData) => {
    setFarmingData(farmingData)
    const newRequiredItems = farmingData.items.map(({ name }) => ({
      name,
      storedCount: 0,
      requiredCount: 0,
    }))
    setRequiredItems(newRequiredItems)
    setFarmingPlan(null)

    saveFarmingDataToLocalStorage(farmingData)
    saveRequiredItemsToLocalStorage(farmingData.name, newRequiredItems)
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
