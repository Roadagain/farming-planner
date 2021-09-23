import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import FarmingContext from '../context/farming-context'
import { loadFarmingDataFromJson, loadPresetFgoData } from '../lib/load-farming-data'
import {
  loadRequiredItemsFromLocalStorage,
  saveFarmingDataToLocalStorage,
  saveRequiredItemsToLocalStorage,
} from '../lib/local-storage'

const FarmingStagesLoader: React.FC = () => {
  const { farmingData, setFarmingData, setRequiredItems, setFarmingPlan } = React.useContext(FarmingContext)
  const [name, setName] = React.useState<string>('')
  React.useEffect(() => {
    if (!farmingData) {
      setName('')
      return
    }

    setName(farmingData.name)
    const newRequiredItems =
      loadRequiredItemsFromLocalStorage(farmingData.name) ||
      farmingData.items.map(({ name }) => ({
        name,
        storedCount: 0,
        requiredCount: 0,
      }))
    setRequiredItems(newRequiredItems)
    setFarmingPlan(null)

    saveFarmingDataToLocalStorage(farmingData)
    saveRequiredItemsToLocalStorage(farmingData.name, newRequiredItems)
  }, [farmingData, setRequiredItems, setFarmingPlan])

  const onLoadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) {
      return
    }
    setFarmingData(loadFarmingDataFromJson(await e.target.files[0].text()))
  }
  const loadPresetFgo = () => {
    setFarmingData(loadPresetFgoData())
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
            <Typography variant="body1">{name ? `読み込んだデータ: ${name}` : 'データを読み込んで下さい'}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              FGOのプリセットデータは
              <a href="https://sites.google.com/view/fgo-domus-aurea">FGOアイテム効率劇場</a>
              のデータをお借りしています
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default FarmingStagesLoader
