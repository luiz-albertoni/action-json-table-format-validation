import {Inputs} from '../constants'

// See: https://github.com/actions/toolkit/blob/master/packages/core/src/core.ts#L67
function getInputName(name: string): string {
  return `INPUT_${name.replace(/ /g, '_').toUpperCase()}`
}

export function setInput(name: string, value: string): void {
  process.env[getInputName(name)] = value
}

export function clearInputs(): void {
  delete process.env[getInputName(Inputs.Directory)]
}
