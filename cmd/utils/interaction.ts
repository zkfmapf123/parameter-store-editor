import { input } from '@inquirer/prompts'
import rawlist from '@inquirer/rawlist'
import { SelectBoxParams } from '../types/interface'

export const Clear = () => {
  console.clear()
}

/**
 * @desc 입력 시 사용하는 함수 입니다.
 */
export const InputBoxes = async (message: string): Promise<string> => {
  const answer = await input({ message })
  return answer
}

/**
 * @desc Task를 선택할때 사용하는 함수 입니다.
 */
export const SelectBox = async (message: string, choices: SelectBoxParams[]): Promise<string> => {
  const answer = await rawlist({
    message,
    choices,
  })

  return answer
}
