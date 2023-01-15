import Pagination from "@/components//Pagination"
import Spinner from "@/components//Spinner"
import useCartList from "@/hooks//useCartList"
import clsxm from "@/utils//clsxm"
import { moneyFormat } from "@/utils//number"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import DetailCartPopup from "./components/DetailCartPopup"

export type CartsProps = {
  page: number
  limit: number
}

const Carts: React.FC<CartsProps> = ({
  page,
  limit
}) => {
  const router = useRouter()
  const {
    loading,
    data,
    total,
    fetchList,
  } = useCartList()
  const [cartId, setCartId] = useState<number>(0)
  
  useEffect(() => {
    fetchList(router.pathname, {page, limit})
  }, [page, limit])

  return (
    <div className='w-full space-y-3'>
      <div className='w-full rounded-md shadow-sm px-4 py-3 mb-5 bg-white dark:bg-theme-6'>
        <div className='min-h-[26rem] overflow-x-auto'>
          <table className='w-full table-auto' cellPadding={8}>
            <thead className='text-sm'>
              <tr>
                <th className='align-top text-left w-[2rem]'>#</th>
                <th className='align-top text-left w-[14rem] cursor-pointer'>
                  <div className='inline-flex items-center gap-x-3'>
                    <span>Products</span>
                  </div>
                </th>
                <th className='align-top text-left w-[10rem] cursor-pointer'>
                  <div className='inline-flex items-center gap-x-3'>
                    <span>Total</span>
                  </div>
                </th>
                <th className='align-top text-left w-[8rem] cursor-pointer'>
                  <div className='inline-flex items-center gap-x-3'>
                    <span>Discounted&nbsp;Total</span>
                  </div>
                </th>
                <th className='align-top text-left w-[8rem] cursor-pointer'>
                  <div className='inline-flex items-center gap-x-3'>
                    <span>Total&nbsp;Products</span>
                  </div>
                </th>
                <th className='align-top text-left w-[10rem] cursor-pointer'>
                  <div className='inline-flex items-center gap-x-3'>
                    <span>Total&nbsp;Quantity</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className='relative'>
              {loading ? (
                <tr>
                  <td colSpan={6} className='h-[24rem]'>
                    <Spinner
                      containerSize='full'
                      spinnerSize='md'
                      containerStyle='absolute top-0 bottom-0 left-0 right-0'
                    />
                  </td>
                </tr>
              ) : (
                data.map((row, index) => {
                  return (
                    <tr
                      key={row.id}
                      onClick={() => setCartId(row.id)}
                      className={clsxm(
                        'w-full text-xs',
                        'transition cursor-pointer border-b select-none odd:bg-gray-100 dark:odd:bg-theme-7',
                        'dark:border-b-theme-5 hover:bg-primary-1 dark:hover:bg-primary-5/20'
                      )}
                    >
                      <td className='align-top text-left'>{(page - 1) * (limit || 10) + index + 1}</td>
                      <td className='align-top'>
                        {row.products.map(r => r.title).join(', ')}
                      </td>
                      <td className='align-top whitespace-nowrap'>
                        {moneyFormat(row.total)}
                      </td>
                      <td className='align-top whitespace-nowrap'>
                        {moneyFormat(row.discountedTotal)}
                      </td>
                      <td className='align-top'>
                        {row.totalProducts}
                      </td>
                      <td className='align-top'>
                        {row.totalQuantity}
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
          {!loading && data.length < 1 && (
            <div className='flex h-[12rem] w-full mt-3'>
              <div className='m-auto text-sm text-center'>
                <div>No data found</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Pagination
        showCounter
        showSizeChanger
        loading={loading}
        page={page}
        limit={limit}
        total={total}
        onChangePage={(newPageNumber) => {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              page: newPageNumber
            }
          })
        }}
        onChangeLimit={(newLimitNumber) => {
          router.push({
            pathname: router.pathname,
            query: {
              ...router.query,
              limit: newLimitNumber,
              page: 1
            }
          })
        }}
      />
      <DetailCartPopup
        id={cartId}
        onClose={() => setCartId(0)}
      />
    </div>
  )
}

export default Carts
