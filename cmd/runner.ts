import { loadSubRunner } from './sub-task/parameter.load'
import { PromptConvertKST, PromptKeyParams, SelectBoxParams } from './types/interface'
import { inspectParameter } from './utils/inspect-parameter'
import { SelectBox } from './utils/interaction'

export const Run = async () => {
  console.clear()
  const config = inspectParameter.getParameter()

  if (!config.isExist) {
    console.log('Not Exists Profile, Region')
    process.exit(0)
  }

  console.log(`
    profile : ${config.profile}
    region : ${config.region}
  `)

  // Run
  while (true) {
    console.clear()

    // Command 정리
    const commandObj = Object.entries(PromptConvertKST)
      .filter(([key, _]) => !key.includes('_'))
      .reduce((acc, [key, value]) => {
        const obj: SelectBoxParams = {
          name: value,
          value: key,
        }

        acc.push(obj)
        return acc
      }, [] as SelectBoxParams[])

    // Task 선택
    const select = await SelectBox('Select CLI', commandObj)
    switch (select as PromptKeyParams) {
      case 'Delete':
        console.log('delete')
        exit()

      case 'Load':
        await loadSubRunner({ profile: config.profile ?? '', region: config.region ?? '' })
        exit()

      case 'Write':
        console.log('write')
        exit()

      default:
        throw new Error(`Not Exsist task ${select}`)
    }
  }
}

const exit = () => {
  process.exit(0)
}
