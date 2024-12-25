import ModalSheet from './modal.utils'

const openModal = (
  Component: any,
  items?: any,
  styles?: any,
  callFunction?: any,
  additionalItems?: any,
) => {
  ModalSheet.open({
    component: Component,
    props: {
      items,
      additionalItems,
      styles,
      callback: () => {
        ModalSheet.close()
      },
      callFunction,
    },
  })
}

export { openModal }
