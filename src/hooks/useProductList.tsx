import { AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { PaginationResponse } from '../models/http'
import { Product } from '../models/product'
import api from '../utils/api'

type ListParams = {
  page: number
  limit: number
  q?: string
}

export default () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [query, setQuery] = useState<string>('')
  const [data, setData] = useState<Product[]>([])

  const fetchList = useCallback(async (path: string, params: ListParams) => {
    const { page, limit, q } = params

    try {
      setLoading(true)
      const skip = limit * page - limit
      const response: AxiosResponse<PaginationResponse<'products', Product[]>> = await api.get(path, {
        params: {
          limit,
          skip,
          ...(q ? { q } : {})
        }
      })
      const { products, total } = response.data ?? {}
      setData(products ?? [])
      setTotal(total ?? 0)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    total,
    query,
    data,
    fetchList,
    setQuery: useCallback((keyword: string) => setQuery(keyword.trim()), [])
  }
}
