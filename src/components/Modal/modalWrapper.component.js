import React, { Component } from 'react'
import Modal from './modal.component'

export default class ModalWrapper extends Component {
  state = {
    modals: [], // Array maintained for opening multiple modals at the same time
  }

  totalIndex = 0

  open = ({ ...args }) => {
    const sheet = { ...args }

    let { modals } = this.state

    // isVisible controls the visibility of bottomsheet
    this.totalIndex++

    sheet.isVisible = true
    sheet.id = this.totalIndex

    // ref controls the bottomsheet behaviour, like closing the sheet our update the modal
    if (!sheet.ref) {
      sheet.ref = React.createRef()
    }
    // document.body.style.overflow = "hidden";
    modals.push({ ...sheet })
    this.setState({ modals })
  }

  close = (index = this.state.modals.length - 1) => {
    let { modals } = this.state
    setTimeout(() => {
      modals.splice(index, 1)
      this.setState({ modals })
    }, 200)
    if (index === 0) {
      document.body.style.overflow = 'visible'
    }
    // in order to retain close effect
    if (modals[index]) {
      modals[index].isVisible = false
      this.setState({ modals })
    }
  }

  updateProps = ({ ...props }, index = this.state.modals.length - 1) => {
    const { modals } = this.state

    const modalRef = modals[index]?.ref
    if (modalRef) {
      modalRef.current.updateProps(props)
    }
  }

  renderModal() {
    const { modals } = this.state
    const modalsElement = modals.map((sheet, index) => {
      return (
        <Modal key={sheet.id + '' + index} closeModal={this.close} {...sheet} />
      )
    })
    return modalsElement
  }

  render() {
    return <div>{this.renderModal()}</div>
  }
}
