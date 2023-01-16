import MainLayout from '@/layouts/MainLayout'
import Carts, { CartsProps } from '@/modules/carts'
import { GetServerSideProps } from 'next'
import { memo } from 'react'

const PageCarts: React.FC<CartsProps> = (props) => {
  return (
    <MainLayout title='Products'>
      <Carts {...props} />
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { page, limit } = query

  return {
    props: {
      page: page ? (isNaN(parseInt(page as string)) ? 1 : parseInt(page as string)) : 1,
      limit: limit ? (isNaN(parseInt(limit as string)) ? 10 : parseInt(limit as string)) : 10
    }
  }
}

export default memo(PageCarts)
