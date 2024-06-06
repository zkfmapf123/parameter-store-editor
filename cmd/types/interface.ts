//////////////////////////////////////// Prompt ////////////////////////////////////////
type promptKeyParams = 'Write' | 'SingleWrite' | 'FileWrite' | 'Delete' | 'Search' | 'Save'

/**
 * @desc Prompt List
 */
export const PromptConvertKST: Record<promptKeyParams, string> = {
  Write: '쓰기',
  Delete: '삭제',
  FileWrite: '파일쓰기',
  SingleWrite: '단일쓰기',
  Save: '파일 저장 (Secret Manager)',
  Search: '검색',
}
