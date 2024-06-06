import checkbox from '@inquirer/checkbox'
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
export const SelectBox = async <T>(message: string, choices: SelectBoxParams[]): Promise<T> => {
  const answer = (await rawlist({
    message,
    choices,
  })) as T

  return answer
}

/**
 * @desc Task를 여러개 선택할 때 사용하는 함수입니다.
 */
export const MultipleSelectBox = async (message: string, choices: SelectBoxParams[]): Promise<string[]> => {
  const answer = await checkbox({
    message,
    choices,
  })

  return answer
}
