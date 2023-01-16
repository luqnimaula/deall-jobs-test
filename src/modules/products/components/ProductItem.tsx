import { Product } from "@/models/product"
import clsxm from "@/utils/clsxm"
import { moneyFormat } from "@/utils/number"
import { memo } from "react"

type Props = {
  className?: string
  data: Product
}

const ProductItem: React.FC<Props> = memo(({className, data}) => {
  return (
    <div className={clsxm('rounded-md shadow-sm hover:shadow-lg bg-white dark:bg-theme-6 dark:text-gray-200', className ?? '')}>
      <div className='w-full relative'>
        <img
          alt=''
          draggable='false'
          src={data.thumbnail}
          className='h-[12rem] object-cover rounded-tl-md rounded-tr-md w-full'
        />
      </div>
      <div className='px-2.5 py-2 space-y-2'>
        <div className='w-full'>
          <div className='text-md font-semibold'>{data.title}</div>
          <div className='text-xs font-semibold'>{data.brand}</div>
          <div className='text-xs mt-1'>Category : {data.category}</div>
        </div>
        <hr/>
        <div className='flex justify-between'>
          <div className='text-lg font-semibold self-end'>
            {moneyFormat(data.price)}
          </div>
          <div className='text-xs font-normal self-end'>
            Stock: {data.stock}
          </div>
        </div>
      </div>
    </div>
  )
})

export default memo(ProductItem)
