export type Dictionary<T> = {
  [x: string]: T
}

interface AWSTagParams {
  Key: string
  Value: string
}

export interface SSMParameterStoreParams {
  dataType: string
  name: string
  type: string
  value: string
  tags: Dictionary<string> // key : value
}
