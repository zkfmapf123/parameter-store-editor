import { SSMConfig } from '../aws/ssm'
import { GetParameterParams, SelectBoxParams, WriteCLIParams } from '../types/interface'
import { InputBoxes, SelectBox } from '../utils/interaction'

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

  const select = (await SelectBox('입력 방법을 선택해주세요', commandObj)) as keyof typeof WRITE_SUB_COMMAND

  if (select === 'CLI') {
    return await inputUseCli(ssmConfig)
  }

  if (select === 'FILE') {
    return await inputUseFile(ssmConfig)
  }
}

const inputUseCli = async (ssmConfig: SSMConfig) => {
  const writeCliParmas: WriteCLIParams = {
    app: '',
    env: '',
    svc: '',
    value: '',
  }

  for (const key of Object.keys(writeCliParmas)) {
    const answer = await InputBoxes(`${key} 를 입력하세요`)
    writeCliParmas[key as keyof WriteCLIParams] = answer
  }

  console.log(JSON.stringify(writeCliParmas, null, 4))
  const answer = await InputBoxes('알맞은 값이라면 yes를 입력해주세요')

  if (answer !== 'yes') {
    return
  }

  const isSuccess = await ssmConfig.update(writeCliParmas)
  if (!isSuccess) {
    process.exit(1)
  }
}

const inputUseFile = async (ssmConfig: SSMConfig) => {}
