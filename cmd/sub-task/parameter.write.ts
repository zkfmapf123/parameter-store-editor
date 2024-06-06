import { SSMConfig } from '../aws/ssm'
import { GetParameterParams, WriteCLIParams } from '../types/interface'
import { helperMakeInteractionChoice } from '../utils/helper'
import { getYamlConfig } from '../utils/inspect-parameter'
import { InputBoxes, SelectBox } from '../utils/interaction'

const INPUT_FILE = 'input.yaml'

const WRITE_SUB_COMMAND = {
  CLI: 'CLI 입력',
  FILE: '파일 입력',
}

export const writeSubRunner = async ({ profile, region }: Partial<GetParameterParams>) => {
  const ssmConfig = new SSMConfig({
    profile: profile || '',
    region: region || '',
  })

  const select = (await SelectBox('입력 방법을 선택해주세요', helperMakeInteractionChoice(WRITE_SUB_COMMAND))) as keyof typeof WRITE_SUB_COMMAND

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
    source: '',
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

  const fullname = await ssmConfig.update(writeCliParmas)
  if (fullname === '') {
    process.exit(1)
  }

  console.log(`${fullname} is Create...`)
}

const inputUseFile = async (ssmConfig: SSMConfig) => {
  const parameters = getYamlConfig<WriteCLIParams[]>(INPUT_FILE, (doc: unknown) => {
    const _doc = doc as Record<'input', WriteCLIParams>
    return Object.values(_doc.input)
  })

  console.log(parameters)

  for (const parameter of parameters) {
    const fullPath = await ssmConfig.update(parameter)

    console.log(`${fullPath} Create is ${fullPath === '' ? false : true}`)
  }
}
