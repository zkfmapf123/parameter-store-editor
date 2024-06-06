import { SelectBoxParams } from '../types/interface'

export const helperMakeInteractionChoice = (value: Record<string, string>): SelectBoxParams[] =>
  Object.entries(value).reduce((acc, [k, v]) => {
    acc.push({
      name: v,
      value: k,
    })

    return acc
  }, [] as SelectBoxParams[])
