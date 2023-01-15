import Modal from "@/components//Modal"
import Spinner from "@/components//Spinner"
import useUser from "@/hooks//useUser"
import { Cart } from "@/models//cart"
import api from "@/utils//api"
import clsxm from "@/utils//clsxm"
import { moneyFormat } from "@/utils//number"
import { AxiosResponse } from "axios"
import { memo, useEffect, useState } from "react"

type Props = {
  id: number
  onClose: () => void
}

const DetailCartPopup: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<Cart | undefined>(undefined)
  const {data: userData, getUser} = useUser()

  useEffect(() => {
    if (!props.id) return
    ;(async () => {
      try {
        setLoading(true)
        const {data}: AxiosResponse<Cart> = await api.get(`/carts/${props.id}`)
        if (data) await getUser(data.userId)
        setDetail(data ?? undefined)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.id])

  return (
    <Modal
      show={!!props.id}
      title='Cart Detail'
      onClose={props.onClose}
    >
      <div className='relative w-full min-h-[16rem]'>
        {loading ? (
          <Spinner
            containerSize='full'
            spinnerSize='md'
            containerStyle='absolute top-0 bottom-0 left-0 right-0 bg-transparent'
          />
        ) : (
          <div className='w-full'>
            {detail ? (
              <div className='w-full space-y-3'>
                <div className="grid grid-cols-12 gap-3 md:gap-5">
                  <div className="col-span-12 xl:col-span-4 border-[1px] rounded-md px-3 py-2 flex">
                    <div className='flex w-full items-center my-auto'>
                      <img
                        src={userData?.image}
                        alt={userData?.firstName}
                        className='w-9 h-9 rounded-full object-cover border-[1px]'
                      />
                      <div className='ml-2 w-full pr-6'>
                        <p className='font-semibold text-md truncate'>
                          {userData?.firstName} {userData?.lastName}
                        </p>
                        <p className='text-xs truncate'>
                          {userData?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-3 xl:col-span-2 border-[1px] rounded-md px-3 py-2">
                    <div className="text-sm">Products</div>
                    <div className="text-3xl font-bold">
                      {detail.totalProducts}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-3 xl:col-span-2 border-[1px] rounded-md px-3 py-2">
                    <div className="text-sm">Quantity</div>
                    <div className="text-3xl font-bold">
                      {detail.totalQuantity}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-3 xl:col-span-2 border-[1px] rounded-md px-3 py-2">
                    <div className="text-sm">Total</div>
                    <div className="text-xl font-bold whitespace-nowrap mt-2">
                      {moneyFormat(detail.total ?? 0)}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-3 xl:col-span-2 border-[1px] rounded-md px-3 py-2">
                    <div className="text-sm">Discounted Total</div>
                    <div className="text-xl font-bold whitespace-nowrap mt-2">
                      {moneyFormat(detail.discountedTotal ?? 0)}
                    </div>
                  </div>
                </div>
                
                <div className='min-h-[18rem] overflow-x-auto'>
                  <table className='w-full table-auto' cellPadding={8}>
                    <thead className='text-sm'>
                      <tr>
                        <th className='align-top text-left w-[2rem]'>#</th>
                        <th className='align-top text-left w-[20rem] cursor-pointer'>
                          <div className='inline-flex items-center gap-x-3'>
                            <span>Product</span>
                          </div>
                        </th>
                        <th className='align-top text-left w-[4rem] cursor-pointer'>
                          <div className='inline-flex items-center gap-x-3'>
                            <span>Qty</span>
                          </div>
                        </th>
                        <th className='align-top text-right w-[8rem] cursor-pointer'>
                          <div className='inline-flex items-center gap-x-3'>
                            <span>Price</span>
                          </div>
                        </th>
                        <th className='align-top text-right w-[8rem] cursor-pointer'>
                          <div className='inline-flex items-center gap-x-3'>
                            <span>Total</span>
                          </div>
                        </th>
                        <th className='align-top text-right w-[8rem] cursor-pointer'>
                          <div className='inline-flex items-center gap-x-3'>
                            <span>Discount&nbsp;(%)</span>
                          </div>
                        </th>
                        <th className='align-top text-right w-[8rem] cursor-pointer'>
                          <div className='inline-flex items-center gap-x-3'>
                            <span>Discounted&nbsp;Price</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {(detail.products || []).map((row, index) => {
                        return (
                          <tr
                            key={row.id}
                            className={clsxm(
                              'w-full text-xs',
                              'transition cursor-default border-b select-none odd:bg-gray-100 dark:odd:bg-theme-7',
                              'dark:border-b-theme-5 hover:bg-primary-1 dark:hover:bg-primary-5/20'
                            )}
                          >
                            <td className='align-top text-left'>{index + 1}</td>
                            <td className='align-top'>
                              {row.title}
                            </td>
                            <td className='align-top'>
                              {row.quantity}
                            </td>
                            <td className='align-top whitespace-nowrap text-right'>
                              {moneyFormat(row.price)}
                            </td>
                            <td className='align-top whitespace-nowrap text-right'>
                              {moneyFormat(row.total)}
                            </td>
                            <td className={clsxm('align-top text-right', row.discountPercentage > 0 && 'text-green-500')}>
                              {row.discountPercentage}%
                            </td>
                            <td className='align-top whitespace-nowrap text-right'>
                              {moneyFormat(row.discountedPrice)}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  {(detail.products || []).length < 1 && (
                    <div className='flex h-[12rem] w-full mt-3'>
                      <div className='m-auto text-sm text-center'>
                        <div>No data found</div>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            ) : (
              <div className='flex h-[10rem]'>
                <div className='m-auto'>Not found</div>
              </div>
            )}
          </div>
        )}
      </div>
    </Modal>
  )
}

export default memo(DetailCartPopup)
