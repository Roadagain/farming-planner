import { Button, Card } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import FarmingContext from '../context/farming-context'
import { loadFarmingStagesFromJson } from '../src/load-farming-stages'

type Props = {
  text: string
}

const FileLoader: React.FC<Props> = ({ text }) => {
  const [fileName, setFileName] = React.useState<string>('')
  const { setFarmingStages, setRequiredItems, setFarmingPlan } = React.useContext(FarmingContext)
  const onLoadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) {
      return
    }
    setFileName(e.target.files[0].name)
    const farmingStages = await loadFarmingStagesFromJson(await e.target.files[0].text())
    setFarmingStages(farmingStages)
    const dropItemNames = new Set<string>()
    farmingStages.forEach(({ itemDrops }) => {
      itemDrops.forEach(({ name }) => dropItemNames.add(name))
    })
    setRequiredItems(
      Array.from(dropItemNames.keys()).map((itemName) => {
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
      <Button variant="contained" component="label">
        {text}
        <input type="file" hidden onChange={onLoadFile} />
      </Button>
      {fileName}
    </Card>
  )
}

export default FileLoader
