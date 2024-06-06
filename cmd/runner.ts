import { deleteSubRunner } from './sub-task/parameter.delete'
import { loadSubRunner } from './sub-task/parameter.load'
import { writeSubRunner } from './sub-task/parameter.write'
import { GetParameterParams, PromptConvertKST, PromptKeyParams, SelectBoxParams } from './types/interface'
import { getYamlConfig } from './utils/inspect-parameter'
import { SelectBox } from './utils/interaction'

const CONFIG_FILE = 'config.yaml'

export const Run = async () => {
  console.clear()
  const config = getYamlConfig(CONFIG_FILE, (doc: unknown) => {
    const _doc = doc as Record<'config', GetParameterParams>
    const [profile, region] = [_doc?.config.profile, _doc?.config.region]

    return {
      profile,
      region,
      isExist: profile && region ? true : false,
    }
  })

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
    const awsProfile = {
      profile: config.profile ?? '',
      region: config.region ?? '',
    }
    switch (select as PromptKeyParams) {
      case 'Delete':
        await deleteSubRunner(awsProfile)
        exit()

      case 'Load':
        await loadSubRunner(awsProfile)
        exit()

      case 'Write':
        await writeSubRunner(awsProfile)
        exit()

      default:
        throw new Error(`Not Exsist task ${select}`)
    }
  }
}

const exit = () => {
  process.exit(0)
}
