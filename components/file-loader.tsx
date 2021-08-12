import { Button, Card } from '@material-ui/core'
import React, { ChangeEventHandler } from 'react'
import FarmingContext from '../context/farming-context'
import { loadFarmingMapsFromJson } from '../src/load-farming-maps'

type Props = {
  text: string
}

const FileLoader: React.FC<Props> = ({ text }) => {
  const [file, setFile] = React.useState<File>()
  const { setFarmingMaps } = React.useContext(FarmingContext)
  const onLoadFile: ChangeEventHandler<HTMLInputElement> = async (e) => {
    if (!e.target.files) {
      return
    }
    setFile(e.target.files[0])
    setFarmingMaps(await loadFarmingMapsFromJson(await e.target.files[0].text()))
  }
  return (
    <Card>
      <Button variant="contained" component="label">
        {text}
        <input type="file" hidden onChange={onLoadFile} />
      </Button>
      {file?.name}
    </Card>
  )
}

export default FileLoader
