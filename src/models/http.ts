export type PaginationResponse<KeyRecord extends string, RecordType> = {
  total: number
  skip: number
  limit: number
} & {
  [key in KeyRecord]: RecordType
}
