import fs from 'fs'
import yaml from 'js-yaml'
import _ from 'lodash'
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

    const doc = yaml.load(fs.readFileSync(filePath, 'utf-8'))
    const profile = this.getProperties(doc, 'profile')
    const region = this.getProperties(doc, 'region')

    return {
      profile,
      region,
      isExist: profile && region ? true : false,
    }
  }

  private getProperties(doc: unknown, key: string): string {
    return _.findKey(doc, key) as string
  }
}

export const inspectParameter = new InspectParameter()
