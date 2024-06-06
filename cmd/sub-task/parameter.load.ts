import fs from 'fs'
import { SSMConfig } from '../aws/ssm'
import { GetParameterParams } from '../types/interface'

export const loadSubRunner = async ({ profile, region }: Partial<GetParameterParams>) => {
  const ssmConfig = new SSMConfig({
    profile: profile || '',
    region: region || '',
  })

  const loadJson = await ssmConfig.retrive()
  fs.writeFileSync('result.json', JSON.stringify(Object.values(loadJson)), 'utf-8')
}
