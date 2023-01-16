import MainLayout from '@/layouts/MainLayout'
import Carts from '@/modules/carts'
import { NextRouter, withRouter } from 'next/router'
import { useMemo } from 'react'

type Props = {
  router: NextRouter
}

const PageCarts: React.FC<Props> = ({router}) => {
  const {page, limit} = router.query ?? {}
  const pageNumber = useMemo(() => page ? (isNaN(parseInt(page as string)) ? 1 : parseInt(page as string)) : 1, [page])
  const limitNumber = useMemo(() => limit ? (isNaN(parseInt(limit as string)) ? 10 : parseInt(limit as string)) : 10, [limit])

  return (
    <MainLayout title='Products'>
      <Carts
        page={pageNumber}
        limit={limitNumber}
      />
    </MainLayout>
  )
}

export default withRouter(PageCarts)
