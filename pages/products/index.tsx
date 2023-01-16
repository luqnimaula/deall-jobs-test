import MainLayout from '@/layouts/MainLayout'
import Products from '@/modules/products'
import { NextRouter, withRouter } from 'next/router'
import { useMemo } from 'react'

type Props = {
  router: NextRouter
}

const PageProducts: React.FC<Props> = ({router}) => {
  const {page, limit, q} = router.query ?? {}
  const pageNumber = useMemo(() => page ? (isNaN(parseInt(page as string)) ? 1 : parseInt(page as string)) : 1, [page])
  const limitNumber = useMemo(() => limit ? (isNaN(parseInt(limit as string)) ? 10 : parseInt(limit as string)) : 10, [limit])
  const query = useMemo(() => ((q || '') as string).trim(), [q])

  return (
    <MainLayout title='Products'>
      <Products
        page={pageNumber}
        limit={limitNumber}
        q={query}
      />
    </MainLayout>
  )
}

export default withRouter(PageProducts)
