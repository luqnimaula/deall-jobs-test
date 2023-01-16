import MainLayout from '@/layouts/MainLayout'
import Products from '@/modules/products'
import { NextRouter, withRouter } from 'next/router'
import { useMemo } from 'react'

type Props = {
  router: NextRouter
}

const PageProductsCategory: React.FC<Props> = ({router}) => {
  const {page, limit} = router.query ?? {}
  const pageNumber = useMemo(() => page ? (isNaN(parseInt(page as string)) ? 1 : parseInt(page as string)) : 1, [page])
  const limitNumber = useMemo(() => limit ? (isNaN(parseInt(limit as string)) ? 10 : parseInt(limit as string)) : 10, [limit])

  return (
    <MainLayout title='Products by Category'>
      <Products
        page={pageNumber}
        limit={limitNumber}
      />
    </MainLayout>
  )
}

export default withRouter(PageProductsCategory)
