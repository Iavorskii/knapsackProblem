import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Modal, Form, Button, notification, Tabs } from 'antd'
import RandomAdding from './RandomAdding'
import ManualAdding from './ManualAdding'
import CommonFields from './CommonFields'

const { TabPane } = Tabs
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
    const { thingsCount, minWeight, maxWeight, minCost, maxCost, knapsackWeight } = getFieldsValue()

    const { temporaryCostWeightArray } = this.state
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < thingsCount; i++) {
      const tempObject = {
        key: numberOfItems + i,
        Name: `Предмет ${i.toString()}`,
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

    return [
      <div>
        <Button type='primary' disabled={disabledButtonPrimary} onClick={this.handleOk}>
          Сохранить
        </Button>
      </div>,
    ]
  }

  render() {
    const { isOpenAddingModal, toggleAddingModal, form } = this.props
    console.log('render')
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
              <ManualAdding form={form} />
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
