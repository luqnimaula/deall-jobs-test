import Input from "@/components/Input"
import Pagination from "@/components/Pagination"
import Spinner from "@/components/Spinner"
import useProductList from "@/hooks/useProductList"
import clsxm from "@/utils/clsxm"
import { moneyFormat } from "@/utils/number"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import ProductItem from "./components/ProductItem"
import {
  List,
  Grid
} from 'react-feather'
import useCategories from "@/hooks//useCategories"
import Link from "next/link"

export type ProductsProps = {
  page: number
  limit: number
  q?: string
}

enum ViewType {
  LIST = 'LIST',
  GRID = 'GRID'
}

const Products: React.FC<ProductsProps> = ({
  page,
  limit,
  q
}) => {
  const router = useRouter()
  const [viewType, setViewType] = useState<ViewType>(ViewType.LIST)
  const {
    loading,
    data,
    total,
    query,
    fetchList,
    setQuery
  } = useProductList()
  const {
    categories,
    getCategories
  } = useCategories()

  useEffect(() => {
    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  useEffect(() => {
    setQuery(q ?? '')
    fetchList(
      router.pathname.replace('[slug]', router?.query?.slug as string),
      {page, limit, q}
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, q, router?.query?.slug, router.pathname])

  return (
    <div className='w-full space-y-3'>
      <div className="flex md:justify-between gap-2 items-center">
        <div className='inline-flex gap-[1px]'>
          <button
            onClick={() => setViewType(ViewType.LIST)}
            className={clsxm(
              'px-3 py-2 rounded-tl-md rounded-bl-md',
              viewType === ViewType.LIST ? 'bg-sky-400' : 'bg-gray-200 hover:bg-gray-300 dark:bg-theme-6 dark:text-gray-200'
            )}
          >
            <List/>
          </button>
          <button
            onClick={() => setViewType(ViewType.GRID)}
            className={clsxm(
              'px-3 py-2 rounded-tr-md rounded-br-md',
              viewType === ViewType.GRID ? 'bg-sky-400' : 'bg-gray-200 hover:bg-gray-300 dark:bg-theme-6 dark:text-gray-200'
            )}
          >
            <Grid/>         
          </button>
        </div>
        <form method="GET" className='w-full md:w-[20rem]' action={'/products' + (query ? '/search' : '')}>
          <Input
            type='search'
            name='q'
            defaultValue={q}
            placeholder='Search products...'
            className='dark:bg-theme-6'
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => setQuery((e.target as HTMLInputElement).value)}
          />
        </form>
      </div>
      {categories.length > 0 && (
        <div className='flex flex-wrap gap-1 items-center dark:text-gray-200'>
          <div className='text-xs'>
            Categories:
          </div>
          {categories.map((value) => (
            <Link
              key={value}
              href={`/products/category/${value}`}
              className={clsxm(
                'cursor-pointer px-2 py-1 text-xs rounded-md',
                router?.query?.slug === value ? 'bg-sky-400' : 'bg-gray-200 hover:bg-gray-300 dark:bg-theme-6'
              )}
            >
              {value}
            </Link>
          ))}
        </div>
      )}
      {viewType === ViewType.LIST && (
        <div className='w-full rounded-md shadow-sm px-4 py-3 mb-5 bg-white dark:bg-theme-6'>
          <div className='min-h-[26rem] overflow-x-auto'>
            <table className='w-full table-auto dark:text-gray-200' cellPadding={8}>
              <thead className='text-sm'>
                <tr>
                  <th className='align-top text-left w-[2rem]'>#</th>
                  <th className='align-top text-left w-[16rem] cursor-pointer'>
                    <div className='inline-flex items-center gap-x-3'>
                      <span>Product&nbsp;Name</span>
                    </div>
                  </th>
                  <th className='align-top text-left w-[10rem] cursor-pointer'>
                    <div className='inline-flex items-center gap-x-3'>
                      <span>Brand</span>
                    </div>
                  </th>
                  <th className='align-top text-left w-[8rem] cursor-pointer'>
                    <div className='inline-flex items-center gap-x-3'>
                      <span>Price</span>
                    </div>
                  </th>
                  <th className='align-top text-left w-[8rem] cursor-pointer'>
                    <div className='inline-flex items-center gap-x-3'>
                      <span>Stock</span>
                    </div>
                  </th>
                  <th className='align-top text-left w-[10rem] cursor-pointer'>
                    <div className='inline-flex items-center gap-x-3'>
                      <span>Category</span>
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
                        className={clsxm(
                          'w-full text-xs',
                          'transition cursor-default border-b select-none odd:bg-gray-100 dark:odd:bg-theme-7',
                          'dark:border-b-theme-5 hover:bg-primary-1 dark:hover:bg-primary-5/20'
                        )}
                      >
                        <td className='align-top text-left'>{(page - 1) * (limit || 10) + index + 1}</td>
                        <td className='align-top'>
                          <div className='flex items-start gap-2'>
                            <img
                              alt={row.title}
                              draggable='false'
                              src={row.thumbnail}
                              className='w-12 h-12 rounded-md object-cover'
                            />
                            <div className='font-semibold text-md pr-10 md:pr-0'>
                              {row.title}
                            </div>
                          </div>
                        </td>
                        <td className='align-top'>
                          {row.brand}
                        </td>
                        <td className='align-top whitespace-nowrap'>
                          {moneyFormat(row.price)}
                        </td>
                        <td className='align-top'>
                          {row.stock}
                        </td>
                        <td className='align-top'>
                          {row.category}
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
      )}
      {viewType === ViewType.GRID && (
        <div className='grid grid-cols-12 gap-3'>
          {loading ? (
            <div className='col-span-12 relative h-[20rem]'>
              <Spinner
                containerSize='full'
                spinnerSize='md'
                containerStyle='absolute top-0 bottom-0 left-0 right-0'
              />
            </div>
          ) : data.map((row) => (
            <ProductItem
              key={row.id}
              data={row}
              className='col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3 scale-[0.98] hover:scale-100'/>
            ))
          }
        </div>
      )}
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
    </div>
  )
}

export default Products
