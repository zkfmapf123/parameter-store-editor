import { SelectBox } from './cli/interaction'
import { PromptConvertKST, SelectBoxParams } from './types/interface'
import { inspectParameter } from './utils/inspect-parameter'

export const Run = async () => {
  console.clear()
  const { profile, region, isExist } = inspectParameter.getParameter()

  if (!isExist) {
    console.log('Not Exists Profile, Region')
    process.exit(0)
  }

  console.log(`
    profile : ${profile}
    region : ${region}
  `)

  // Run
  while (true) {
    console.clear()
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

    const select = await SelectBox('Select CLI', commandObj)
    console.log(select)
  }
}
