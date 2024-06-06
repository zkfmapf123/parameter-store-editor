import { inspectParameter } from './utils/inspect-parameter'

export const Run = () => {
  console.log('hello world')

  const profile = inspectParameter.getParameter()
  console.log(profile)
}
