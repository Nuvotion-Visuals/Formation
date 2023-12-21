interface DialogConfig {
  mode: 'alert' | 'confirm' | 'prompt'
  message: string
  callback?: (value: boolean | string | null) => void
  placeholder?: string
}

type OpenDialogFunctionType = (config: DialogConfig) => void
type CloseDialogFunctionType = () => void

let openDialogFunction: OpenDialogFunctionType = () => {}
let closeDialogFunction: CloseDialogFunctionType = () => {}

export const dialogController = {
  setOpenDialogFunction(fn: OpenDialogFunctionType) {
    openDialogFunction = fn
  },
  setCloseDialogFunction(fn: CloseDialogFunctionType) {
    closeDialogFunction = fn
  },
  openDialog(config: DialogConfig) {
    openDialogFunction(config)
  },
  closeDialog() {
    closeDialogFunction()
  },
}