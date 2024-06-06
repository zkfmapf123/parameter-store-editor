import { SSMConfig } from '../aws/ssm'
import { GetParameterParams } from '../types/interface'
import { helperMakeInteractionChoice } from '../utils/helper'
import { InputBoxes, MultipleSelectBox, SelectBox } from '../utils/interaction'

const DELETE_SUB_TASK = {
  Select: '선택해서 삭제하기',
  Input: '입력해서 삭제하기',
}

export const deleteSubRunner = async ({ profile, region }: Partial<GetParameterParams>) => {
  const ssmConfig = new SSMConfig({
    profile: profile || '',
    region: region || '',
  })

  const select = await SelectBox<keyof typeof DELETE_SUB_TASK>('삭제할 방법을 설정해주세요', helperMakeInteractionChoice(DELETE_SUB_TASK))

  if (select === 'Input') {
    return await deleteInput(ssmConfig)
  }

  if (select === 'Select') {
    return await deleteSelect(ssmConfig)
  }
}

const deleteSelect = async (ssmConfig: SSMConfig) => {
  const loadJson = await ssmConfig.retrive()
  const psNames = Object.keys(loadJson)

  const psDict = psNames.reduce((acc, cur) => {
    const dict = {
      name: cur,
      value: cur,
    }
    acc.push(dict)
    return acc
  }, [] as { name: string; value: string }[])

  const answers = await MultipleSelectBox('삭제할 Parameter Store를 선택해주세요', psDict)

  for (const answer of answers) {
    const isDelete = await ssmConfig.delete(answer)

    console.log(`${answer} >> Delete ${isDelete}`)
  }
}

const deleteInput = async (ssmConfig: SSMConfig) => {
  const answer = await InputBoxes('삭제할 이름을 입력해주세요')
  const isDelete = await ssmConfig.delete(answer)
  console.log(`${answer} >> Delete ${isDelete}`)
}
