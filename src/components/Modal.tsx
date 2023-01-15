import { memo } from 'react'
import clsxm from '../utils/clsxm'
import { X } from 'react-feather'

type Props = {
  show: boolean
  title: string
  onClose: () => void
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ children, show, onClose, title }) => {
  return (
    <div className={clsxm('fixed z-10 overflow-y-auto top-0 w-full left-0', !show && 'hidden')}>
      <div className='flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity'>
          <div className='absolute inset-0 bg-gray-900 opacity-75' />
        </div>
        <div
          className='inline-block align-center bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full lg:max-w-4xl xl:max-w-5xl'
          role='dialog'
          aria-modal='true'
          aria-labelledby='modal-headline'
        >
          <div className='w-full px-3 py-2 flex justify-between gap-5 items-start'>
            <div className='font-normal text-xl'>{title}</div>
            <X className='text-gray-500 cursor-pointer' onClick={onClose} />
          </div>
          <hr />
          <div className='p-3.5'>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default memo(Modal)
