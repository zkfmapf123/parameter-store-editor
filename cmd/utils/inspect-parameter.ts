import fs from 'fs'
import yaml from 'js-yaml'
import path from 'path'

interface GetParameterParams {
  profile: string
  region: string
  isExist: boolean
}

export const getYamlConfig = <T>(filename: string, fn: (doc: unknown) => T): T => {
  const filePath = path.join(process.cwd(), filename)
  if (!fs.existsSync(filePath)) {
    console.error(`Not Exist ${filePath}`)
  }

  return fn(yaml.load(fs.readFileSync(filePath, 'utf-8')))
}
