import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

interface GetParameterParams {
  profile: string
  region: string
  isExist: boolean
}

class InspectParameter {
  getParameter(filename = 'config.yaml'): Partial<GetParameterParams> {
    const filePath = path.join(process.cwd(), filename)
    if (!fs.existsSync(filePath)) {
      return {
        isExist: false,
      }
    }

    const doc = yaml.load(fs.readFileSync(filePath, 'utf-8')) as Record<'config', GetParameterParams>
    const [profile, region] = [doc?.config.profile, doc?.config.region]

    return {
      profile,
      region,
      isExist: profile && region ? true : false,
    }
  }
}

export const inspectParameter = new InspectParameter()
