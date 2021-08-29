import { Button, Card, CardContent, Grid, Typography } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import FarmingContext from '../context/farming-context'
import { loadFarmingDataFromJson } from '../lib/load-farming-data'

const FarmingStagesLoader: React.FC = () => {
  const [fileName, setFileName] = React.useState<string>('')
  const { setFarmingData, setRequiredItems, setFarmingPlan } = React.useContext(FarmingContext)
  const onLoadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) {
      return
    }
    setFileName(e.target.files[0].name)
    const jsonString = await e.target.files[0].text()
    const farmingData = loadFarmingDataFromJson(jsonString)
    setFarmingData(farmingData)
    setRequiredItems(
      farmingData.items.map(({ name }) => {
        return {
          name,
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
