import { InputHTMLAttributes, forwardRef, memo } from 'react'
import clsxm from '../utils/clsxm'
import { Search } from 'react-feather'

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>((props, ref) => {
  const c = clsxm(
    'px-3 py-2 bg-transparent rounded-md transition h-10 w-full text-sm border-none',
    'placeholder:text-theme-4/60 dark:placeholder:text-theme-4 placeholder:text-sm',
    'placeholder:font-medium',
    'ring-primary-3 focus:ring-primary-3',
    'bg-theme-2/50 dark:bg-theme-7 dark:text-gray-200',
    'border-none dark:border-none',
    props.className
  )

  if (props.type === 'search') {
    return (
      <div className='relative rounded-md transition focus-within:ring-2 ring-primary-3 dark:ring-primary-2'>
        <input {...props} type='text' className={clsxm(c, 'focus:ring-0 pr-8')} ref={ref} />
        <Search className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-300' />
      </div>
    )
  }

  return (
    <input
      {...props}
      ref={ref}
      className={c}
      type={props.type ?? 'text'}
      placeholder={props.placeholder ?? 'Input something..'}
    />
  )
})

export default memo(Input)
