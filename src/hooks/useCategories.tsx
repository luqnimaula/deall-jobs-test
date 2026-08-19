import { AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import api from '../utils/api'

export default () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<string[]>([])

  const getCategories = useCallback(async () => {
    try {
      setLoading(true)
      const { data }: AxiosResponse<Array<{ name: string }>> = await api.get('/products/categories')
      setCategories((data ?? []).map(r => r.name))
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    categories,
    getCategories
  }
}
