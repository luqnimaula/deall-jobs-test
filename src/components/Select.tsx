import clsxm from '@/utils/clsxm'
import { forwardRef, memo } from 'react'

type Option = {
  value: string
  label: string
}

type SelectProps = {
  list: Option[]
} & React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(({ list, ...props }, ref) => {
  return (
    <select
      {...props}
      ref={ref}
      className={clsxm(
        'w-full h-10 rounded-md transition px-4 py-0',
        'font-medium border-0 text-sm 2xl:text-base',
        'ring-primary-3 focus:ring-primary-3',
        'bg-theme-2/50 dark:bg-theme-6 dark:text-gray-200',
        'border-none dark:border-none',
        props.className
      )}
    >
      {list.length > 0 &&
        list.map((v, k) => (
          <option key={k} value={v.value}>
            {v.label}
          </option>
        ))}
    </select>
  )
})

export default memo(Select)
