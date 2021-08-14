import { Button, Card } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import FarmingContext from '../context/farming-context'
import { loadFarmingMapsFromJson } from '../src/load-farming-maps'

type Props = {
  text: string
}

const FileLoader: React.FC<Props> = ({ text }) => {
  const [fileName, setFileName] = React.useState<string>('')
  const { setFarmingMaps, setRequiredItems, setFarmingPlan } = React.useContext(FarmingContext)
  const onLoadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) {
      return
    }
    setFileName(e.target.files[0].name)
    const farmingMaps = await loadFarmingMapsFromJson(await e.target.files[0].text())
    setFarmingMaps(farmingMaps)
    const dropItemNames = new Set<string>();
    farmingMaps.forEach(({ itemDrops }) => {
      itemDrops.forEach(({ name }) => dropItemNames.add(name))
    })
    setRequiredItems(Array.from(dropItemNames.keys()).map(itemName => {
      return {
        name: itemName,
        count: 0
      }
    }))
    setFarmingPlan(null)
  }
  return (
    <Card>
      <Button variant="contained" component="label">
        {text}
        <input type="file" hidden onChange={onLoadFile} />
      </Button>
      {fileName}
    </Card>
  )
}

export default FileLoader
