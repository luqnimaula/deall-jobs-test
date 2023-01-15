import { AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { Cart } from '../models/cart'
import { PaginationResponse } from '../models/http'
import api from '../utils/api'

type ListParams = {
  page: number
  limit: number
}

export default () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0)
  const [data, setData] = useState<Cart[]>([])

  const fetchList = useCallback(async (path: string, params: ListParams) => {
    const { page, limit } = params

    try {
      setLoading(true)
      const skip = limit * page - limit
      const response: AxiosResponse<PaginationResponse<'carts', Cart[]>> = await api.get(path, {
        params: {
          limit,
          skip
        }
      })
      const { carts, total } = response.data ?? {}
      setData(carts ?? [])
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
    data,
    fetchList
  }
}
