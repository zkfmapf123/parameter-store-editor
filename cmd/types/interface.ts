//////////////////////////////////////// Prompt ////////////////////////////////////////

/**
 * @mainTask
 * @subTask subTask의 경우 prefix에 _로 구성합니다
 */
type promptKeyParams = 'Write' | '_SingleWrite' | '_FileWrite' | 'Delete' | 'Search'

/**
 * @desc Prompt List
 */
export const PromptConvertKST: Record<promptKeyParams, string> = {
  Write: 'Parameter-쓰기',
  Delete: 'Parameter-삭제',
  _FileWrite: '파일쓰기',
  _SingleWrite: '단일쓰기',
  Search: 'Parameter-검색',
}

export interface SelectBoxParams {
  name: string
  value: string
}
