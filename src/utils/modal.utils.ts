class Modal {
  _currentGlobalLoader = null //reference variable
  static _currentGlobalLoader: any

  /**
   * getting reference of bottom wrapper component
   */
  static registerModal(ref: any) {
    this._currentGlobalLoader = ref
  }

  static open({ ...args }) {
    if (this._currentGlobalLoader) {
      this._currentGlobalLoader.open({ ...args })
    }
  }

  static updateProps({ ...props }: any, index: number) {
    if (this._currentGlobalLoader) {
      this._currentGlobalLoader.updateProps({ ...props }, index)
    }
  }

  static close() {
    if (this._currentGlobalLoader) {
      this._currentGlobalLoader.close()
    }
  }
}

export default Modal
