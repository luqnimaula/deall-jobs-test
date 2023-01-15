import { memo, useMemo } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import clsxm from '../utils/clsxm'

const pageItemDefaultCls =
  'bg-white dark:bg-theme-6 border-[1px] dark:border-gray-600 rounded-md inline-flex items-center h-full px-1 py-1 text-sm text-gray-500 dark:text-gray-100 font-medium'

type Props = {
  showCounter?: boolean
  showSizeChanger?: boolean
  loading: boolean
  limit: number
  onChangePage: (page: number) => void
  onChangeLimit: (limit: number) => void
  page: number
  total: number
  limitOptions?: number[]
}

const Pagination: React.FC<Props> = ({
  showCounter,
  showSizeChanger,
  loading,
  limit,
  onChangePage,
  onChangeLimit,
  page,
  total,
  limitOptions
}) => {
  const pageNum = useMemo(() => Math.ceil(total / limit), [total, limit])

  const pageList = useMemo(() => {
    const result: (number | undefined)[] = []
    if (pageNum === 0) return result
    const normalizedPage = Math.min(pageNum, Math.max(0, page))

    if (pageNum < 8) {
      for (let i = 1; i <= pageNum; i++) {
        result.push(i)
      }
    } else {
      if (normalizedPage > 4) {
        result.push(1, undefined, Math.min(normalizedPage, pageNum - 3) - 1)
      } else {
        result.push(1, 2, 3, 4)
      }
      if (normalizedPage + 3 < pageNum) {
        if (normalizedPage > 4) result.push(normalizedPage)
        result.push(Math.max(normalizedPage, 4) + 1, undefined, pageNum)
      } else {
        result.push(pageNum - 3, pageNum - 2, pageNum - 1, pageNum)
      }
    }
    return result
  }, [pageNum, page])

  return (
    <div className='flex flex-wrap gap-2 md:flex-nowrap'>
      <div className='w-full flex items-center gap-2'>
        {showSizeChanger && (
          <select
            disabled={loading}
            className='w-auto pl-2 pr-5 py-1 text-sm rounded-md border-[1px] border-gray-300 dark:bg-theme-6 dark:border-gray-600'
            autoComplete='off'
            value={limit}
            onChange={(e) => onChangeLimit(Number(e.currentTarget.value))}
          >
            {(limitOptions || [5, 10, 15, 20, 25, 50, 100]).map((num) => (
              <option key={num}>{num}</option>
            ))}
          </select>
        )}
        {loading || total === 0 ? null : (
          <>
            {showCounter && (
              <span className='shrink-0 text-sm'>
                Show {(page - 1) * limit + 1}-{Math.min(total, (page - 1) * limit + limit)} from {total} entries
              </span>
            )}
          </>
        )}
      </div>
      {pageList.length > 0 ? (
        <ul className='w-full flex flex-nowrap items-center justify-end gap-1'>
          <li
            onClick={() => !loading && onChangePage(page - 1)}
            className={clsxm(pageItemDefaultCls, 'cursor-pointer', page === 1 && 'hidden')}
          >
            <ChevronLeft />
          </li>
          {pageList.map((x, i) =>
            x === undefined ? (
              <li className={clsxm(pageItemDefaultCls, 'px-2')} key={`${i}-dot`}>
                ...
              </li>
            ) : (
              <li
                onClick={() => !loading && page !== x && onChangePage(x)}
                className={clsxm(
                  pageItemDefaultCls,
                  'px-2',
                  page === x ? 'bg-sky-200 dark:bg-theme-8/20 cursor-default' : 'cursor-pointer'
                )}
                key={x}
              >
                {x}
              </li>
            )
          )}
          <li
            onClick={() => !loading && onChangePage(page + 1)}
            className={clsxm(pageItemDefaultCls, 'cursor-pointer', page === pageNum && 'hidden')}
          >
            <ChevronRight />
          </li>
        </ul>
      ) : null}
    </div>
  )
}

export default memo(Pagination)
