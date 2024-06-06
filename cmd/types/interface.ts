//////////////////////////////////////// Prompt ////////////////////////////////////////

/**
 * @mainTask
 */
export type PromptKeyParams = 'Write' | 'Delete' | 'Load'

/**
 * @desc Prompt List
 */
export const PromptConvertKST: Record<PromptKeyParams, string> = {
  Write: '쓰기',
  Delete: '삭제하기',
  Load: '불러오기',
}

export interface SelectBoxParams {
  name: string
  value: string
}

export interface GetParameterParams {
  profile: string
  region: string
  isExist: boolean
}

export interface WriteCLIParams {
  app: string
  env: string
  svc: string
  source: string
  value: string | number
}

export interface YamlParams {
  isExist: boolean
  filename: string
}
