import { AxiosResponse } from 'axios'
import { useCallback, useState } from 'react'
import { User } from '../models/user'
import api from '../utils/api'

export default () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<User | undefined>(undefined)

  const getUser = useCallback(async (id: number) => {
    try {
      setLoading(true)
      const { data }: AxiosResponse<User> = await api.get(`/users/${id}`)
      setData(data ?? undefined)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    loading,
    data,
    getUser
  }
}
