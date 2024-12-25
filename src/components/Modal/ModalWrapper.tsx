'use client'

import React, { useEffect } from 'react'
import ModalWrapper from '@/components/Modal/modalWrapper.component'
import Modal from '@/utils/modal.utils'
import Lenis from 'lenis'

let globalModalRef: any

const ModalWrapperLayout = () => {
  useEffect(() => {
    Modal.registerModal(globalModalRef)
    console.error = () => {}
    console.log = () => {}

    // const lenis = new Lenis();

    // function raf(time: any) {
    //     lenis.raf(time);
    //     requestAnimationFrame(raf);
    // }

    // requestAnimationFrame(raf);
  }, [])

  return (
    <ModalWrapper
      ref={(ref) => {
        globalModalRef = ref
      }}
    />
  )
}

export default ModalWrapperLayout
