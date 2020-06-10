import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Form, Button, notification, Tabs } from 'antd'
import RandomAdding from './RandomAdding'
import ManualAdding from './ManualAdding'
import CommonFields from './CommonFields'

const { TabPane } = Tabs

// const test = [
//   {
//     key: 0,
//     Name: `Телефон`,
//     Cost: 8,
//     Weight: 7,
//   },
//   {
//     key: 1,
//     Name: `Ручка`,
//     Cost: 6,
//     Weight: 6,
//   },
//   {
//     key: 2,
//     Name: `Ноутбук`,
//     Cost: 3,
//     Weight: 3,
//   },
//   {
//     key: 4,
//     Name: `Карандаш`,
//     Cost: 2,
//     Weight: 5,
//   },
// ]
// по-хорошему, необходимо создать правильно поля и провести рефактор, вынести валидацию наверх
class AddingModal extends PureComponent {
  state = {
    temporaryCostWeightArray: [],
  }

  hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

  randomInteger = (min, max) => Math.floor(Math.random() * (max - min)) + min

  handleOk = () => {
    const {
      toggleAddingModal,
      setCostWeightArray,
      dataSource,
      form: { getFieldsValue },
      setNumberOfItems,
      numberOfItems,
      setKnapsackWeight,
    } = this.props
    const { thingsCount, knapsackWeight, minCost, maxCost, minWeight, maxWeight } = getFieldsValue()

    const { temporaryCostWeightArray } = this.state

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < thingsCount; i++) {
      const tempObject = {
        key: numberOfItems + i,
        Name: `Предмет r ${i.toString()}`,
        Cost: this.randomInteger(+minCost, +maxCost),
        Weight: this.randomInteger(+minWeight, +maxWeight),
      }
      temporaryCostWeightArray.push(tempObject)
    }
    toggleAddingModal()
    setCostWeightArray({ dataSource: [...dataSource, ...temporaryCostWeightArray] })
    const modyfiedNumberOfItems = numberOfItems + thingsCount
    setNumberOfItems({ numberOfItems: modyfiedNumberOfItems })
    setKnapsackWeight({ knapsackWeight })
    notification.success({
      message: 'Предметы  успешно сгенерированы и добавлены в таблицу',
      duration: 3,
    })
  }

  renderFooterButtons = () => {
    const {
      form: { getFieldsError },
    } = this.props

    const disabledButtonPrimary = this.hasErrors(getFieldsError())

    return (
      <Button type='primary' disabled={disabledButtonPrimary} onClick={this.handleOk}>
        Сохранить
      </Button>
    )
  }

  render() {
    const {
      isOpenAddingModal,
      toggleAddingModal,
      form,
      setCostWeightArray,
      dataSource,
      numberOfItems,
      setNumberOfItems,
    } = this.props

    return (
      <StyledModal
        width={800}
        visible={isOpenAddingModal}
        title='Ввод начальных данных'
        onCancel={toggleAddingModal}
        footer={this.renderFooterButtons()}
      >
        <Form>
          <CommonFields form={form} />
          <Tabs>
            <TabPane key='1' tab='Рандомное заполнение'>
              <RandomAdding form={form} />
            </TabPane>
            <TabPane key='2' tab='Вручную'>
              <ManualAdding
                form={form}
                setCostWeightArray={setCostWeightArray}
                dataSource={dataSource}
                numberOfItems={numberOfItems}
                setNumberOfItems={setNumberOfItems}
              />
            </TabPane>
          </Tabs>
        </Form>
      </StyledModal>
    )
  }
}

export default Form.create()(AddingModal)

AddingModal.propTypes = {
  isOpenAddingModal: PropTypes.bool,
  toggleAddingModal: PropTypes.func,
  setCostWeightArray: PropTypes.func,
  setNumberOfItems: PropTypes.func,
  setKnapsackWeight: PropTypes.func,
  dataSource: PropTypes.arrayOf(),
  form: PropTypes.object,
  numberOfItems: PropTypes.number,
}

const StyledModal = styled(Modal)`
  .ant-btn-primary {
    height: 32px;
    background-color: #64b5f6;
    border-color: #64b5f6;
  }
  .ant-col ant-col-8 {
    padding-top: 10px;
  }
`
