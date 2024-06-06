import { SSMConfig } from '../aws/ssm'
import { GetParameterParams, SelectBoxParams } from '../types/interface'
import { SelectBox } from '../utils/interaction'

const WRITE_SUB_COMMAND = {
  CLI: 'CLI 입력',
  FILE: '파일 입력',
}

export const writeSubRunner = async ({ profile, region }: Partial<GetParameterParams>) => {
  const ssmConfig = new SSMConfig({
    profile: profile || '',
    region: region || '',
  })

  const commandObj = Object.entries(WRITE_SUB_COMMAND).reduce((acc, [k, v]) => {
    const obj: SelectBoxParams = {
      name: v,
      value: k,
    }
    acc.push(obj)
    return acc
  }, [] as SelectBoxParams[])

  const select = await SelectBox('입력 방법을 선택해주세요', commandObj)
  console.log(select)
}
