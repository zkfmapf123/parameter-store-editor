import { GetParametersByPathCommand, ListTagsForResourceCommand, PutParameterCommand, SSMClient, Tag } from '@aws-sdk/client-ssm'
import { fromIni } from '@aws-sdk/credential-providers'
import { Dictionary, SSMParameterStoreParams } from '../types/aws.interface'
import { GetParameterParams, WriteCLIParams } from '../types/interface'

export class SSMConfig {
  private client: SSMClient

  constructor({ profile, region }: Pick<GetParameterParams, 'profile' | 'region'>) {
    this.client = new SSMClient({
      region,
      credentials: fromIni({ profile }),
    })
  }

  private async retrivalAll(): Promise<Dictionary<SSMParameterStoreParams>> {
    let parameterStore: Dictionary<SSMParameterStoreParams> = {}
    let nextToken: string | undefined

    do {
      const command = new GetParametersByPathCommand({
        Path: '/',
        Recursive: true,
        WithDecryption: true,
        NextToken: nextToken,
      })

      try {
        const res = await this.client.send(command)
        res.Parameters?.forEach((config) => {
          if (config.Name) {
            parameterStore[config.Name] = {
              dataType: config.DataType ?? '',
              name: config.Name,
              type: config.Type ?? '',
              value: config.Value ?? '',
              tags: {},
            }
          }
        })
        nextToken = res.NextToken
      } catch (e) {
        console.error(e)
        process.exit(1)
      }
    } while (nextToken)

    return parameterStore
  }

  private async attachTag(ps: Dictionary<SSMParameterStoreParams>): Promise<Dictionary<SSMParameterStoreParams>> {
    for (const [name, config] of Object.entries(ps)) {
      const command = new ListTagsForResourceCommand({
        ResourceId: config.name,
        ResourceType: 'Parameter',
      })

      try {
        const res = await this.client.send(command)
        const tags = res.TagList || []

        if (tags.length === 0) {
          continue
        }

        const tagDict = tags.reduce((acc, { Key, Value }) => {
          if (Key !== undefined) {
            acc[Key] = Value || ''
          }
          return acc
        }, {} as Dictionary<string>)

        ps[name].tags = tagDict
      } catch (e) {
        console.error(e)
        process.exit(0)
      }
    }

    return ps
  }

  async retrive(): Promise<Dictionary<SSMParameterStoreParams>> {
    const ps = await this.retrivalAll()
    const tagPs = await this.attachTag(ps)

    return tagPs
  }

  async retriveFunc(value: string, filterFn: (value: string, ps: Dictionary<SSMParameterStoreParams>) => Dictionary<SSMParameterStoreParams>) {
    const res = await this.retrive()
    return filterFn(value, res)
  }

  async update(config: WriteCLIParams, overwrite = true): Promise<boolean> {
    const { app, env, svc, value } = config
    const fullName = `/${app}/${env}/${svc}`

    const tags = Object.entries(config)
      .filter(([k, _]) => k! == 'value')
      .reduce((acc, [k, v]) => {
        const _tag: Tag = {
          Key: k,
          Value: v,
        }

        acc.push(_tag)
        return acc
      }, [] as Tag[])

    const command = new PutParameterCommand({
      Name: fullName,
      Value: value,
      Type: 'SecureString',
      // Overwrite: overwrite,
      Tags: tags,
    })

    try {
      await this.client.send(command)
    } catch (e) {
      console.error(e)
      return false
    }

    return true
  }

  async delete() {}
}
