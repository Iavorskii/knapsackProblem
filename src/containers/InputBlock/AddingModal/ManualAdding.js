import React, { useState } from 'react'
import { Button } from 'antd'
import { union } from 'lodash'
import ManualTable from '../InitialTable/InitialTable'

let counterInSession = 0
const ManualAdding = ({ dataSource, setCostWeightArray, numberOfItems, setNumberOfItems }) => {
  const [manuallyItems, setManuallyItems] = useState([])
  counterInSession = numberOfItems

  const handleDelete = key => {
    const modifyiedNumberOfItems = numberOfItems - 1
    counterInSession -= 1
    setNumberOfItems({ numberOfItems: modifyiedNumberOfItems })
    setCostWeightArray({ dataSource: manuallyItems.filter(item => item.key !== key) })
  }

  const handleSave = row => {
    const newData = manuallyItems
    const index = newData.findIndex(item => row.key === item.key)
    const item = newData[index]
    newData.splice(index, 1, {
      ...item,
      ...row,
    })
    setCostWeightArray({ dataSource: [...newData] })
  }

  const handleAdd = () => {
    const newData = {
      key: counterInSession,
      Name: `Предмет ${counterInSession}`,
      Weight: 0,
      Cost: 0,
    }
    counterInSession += 1

    const modifyiedManuallyItems = manuallyItems
    modifyiedManuallyItems.push(newData)
    setManuallyItems(modifyiedManuallyItems)

    setNumberOfItems({ numberOfItems: counterInSession })

    const unionItems = union(dataSource, modifyiedManuallyItems)
    setCostWeightArray({ dataSource: [...unionItems] })
  }
  console.log('counterInSession', counterInSession)
  return (
    <>
      <Button onClick={handleAdd} type='primary' style={{ marginBottom: 16, marginLeft: 20 }}>
        Добавить предмет
      </Button>
      <ManualTable
        dataSource={manuallyItems}
        handleSave={handleSave}
        handleDelete={handleDelete}
        pagination={{ pageSize: 5 }}
      />
    </>
  )
}

export default ManualAdding
