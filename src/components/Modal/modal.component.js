'use client'

import ModalUtil from '@/utils/modal.utils'
import { Grow, Modal } from '@mui/material'
import Backdrop from '@mui/material/Backdrop'
import React from 'react'

const ModalSheet = React.forwardRef((propsValue, ref) => {
  const {
    component: RenderInner,
    props,
    closable = true,
    onClose = () => {},
    closeModal = () => {},
    containerStyle: contStyle,
    isVisible,
    modalOffset,
  } = propsValue

  const containerStyle = {
    display: 'flex',
    position: 'relative',
    left: 'unset',
    right: 'unset',
    top: 'unset',
    bottom: 'unset',
    height: 'auto',
    border: 'none',
    background: propsValue?.props?.styles?.background ?? 'white',
    padding: propsValue?.props?.styles?.padding ?? '20px 0 20px 20px',
    borderRadius: propsValue?.props?.styles?.borderRadius ?? '15px',
    width: propsValue?.props?.styles?.width,
    height: 'auto',
    maxHeight: propsValue?.props?.styles?.height ?? 'auto',
    maxWidth: 'auto',
    overflow: 'auto',
    ...modalOffset,
    ...contStyle,
  }

  const onModalClose = (isClose) => {
    if (!closable) return null
    if (isClose) {
      closeModal()
      onClose()
      ModalUtil.close()
    }
  }

  return (
    <Modal
      open={isVisible || false}
      onClose={
        propsValue?.props?.styles?.closeOnClickOutside ? onModalClose : () => {}
      }
      sx={{ overflow: 'scroll', overflowY: 'auto' }}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 100,
        },
      }}
      style={{
        background: 'rgba(136, 136, 136, 0.55)',
        zIndex: '2147483646',
      }}
    >
      <Grow in={isVisible} direction="down" timeout={{ enter: 400, exit: 400 }}>
        <div className="h-screen w-screen flex justify-center items-center">
          <div style={containerStyle}>
            {RenderInner && <RenderInner {...props} />}
          </div>
        </div>
      </Grow>
    </Modal>
  )
})

export default ModalSheet
